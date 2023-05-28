import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SuperheroCard } from '../SuperheroCard';

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);

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

  return  (
    <div className="container">
      <h1>Superheroes</h1>
      <div className="columns is-multiline is-centered">
        {superheroes.map((superhero) => (
          <div className="column is-one-five" key={superhero.id}>
            <SuperheroCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperheroList;
