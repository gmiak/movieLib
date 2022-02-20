import React, { Component }  from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import "../style/home.css"



export class Home extends Component {

    render() {
        return (
            <div>
                <div className="card">
                    <h5>Home</h5>
                    <Splitter style={{height: '400px'}} className="mb-5">
                        <SplitterPanel className="flex align-items-center justify-content-center panelOne">
                            <h6>Add movie</h6>
                        </SplitterPanel>
                        <SplitterPanel className="flex align-items-center justify-content-center panelTwo">
                        <h6>My movies</h6>
                        </SplitterPanel>
                    </Splitter>
                </div>     
            </div>
        )
    }
}