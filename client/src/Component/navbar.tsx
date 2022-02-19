
import React, { Component, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import reportWebVitals from '../reportWebVitals';

// State Hook --> Definding a react component as a function.
// State Hook uses a litle bit less code compare to Classes.


export class NavBar extends Component {
    items: { label: string; icon: string; }[];

    constructor(props : any) {
        super(props);

        this.state = {
            activeIndex : 3
        }

        this.items =  [
            {label: 'Home', icon: 'pi pi-fw pi-home'},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h5>Default</h5>
                    <TabMenu model={this.items} />
                </div>

                <div className="card">
                    <h5>Programmatic</h5>
                    <div className="pt-2 pb-4">
                        <Button onClick={() => this.setState({ activeIndex: 0 })} className="p-button-text" label="Activate 1st" />
                        <Button onClick={() => this.setState({ activeIndex: 1 })} className="p-button-text" label="Activate 2nd" />
                        <Button onClick={() => this.setState({ activeIndex: 2 })} className="p-button-text" label="Activate 3rd" />
                    </div>

                    <TabMenu model={this.items}  onTabChange={(e) => this.setState({ activeIndex: e.index })} />
                </div>
            </div>
        );
    }
}
                 