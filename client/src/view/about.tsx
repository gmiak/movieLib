import React from 'react';
import "../style/about.css"



export class About extends React.Component<{}> {


    override render() {
        return (
            <div>
                <div className="card body-home">
                    <h5>About</h5>
                    <div className="body-home">
                        <div className='about'>
                            <div>
                                <img src='assets/me.jpeg' alt='Me' />
                            </div><br/>
                            <div>
                                <p>
                                    All issues are resolved promptly. I am very pleased with the quality of the work but I
                                    Always welcome new ideas, new ways to develop, improve the project.
                                </p>
                            </div>
                            <div>
                                <h4>Gmiak</h4>
                            </div>
                            <p>Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}