import React from 'react';
import { Modal } from 'antd';

import Providers from './Providers';
import accountTypes from '../utils/account_types';

import '../styles/AddAccount.css';

export default props => (
  <Modal title="Add Account" footer={null} width={300} {...props}>
    <Providers providers={accountTypes} onClick={() => {}} />
  </Modal>
);
