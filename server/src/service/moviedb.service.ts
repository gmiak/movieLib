import { Movie } from "../model/movie.interface";
import { IMovieService } from "./imovie.service";
import { movieModel } from "../db/movie.db";


class MovieDBService implements IMovieService {
    
    async getMovies(): Promise<Movie[]> {
        const mm = await movieModel;
        return await mm.find();
    }

    async getFavoriteMovies(): Promise<Movie[]> {
        const mm = await movieModel;
        return await mm.find(
            {
                favorite : true
            }
        );
    }

    async createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie> {
        const mm = await movieModel;
        return await mm.create({
            id: new Date().valueOf(),
            titel: titel,
            year: year,
            description: description,
            picture: picture,
            genre: genre,
            favorite: false
        });
    }
    async isFavorite(id: number): Promise<boolean> {
        const mm = await movieModel;
        const result = await mm.updateOne(
            {id : id},
            {favorite : true}
        );
        return (result.matchedCount === 1);
    }
    async notFavorite(id: number): Promise<boolean> {
        const mm = await movieModel;
        const result = await mm.updateOne(
            {id : id},
            {favorite : false}
        );
        return (result.matchedCount === 1);
    }
    async delMovie(id: number): Promise<boolean> {
        const mm = await movieModel;
        const result = await mm.deleteOne(
            {id : id},
            {favorite : false}
        );
        return (result.deletedCount === 1);
    }

}

export const movieDBService = new MovieDBService();