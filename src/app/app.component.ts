import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { UserType } from './core/types/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'netflix-clone';
  infoUser!: UserType;

  ngOnInit(): void {
    const infoUserLogged = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    this.infoUser = infoUserLogged;
  }
}
