import React from 'react';
import logo from './logo.svg';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Movie } from "../../server/src/model/movie.interface"
export class MovieList extends React.Component<{}, {movies : Movie[]}> {
    constructor(props : {}) {
        super(props);
        this.state = {movies : [
            {id : 1, description : "Malala", titel: "hahah", year: "djd", genre: "jjdj", picture: "jjj", favorite: false}
        ]};
    }
    render(): React.ReactNode {
        return <ul>
            {this.state.movies.map((movie : Movie) => <li>{movie.description}</li>)}
        </ul>
    }
}
