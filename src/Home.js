import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { path as getPath, compose, flatten, prop, repeat, zip } from 'ramda';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';
import { getToken } from './utils/auth';

import './styles/Home.css';

import { accounts } from './sample_data';

const getIn = (path, files) =>
  getPath(compose(
    flatten,
    zip(path),
    repeat('files'),
    prop('length')
  )(files), files);

export default class Home extends Component {
  state = {
    account: null,
    modalOpen: false,
    files: [],
    path: []
  };

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  handleFetch = id => () => {
    fetch(`/${id}/files`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(this.handleFiles(id));
  }

  handleFiles = account => ({ files }) =>
    this.setState({ account, files });

  handleNavigate = i =>
    this.setState({ path: [...this.state.path, i] });

  render() {
    const { account, modalOpen, files, path } = this.state;

    return !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <Layout>
          <Accounts
            accounts={accounts}
            onAddAccountClick={this.handleModal(true)}
            onFetch={this.handleFetch}
          />
          <Files
            account={account}
            files={getIn(path, files)}
            onClick={this.handleNavigate}
          />
          <AddAccount
            visible={modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
