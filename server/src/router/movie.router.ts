import Express from "express";
import { Movie } from "../model/movie.interface";
import { IMovieService } from "../service/imovie.service";
import { movieDBService } from "../service/moviedb.service";

/** Router is an express server */
// Using Dependency Injection
export function makeMovieRouter(movieService : IMovieService) : Express.Express {
    const movieRouter : Express.Express = Express();

    // Get /movie 
    movieRouter.get("/", async (req: Express.Request, res: Express.Response) => {
        try {
            const ms = await movieService;
            const movies : Array<Movie> = await ms.getMovies();
            res.status(200).send(movies); 
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // Get /movie/favorite
    movieRouter.get("/favorite", async (req: Express.Request, res: Express.Response) => {
        try {
            const movies : Array<Movie> = await movieService.getFavoriteMovies();   
            res.status(200).send(movies); 
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // POST or PUT /movie 
    movieRouter.put("/", async (req: Express.Request, res: Express.Response) => {
        try {
            const titel: string = req.body.titel;
            const year: string = req.body.year;
            const description: string = req.body.description;
            const picture: string = req.body.picture;
            const genre: string = req.body.genre;
            
            if (!titel) {
                res.status(400).send("Missing titel");
                return;
            }
            const ms = await movieService;
            const movie : Movie = await ms.createMovie(titel, year, description, picture, genre);
            res.status(201).send(movie);
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // POST or PUT /movie/favorite/id 
    movieRouter.put("/favorite/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await movieService.isFavorite(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is added as favorite\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // DELETE /movie/id 
    movieRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const ms = await movieService;
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await ms.delMovie(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is deleted\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // DELETE /movie/favorite/id 
    movieRouter.delete("favorite/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await movieService.notFavorite(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is removed from favorite\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    return movieRouter;
}

export function makeDefaultMovieRouter() : Express.Express {
    return makeMovieRouter(movieDBService);
}
