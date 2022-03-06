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
