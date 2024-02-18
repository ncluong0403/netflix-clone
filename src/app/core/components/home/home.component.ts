declare const google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from '../../types/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  infoUser!: UserType;
  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('infoUserLogged');
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.infoUser = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    if (this.infoUser === null) this.router.navigate(['login']);
  }
}
