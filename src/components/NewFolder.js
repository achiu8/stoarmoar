import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

const { Search } = Input;

export default ({ onCreate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onCancel = () => setModalOpen(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        <span>New Folder</span>
      </Button>
      <Modal
        title="Create a New Folder"
        footer={null}
        onCancel={onCancel}
        visible={modalOpen}
      >
        <Search
          placeholder="New Folder"
          enterButton="Create"
          onPressEnter={e => e.preventDefault()}
          onSearch={name => name && onCreate(name, onCancel)}
        />
      </Modal>
    </>
  );
};
