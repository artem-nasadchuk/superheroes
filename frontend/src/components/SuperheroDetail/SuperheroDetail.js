import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const SuperheroDetail = ({ superhero }) => {
  const { id } = useParams();
  const [selectedSuperhero, setSelectedSuperhero] = useState(null);

  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/superheroes/${id}`);
        console.log(response.data);
        setSelectedSuperhero(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuperhero();
  }, [id]);

  if (!selectedSuperhero) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-image">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
        >
          {selectedSuperhero.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={superhero.nickname} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card-content">
        <div className="media-content">
          <h2 className="title">{selectedSuperhero.nickname}</h2>
          <p>Real Name: {selectedSuperhero.realName}</p>
          <p>Origin Description: {selectedSuperhero.originDescription}</p>
          <p>Superpowers: {selectedSuperhero.superpowers}</p>
          <p>Catch Phrase: {selectedSuperhero.catchPhrase}</p>
          <Link to={`/superheroes/${superhero.id}`}>
              <button className="button is-primary">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;
