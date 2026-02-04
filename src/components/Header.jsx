import React from 'react'

const Header = () => {
    return (
        <header className="navbar">
            <h1 className="logo">FoodieFinder</h1>
            <nav>
                <a href="#search">Search</a>
                <a href="#features">Features</a>
                <a href="#about">About</a>
            </nav>
        </header>
    )
}

export default Header