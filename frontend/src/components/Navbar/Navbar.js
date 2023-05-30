import React from 'react';
import logo from '../../logo/logo.png';
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Superheroes" />
        </a>
      </div>
      <div className="navbar-end">
        <Link to="/superheroes/new" className="navbar-item">
          Add Superhero
        </Link>
        <Link to="/superheroes" className="navbar-item">
          All Superheroes
        </Link>
      </div>
    </nav>
  );
};
