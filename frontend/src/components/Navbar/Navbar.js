import React from 'react';
import logo from '../../logo/logo.png';

export const Navbar = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Superheroes" />
        </a>
      </div>
      <div className="navbar-end">
        <a className="navbar-item">
          Add Superhero
        </a>
        <a className="navbar-item">
          All Superheroes
        </a>
      </div>
    </nav>
  );
};
