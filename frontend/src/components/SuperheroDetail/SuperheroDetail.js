// SuperheroDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SuperheroDetail = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const response = await axios.get(`/superheroes/${id}`);
        setSuperhero(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuperhero();
  }, [id]);

  if (!superhero) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{superhero.nickname}</h2>
      <p>Real Name: {superhero.realName}</p>
      <p>Origin Description: {superhero.originDescription}</p>
      <p>Superpowers: {superhero.superpowers}</p>
      <p>Catch Phrase: {superhero.catchPhrase}</p>
      <div>
        {superhero.Images.map((image) => (
          <img key={image.id} src={image.filename} alt={superhero.nickname} />
        ))}
      </div>
    </div>
  );
};

export default SuperheroDetail;
