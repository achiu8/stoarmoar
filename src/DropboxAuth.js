import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import api from './utils/api';

class DropboxAuth extends Component {
  componentDidMount() {
    const { location, onLogin } = this.props;
    const { access_token } = qs.parse(location.hash.slice(1));

    api.get(`/api/dropbox/auth?access_token=${access_token}`).then(onLogin);
  }

  render() {
    return this.props.loggedIn
      ? <Redirect to="/" />
      : null;
  }
}

export default DropboxAuth;
