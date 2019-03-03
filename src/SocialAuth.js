import React, { Component } from 'react';

class SocialAuth extends Component {
  state = {
    google: ''
  };

  componentDidMount() {
    fetch('/google/auth-url')
      .then(res => res.json())
      .then(({ url }) => this.setState({ google: url }));
            
  }

  render() {
    const { google } = this.state;

    return (
      <div>
        {google && <a href={google}>Login with Google</a>}
      </div>
    );
  }
}

export default SocialAuth;
