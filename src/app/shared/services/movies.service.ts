import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  // method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjMzMjNmYTc4OGRiZmRiNzU3YjBjMmQ4NDFlOTI1NSIsInN1YiI6IjYzNjRiNWI0YWM2Yzc5MDA3Y2QxMWM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B5ULeI8_rncieY_3g_Jy1dJe9E8JvNul0LWXk1t4onk',
  },
};
const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  constructor() {}

  getMovies() {
    return this.http.get<any>(url, options);
  }
}
