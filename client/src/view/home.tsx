import React from 'react';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import Navbar from '../component/navbar'


export class Home extends React.Component<{}> {
    constructor(props : {}) {
        super(props);
        this.state = {movies : [
            {id : 1, description : "Malala", titel: "hahah", year: "djd", genre: "jjdj", picture: "jjj", favorite: false}
        ]};
    }
    render(): React.ReactNode {
        return (
        <Navbar />
        );
    }
}