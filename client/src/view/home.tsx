import React, { Component, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import "../style/home.css"
import { Movie } from "../../../server/src/model/movie.interface"
import axios, { AxiosResponse } from "axios";




// Template for add movie -- TODO: Create a class
function ItemField(props: { addNewMovie: (titel: string, year: string, description: string, picture: string, genre: string) => void }) {
    const [titel, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("assets/missing.png");
    const [genre, setGenre] = useState("");
    return (
        <div>
            <form onSubmit={async (event) => {
                event.preventDefault();
                props.addNewMovie(titel, year, description, picture, genre);
            }}>
                <p>
                    <label htmlFor="titel">Titel </label><br />
                    <input type="text" className='itemField' id="titel" placeholder="Enter titel" value={titel} onChange={(event) => { setTitle(event.target.value) }} /><br />
                    <small id="titelRequired"> (This is required!)</small>
                </p>

                <p>
                    <label htmlFor="titel">Year </label><br />
                    <input type="text" className='itemField' id="year" placeholder="Enter year" value={year} onChange={(event) => { setYear(event.target.value) }} />
                </p>

                <p>
                    <label htmlFor="titel">Description </label><br />
                    <textarea id="description" className='itemField' placeholder="Enter description" value={description} onChange={(event) => { setDescription(event.target.value) }} />
                </p>

                <p>
                    <label htmlFor="picture">Picture link </label><br />
                    <input type="text" className='itemField' id="picture" placeholder="Enter the picture's link" value={picture} onChange={(event) => { setPicture(event.target.value) }} />
                </p>

                <p>
                    <label htmlFor="genre">Genre </label><br />
                    <input type="text" className='itemField' id="genre" placeholder="Enter genre" value={genre} onChange={(event) => { setGenre(event.target.value) }} />
                </p>
                <p><input type="submit" value="Add" /></p>
            </form>

        </div>
    );
}

export class Home extends Component<{}, { movies: Movie[] }> {

    constructor(props: {}) {
        super(props);
        this.state = { movies: [] };

        this.itemTemplate = this.itemTemplate.bind(this);
        this.addNewMovie = this.addNewMovie.bind(this);

    }

    // Similar to useEffect
    override async componentDidMount() {
        // TODO: Extract hostname
        // TODO: Handle timeout? (primereact does this one)
        this.refreshMovieList();

    }

    // Adds movie to favorite list
    private async addMovieToFavorite(id: number) {
        await axios.put<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
    }
    // Deletes movie from favorite-list
    private async deleteMovieFromFavorite(id: number) {
        await axios.delete<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
    }
    // Deletes movie from movie-list
    private async deleteMovie(id: number) {
        await axios.delete<never>("http://localhost:8080/movie/" + id);
        this.refreshMovieList();
    }
    // Fetchs data from backend
    private async refreshMovieList() {
        const res: AxiosResponse<Movie[]> = await axios.get("http://localhost:8080/movie"); // TODO: Extract the hostname & Handle timeout
        this.setState({ movies: res.data });
    }
    // Adding new movie
    private async addNewMovie(titel: string, year: string, description: string, picture: string, genre: string) {
        await axios.put("http://localhost:8080/movie", { titel: titel, year: year, description: description, picture: picture, genre: genre });
        this.refreshMovieList();
    }

    // Template for movie-items -- TODO: Create a class of this and n other class for components in render-function below
    private itemTemplate(data: any) {
        return (
            <div className="product-item">
                <img src={data.picture} alt={data.picture} />
                <div className="product-detail">
                    <div className="product-name">
                        {data.titel + " "}
                        {data.favorite ?
                            <><i className="pi pi-heart product-category-icon" ></i></>
                            :
                            <><i></i></>
                        }
                    </div>
                    <br />
                    <div className="product-description">{data.description}</div>
                    <i className="pi pi-calendar product-category-icon"></i><span className="product-category">{data.year}</span>
                    <br />
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.genre}</span>
                </div>

                <div className="product-action">
                    {data.favorite ?
                        <><p><Button label="" icon="pi pi-trash" onClick={(event) => { this.deleteMovie(data.id) }} /></p><Button icon="pi pi-thumbs-down" label="Unlike" onClick={(event) => { this.deleteMovieFromFavorite(data.id) }}></Button></>
                        :
                        <><p><Button label="" icon="pi pi-trash" onClick={(event) => { this.deleteMovie(data.id) }} /></p><Button icon="pi pi-thumbs-up" label="Like" onClick={(event) => { this.addMovieToFavorite(data.id) }}></Button></>
                    }

                </div>

            </div>
        );
    }

    override render() {
        return (
            <div>
                <div className="card body-home">

                    <h5>Home</h5>
                    <div className="body-home">
                        <div className='panelOne'>
                            <h6>Add movie</h6>
                            <ItemField addNewMovie={this.addNewMovie} />
                        </div>

                        <div className='panelTwo'>
                            <h6>My movies</h6>
                            <div className="datascroller-demo">
                                <div className="card">
                                    <DataScroller value={this.state.movies} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight="335px" header="Scroll Down to Load More" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}