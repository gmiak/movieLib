import { Schema } from "mongoose";
import { Movie } from "../model/movie.interface";
import { conn } from "./conn";

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

async function makeMovieModel() {
    return (await conn).model<Movie>("movielist", movieSchema);
}
export const movieModel = makeMovieModel();



/*export async function connectToDatabaseFavorite(): Promise<Model<Movie>> {
    const db = await connect("mongodb+srv://gmiak:suede2011@movielib.eexy9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

    const favoriteSchema: Schema = new Schema({
        id: {
            type: Number,
            required: true,
            unique: trueS
        },
        movie: {
            type: ObjectId,
            ref: 'Movie'
        }

    });
    //const movieFavoriteModel = model<Movie>("MovieLibFavorite", movieSchema);

    return db.model<Movie>("favorite", favoriteSchema);
    
}*/