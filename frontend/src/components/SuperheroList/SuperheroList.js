import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SuperheroCard } from '../SuperheroCard';

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [superheroesPerPage] = useState(5);

  console.log(superheroes)

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/superheroes');
        setSuperheroes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuperheroes();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastSuperhero = currentPage * superheroesPerPage;
  const indexOfFirstSuperhero = indexOfLastSuperhero - superheroesPerPage;
  const currentSuperheroes = superheroes.slice(indexOfFirstSuperhero, indexOfLastSuperhero);

  useEffect(() => {
    if (currentSuperheroes.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentSuperheroes, currentPage]);

  if (!superheroes.length) {
    return 'You dont have superheroes'
  }

  return (
    <div className="container">
      <h1>Superheroes</h1>
      <div className="columns is-multiline is-centered">
        {currentSuperheroes.map((superhero) => (
          <div className="column is-one-five" key={superhero.id}>
            <SuperheroCard superhero={superhero} onSetSuperheroes={setSuperheroes}/>
          </div>
        ))}
      </div>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <button
          className="pagination-previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentSuperheroes.length < superheroesPerPage}
        >
          Next page
        </button>
        <ul className="pagination-list">
          {Array.from({ length: Math.ceil(superheroes.length / superheroesPerPage) }, (_, index) => (
            <li key={index + 1}>
              <button
                className={`pagination-link ${currentPage === index + 1 ? 'is-current' : ''}`}
                aria-label={`Goto page ${index + 1}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SuperheroList;
