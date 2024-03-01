import { megaMenu, sourceSvg } from './../../core/others/movie';
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
  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;
  movieDetail!: IMovieDetail;
  castsMovie!: any;
  crewMovie!: any;
  videoKey!: string;
  infoUser!: UserType;
  lastCast!: number;
  lastGenre!: number;
  originalLanguage: string = '';
  // play = false;

  iconsSvg = sourceSvg;
  menuItems = megaMenu;

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
      this.movieService.getCastAndCrewMovie(id),
      this.movieService.getVideo(id),
    ];
    forkJoin(sources)
      .pipe(
        map(([movieDetail, castAndCrewMovie, videoDetail]) => {
          return { movieDetail, castAndCrewMovie, videoDetail };
        })
      )
      .subscribe((res: any) => {
        this.movieDetail = res.movieDetail;
        this.originalLanguage = res.movieDetail.spoken_languages.filter(
          (language: any) =>
            language.iso_639_1 === res.movieDetail.original_language
        )[0].english_name;
        this.castsMovie = res.castAndCrewMovie.cast
          .filter((cast: any) => cast.profile_path !== null)
          .slice(0, 10);

        this.crewMovie = res.castAndCrewMovie.crew.filter(
          (crew: any) => crew.job === 'Director'
        )[0];
        this.videoKey =
          res.videoDetail.results[res.videoDetail.results.length - 1].key;
        this.lastCast = this.castsMovie.length - 1;
        this.lastGenre = this.movieDetail.genres.length - 1;
      });
  }

  ngAfterContentInit(): void {
    this.initSwiper();
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 'auto',
      scrollbar: {
        draggable: true,
        el: '.swiper-scrollbar',
        hide: false,
      },
      mousewheel: true,
    });
  }
}
