import { Movie } from "../model/movie.interface";

 export interface IMovieService {
    getMovies(): Promise<Array<Movie>>
    getFavoriteMovies(): Promise<Array<Movie>>
    createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie>
    isFavorite(id: number): Promise<boolean>
    notFavorite(id: number): Promise<boolean>
    delMovie(id: number): Promise<boolean>

}