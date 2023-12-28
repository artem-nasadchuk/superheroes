import './SuperheroCard.css';
import axios from "axios";
import { Link } from 'react-router-dom'
import { useState } from 'react';
import SuperheroDetail from '../SuperheroDetail/SuperheroDetail';

export const SuperheroCard = ({ superhero, onSetSuperheroes }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const handleDeleteSuperhero = async (superheroId) => {
    try {
      await axios.delete(`http://localhost:5000/superheroes/${superheroId}`);
      onSetSuperheroes((prevSuperheroes) => {
        console.log(prevSuperheroes);
        return prevSuperheroes.filter((superhero) => superhero.id !== superheroId)
      }
      );
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed.
    }
  };
  
  if (!superhero) {
    return <h1>Super hero was deleted</h1>
  }

  if (isDetailsOpen) {
    return <SuperheroDetail superhero={superhero} />
  }

  console.log(superhero.images);

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by3">
          <img className="is-square" src={superhero.images[0]} alt="Superhero" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4 has-text-centered">{superhero.nickname}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <Link
          to={`/superheroes/${superhero.id}`}
          className="card-footer-item"
          onClick={(event) => {
            setIsDetailsOpen(true);
          }}
        >
          Details
        </Link>
        <Link
          to="/"
          className="card-footer-item"
          onClick={(event) => {
            event.preventDefault();
            handleDeleteSuperhero(superhero.id);
          }}
        >
          Delete
        </Link>
      </footer>
    </div>
  );
};
