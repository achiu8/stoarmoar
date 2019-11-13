import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Login from './Login';
import Create from './Create';
import Home from './Home';
import GoogleAuth from './GoogleAuth';
import api from './utils/api';
import { getToken, saveToken } from './utils/auth';

import './styles/App.css';
import './styles/Droppable.css';

class App extends Component {
  state = {
    loggedIn: getToken(),
    user: null
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.loggedIn && this.state.loggedIn) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = () =>
    api.get('/api/users/current')
      .then(user => user.success === false
        ? this.setState({ loggedIn: false })
        : this.setState({ user }));

  handleLogin = ({ token }) => {
    saveToken(token);
    this.setState({ loggedIn: true });
  };

  render() {
    const { loggedIn, user } = this.state;

    return (
      <Router>
        <Layout>
          <Header loggedIn={loggedIn} user={user}>
            Atlas
          </Header>
          <Layout>
            <Route exact path="/" render={props => <Home loggedIn={loggedIn} user={user} />} />
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
