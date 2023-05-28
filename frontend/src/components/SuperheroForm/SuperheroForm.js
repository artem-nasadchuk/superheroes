import React, { useState } from 'react';
import axios from 'axios';
import './SuperheroForm.css';
import { SuperheroCard } from '../SuperheroCard';

export const SuperheroForm = () => {
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [newSuperhero, setNewSuperhero] = useState([]);
  const [images, setImages] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('realName', realName);
    formData.append('originDescription', originDescription);
    formData.append('superpowers', superpowers);
    formData.append('catchPhrase', catchPhrase);
  
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      console.log(images);
      const response = await axios.post('http://localhost:5000/superheroes', formData);
      const createdSuperhero = response.data;
      setNewSuperhero(createdSuperhero);

      // Clear the form fields
      setNickname('');
      setRealName('');
      setOriginDescription('');
      setSuperpowers('');
      setCatchPhrase('');
      setImages([]);
      setIsCreated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages(selectedImages);
  };

  if (isCreated) {
    return <SuperheroCard superhero={newSuperhero} />
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h2 className="title is-4 has-text-centered">Create Superhero</h2>
          <form 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="field">
              <label className="label">Nickname:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Real Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={realName}
                  onChange={(e) => setRealName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Origin Description:</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={originDescription}
                  onChange={(e) => setOriginDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Superpowers:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={superpowers}
                  onChange={(e) => setSuperpowers(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Catchphrase:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={catchPhrase}
                  onChange={(e) => setCatchPhrase(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Images:</label>
              <div className="control">
                <input
                  className="input"
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-dark" type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
