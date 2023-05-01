import React, { useState } from 'react';
import Soundboard from './Soundboard';
import Freeda from './Freeda';
import AddSound from './AddSound';
import Auth from './Auth';

function Menu(props) {

  const apiUrl = props.apiUrl

  const [clickedButton, setClickedButton] = useState(null);
  const [option, setOption] = useState(null);

  const handleOptionClick = (option) => {
    setOption(option);
    setClickedButton(option);
  };

  function stopSound() {
    fetch(`${apiUrl}/stop-sound`, {
      method: 'POST',
      body: 'stop',
    })
      .then(response => {
        return response.json();
      })
      .catch(error => console.error(error));
  }

  let componentToDisplay;
  switch (option) {
    case 'soundboard':
      componentToDisplay = <Soundboard apiUrl={apiUrl}/>;
      break;
    case 'freeda':
      componentToDisplay = <Freeda apiUrl={apiUrl}/>;
      break;
    case 'addSound':
      componentToDisplay = <AddSound apiUrl={apiUrl}/>;
      break;
    case 'admin':
      componentToDisplay = <Auth apiUrl={apiUrl}/>;
      break;
    default:
      componentToDisplay = null;
  }

  const handleStopClick = () => {
    stopSound();
  };

  return (
    <div className='Menu'>
      <button className={clickedButton === 'soundboard' ? 'clicked' : ''} onClick={() => handleOptionClick('soundboard')}>Soundboard</button>
      <button className={clickedButton === 'freeda' ? 'clicked' : ''} onClick={() => handleOptionClick('freeda')}>Freeda</button>
      <button className={clickedButton === 'addSound' ? 'clicked' : ''} onClick={() => handleOptionClick('addSound')}>Add Sound</button>
      <button className={clickedButton === 'admin' ? 'clicked' : ''} onClick={() => handleOptionClick('admin')}>Admin</button>
      <button className={'deleteBtn'} onClick={() => handleStopClick()}>Stop</button>
      {componentToDisplay}
    </div>
  );
}

export default Menu;
