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
  render() {
    return (
      <Router>
        <Layout>
          <Header>
            Atlas
          </Header>
          <Content className="App-content">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/create" component={Create} />
          </Content>
          <Footer>
            2018
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
