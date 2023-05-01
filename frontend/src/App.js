import React from 'react';
import './Menu.js';
import Menu from './Menu.js';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  return (
      <div className='App'>
        <Menu apiUrl={props.apiUrl}/>
        <ToastContainer />
      </div>
  );
}

export default App;
