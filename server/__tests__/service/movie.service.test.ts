import * as MS from "../../src/service/movie.service";
import { Movie } from "../../src/model/movie.interface";
import { makeMovieService, MovieService } from "../../src/service/movie.service";
import { IMovieService } from "../../src/service/imovie.service";

/*test("getMovies when movie list is empty should return the empty list", () => {
    const movieService = new MS.MovieService({}, {});
    return movieService.getMovies().then(
        (movies: Movie[]) => {
            expect(movies).toEqual([]); 
        }
    )
});*/

test("getMovies when movie list is empty should return the empty list", () => {
    const movieService = makeMovieService();
    return movieService.getMovies().then(
        (movies: Movie[]) => {
            expect(movies).toEqual([]); 
        }
    )
});


/*test("Creating a movie then calling getMovies should return a movie with the given titel and year and favorite status", () => {
    const movieService = new MS.MovieService({}, {});
    return movieService.createMovie("Spiderman", "2005", "Super film", "https://spiderman.com", "Action").then((movie : Movie) => {
        expect(movie.year).toEqual("2005");
        expect(movie.titel).toEqual("Spiderman");
        expect(movie.favorite).toBe(false);
    })
});*/

test("Creating a movie then calling getMovies should return a movie with the given titel and year and favorite status", () => {
    const movieService = makeMovieService();
    return movieService.createMovie("Spiderman", "2005", "Super film", "https://spiderman.com", "Action").then((movie : Movie) => {
        expect(movie.year).toEqual("2005");
        expect(movie.titel).toEqual("Spiderman");
        expect(movie.favorite).toBe(false);
    })
});

test("Creating a movie should make the movie list have length 2", () => {
    const movieService = makeMovieService();
    return movieService.createMovie("Superman", "1990", "Super film", "https://superman.com", "Action").then((_ : Movie) => {
        return movieService.getMovies().then((movies : Movie[]) => {
            expect(movies.length).toBe(2);
            expect(movies[1].description).toEqual("Super film");
            expect(movies[1].favorite).toBe(false);
        })
    })
});

/*test("isFavorite should make the movie as favorite", () => {
    
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : false}
    }, {});
    return movieService.isFavorite(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies[0].id).toEqual(25);
        expect(movies[0].favorite).toBe(true);
    })
});*/

test("isFavorite should make the movie as favorite", () => {
    const movieService = makeMovieService();
    return movieService.createMovie("Superman", "1990", "Super film", "https://superman.com", "Action").then((movie : Movie) => {
        return movieService.isFavorite(movie.id).then(async ( returnValue: boolean) => {
            const movies : Movie[] = await movieService.getMovies();
            expect(returnValue).toBe(true);
            expect(movies[2].id).toEqual(movie.id);
            expect(movies[2].favorite).toBe(true);
        })
    });
});

/*test("notFavorite should delete the movie as favorite", () => {
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : true}
    }, {});
    return movieService.notFavorite(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies[0].id).toEqual(25);
        expect(movies[0].favorite).toBe(false);
    });
    
});*/

test("notFavorite should delete the movie as favorite", () => {
    const movieService = makeMovieService();
    return movieService.createMovie("Superman", "1990", "Super film", "https://superman.com", "Action").then((movie : Movie) => {
        return movieService.notFavorite(movie.id).then(async ( returnValue: boolean) => {
            const movies : Movie[] = await movieService.getMovies();
            expect(returnValue).toBe(true);
            expect(movies[3].id).toEqual(movie.id);
            expect(movies[3].favorite).toBe(false);
        })
    });
});

/*test("delMovie should delete the movie list", () => {
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : true}
    }, {});
    return movieService.delMovie(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies).toEqual([]);
    });
    
});*/

test("delMovie should delete the movie list", () => {
    const movieService = makeMovieService();
    return movieService.createMovie("Superman", "1990", "Super film", "https://superman.com", "Action").then((movie : Movie) => {
        return movieService.delMovie(movie.id).then(async ( returnValue: boolean) => {
            const movies : Movie[] = await movieService.getMovies();
            expect(returnValue).toBe(true);
            expect(movies).toHaveLength(4);
        })
    });
});
