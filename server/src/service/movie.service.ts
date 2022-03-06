import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";

export class MovieService implements IMovieService {

    private movies: { [key: number]: Movie };
    private favoriteMovies: { [key: number]: Movie };

    constructor(movies: { [key: number]: Movie }, favoriteMovies: { [key: number]: Movie }) {
        this.movies = movies;
        this.favoriteMovies = favoriteMovies;
    }
    // GET Movies
    getMovies: () => Promise<Array<Movie>> = async () => {
        return Object.values(this.movies);
    }

    // GET Favorite Movies
    getFavoriteMovies: () => Promise<Array<Movie>> = async () => {
        return Object.values(this.favoriteMovies);
    }

    // TODO: Create a list for favorite movies

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
            this.favoriteMovies[movie.id] = movie;
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
            delete this.favoriteMovies[movie.id];
            return true;
        }

    // DELETE
    delMovie: (id: number) => Promise<boolean> =
        async (id: number) => {
            const movie: Movie = this.movies[id];
            if (!movie) {
                return false;
            }
            const isFavorit: Movie = this.favoriteMovies[movie.id];
            if (isFavorit) {
                delete this.favoriteMovies[movie.id];
            }
            movie.favorite = false;
            delete this.movies[movie.id];
            return true;
        }
}

// Factoring methode which create a MovieService with empty list of movies
export function makeMovieService(): MovieService {
    return MovieService.getInstance();
}


/**
 * Exmpel for movies
 * 1: { id: 1, titel: "Spiderman", year: "2005", description: "Great shit", picture: "https://i.pinimg.com/originals/25/5f/03/255f03c13b95d9b60130c3e0139e21c5.png", genre: "Action", favorite: false },
        2: { id: 1, titel: "Superman", year: "1990", description: "Shit shit", picture: "https://pngimg.com/uploads/superman/superman_PNG15.png", genre: "Action", favorite: true }

        "id": 1, "titel": "Spiderman", "year": "2005", "description": "Great shit", "picture": "https://i.pinimg.com/originals/25/5f/03/255f03c13b95d9b60130c3e0139e21c5.png", "genre": "Action", "favorite": false 
        "id": 2, "titel": "Superman", "year": "1990", "description": "Shit shit", "picture": "https://pngimg.com/uploads/superman/superman_PNG15.png", "genre": "Action", "favorite": true 
 */

/**
 *  Movie picture link
 *  https://pngimg.com/uploads/superman/superman_PNG15.png
 *  https://i.pinimg.com/originals/25/5f/03/255f03c13b95d9b60130c3e0139e21c5.png
 *  https://static.posters.cz/image/1300/art-photo/the-batman-2022-i120285.jpg
 */
