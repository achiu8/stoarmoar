import React from 'react';
import { Icon, Menu } from 'antd';

import { accountName } from '../utils';

import '../styles/Providers.css';

export default ({ providers, onClick }) => (
  <Menu className="Providers" mode="inline">
    {providers.map(id => (
      <Menu.Item key={id} className="Providers-provider" onClick={onClick(id)}>
        <Icon type={id} />
        <span>{accountName(id)}</span>
      </Menu.Item>
    ))}
  </Menu>
);
