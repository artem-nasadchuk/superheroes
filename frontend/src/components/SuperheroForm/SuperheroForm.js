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
  const [isCreated, setIsCreated] = useState(false);
  const [newSuperhero, setNewSuperhero] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const superheroData = {
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
    };

    try {
      const response = await axios.post('http://localhost:5000/superheroes', superheroData);
      const createdSuperhero = response.data;
      // console.log(createdSuperhero);
      setNewSuperhero(createdSuperhero);
      console.log(newSuperhero);
      // Clear the form fields
      setNickname('');
      setRealName('');
      setOriginDescription('');
      setSuperpowers('');
      setCatchPhrase('');

      setIsCreated(true); 
    } catch (error) {
      console.error(error);
    }
  };

  if (isCreated) {
    return (
      <div className="container">
        {console.log(newSuperhero)}
        <SuperheroCard nickname={newSuperhero.nickname} id={newSuperhero.id} />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h2 className="title is-4 has-text-centered">Create Superhero</h2>
          <form onSubmit={handleSubmit}>
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
