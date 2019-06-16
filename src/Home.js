import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { path as getPath, compose, flatten, pluck, prop, repeat, zip } from 'ramda';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';
import { getToken } from './utils/auth';

import './styles/Home.css';

import { accounts } from './sample_data';

const getIn = (path, files) =>
  getPath(compose(
    flatten,
    zip(pluck('i', path)),
    repeat('files'),
    prop('length')
  )(files), files);

const breadcrumbs = path =>
  pluck('name', path);

export default class Home extends Component {
  state = {
    account: null,
    loading: false,
    modalOpen: false,
    files: [],
    path: []
  };

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  handleFetch = id => () =>
    this.setState({ loading: true }, () =>
      fetch(`/${id}/files`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
        .then(res => res.json())
        .then(this.handleFiles(id))
        .catch(() => this.setState({ loading: false }))
    );

  handleFiles = account => ({ files }) =>
    this.setState({
      account,
      files,
      loading: false
    });

  handleNavigate = (name, i) =>
    this.setState({
      path: [
        ...this.state.path,
        { name, i }
      ]
    });

  handleBreadcrumb = i =>
    this.setState({ path: this.state.path.slice(0, i) });

  render() {
    const { account, loading, modalOpen, files, path } = this.state;

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
            breadcrumbs={breadcrumbs(path)}
            files={getIn(path, files)}
            loading={loading}
            onClick={this.handleNavigate}
            onBreadcrumb={this.handleBreadcrumb}
          />
          <AddAccount
            visible={modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
