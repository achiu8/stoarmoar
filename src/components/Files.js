import React, { useState } from 'react';
import { Button, Empty, Layout, Row, Spin } from 'antd';

import DragAndDrop from './DragAndDrop';
import FilesBreadcrumbs from './FilesBreadcrumbs';
import FilesGrid from './FilesGrid';
import FilesList from './FilesList';
import NewFolder from './NewFolder';
import { LAYOUT } from './Settings';

import '../styles/Files.css';

const Content = Layout.Content;

const renderEmpty = account => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={account ? 'Folder is empty.' : 'Select account to view files.'}
  />
);

export default ({
  account,
  columns,
  breadcrumbs,
  files,
  layout,
  loading,
  onNavigate,
  onBreadcrumb,
  onMove,
  onMoveLevel,
  onNewFolder,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout className="Files">
      <Spin size="large" spinning={loading}>
        <DragAndDrop.Provider>
          <Content className="Files-content">
            <Row type="flex" justify="space-between">
              <FilesBreadcrumbs
                items={breadcrumbs}
                onClick={onBreadcrumb}
                onMoveLevel={onMoveLevel}
              />
              <Button onClick={() => setModalOpen(true)}>
                <span>New Folder</span>
              </Button>
            </Row>
            {!files.length
              ? renderEmpty(account)
              : layout === LAYOUT.LIST
                ? <FilesList
                    account={account}
                    files={files}
                    onNavigate={onNavigate}
                    onMove={onMove}
                  />
                : <FilesGrid
                    account={account}
                    columns={columns}
                    files={files}
                    onNavigate={onNavigate}
                    onMove={onMove}
                  />
            }
          </Content>
        </DragAndDrop.Provider>
      </Spin>
      <NewFolder
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onCreate={onNewFolder}
      />
    </Layout>
  );
};
