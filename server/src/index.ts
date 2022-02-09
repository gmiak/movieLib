import Express from "express";
import { favoriteMovieRouter } from "./router/favoriteMovie.router";
import {movieRouter} from "./router/movie.router";

const app : Express.Express = Express();

/*app.get("/", (req: Express.Request, res : Express.Response) => {
    res.send("Hello World");
});*/
app.use(Express.json())  // Returns all i ask in json
app.use("/movie", movieRouter);
app.use("/movie/favorite", favoriteMovieRouter);
app.listen(8080);