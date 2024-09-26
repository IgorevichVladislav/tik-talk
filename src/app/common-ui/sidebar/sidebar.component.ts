import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom, map} from "rxjs";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    SvgIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  profileService = inject(ProfileService);
  me = this.profileService.me

  subscribers$ = this.profileService.getSubscribersShortList(3)

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chat'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit() {
    firstValueFrom(
      this.profileService.getMe()
    )
  }

}
