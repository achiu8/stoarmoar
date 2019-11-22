import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import Auth from '../contexts/Auth';
import api from '../utils/api';

const GoogleAuth = ({ location }) => {
  const { onLogin, loggedIn } = useContext(Auth.Context);

  useEffect(() => {
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
    api.get(`/api/google/auth?code=${code}`).then(onLogin);
  }, [onLogin]);

  return loggedIn
    ? <Redirect to="/" />
    : null;
};

export default GoogleAuth;
