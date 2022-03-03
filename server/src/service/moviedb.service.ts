import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";
import { connect, Schema } from "mongoose";

connect ("mongodb+srv://gmiak:suede2011@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const movieSchema : Schema = new Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    titel : {
        type : String,
        required : true,
    },
    year : {
        type : String,
    },
    description : {
        type : String,
    },
    picture : {
        type : String,
    },
    genre : {
        type : String,
    },
    favorite : {
        type : Boolean,
    },

})
class MovieDBService implements IMovieService {
    getMovies(): Promise<Movie[]> {
        throw new Error("Method not implemented.");
    }
    getFavoriteMovies(): Promise<Movie[]> {
        throw new Error("Method not implemented.");
    }
    createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie> {
        throw new Error("Method not implemented.");
    }
    isFavorite(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    notFavorite(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delMovie(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}