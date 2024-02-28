import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movies.service';
import { IMovieDetail } from '../../shared/models/movie-interface';
import { forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransformTimePipe } from '../../shared/pipes/transform-time.pipe';
import { HeaderComponent } from '../../core/components/header/header.component';
import { UserType } from '../../core/types/User';
import { ModalTrailerComponent } from '../../shared/components/modal-trailer/modal-trailer.component';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    TransformTimePipe,
    HeaderComponent,
    ModalTrailerComponent,
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  movieDetail!: IMovieDetail;
  castsMovie!: any;
  videoKey!: string;
  infoUser!: UserType;
  lastCast!: number;
  lastGenre!: number;
  items = [1, 2, 3, 4, 5]; // Example data

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
      this.movieService.getVideo(id),
    ];
    forkJoin(sources)
      .pipe(
        map(([movieDetail, castsMovie, videoDetail]) => {
          return { movieDetail, castsMovie, videoDetail };
        })
      )
      .subscribe((res: any) => {
        this.movieDetail = res.movieDetail;
        this.castsMovie = res.castsMovie.cast.slice(0, 20);
        this.videoKey =
          res.videoDetail.results[res.videoDetail.results.length - 1].key;
        this.lastCast = this.castsMovie.length - 1;
        this.lastGenre = this.movieDetail.genres.length - 1;
      });
  }
}
