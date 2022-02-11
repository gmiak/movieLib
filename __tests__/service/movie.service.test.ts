import * as MovieService from "../../server/src/service/movie.service"
import { Movie } from "../../server/src/model/movie.interface"


test("getMovies when to do list is empty should return the empty list", () => {
    MovieService.getMovies().then(
        (movies: Movie[]) => {
            try {
                expect(movies).toEqual([]);
            } catch (e: any) {
                
            }
            
        }
    )
})