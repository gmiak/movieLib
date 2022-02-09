import { Movie } from "../model/movie.interface";

// GET
let movies: {[key : number] : Movie} = {
    35 : {
        id: 35,
        titel: "Harry Potter- Viselsten",
        year: "2005",
        description: "Harry som ung",
        picture: "hfhfhf",
        genre: "Adventure",
        favorite: false
    }
};

export const getMovies : () => Promise<Array<Movie>> = async () => {
    return Object.values(movies);
}

// TODO: Create a list for favorite movies

// POST
export const createMovie : (titel : string, year : string, description : string, picture : string, genre: string) => Promise<Movie> = 
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
    movies[newMovie.id] = newMovie;
    return newMovie;
}

// PUT
// Returns true if movie with given id number exists, false if movie could not be found.
export const isFavorite : (id: number) => Promise<boolean> = 
async (id: number) => {
    const movie : Movie = movies[id];
    if(!movie) {
        return false;
    }
    movie.favorite = true;
    return true;
}

// PUT v2
export const notFavorite : (id: number) => Promise<boolean> = 
async (id: number) => {
    const movie : Movie = movies[id];
    if(!movie) {
        return false;
    }
    movie.favorite = false;
    return true;
}

// DELETE
export const delMovie : (id: number) => Promise<boolean> = 
async (id: number) => {
    const movie : Movie = movies[id];
    if(!movie) {
        return false;
    }
    movie.favorite = false;
    delete movies[movie.id];
    return true;
}