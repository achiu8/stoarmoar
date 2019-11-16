import React from 'react';
import { Breadcrumb, Empty, Layout, Spin } from 'antd';

import FilesGrid from './FilesGrid';
import FilesList from './FilesList';
import { LAYOUT } from './Settings';

import './styles/Files.css';

const Content = Layout.Content;

const renderBreadcrumbs = (breadcrumbs, onClick) => (
  <Breadcrumb separator=">">
    {['My Files', ...breadcrumbs].map((breadcrumb, i) => (
      <Breadcrumb.Item
        key={i}
        className="Files-breadcrumb"
        onClick={() => onClick(i)}
      >
        {breadcrumb}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

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
}) => (
  <Layout className="Files">
    <Spin size="large" spinning={loading}>
      <Content className="Files-content">
        <div className="Files-breadcrumbs">
          {renderBreadcrumbs(breadcrumbs, onBreadcrumb)}
        </div>
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
    </Spin>
  </Layout>
);
