import React, { Component } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import "../style/home.css"
import { Movie } from "../../../server/src/model/movie.interface"
import axios, { AxiosResponse } from "axios";





export class Home extends Component<{}, { movies: Movie[] }> {


    constructor(props: {}) {
        super(props);
        this.state = { movies: [] };
       
        this.itemTemplate = this.itemTemplate.bind(this);
       
    }

    override async componentDidMount() {
        // TODO: Extract hostname
        // TODO: Handle timeout? (primereact does this one)
        this.refreshMovieList();

    }

    // Adds movie to favorite list
    private async addMovieToFavorite(id : number) {
        await axios.put<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
    }
    // Deletes movie from favorite-list
    private async deleteMovieFromFavorite(id : number) {
        await axios.delete<never>("http://localhost:8080/movie/favorite/" + id);
        this.refreshMovieList();
    }
    // Deletes movie from movie-list
    private async deleteMovie(id : number) {
        await axios.delete<never>("http://localhost:8080/movie/" + id);
        this.refreshMovieList();
    }
    // Fetchs data from backend
    private async refreshMovieList() {
        const res: AxiosResponse<Movie[]> = await axios.get("http://localhost:8080/movie"); // TODO: Extract the hostname & Handle timeout
        this.setState({ movies: res.data });
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
                        <><p><Button label="" icon="pi pi-trash" onClick={ (event) => {this.deleteMovie(data.id)} }/></p><Button icon="pi pi-thumbs-down" label="Unlike" onClick={ (event) => {this.deleteMovieFromFavorite(data.id)} }></Button></>
                        :
                        <><p><Button label="" icon="pi pi-trash" onClick={ (event) => {this.deleteMovie(data.id)} }/></p><Button icon="pi pi-thumbs-up" label="Like" onClick={ (event) => {this.addMovieToFavorite(data.id)} }></Button></>
                    }

                </div>

            </div>
        );
    }

    override render() {
        return (
            <div>
                <div className="card">
                    <h5>Home</h5>
                    <Splitter style={{ height: '400px' }} className="mb-5">
                        <SplitterPanel className="flex align-items-center justify-content-center panelOne">
                            <h6>Add movie</h6>
                            <form>
                                <label htmlFor="titel">Titel </label>
                                <input type="text" id="titel" name="titel" />
                                <label htmlFor="description"> Description </label>
                                <input type="text" id="description" name="titel" />
                            </form>
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-center justify-content-center panelTwo">
                            <h6>My movies</h6>
                            <div className="datascroller-demo">
                                <div className="card">
                                    <DataScroller value={this.state.movies} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight="295px" header="Scroll Down to Load More" />
                                </div>
                            </div>
                        </SplitterPanel>
                    </Splitter>
                </div>
            </div>
        )
    }
}