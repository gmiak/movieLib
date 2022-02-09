/*
Got this from:
https://www.youtube.com/watch?v=5YNh8S5f5ZI&t=75s
*/

class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">MovieLib</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                     <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><i class="fa fa-fw fa-home"></i>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="fa fa-fw fa-search"></i>Search</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="fa fa-fw fa-user-circle"></i>Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"><i class="fa fa-fw fa-cog"></i>Settings</a>
                        </li>
                     </ul>
                </div>
            </div>
        </nav>

        `
    }
}

customElements.define('nav-bar', NavBar)
