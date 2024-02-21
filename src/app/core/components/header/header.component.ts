declare const google: any;

import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { UserType } from '../../types/User';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) infoUser!: UserType;
  navList: string[] = [
    'Home',
    'TV Shows',
    'News & Popular',
    'My List',
    'Browser by Language',
  ];

  private router = inject(Router);

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('infoUserLogged');
    this.router.navigate(['login']);
  }
}
