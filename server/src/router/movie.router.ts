import Express from "express";
import { Movie } from "../model/movie.interface";
import { IMovieService, makeMovieService, MovieService } from "../service/movie.service";

/** Router is an express server */
/** For Movie in general */

// Using Dependency Injection
export function makeMovieRouter(movieService : IMovieService) : Express.Express {
    const movieRouter : Express.Express = Express();

    // Get /movie router
    movieRouter.get("/", async (req: Express.Request, res: Express.Response) => {
        try {
            const movies : Array<Movie> = await movieService.getMovies();
            //res.status(200).send(JSON.stringify(movies)) // if i didn't specify in index.ts to get all in json
            res.status(200).send(movies); 
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // POST or PUT /movie router
    movieRouter.put("/", async (req: Express.Request, res: Express.Response) => {
        try {
            const titel: string = req.body.titel;
            const year: string = req.body.year;
            const description: string = req.body.description;
            const picture: string = req.body.picture;
            const genre: string = req.body.genre;
            
            if (! titel) {
                res.status(400).send("Missing titel");
                return;
            }
            const movie : Movie = await movieService.createMovie(titel, year, description, picture, genre);
            res.status(201).send(movie);
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // DELETE /movie/id router

    movieRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await movieService.delMovie(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is deleted\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    return movieRouter;
}

export function makeDefaultMovieRouter() : Express.Express {
    return makeMovieRouter(makeMovieService());
}
