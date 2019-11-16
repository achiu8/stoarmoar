import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import {
  path as getPath,
  compose,
  flatten,
  lensPath,
  over,
  pluck,
  prop,
  repeat,
  zip
} from 'ramda';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';
import api from './utils/api';

import './styles/Home.css';

const buildPath = path =>
  compose(
    flatten,
    zip(pluck('i', path)),
    repeat('files'),
    prop('length')
  )(path);

const getIn = (path, files) =>
  getPath(buildPath(path), files);

const breadcrumbs = path =>
  pluck('name', path);

const accounts = user =>
  !user ? [] : user.accounts.map(getPath(['provider', 'name']));

const move = (from, to) => files =>
  files
    .map((file, i) => i === to
      ? { ...file, files: [...file.files, files[from]] }
      : file)
    .filter((_, i) => i !== from);

export default class Home extends Component {
  state = {
    account: null,
    columns: 8,
    loading: false,
    modalOpen: false,
    files: [],
    path: [],
  };

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  handleFetch = id => () =>
    this.setState({ loading: true }, () =>
      api.get(`/api/${id}/files`)
        .then(this.handleFiles(id))
        .catch(() => this.setState({ loading: false }))
    );

  handleUpdate = () =>
    api.post(`/api/${this.state.account}/files`, {
      body: JSON.stringify(this.state.files)
    })
      .then(this.handleFiles(this.state.account));

  handleFiles = account => ({ files }) =>
    this.setState({
      account,
      files,
      loading: false
    });

  handleMove = (from, to) =>
    from !== to && this.setState({
      files: over(
        lensPath(buildPath(this.state.path)),
        move(from, to),
        this.state.files
      )
    }, this.handleUpdate);

  handleNavigate = (type, name, i) =>
    type === 'folder' && this.setState({
      path: [
        ...this.state.path,
        { name, i }
      ]
    });

  handleBreadcrumb = i =>
    this.setState({ path: this.state.path.slice(0, i) });

  render() {
    const { layout, loggedIn, user } = this.props;
    const { account, columns, loading, modalOpen, files, path } = this.state;

    return !loggedIn
      ? <Redirect to="/login" />
      : (
        <Layout>
          <Accounts
            accounts={accounts(user)}
            onAddAccountClick={this.handleModal(true)}
            onFetch={this.handleFetch}
          />
          <Files
            account={account}
            breadcrumbs={breadcrumbs(path)}
            columns={columns}
            files={getIn(path, files)}
            layout={layout}
            loading={loading}
            onBreadcrumb={this.handleBreadcrumb}
            onMove={this.handleMove}
            onNavigate={this.handleNavigate}
          />
          <AddAccount
            visible={modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
