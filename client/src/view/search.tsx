import React from 'react';



export class Search extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            movies: [
                { id: 1, description: "Malala", titel: "hahah", year: "djd", genre: "jjdj", picture: "jjj", favorite: false }
            ]
        };
    }
    render(): React.ReactNode {
        return (
            <div>
                <div className="card">
                    <h5>Search</h5>
                    
                </div>
            </div>
        );
    }
}