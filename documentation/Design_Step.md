Design Step
============

* Use cases:

1. The user should be able to see their  movies
2. They should be able to add a new movie
3. They should be able to delete a movie 

4. The user should be able to see their favorit movies
5. They should be able to add a movie to the favorit movie-list
6. They should be able to delete a movie from favorit movie-list

* API design:

+ A GET request to /movie should return the list of movies

+ A POST OR PUT request to /movie should add a new movie. Body of request should be 
{"titel": string, "year": string, "picture": string, "description": string, "genre": string}

+ A DELETE request to /movie/id should delete a movie.

+ A GET request to /movie/favorite should return the list of favorite movies

+ A PUT request to /movie/favorite/id should add a movie into and update the movie favorite status as true. The Body of request should be {"favorite": true}

+ A DELETE request to /movie/favorite/id should delete a movie as favorite.