import React from 'react';
import { Col, Icon, Row } from 'antd';

import { chunksOf, filename, filesForAccount } from './utils';

export default ({ account, columns, files, onMove, onNavigate }) => (
  chunksOf(columns, filesForAccount(account, files)).map((row, i) => (
    <Row key={i} className="grid-row" gutter={48}>
      {row.map(({ name, type }, j) => (
        <Col key={j} span={24 / columns}>
          <div
            className="grid-item"
            onClick={() => onNavigate(type, name, columns * i + j)}
          >
            <Icon className="grid-item-icon" type={type} />
            <span>{filename(name)}</span>
          </div>
        </Col>
      ))}
    </Row>
  ))
);
