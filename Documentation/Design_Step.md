Design Step
============

* Use cases:
1. The user should be able to see their favorit movies
2. They should be able to add a movie to the favorit movie-list
3. They should be able to delete a movie from favorit movie-list

* API design:
- A GET request to /movie should return the list of favorite movies
- A POST request to /movie should add a new movie to favorite and return it. Body of request should be titel, year, picture and description of movie. {}
- A DELETE request to /movie/id should delete the movie from favorite as done Body of request should be {"done": true}