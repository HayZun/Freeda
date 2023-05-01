import React, { useState } from 'react';
import LanguageDropdown from './LanguageDropdown';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function Freeda(props) {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('fr');
  const [volume, setVolume] = useState(50);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === '') {
      toast.error('Le champ texte est vide..', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    const formdata = new FormData();
    formdata.append('text', text);
    formdata.append('lang', language);
    formdata.append('volume', volume);

    fetch(`${props.apiUrl}/text-to-speech`, {
      method: 'POST',
      body: formdata
    })
      .then(response => response.json())
      .then()
      .catch(error => console.error(error));
  };

  const handleTextareaChange = (event) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (lang) => {

    setLanguage(lang);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <motion.div
    animate={{ opacity: 1, scale: 1}}
    exit={{ opacity: 0, scale: 0 }} 
    initial={{ opacity: 0, scale: 0 }} 
    transition= {{duration: 0.5}}
    layout 
    className='Freeda'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Texte :</label>
        <textarea id="text" name="text" value={text} onChange={handleTextareaChange}></textarea>
        <LanguageDropdown value={language} onChange={handleLanguageChange} />
        <div>
        <label htmlFor="volume">Volume :</label>
        <input type="range" id="volume" name="volume" min="0" max="100" value={volume} onChange={(event) => handleVolumeChange(event)} />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </motion.div>
  );
}

export default Freeda;
