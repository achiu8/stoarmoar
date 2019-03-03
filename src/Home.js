import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Accounts from './Accounts';
import AddAccount from './AddAccount';
import Files from './Files';

import './Home.css';

export default class Home extends Component {
  state = {
    modalOpen: false,
    files: []
  };

  componentDidMount() {
    fetch('/google/files')
      .then(res => res.json())
      .then(({ files }) => this.setState({ files }));
  }

  handleModal = modalOpen => () =>
    this.setState({ modalOpen });

  render() {
    return !this.props.loggedIn
      ? <Redirect to="/login" />
      : (
        <Layout>
          <Accounts onAddAccountClick={this.handleModal(true)} />
          <Files files={this.state.files} />
          <AddAccount
            visible={this.state.modalOpen}
            onCancel={this.handleModal(false)}
          />
        </Layout>
      );
  }
}
