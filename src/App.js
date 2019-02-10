import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Login from './Login';
import Create from './Create';
import Home from './Home';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    loggedIn: false
  };

  handleLogin = () =>
    this.setState({ loggedIn: true });

  render() {
    return (
      <Router>
        <Layout>
          <Header>
            Atlas
          </Header>
          <Layout>
            <Route exact path="/" render={props => <Home loggedIn={this.state.loggedIn} />} />
            <Route path="/login" render={props => <Login {...props} onLogin={this.handleLogin}/>} />
            <Route path="/create" component={Create} />
          </Layout>
          <Footer>
            2018
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
