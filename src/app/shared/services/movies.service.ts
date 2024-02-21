import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MOVIE } from '../../constants/movieUrl';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjMzMjNmYTc4OGRiZmRiNzU3YjBjMmQ4NDFlOTI1NSIsInN1YiI6IjYzNjRiNWI0YWM2Yzc5MDA3Y2QxMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5ULeI8_rncieY_3g_Jy1dJe9E8JvNul0LWXk1t4onk',
  },
};
const url = 'https://api.themoviedb.org/3';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  constructor() {}

  getPopularMovies() {
    return this.http.get<any>(`${url}${MOVIE.POPULAR}`, options);
  }

  getTopRatedMovies() {
    console.log();
    return this.http.get<any>(`${url}${MOVIE.TOP_RATED}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get<any>(`${url}${MOVIE.NOW_PLAYING}`, options);
  }

  getUpComingMovies() {
    return this.http.get<any>(`${url}${MOVIE.UP_COMING}`, options);
  }

  getTrendingMovies() {
    return this.http.get<any>(`${url}${MOVIE.TRENDING_MOVIE}`, options);
  }

  getMovieDetail(id: string) {
    return this.http.get<any>(`${url}/movie/${id}?language=en-US`, options);
  }

  getCastsMovie(id: string) {
    return this.http.get<any>(
      `${url}/movie/${id}/credits?language=en-US`,
      options
    );
  }

  getBannerDetail(id: number) {
    return this.http.get<any>(`${url}/movie/${id}?language=en-US`, options);
  }

  getVideoBanner(id: number) {
    return this.http.get<any>(
      `${url}/movie/${id}/videos?language=en-US`,
      options
    );
  }
}
