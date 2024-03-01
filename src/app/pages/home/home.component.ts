declare const google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { UserType } from '../../core/types/User';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IMovie } from '../../shared/models/movie-interface';
import { Observable, forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    MovieCarouselComponent,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  movieService = inject(MovieService);

  popularMovie: IMovie[] = [];
  upComingMovie: IMovie[] = [];
  nowPlayingMovie: IMovie[] = [];
  topRatedMovie: IMovie[] = [];
  trendingMovie: IMovie[] = [];
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  infoUser!: UserType;

  sources = [
    this.movieService.getNowPlayingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getUpComingMovies(),
    this.movieService.getTopRatedMovies(),
    this.movieService.getTrendingMovies(),
  ];

  ngOnInit(): void {
    const infoUserLogged = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    this.infoUser = infoUserLogged;
    if (this.infoUser === null) this.router.navigate(['login']);

    forkJoin(this.sources)
      .pipe(
        map(([now_playing, popular, upcoming, top_rated, trending]) => {
          this.bannerDetail$ = this.movieService.getBannerDetail(
            upcoming.results[0].id
          );

          this.bannerVideo$ = this.movieService.getVideo(
            upcoming.results[0].id
          );
          return { now_playing, popular, upcoming, top_rated, trending };
        })
      )
      .subscribe((res: any) => {
        this.nowPlayingMovie = res.now_playing.results;
        this.popularMovie = res.popular.results;
        this.upComingMovie = res.upcoming.results;
        this.topRatedMovie = res.top_rated.results;
        this.trendingMovie = res.trending.results;
      });
  }
}
