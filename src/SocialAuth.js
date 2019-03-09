import React, { Component } from 'react';

class SocialAuth extends Component {
  state = {
    google: '',
    dropbox: ''
  };

  componentDidMount() {
    fetch('/google/auth-url')
      .then(res => res.json())
      .then(({ url }) => this.setState({ google: url }));

    fetch('/dropbox/auth-url')
      .then(res => res.json())
      .then(({ url }) => this.setState({ dropbox: url }));
  }

  render() {
    const { google, dropbox } = this.state;

    return (
      <div>
        {google && (
          <div>
            <a href={google}>Login with Google</a>
          </div>
        )}
        {dropbox && (
          <div>
            <a href={dropbox}>Login with Dropbox</a>
          </div>
        )}
      </div>
    );
  }
}

export default SocialAuth;
