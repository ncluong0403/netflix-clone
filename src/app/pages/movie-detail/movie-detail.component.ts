import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movies.service';
import { IMovie, IMovieDetail } from '../../shared/models/movie-interface';
import { forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransformTimePipe } from '../../shared/pipes/transform-time.pipe';
import { HeaderComponent } from '../../core/components/header/header.component';
import { UserType } from '../../core/types/User';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, TransformTimePipe, HeaderComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  movieDetail!: IMovieDetail;
  castsMovie!: any;
  infoUser!: UserType;
  lastCast!: number;
  lastGenre!: number;

  srcSource = [
    './assets/add-list.svg',
    './assets/heart-full.svg',
    './assets/bookmark.svg',
    './assets/star.svg',
  ];

  movieService = inject(MovieService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const infoUserLogged = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    this.infoUser = infoUserLogged;
    const id = this.route.snapshot.params['id'];
    const sources = [
      this.movieService.getMovieDetail(id),
      this.movieService.getCastsMovie(id),
    ];
    forkJoin(sources)
      .pipe(
        map(([movieDetail, castsMovie]) => {
          return { movieDetail, castsMovie };
        })
      )
      .subscribe((res: any) => {
        console.log('🚀 ~ res:', res);
        this.movieDetail = res.movieDetail;
        this.castsMovie = res.castsMovie.cast.slice(0, 20);
        this.lastCast = this.castsMovie.length - 1;
        this.lastGenre = this.movieDetail.genres.length - 1;
      });
  }
}
