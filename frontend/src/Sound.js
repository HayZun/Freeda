import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Sound({ sound, volumePercentage, apiUrl }) {

  const [isHovering, setIsHovering] = useState(false); 

  function playSound(sound, volumePercentage) {
    const formData = new FormData();
    formData.append('title', sound.title);
    formData.append('volume_percentage', volumePercentage);
    fetch(`${apiUrl}/play-sound`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then()
      .catch();
  };

  return (
    <motion.div
    >
       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        className='img-sound'
        src={`${apiUrl}${sound.image}`}
        alt={sound.title}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => playSound(sound, volumePercentage)}
      />
      {isHovering && (
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'center',
              fontSize: '18px',
              padding: '10px',
              boxSizing: 'border-box'
            }}
          >
            {sound.title}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Sound;
