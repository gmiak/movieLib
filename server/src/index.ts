import Express from "express";
import { favoriteMovieRouter } from "./router/favoriteMovie.router";
import {makeDefaultMovieRouter} from "./router/movie.router";

const app : Express.Express = Express();


app.use(Express.json())  // Returns all i ask in json
app.use("/movie", makeDefaultMovieRouter);
app.use("/movie/favorite", favoriteMovieRouter);
app.listen(8080);