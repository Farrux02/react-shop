function Header() {
    return <div>
        <nav className="green darken-1"> 
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">React Shop</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://github.com/Farrux02/react-shop" target='_blank'>Repo</a></li>
                </ul>
            </div>
        </nav>
    </div>
}

export { Header }