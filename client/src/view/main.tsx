import React, { Component, useState } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { Home } from './home';
import { TabMenu } from 'primereact/tabmenu';
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

        const items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Search', icon: 'pi pi-fw pi-search' },
            { label: 'Profile', icon: 'pi pi-fw pi-user' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' },
            { label: 'Exit', icon: 'pi pi-fw pi-power-off' },
        ];

        return (
            <>
                <nav>
                    <div>
                        <div className="card">
                            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => { setActiveIndex(e.index); this.index = e.index; }} />
                        </div>
                    </div>
                </nav>
                <body>
                    {this.renderSwitch(this.index)}
                </body>
            </>
        );
    }

    render() {
        return (
            < this.HomePage />
        );
    }
}