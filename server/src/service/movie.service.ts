import { Movie } from "../model/movie.interface";

/**
 * All things that depend on Class MovieService,
 * should be much better that they depend on IMovieService
 */
export interface IMovieService {
    getMovies() : Promise<Array<Movie>>
    getFavoriteMovies() : Promise<Array<Movie>>
    createMovie(titel : string, year : string, description : string, picture : string, genre: string) : Promise<Movie>
    isFavorite(id : number) : Promise<boolean>
    notFavorite(id : number) : Promise<boolean>
    delMovie(id : number) : Promise<boolean>

}

/**
 *  The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance. 
 */
export class MovieService implements IMovieService {
    private static instance: MovieService;

    private movies : { [key: number] : Movie};

    private favoriteMovies : { [key: number] : Movie};

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor(movies: { [key : number] : Movie}, favoriteMovies: { [key : number] : Movie}) {
        this.movies = movies;
        this.favoriteMovies = favoriteMovies;
    }

    public static getInstance(): MovieService {
        if (!MovieService.instance) {
            MovieService.instance = new MovieService({}, {});
        }

        return MovieService.instance;
    }

    // GET Movies
    getMovies : () => Promise<Array<Movie>> = async () => {
        return Object.values(this.movies);
    }

    // GET Favorite Movies
    getFavoriteMovies : () => Promise<Array<Movie>> = async () => {
        return Object.values(this.favoriteMovies);
    }
    
    // TODO: Create a list for favorite movies
    
    // POST
    createMovie : (titel : string, year : string, description : string, picture : string, genre: string) => Promise<Movie> = 
    async (titel : string, year : string, description : string, picture : string, genre: string) => {
        const newMovie : Movie = {
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
    isFavorite : (id: number) => Promise<boolean> = 
    async (id: number) => {
        const movie : Movie = this.movies[id];
        if(!movie) {
            return false;
        }
        movie.favorite = true;
        this.favoriteMovies[movie.id] = movie;
        return true;
    }
    
    // PUT v2
    notFavorite : (id: number) => Promise<boolean> = 
    async (id: number) => {
        const movie : Movie = this.movies[id];
        if(!movie) {
            return false;
        }
        movie.favorite = false;
        delete this.favoriteMovies[movie.id];
        return true;
    }
    
    // DELETE
    delMovie : (id: number) => Promise<boolean> = 
    async (id: number) => {
        const movie : Movie = this.movies[id];
        if(!movie) {
            return false;
        }
        const isFavorit : Movie = this.favoriteMovies[movie.id];
        if(isFavorit) {
            delete this.favoriteMovies[movie.id];
        }
        movie.favorite = false;
        delete this.movies[movie.id];
        return true;
    }
}

// Factoring methode which create a MovieService with empty list of movies
export function makeMovieService() : MovieService {
    return MovieService.getInstance();
}


