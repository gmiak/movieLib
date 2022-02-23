import axios, { AxiosResponse } from 'axios';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import React, { Component, useState } from 'react';
import { Movie } from '../../../server/src/model/movie.interface';
import "../style/movies.css"



export class MyMovies extends Component<{}, { movies: Movie[], favorite : Movie[] }> {

    constructor(props: {}) {
        super(props);
        this.state = { movies: [], favorite: [] };

        this.itemTemplate = this.itemTemplate.bind(this);
        this.itemTemplateTwo = this.itemTemplateTwo.bind(this);
    }

    // Similar to useEffect --TODO: Avoid repetition with home.tsx
    override async componentDidMount() {
        // TODO: Extract hostname
        // TODO: Handle timeout? (primereact does this one)
        this.refreshMovieList();
        this.refreshFavoriteList();

    }
    // Adds movie to favorite list
    private async addMovieToFavorite(id: number) {
        await axios.put<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
        this.refreshFavoriteList();
    }
    // Deletes movie from favorite-list
    private async deleteMovieFromFavorite(id: number) {
        await axios.delete<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
        this.refreshFavoriteList();
    }
    // Deletes movie from movie-list
    private async deleteMovie(id: number) {
        await axios.delete<never>("http://localhost:8080/movie/" + id);
        this.refreshMovieList();
        this.refreshFavoriteList();
    }
    // Fetchs data from backend
    private async refreshMovieList() {
        const res: AxiosResponse<Movie[]> = await axios.get("http://localhost:8080/movie"); // TODO: Extract the hostname & Handle timeout
        this.setState({ movies: res.data });
    }
    private async refreshFavoriteList() {
        const res: AxiosResponse<Movie[]> = await axios.get("http://localhost:8080/movie/favorite"); // TODO: Extract the hostname & Handle timeout
        this.setState({ favorite: res.data });
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
    private itemTemplateTwo(data: any) {
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
                    <p><Button label="" icon="pi pi-trash" onClick={(event) => { this.deleteMovieFromFavorite(data.id) }} /></p>   
                </div>

            </div>
        );
    }

    override render() {
        return (
            <div>
                <div className="card">
                    <div className="body-home">
                        <h5>Movies</h5>
                        <div className='panelOne panelOneMovies'>
                            <h6>My movies</h6>
                            <div className="datascroller-demo">
                                <div className="card">
                                    <DataScroller value={this.state.movies} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight="335px" header="Scroll Down to Load More" />
                                </div>
                            </div>
                        </div>

                        <div className='panelTwo panelTwoMovies'>
                            <h6>My Watchlist</h6>
                            <div className="datascroller-demo">
                                <div className="card">
                                    <DataScroller value={this.state.favorite} itemTemplate={this.itemTemplateTwo} rows={5} inline scrollHeight="335px" header="Scroll Down to Load More" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}