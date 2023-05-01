import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'animate.css';

function Login() {
  const [code, setCode] = useState('');

  const handleButtonClick = (number) => {
    if (code.length < 8) {
      setCode(prevCode => prevCode + number);
    }
  };

  const handleDelete = () => {
    setCode(prevCode => prevCode.slice(0, -1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === '1234') {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.reload();
    } else {
      toast.error('Invalid code', {
        position: toast.POSITION.TOP_RIGHT
      });
      const element = document.getElementsByClassName('loginForm');
      element.classList.add('animated', 'shake');
      setTimeout(() => {
        element.classList.remove('animated', 'shake');
      }, 1000);
      setCode('');
    }
  };

  return (
    <div>
    <div className="login-container">
      <h2>Enter the access code :</h2>
      <div className="digit-container">
        <div className="digit">
          <button onClick={() => handleButtonClick('1')}><img srcSet='/images/cat1.png' alt="1" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('2')}><img srcSet='/images/cat1.png' alt="2" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('3')}><img srcSet='/images/cat1.png' alt="3" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('4')}><img srcSet='/images/cat1.png' alt="4" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('5')}><img srcSet='/images/cat1.png' alt="5" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('6')}><img srcSet='/images/cat1.png' alt="6" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('7')}><img srcSet='/images/cat1.png' alt="7" /></button>
        </div>
        <div className="digit">
          <button onClick={() => handleButtonClick('8')}><img srcSet='/images/cat1.png' alt="8" /></button>
      </div>
      <div className="digit">
        <button onClick={() => handleButtonClick('9')}><img srcSet='/images/cat1.png' alt="9" /></button>
      </div>
    </div>
    <div className='login-right'>
      <div className='digit-delete'><button onClick={() => handleDelete()}><img srcSet='/images/cat2.jpg' alt="delete" /></button></div>
        <div className="code-container">
          <form className='loginForm'onSubmit={handleSubmit}>
            <input type="text" value={code} readOnly />
            <button type="submit">Submit</button>
          </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
