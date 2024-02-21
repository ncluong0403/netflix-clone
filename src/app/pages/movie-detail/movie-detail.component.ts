import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movies.service';
import { IMovie, IMovieDetail } from '../../shared/models/movie-interface';
import { forkJoin, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransformTimePipe } from '../../shared/pipes/transform-time.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, TransformTimePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  movieDetail!: IMovieDetail;
  castsMovie!: any;
  lastCast!: any;

  movieService = inject(MovieService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
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
      });
  }
}
