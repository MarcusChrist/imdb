import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../shared/services/movie.service';
import { IMovie } from '../shared/interfaces';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: [ './movie-detail.component.sass' ]
})

export class MovieDetailComponent implements OnInit {
  movie!: IMovie;
  imdbRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private navigation: NavigationService,
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = this.route.snapshot.params.id;
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.movie = movie
        this.imdbRating = Number(movie.imdbRating);
      })
  }

  goBack(): void {
    this.navigation.back();
  }
}