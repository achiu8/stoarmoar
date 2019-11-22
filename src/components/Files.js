import React, { useContext } from 'react';
import { Empty, Layout, Row, Spin } from 'antd';

import AccountSettings, { LAYOUT } from '../contexts/AccountSettings';
import DragAndDrop from '../contexts/DragAndDrop';
import FilesBreadcrumbs from './FilesBreadcrumbs';
import FilesGrid from './FilesGrid';
import FilesList from './FilesList';
import NewFolder from './NewFolder';

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
  loading,
  onNavigate,
  onBreadcrumb,
  onMove,
  onMoveLevel,
  onNewFolder,
}) => {
  const { layout } = useContext(AccountSettings.Context);

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
              <NewFolder onCreate={onNewFolder} />
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
    </Layout>
  );
};
