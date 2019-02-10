import React from 'react';
import { Button, Icon, Layout, Menu } from 'antd';

import { capitalize } from './utils';
import { accounts } from './sample_data';

import './Accounts.css';

const Sider = Layout.Sider;

export default () => (
  <Sider className="Accounts" theme="light">
    <h1 className="Accounts-heading">Accounts</h1>
    <Menu className="Accounts-accounts" mode="inline">
      {accounts.map(account => (
        <Menu.Item key={account} className="Accounts-account">
          <Icon type={account} />
          <span>{capitalize(account)}</span>
        </Menu.Item>
      ))}
    </Menu>
    <Button
      className="Accounts-add-button"
      type="primary"
      block
    >
      <Icon type="plus" />
      <span>Add Account</span>
    </Button>
  </Sider>
);
