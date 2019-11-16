import React, { Component } from 'react';

import api from '../utils/api';

class SocialAuth extends Component {
  state = {
    google: ''
  };

  componentDidMount() {
    api.get('/api/google/auth-url')
      .then(({ url }) => this.setState({ google: url }));
  }

  render() {
    const { google } = this.state;

    return (
      <div>
        {google && (
          <div>
            <a href={google}>Login with Google</a>
          </div>
        )}
      </div>
    );
  }
}

export default SocialAuth;
