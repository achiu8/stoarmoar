import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Files from './Files';

export default ({ loggedIn }) =>
  !loggedIn
    ? <Redirect to="/login" />
    : (
      <Layout>
        <Files />
      </Layout>
    );
