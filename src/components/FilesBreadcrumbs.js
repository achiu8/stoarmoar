import React from 'react';
import classNames from 'classnames';
import { Breadcrumb } from 'antd';

import DragAndDrop from './DragAndDrop';

export default ({ items, onClick }) => (
  <div className="Files-breadcrumbs">
    <Breadcrumb separator=">">
      {['My Files', ...items].map((item, i) => (
        <DragAndDrop.Droppable
          droppable={i !== items.length}
          i={i}
          onDrop={() => console.log('dropped on', item)}
          render={({ dropping, ...droppableProps }) => (
            <Breadcrumb.Item
              {...droppableProps}
              key={i}
              className={classNames('Files-breadcrumb', {
                'Droppable-hovered': dropping
              })}
              onClick={() => onClick(i)}
            >
              {item}
            </Breadcrumb.Item>
          )}
        />
      ))}
    </Breadcrumb>
  </div>
);
