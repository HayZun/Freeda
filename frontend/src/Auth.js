
import React from 'react';
import Admin from './Admin';
import Login from './Login';

function Auth(props) {
    const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

    return (
        <div className="admin-container">
        {isLoggedIn ? (
            <Admin apiUrl={props.apiUrl}/>
        ) : (
            <Login />
        )}
        </div>
    );
}

export default Auth;

   