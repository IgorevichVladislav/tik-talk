import {Component, Input, input} from '@angular/core';
import {Profile} from "../../data/interfases/profile.interface";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  // @Input() profile!: Profile
  profile = input<Profile>()
  //В Angular 16 метод input<Profile>() используется для создания input-сигнала.
  // Input-сигналы — это реактивные переменные,
  // которые автоматически обновляются при изменении входных данных (input property) в компоненте.
  // Они обладают такими же свойствами, как обычные сигналы,
  // но предназначены для отслеживания изменений от родительского компонента.
  //Таким образом, profile = input<Profile>() означает, что profile становится сигналом,
  // который будет обновляться, когда родительский компонент передаст новое значение в дочерний через input property.

}
