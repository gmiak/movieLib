import Express from "express";
import { makeDefaultFavoriteMovieRouter } from "./router/favoriteMovie.router";
import {makeDefaultMovieRouter} from "./router/movie.router";

const app : Express.Express = Express();


app.use(Express.json())  // Returns all i ask in json
app.use("/movie", makeDefaultMovieRouter);
app.use("/movie/favorite", makeDefaultFavoriteMovieRouter);
app.listen(8080);