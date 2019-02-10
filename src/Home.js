import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Accounts from './Accounts';
import Files from './Files';

export default ({ loggedIn }) =>
  !loggedIn
    ? <Redirect to="/login" />
    : (
      <Layout>
        <Accounts />
        <Files />
      </Layout>
    );
