import React from 'react';
import classNames from 'classnames';
import { Col, Icon, Row, Menu, Dropdown } from 'antd';

import DragAndDrop from './DragAndDrop';
import { chunksOf, filename, filesForAccount } from '../utils';

const position = (cs, i, j) => cs * i + j;

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

function handleClick(e) {
  console.log('click', e);
}

export default ({ account, columns, files, onMove, onNavigate }) => (
  <>
    {chunksOf(columns, filesForAccount(account, files)).map((row, i) => (
      <Row key={i} className="grid-row" gutter={48}>
        {row.map(({ name, type }, j) => (
          <Col key={j} span={24 / columns}>
            <DragAndDrop.Draggable i={position(columns, i, j)} render={draggableProps => (
              <DragAndDrop.Droppable
                droppable={type === 'folder'}
                i={position(columns, i, j)}
                onDrop={onMove}
                render={({ dropping, ...droppableProps }) => (
                  <Dropdown overlay={menu} trigger={['contextMenu']}>
                    <div style={{ userSelect: 'none' }}>
                      <div
                        {...draggableProps}
                        {...droppableProps}
                        className={classNames('grid-item', {
                          'Droppable-hovered': dropping
                        })}
                        onClick={() => onNavigate(type, name, position(columns, i, j))}
                      >
                        <Icon className="grid-item-icon" type={type} />
                        <span>{filename(name)}</span>
                      </div>
                    </div>
                  </Dropdown>
                )}
              />
           )} />
          </Col>
        ))}
      </Row>
    ))}
  </>
);
