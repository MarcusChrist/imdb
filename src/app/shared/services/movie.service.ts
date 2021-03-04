import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IMovie, SearchResults } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class MovieService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  //Save last message for loading indications. Could be swapped to popups and use reducer for loading ind.
  private log(message: string) {
    this.messageService.add(`${message}`);
  }

  private omdbUrl = 'http://www.omdbapi.com/?apikey=f79aeba3';  // URL to web api + apikey
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* GET moviees whose name contains search term */
  searchMovies(term: string): Observable<IMovie[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of();
    }
    this.log('Loading...');
    const url = `${this.omdbUrl}&s=${term}`;
    return this.http.get<SearchResults>(url).pipe(
      map(res => {
        return res.Search;
      }),
      tap(x => x !== undefined ?
        this.log('') :
        this.log('No results found.')),
      catchError(this.handleError<IMovie[]>('searchMoviees'))
    );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(imdbID: number): Observable<IMovie> {
    const url = `${this.omdbUrl}&i=${imdbID}`;
    return this.http.get<IMovie>(url).pipe(
      map(res => {
        return res;
      }),
      // tap(_ => this.log(`fetched movie imdbID=${imdbID}`)),
      catchError(this.handleError<IMovie>(`getMovie imdbID=${imdbID}`))
    );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      console.log(operation, error.statusText);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}