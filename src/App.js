import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Login from './Login';
import Create from './Create';
import Home from './Home';
import GoogleAuth from './GoogleAuth';
import { getToken, saveToken } from './utils/auth';

import './styles/App.css';

const { Header, Footer } = Layout;

class App extends Component {
  state = {
    loggedIn: getToken()
  };

  handleLogin = ({ token }) =>
    this.setState({
      loggedIn: true
    }, () => saveToken(token));

  render() {
    const { loggedIn } = this.state;

    return (
      <Router>
        <Layout>
          <Header>
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
          <Footer className="App-footer">
            {new Date().getFullYear()}
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
