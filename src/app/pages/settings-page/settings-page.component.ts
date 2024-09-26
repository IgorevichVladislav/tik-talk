import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

  fb = inject(FormBuilder)
  profileService = inject(ProfileService)
  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      // effect запускает функцию, когда любой из сигналов внутри этой функции поменяется
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack)
      })
      //patchValue — это метод формы в Angular (ReactiveForms). Он позволяет обновлять значения формы частично,
      // то есть только те поля, которые указаны в переданном объекте.
      // В данном случае, когда вызывается this.profileService.me(), возвращается объект с профилем пользователя,
      // и его значения (например, имя, email и т.д.) подставляются в соответствующие поля формы.
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    //Все потрогали
    this.form.updateValueAndValidity();
    //Прошла валидация на каждой форме. Имя пользователя не занято, Нет запрещеных букв и т.д.
    if (this.form.invalid) return

    if (this.avatarUpload.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUpload.avatar)
      )
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value?.stack)
    }))
  }

  splitStack(stack: string | null | undefined | string[]): string[] {

    if (!stack || stack.length === 0) return []
    if (Array.isArray(stack)) return stack
    return stack.split(',')
  }

  mergeStack(stack: string | null | undefined | string[]) {
    if (!stack || stack.length === 0) return ''
    if (Array.isArray(stack)) return stack.join(',')
    return stack
  }

}
