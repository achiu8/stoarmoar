import React from 'react';
import { Breadcrumb, Empty, Icon, Layout, Spin, Table } from 'antd';

import DragAndDrop from './DragAndDrop';
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

const components = onMove => ({
  body: {
    row: ({ children, i, type, ...rest }) => (
      <DragAndDrop.Draggable i={i} render={draggableProps => (
        <DragAndDrop.Droppable
          droppable={type === 'folder'}
          i={i}
          onDrop={onMove}
          render={({ dropping, ...droppableProps }) => (
            <tr
              {...rest}
              {...draggableProps}
              {...droppableProps}
              className={dropping ? 'Droppable-hovered' : ''}
            >
              {children}
            </tr>
          )}
        />
      )} />
    )
  }
});

export default ({ account, breadcrumbs, files, loading, onNavigate, onBreadcrumb, onMove }) => (
  <Layout className="Files">
    <Spin size="large" spinning={loading}>
      <Content className="Files-content">
        <div className="Files-breadcrumbs">
          {renderBreadcrumbs(breadcrumbs, onBreadcrumb)}
        </div>
        {!files.length
          ? renderEmpty(account)
          : (
              <DragAndDrop.Provider>
                <Table
                  columns={columns}
                  components={components(onMove)}
                  dataSource={filesForAccount(account, files)}
                  onRow={({ name, type }, i) => ({
                    i,
                    onClick: () => type === 'folder' && onNavigate(name, i),
                    type
                  })}
                  rowKey={({ id }) => id}
                  size="middle"
                  pagination={false}
                  showHeader={false}
                />
              </DragAndDrop.Provider>
          )
        }
      </Content>
    </Spin>
  </Layout>
);
