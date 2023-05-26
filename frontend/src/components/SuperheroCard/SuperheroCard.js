import './SuperheroCard.css';
import axios from 'axios';

export const SuperheroCard = ({ nickname, id, onSetSuperheroes }) => {
  const handleDeleteSuperhero = async (superheroId) => {
    try {
      await axios.delete(`http://localhost:5000/superheroes/${superheroId}`);
      onSetSuperheroes((prevSuperheroes) => prevSuperheroes
        .filter((superhero) => superhero.id !== superheroId));
    } catch (error) {
      console.error(error);
      // Handle error scenarios if needed.
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img className="img" src="https://cdn.pixabay.com/photo/2023/03/14/22/11/mahabalipuram-7853259_1280.jpg" alt="Placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4 has-text-centered">{nickname}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">Edit</a>
        <a 
          href="#" 
          className="card-footer-item"
          onClick={() => handleDeleteSuperhero(id)}
        >
            Delete
        </a>
      </footer>
    </div>
  )
}
