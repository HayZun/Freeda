import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Admin(props) {

  const [isHovering, setIsHovering] = useState(false);

  const [songs, setSongs] = useState([]);

  const [shortcutEnabled, setShortcutEnabled] = useState(false);
  const [keysPressed, setKeysPressed] = useState([]);

  const handleKeyDown = (event) => {
    setKeysPressed(prevKeysPressed => [...prevKeysPressed, event.key]);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (keysPressed.length === 3 && keysPressed[0] === 'Control' && keysPressed[1] === 'Shift' && keysPressed[2] === 'L') {
      setShortcutEnabled(true);
    }
  }, [keysPressed]);

  useEffect(() => {
    if (shortcutEnabled) {
      console.log('Shortcut enabled!');
    }
  }, [shortcutEnabled]);

  useEffect(() => {
    fetch(`${props.apiUrl}/sounds`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setSongs(data);
      })
      .catch(error => console.error(error));
  }, [props.apiUrl]);

  const handleDelete = (songtitle) => {
    const formData = new FormData();
    formData.append('title', songtitle);
    fetch(`${props.apiUrl}/delete-folder`, {
      method: 'DELETE',
        body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSongs(songs.filter(song => song.title !== songtitle));
        } else {
          toast.error('Failed to delete song.', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    setShortcutEnabled(false);
    sessionStorage.setItem('loggedIn', false);
    window.location.reload();

  };

  return (
    <div className=''>
      {shortcutEnabled ? (
         <div className='soundboard'>
         <h1 style={{color:'red', padding:'20px'}}>Admin Panel</h1>
           {songs.map(song => (
             <div style={{ position: 'relative', width: '100%', height: '100%' }}>
             <img
               className='img-sound'
               srcSet={song.image.replace(/ /g, '%20')}
               alt={song.title}
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
               onClick={() => handleDelete(song.title)}
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
                   {song.title}
                 </div>
               )}
             </div>
           ))}
         <button onClick={handleLogout}>Logout</button>
      </div>
      ) : (
        <div>
          <h1>Access denied</h1>
          <img style={{height:'480px', width: '480px'}}srcSet='/images/nicetry.png' alt='nice try' />
          <button onClick={handleLogout}>Retry</button>
        </div>
      )}
    </div>
  );
  }

export default Admin;



