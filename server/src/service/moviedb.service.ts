import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";
import { connect, Schema, model, Model } from "mongoose";
import { connectToDatabase } from "../db/movie.db";


class MovieDBService implements IMovieService {

    private movieModel : Model<Movie>;
    private favoriteMovieModel : Model<Movie>;

    constructor(movieModel : Model<Movie>) {
        this.movieModel = movieModel;
        this.favoriteMovieModel = movieModel;
    }

    async getMovies(): Promise<Movie[]> {
        return await this.movieModel.find();
    }
    async getFavoriteMovies(): Promise<Movie[]> {
        return await this.favoriteMovieModel.find();
    }
    async createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie> {
        return await this.movieModel.create({
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

export async function movieDBService() : Promise<IMovieService> {
    return new MovieDBService(await connectToDatabase());
}