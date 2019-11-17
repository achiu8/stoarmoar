import React from 'react';
import { Icon, Table } from 'antd';

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

const components = onMove => ({
  body: {
    row: ({ children, i, type, ...rest }) => (
      <DragAndDrop.Draggable i={i} render={draggableProps => (
        <DragAndDrop.Droppable
          droppable={type === 'folder'}
          i={i}
          onDrop={onMove}
          type="file"
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
