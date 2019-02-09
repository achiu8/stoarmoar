import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ loggedIn }) =>
  !loggedIn
    ? <Redirect to="/login" />
    : (
      <div>
        <h2>Home</h2>
        <p>{loggedIn}</p>
      </div>
    );
