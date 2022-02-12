import * as MS from "../../src/service/movie.service"
import { Movie } from "../../src/model/movie.interface"


test("getMovies when to do list is empty should return the empty list", () => {
    const movieService = new MS.MovieService({}, {});
    return movieService.getMovies().then(
        (movies: Movie[]) => {
            expect(movies).toEqual([]); 
        }
    )
});


test("Creating a movie the calling getMovies should return a movie with the given titel and year and favorite status", () => {
    const movieService = new MS.MovieService({}, {});
    return movieService.createMovie("Spiderman", "2005", "Super film", "https://spiderman.com", "Action").then((movie : Movie) => {
        expect(movie.year).toEqual("2005");
        expect(movie.titel).toEqual("Spiderman");
        expect(movie.favorite).toBe(false);
    })
});

test("Creating a movie should make the movie list have length 1", () => {
    const movieService = new MS.MovieService({}, {});
    return movieService.createMovie("Superman", "1990", "Super film", "https://superman.com", "Action").then((_ : Movie) => {
        return movieService.getMovies().then((movies : Movie[]) => {
            expect(movies.length).toBe(1);
            expect(movies[0].description).toEqual("Super film");
            expect(movies[0].favorite).toBe(false);
        })
    })
});

test("isFavorite should make the movie as favorite", () => {
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : false}
    }, {});
    return movieService.isFavorite(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies[0].id).toEqual(25);
        expect(movies[0].favorite).toBe(true);
    })
});

test("notFavorite should delete the movie as favorite", () => {
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : true}
    }, {});
    return movieService.notFavorite(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies[0].id).toEqual(25);
        expect(movies[0].favorite).toBe(false);
    });
    
});

test("delMovie should delete the movie list", () => {
    const movieService = new MS.MovieService({
        25 : {id : 25, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : true}
    }, {});
    return movieService.delMovie(25).then(async ( returnValue: boolean) => {
        const movies : Movie[] = await movieService.getMovies();
        expect(returnValue).toBe(true);
        expect(movies).toEqual([]);
    });
    
});