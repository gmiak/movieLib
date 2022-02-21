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

    // Fetch data from backend
    override async componentDidMount() {
        const res: AxiosResponse<Movie[]> = await axios.get("http://localhost:8080/movie"); // TODO: Extract the hostname & Handle timeout
        setTimeout(() => {
            this.setState({ movies: res.data });
        }, 100);
    }
   

    itemTemplate(data: any) {
        return (
            <div className="product-item">
                <img src={data.picture} alt={data.picture} />
                <div className="product-detail">
                    <div className="product-name">
                        {data.titel + " "}
                        {data.favorite ?
                        <><i className="pi pi-heart product-category-icon"></i></>
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
                        <><Button icon="pi pi-thumbs-down" label="Unlike" onClick={() => {const tmp = this.state.movies; data.favorite = false; tmp[data.id] = data; this.setState({ movies: tmp });} }></Button></>
                        :
                        <><Button icon="pi pi-thumbs-up" label="Like" onClick={() => {const tmp = this.state.movies; data.favorite = true; tmp[data.id] = data; this.setState({ movies: tmp });} }></Button></>
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