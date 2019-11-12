import React, { useState } from 'react';
import { Breadcrumb, Empty, Icon, Layout, Spin, Table } from 'antd';

import { filesForAccount } from './utils';

import './styles/Files.css';

const Content = Layout.Content;

const columns = [
  {
    name: 'Type',
    dataIndex: 'type',
    width: 20,
    render: type => <Icon className="Files-icon" type={type} />
  },
  {
    name: 'Name',
    dataIndex: 'name'
  }
];

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

export default ({ account, breadcrumbs, files, loading, onClick, onBreadcrumb, onMove }) => {
  const [dragging, setDragging] = useState(null);

  return (
    <Layout className="Files">
      <Spin size="large" spinning={loading}>
        <Content className="Files-content">
          <div className="Files-breadcrumbs">
            {renderBreadcrumbs(breadcrumbs, onBreadcrumb)}
          </div>
          {!files.length
            ? renderEmpty(account)
            : <Table
                columns={columns}
                dataSource={filesForAccount(account, files)}
                onRow={({ name, type }, i) => ({
                  draggable: true,
                  onClick: () => type === 'folder' && onClick(name, i),
                  onDragEnd: () => setDragging(null),
                  onDragOver: e => e.preventDefault(),
                  onDragStart: () => setDragging(i),
                  onDrop: () => type === 'folder' && dragging !== null && onMove(dragging, i)
                })}
                rowKey={({ id }) => id}
                size="middle"
                pagination={false}
                showHeader={false}
              />
          }
        </Content>
      </Spin>
    </Layout>
  );
};
