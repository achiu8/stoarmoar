import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Login from './Login';
import Create from './Create';
import Home from './Home';
import Settings from './Settings';
import GoogleAuth from './GoogleAuth';
import Auth from '../contexts/Auth';
import AccountSettings from '../contexts/AccountSettings';

import '../styles/App.css';
import '../styles/Droppable.css';

const App = () => (
  <Auth.Provider>
    <AccountSettings.Provider>
      <Router>
        <Layout>
          <Header>Atlas</Header>
          <Layout>
            <Route exact path="/" render={props => (
              <Auth.Consumer>
                {({ loggedIn, user }) => (
                  <Home {...props} loggedIn={loggedIn} user={user} />
                )}
              </Auth.Consumer>
            )} />
            <Route path="/login" component={Login} />
            <Route path="/create" component={Create} />
            <Route path="/settings" component={Settings} />
            <Route path="/google-auth" component={GoogleAuth} />
          </Layout>
          <Layout.Footer className="App-footer">
            {new Date().getFullYear()}
          </Layout.Footer>
        </Layout>
      </Router>
    </AccountSettings.Provider>
  </Auth.Provider>
);

export default App;
