import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';

import './Home.css';

import { accounts } from './sample_data';

export default class Home extends Component {
  state = {
    modalOpen: false,
    files: []
  };

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  handleFetch = id => () =>
    fetch(`/${id}/files`)
      .then(res => res.json())
      .then(({ files }) => this.setState({ files }));

  render() {
    return !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <Layout>
          <Accounts
            accounts={accounts}
            onAddAccountClick={this.handleModal(true)}
            onFetch={this.handleFetch}
          />
          <Files files={this.state.files} />
          <AddAccount
            visible={this.state.modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
