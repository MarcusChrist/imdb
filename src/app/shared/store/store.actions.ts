
import { Action } from '@ngrx/store'

export enum MoviesActionTypes {
    ADD_MOVIES = 'ADD_MOVIES',
    REMOVE_MOVIES  = 'REMOVE_MOVIES'
}

export class AddMovies implements Action {
    readonly type = MoviesActionTypes.ADD_MOVIES
    constructor(public payload: any){}
}

export class RemoveMovies implements Action {
    readonly type = MoviesActionTypes.REMOVE_MOVIES
    constructor(public payload: any){}
}

export type MoviesTypes = AddMovies | RemoveMovies;