import { Movie } from "../../src/model/movie.interface";
import { makeMovieRouter } from "../../src/router/movie.router"
import { MovieService } from "../../src/service/movie.service"
import supertest, { Test, SuperTest} from "supertest"
import {Express } from "express"

test("A GET request to / should send a response with the list of movies", () => {
    const listOfMovies : Movie[] = [
        {id : 1, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : false},
        {id : 2, titel : "Batman", year : "1999", description : "Super film bre", picture : "https://batman.com", genre : "Action", favorite : false}
    ];
    class MockMovieService extends MovieService {
        constructor() {
            super({}, {});
        }
        
        getMovie : () => Promise<Movie[]> = async () => {
            return listOfMovies;
        }
    }
    const ms : MockMovieService = new MockMovieService();
    const router : Express = makeMovieRouter(ms);
    const request : SuperTest<Test> = supertest(router);
    request.get("/").then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(listOfMovies);
    })
})