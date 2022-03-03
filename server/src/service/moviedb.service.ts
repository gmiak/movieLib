import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";
import { connect, Schema, model } from "mongoose";

connect("mongodb+srv://gmiak:suede2011@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const movieSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    titel: {
        type: String,
        required: true,
    },
    year: {
        type: String,
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
    },
    genre: {
        type: String,
    },
    favorite: {
        type: Boolean,
    },

});

const movieModel = model<Movie>("MovieLib", movieSchema);
const movieFavoriteModel = model<Movie>("MovieLibFavorite", movieSchema);

export class MovieDBService implements IMovieService {
    async getMovies(): Promise<Movie[]> {
        return await movieModel.find();
    }
    async getFavoriteMovies(): Promise<Movie[]> {
        return await movieFavoriteModel.find();
    }
    async createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie> {
        return await movieModel.create({
            id: new Date().valueOf(),
            titel: titel,
            year: year,
            description: description,
            picture: picture,
            genre: genre,
            favorite: false
        });
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