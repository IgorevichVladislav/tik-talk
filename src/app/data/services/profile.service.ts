import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfases/profile.interface";
import {Pageble} from "../interfases/pageble.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/'
  me = signal<Profile | null>(null)

  // В переменной me вся информация о юзере

  constructor() {
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}me`)
      .pipe(
        tap(val => this.me.set(val))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}${id}`)
  }

  getSubscribersShortList(quantity: number) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}subscribers/`)
      .pipe(
        map(res => res.items.slice(0, quantity))
      )
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}me`,
      profile
      //profile: Это объект с данными профиля, которые нужно обновить.
      // Поскольку в методе используется тип Partial<Profile>, это означает,
      // что объект может содержать только часть полей модели Profile (те, которые нужно обновить).
    )
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file)
    return this.http.post<Profile>(`${this.baseApiUrl}upload_image`, fd)
  }

  filterProfile(profile: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}accounts`, profile)

  }

}
