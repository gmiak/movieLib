import { connect, Schema, model, Model } from "mongoose";
import { Movie } from "../model/movie.interface";

export async function connectToDatabase(): Promise<Model<Movie>> {
    const db = await connect("mongodb+srv://gmiak:suede2011@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

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
    //const movieFavoriteModel = model<Movie>("MovieLibFavorite", movieSchema);

    return db.model<Movie>("movies", movieSchema);
    
}
