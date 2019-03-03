import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

class GoogleAuth extends Component {
  componentDidMount() {
    const { location, onLogin } = this.props;
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });

    fetch(`/google/auth?code=${code}`).then(onLogin);
  }

  render() {
    return this.props.loggedIn
      ? <Redirect to="/" />
      : null;
  }
}

export default GoogleAuth;
