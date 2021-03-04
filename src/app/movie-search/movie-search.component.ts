import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MessageService } from '../shared/services/message.service';

import { MovieService } from '../shared/services/movie.service';
import { IMovie } from '../shared/interfaces';
import { Store } from '@ngrx/store';
import * as Search from "../shared/store/store.actions";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})

export class MovieSearchComponent implements OnInit {
  movies$: Observable<IMovie[]> | undefined;
  searchTerms = new Subject<string>();
  @ViewChild('searchTitle') searchTitle: any;

  constructor(
    public messageService: MessageService,
    private movieService: MovieService,
    private store: Store<any>) { }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term)),
      tap((x) => {
        //Save last search if success
        this.store.dispatch(new Search.AddMovies(x));
      })
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  focusOutFunction(): void {
    this.searchTitle.nativeElement.value = '';
    this.searchTerms.next('?');
  }

  //For listing search results (not done yet)
  keyDownFunction(event: any, term: string) {
    if (event.keyCode === 13) {
      // this.router.navigateByUrl('/detail/' + imdbID);
    }
  }
}