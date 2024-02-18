declare const google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { UserType } from '../../core/types/User';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  movieService = inject(MovieService);

  infoUser!: UserType;
  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('infoUserLogged');
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    const infoUserLogged = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    this.infoUser = infoUserLogged;
    if (this.infoUser === null) this.router.navigate(['login']);

    this.movieService.getMovies().subscribe((res) => console.log('1', res));
  }
}
