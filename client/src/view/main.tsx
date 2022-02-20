import React, { Component, useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import "../style/main.css"
import { Home } from './home';
import { TabMenu } from 'primereact/tabmenu';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { Divider } from 'primereact/divider';
import { Search } from './search';
import { Exit } from './exit';
import { Settings } from './settings';
import { Profile } from './profile';


export class MainView extends Component {
    index: number;

    constructor(props: any) {
        super(props);
        this.index = 0;
        this.state = {
            index: 0
        }

    }
    renderSwitch(index: number) {
        switch (index) {
            case 0:
                return <Home />;
            case 1:
                return <Search />;
            case 2:
                return <Profile />;
            case 3:
                return <Settings />;
            case 4:
                return <Exit />;
            default:
                return <Home />;
        }
    }

    HomePage = () => {

        const [activeIndex, setActiveIndex] = useState(0);
        const [visibleRight, setVisibleRight] = useState(false);

        const items = [
            { label: 'Home', icon: 'pi pi-fw pi-home', command:() => {this.index=0; setVisibleRight(false)}},
            { label: 'Search', icon: 'pi pi-fw pi-search', command:() => {this.index=1; setVisibleRight(false)} },
            { label: 'Profile', icon: 'pi pi-fw pi-user',command:() => {this.index=2; setVisibleRight(false)} },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', command:() => {this.index=3; setVisibleRight(false)} },
            { label: 'Exit', icon: 'pi pi-fw pi-power-off', command:() => {this.index=4; setVisibleRight(false)} },
        ];
  
        return (
            <>
                <nav>
                    <div>
                        <div className="card navabarTab">
                            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => { setActiveIndex(e.index); this.index = e.index; }} />
                        </div>
                    </div>

                    <div>
                        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                            <div className="card">
                                <PanelMenu model={items} style={{ width: '22rem' }} />
                            </div>
                        </Sidebar>
                    </div>
                    <div className="sideMenuCustom">
                        <div><Button icon="pi pi-bars" onClick={() => setVisibleRight(true)} className="mr-2" /></div>
                        <div><h4>MovieLib</h4></div>
                    </div>
                </nav>

                <body>
                    <div className="bodyWrap">
                        {this.renderSwitch(this.index)}
                    </div>
                </body>

                <Divider />

                <footer>
                    <div className='footer'>
                        <p>Follow MovieLib on</p>
                        <i className="pi pi-facebook" ></i>
                        <i className="pi pi-instagram" ></i>
                        <i className="pi pi-twitter" ></i>
                        <i className="pi pi-github" ></i>
                        <p className='copyright'>2022 &copy; gmiak.dv, All rights reserved.</p>
                    </div>
                </footer>
            </>
        );
    }

    render() {
        return (
            < this.HomePage />
        );
    }
}