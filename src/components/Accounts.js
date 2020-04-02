import React from 'react';
import { Button, Layout } from 'antd';

import Providers from './Providers';

import '../styles/Accounts.css';

const Sider = Layout.Sider;

export default ({ accounts, onAddAccountClick, onFetch }) => (
  <Sider className="Accounts" theme="light">
    <Providers providers={accounts} onClick={onFetch} />
    <Button
      className="Accounts-add-button"
      type="primary"
      block
      onClick={onAddAccountClick}
    >
      <span>Add Account</span>
    </Button>
  </Sider>
);
