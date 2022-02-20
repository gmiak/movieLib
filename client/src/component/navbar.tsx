
import React, { Component, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';



// State Hook --> Definding a react component as a function.
// State Hook uses a litle bit less code compare to Classes.



function Navbar() {

    const [activeIndex, setActiveIndex] = useState(3);

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Search', icon: 'pi pi-fw pi-search'},
        {label: 'Profile', icon: 'pi pi-fw pi-user'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'},
        {label: 'Exit', icon: 'pi pi-fw pi-power-off'},
    ];

    return (
        <div>
            <div className="card">
                <TabMenu model={items} />
            </div>
        </div>
    );
}
export default Navbar;                 