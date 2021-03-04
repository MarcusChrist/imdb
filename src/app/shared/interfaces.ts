
export interface IMovieSearch {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}
export interface IMovie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string, Value: string },
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
// export interface IMovie {
//     id: number;
//     title: string;
//     year: string;
//     type: string;
//     poster: string;
//     plot: string;
//     imdbRating: string;
//     runtime: string;
//     genre: string;
// }
export interface SearchResults {
    Total: number;
    Search: Array<IMovie>;
}