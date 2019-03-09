import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

class DropboxAuth extends Component {
  componentDidMount() {
    const { location, onLogin } = this.props;
    const { access_token } = qs.parse(location.search, { ignoreQueryPrefix: true });

    fetch(`/dropbox/auth?access_token=${access_token}`).then(onLogin);
  }

  render() {
    return this.props.loggedIn
      ? <Redirect to="/" />
      : null;
  }
}

export default DropboxAuth;
