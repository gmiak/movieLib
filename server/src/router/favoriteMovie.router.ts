import Express from "express";
import { Movie } from "../model/movie.interface";
import { IMovieService } from "../service/imovie.service";
import { movieDBService } from "../service/moviedb.service";

/** Router is an express server */
/** For Movie in general */
export function makeFavoriteMovieRouter (movieService: Promise<IMovieService> ) {
    const favoriteMovieRouter : Express.Express = Express();

    // Get /movie/favorite router
    favoriteMovieRouter.get("/", async (req: Express.Request, res: Express.Response) => {
        try {
            const ms = await movieService;
            const movies : Array<Movie> = await ms.getFavoriteMovies(); // TODO: Should get movies from favorit list
            //res.status(200).send(JSON.stringify(movies)) // if i didn't specify in index.ts to get all in json
            res.status(200).send(movies); 
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // POST or PUT /movie/favorite/id router
    favoriteMovieRouter.put("/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const ms = await movieService;
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await ms.isFavorite(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is added as favorite\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    // DELETE /movie/id router

    favoriteMovieRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
        try {
            const ms = await movieService;
            const id : number = parseInt(req.params.id, 10);
            const completed : boolean = await ms.notFavorite(id);
            if (! completed) {
                res.status(400).send(`No movie with id ${id}\n`);
                return;
            }
            res.status(201).send("Movie is removed from favorite\n");
        } catch (e : any) {
            res.status(500).send(e.message);
        }
    });

    return favoriteMovieRouter;
}

export function makeDefaultFavoriteMovieRouter() : Express.Express {
    //return makeFavoriteMovieRouter(movieDBService());
    return makeDefaultFavoriteMovieRouter();
}

