import React, { useState, useEffect } from 'react';
import Sound from './Sound';
import { motion, AnimatePresence } from 'framer-motion';

function Soundboard(props) {
  const [sounds, setSounds] = useState([]);
  const [volumePercentage, setVolumePercentage] = useState(50);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(`${props.apiUrl}/sounds`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setSounds(data);
      })
      .catch(error => console.error(error));
  }, [props.apiUrl]);

  function renderSounds() {
    return sounds.filter(sound => {
      if (!sound.title) {
        return false;
      }

      return sound.title.toLowerCase().includes(searchValue.toLowerCase());
    }).map(sound => (
      <Sound key={sound.id} sound={sound} volumePercentage={volumePercentage} apiUrl={props.apiUrl}/>
    ));
  }

  function handleVolumeChange(event) {
    setVolumePercentage(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <motion.div className='soundboard-container'>
      <h1>Soundboard</h1>
      <div className='before-soundboards' style={{textAlign: "center"}}>
        <label className='volume-label' style={{color:'black'}} htmlFor="volume">Volume:                                                 </label>
        <input className='volume' type="range" id="volume" name="volume" min="0" max="100" defaultValue={volumePercentage} onChange={handleVolumeChange}/>
        <br/>
        <label className='search-label' style={{color:'black'}} htmlFor="search">Rechercher: </label>
        <input className='search' type="text" id="search" name="search" value={searchValue} onChange={handleSearchChange}/>
      </div>
      <motion.div
        layout 
        className="soundboard"
      >
        <AnimatePresence>  
          {renderSounds()}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Soundboard;
