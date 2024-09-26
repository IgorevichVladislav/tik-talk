import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../../data/services/profile.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {

  fb = inject(FormBuilder);
  profileService = inject(ProfileService);


  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })

  constructor() {
    this.searchForm.valueChanges.
    pipe(
      switchMap(value => {
        return this.profileService.filterProfile(value)
      })
    ).subscribe()

  }

}
