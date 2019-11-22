import React, { createContext, useEffect, useState } from 'react';

import api from '../utils/api';
import { getToken, saveToken } from '../utils/auth';

const Context = createContext();

const Provider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    loggedIn && api.get('/api/users/current')
      .then(user => user.success === false
        ? setLoggedIn(false)
        : setUser(user));
  }, [loggedIn]);

  const onLogin = ({ token }) => {
    saveToken(token);
    setLoggedIn(true);
  };

  return (
    <Context.Provider value={{
      onLogin,
      loggedIn,
      setLoggedIn,
      user,
      setUser
    }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider,
  Consumer: Context.Consumer
};
