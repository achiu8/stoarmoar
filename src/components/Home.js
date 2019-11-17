import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import {
  append,
  compose,
  flatten,
  lensPath,
  over,
  path as getPath,
  pluck,
  prop,
  repeat,
  zip
} from 'ramda';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';
import api from '../utils/api';

import '../styles/Home.css';

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

const remove = from => files =>
  files.filter((_, i) => i !== from);

const updateIn = (path, f) =>
  over(lensPath(buildPath(path)), f);

const moveLevel = (from, to, path, files) => {
  const file = getIn(path, files)[from];

  return compose(
    updateIn(path.slice(0, to), append(file)),
    updateIn(path, remove(from))
  )(files);
};

export default class Home extends Component {
  state = {
    account: 'google',
    columns: 8,
    loading: false,
    modalOpen: false,
    files: [],
    path: [],
  };

  componentDidMount() {
    this.handleFetch(this.state.account)();
  }

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
      files: updateIn(this.state.path, move(from, to))(this.state.files)
    }, this.handleUpdate);

  handleMoveLevel = (from, to) =>
    this.setState({
      files: moveLevel(from, to, this.state.path, this.state.files)
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
            onMoveLevel={this.handleMoveLevel}
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
