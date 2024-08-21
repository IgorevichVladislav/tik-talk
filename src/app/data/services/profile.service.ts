import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfases/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  // Inject - запросить что-то, чтобы выводить.
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  constructor() {
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
  }
}
