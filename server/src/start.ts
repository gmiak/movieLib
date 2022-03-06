import Express from "express";
import { makeDefaultMovieRouter } from "./router/movie.router";
import * as path from "path";
import * as cors from "cors";

export const app : Express.Express = Express();

// Adding the connection between the backend and the frontend
app.use(Express.static(path.join(__dirname, '../../client/build')));
app.use(cors.default()); // To secure the backend against malicious request
app.get('/', (req : Express.Request, res : Express.Response) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// End adding ---

app.use(Express.json())  // Returns all i ask in json
app.use("/movie", makeDefaultMovieRouter());
