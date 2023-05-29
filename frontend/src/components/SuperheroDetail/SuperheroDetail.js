import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SuperheroDetail = ({ superhero }) => {
  // const { id } = useParams();
  // const [superhero, setSuperhero] = useState(null);

  // useEffect(() => {
  //   const fetchSuperhero = async () => {
  //     try {
  //       const response = await axios.get(`/superheroes/${id}`);
  //       setSuperhero(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSuperhero();
  // }, [id]);

  if (!superhero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <div className="card">
          <div className="card-image">
            <Swiper spaceBetween={10} slidesPerView={1}>
              {superhero.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={superhero.nickname} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="card-content">
            <h2 className="title">{superhero.nickname}</h2>
            <p>Real Name: {superhero.realName}</p>
            <p>Origin Description: {superhero.originDescription}</p>
            <p>Superpowers: {superhero.superpowers}</p>
            <p>Catch Phrase: {superhero.catchPhrase}</p>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;
