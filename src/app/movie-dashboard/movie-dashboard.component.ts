import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';

import { IMovie } from '../shared/interfaces';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.sass']
})
export class MovieDashboardComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(
    public messageService: MessageService,
    private store: Store<any>) { }

  ngOnInit(): void {
    //Subscribe only 1 time to get searchresults from last search
    this.store.select('movies')
    .pipe(first())
    .subscribe(res => this.movies = res);
  }

  ngOnDestroy(): void {

  }
}
