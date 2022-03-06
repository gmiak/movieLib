import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";

export class MovieService implements IMovieService {

    private movies: { [key: number]: Movie };
    
    constructor(movies: { [key: number]: Movie }, favoriteMovies: { [key: number]: Movie }) {
        this.movies = movies;
    }
    getFavoriteMovies(): Promise<Movie[]> {
        throw new Error("Method not implemented.");
    }
    // GET Movies
    getMovies: () => Promise<Array<Movie>> = async () => {
        return Object.values(this.movies);
    }
    // POST
    createMovie: (titel: string, year: string, description: string, picture: string, genre: string) => Promise<Movie> =
        async (titel: string, year: string, description: string, picture: string, genre: string) => {
            const newMovie: Movie = {
                id: new Date().valueOf(), // Generate from current date in ms (Big chance to be unique)
                titel: titel,
                year: year,
                description: description,
                picture: picture,
                genre: genre,
                favorite: false
            }
            this.movies[newMovie.id] = newMovie;
            return newMovie;
        }

    // PUT
    // Returns true if movie with given id number exists, false if movie could not be found.
    isFavorite: (id: number) => Promise<boolean> =
        async (id: number) => {
            const movie: Movie = this.movies[id];
            if (!movie) {
                return false;
            }
            movie.favorite = true;
            return true;
        }

    // PUT v2
    notFavorite: (id: number) => Promise<boolean> =
        async (id: number) => {
            const movie: Movie = this.movies[id];
            if (!movie) {
                return false;
            }
            movie.favorite = false;
            return true;
        }

    // DELETE
    delMovie: (id: number) => Promise<boolean> =
        async (id: number) => {
            const movie: Movie = this.movies[id];
            if (!movie) {
                return false;
            }
            delete this.movies[movie.id];
            return true;
        }
}

// Factoring methode which create a MovieService with empty list of movies
export function makeMovieService(): MovieService {
    return new MovieService({}, {});
}

