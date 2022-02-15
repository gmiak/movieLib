import { Movie } from "../../src/model/movie.interface";
import { makeMovieRouter } from "../../src/router/movie.router";
import { MovieService, makeMovieService, IMovieService } from "../../src/service/movie.service";
import SuperTest from "supertest";
import {Express } from "express";
import { error } from "console";

test("A GET request to / should send a response with the list of movies", () => {
    const listOfMovies : Movie[] = [
        {id : 1, titel : "Superman", year : "1990", description : "Super film", picture : "https://superman.com", genre : "Action", favorite : false},
        {id : 2, titel : "Batman", year : "1999", description : "Super film bre", picture : "https://batman.com", genre : "Action", favorite : false}
    ];
    class MockMovieService implements IMovieService  {
        getMovies(): Promise<Movie[]> {
            throw new Error("Method not implemented.");
        }
        getFavoriteMovies(): Promise<Movie[]> {
            throw new Error("Method not implemented.");
        }
        createMovie(titel: string, year: string, description: string, picture: string, genre: string): Promise<Movie> {
            throw new Error("Method not implemented.");
        }
        isFavorite(id: number): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        notFavorite(id: number): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        delMovie(id: number): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        
        getMovie : () => Promise<Movie[]> = async () => {
            return listOfMovies;
        }
    }
    const ms : MockMovieService = new MockMovieService();
    const router : Express = makeMovieRouter(ms);
    const request : SuperTest.SuperTest<SuperTest.Test> = 
        SuperTest(router);

    request.get("/").then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(listOfMovies);
    });
})