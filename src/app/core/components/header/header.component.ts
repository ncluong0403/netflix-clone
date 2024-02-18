import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserType } from '../../types/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit(): void {}
}
