import React from 'react';
import { Icon, Table, Menu, Dropdown } from 'antd';

import DragAndDrop from './DragAndDrop';
import { filesForAccount } from '../utils';

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

const {SubMenu} = Menu;

const menu = (
  <Menu>
    <Menu.Item key="1">Download</Menu.Item>
    <SubMenu
      key="sub2"
      title={
        <span>Cloud Preference</span>
      }
    >
      <Menu.Item key="1">Google</Menu.Item>
      <Menu.Item key="2">Dropbox</Menu.Item>
    </SubMenu>
  </Menu>
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
            <Dropdown overlay={menu} trigger={['contextMenu']} >
              <tr
                {...rest}
                {...draggableProps}
                {...droppableProps}
                className={dropping ? 'Droppable-hovered' : ''}
                style={{ userSelect: 'none' }}
              >
                {children}
              </tr>
            </Dropdown>
          )}
        />
      )} />
    )
  }
});

export default ({ account, files, onMove, onNavigate }) => (
  <Table
    columns={columns}
    components={components(onMove)}
    dataSource={filesForAccount(account, files)}
    onRow={({ name, type }, i) => ({
      i,
      onClick: () => onNavigate(type, name, i),
      type
    })}
    rowKey={({ id }) => id}
    size="middle"
    pagination={false}
    showHeader={false}
  />
);
