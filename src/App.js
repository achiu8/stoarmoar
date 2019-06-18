import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Login from './Login';
import Create from './Create';
import Home from './Home';
import GoogleAuth from './GoogleAuth';
import { getToken, saveToken } from './utils/auth';

import './styles/App.css';

class App extends Component {
  state = {
    loggedIn: getToken(),
    user: null
  };

  componentDidMount() {
    fetch('/api/current', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success === false) {
          return this.setState({ loggedIn: false });
        }

        this.setState({ user });
      });
  }

  handleLogin = ({ token }) =>
    this.setState({
      loggedIn: true
    }, () => saveToken(token));

  render() {
    const { loggedIn, user } = this.state;

    return (
      <Router>
        <Layout>
          <Header loggedIn={loggedIn} user={user}>
            Atlas
          </Header>
          <Layout>
            <Route exact path="/" render={props => <Home loggedIn={loggedIn} />} />
            <Route path="/login" render={props => <Login {...props} onLogin={this.handleLogin} />} />
            <Route path="/create" component={Create} />
            <Route
              path="/google-auth"
              render={props => (
                <GoogleAuth
                  {...props}
                  loggedIn={loggedIn}
                  onLogin={this.handleLogin}
                />
              )}
            />
          </Layout>
          <Layout.Footer className="App-footer">
            {new Date().getFullYear()}
          </Layout.Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
