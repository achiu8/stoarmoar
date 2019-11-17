import React from 'react';
import { Input, Modal } from 'antd';

const { Search } = Input;

export default ({ onCancel, onCreate, visible }) => (
  <Modal
    title="Create a New Folder"
    footer={null}
    onCancel={onCancel}
    visible={visible}
  >
    <Search
      placeholder="New Folder"
      enterButton="Create"
      onPressEnter={e => e.preventDefault()}
      onSearch={name => name && onCreate(name, onCancel)}
    />
  </Modal>
);
