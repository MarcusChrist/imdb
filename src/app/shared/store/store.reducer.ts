import { IMovie } from '../interfaces';
import { MoviesActionTypes } from './store.actions';

export const initialState: IMovie[] = [];

export function SearchReducer(state = initialState, action: any) {
    switch (action.type) {
        case MoviesActionTypes.ADD_MOVIES:
            return action.payload
        case MoviesActionTypes.REMOVE_MOVIES:
            return []
        default:
            return state
    }
}