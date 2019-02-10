import React from 'react';
import { Col, Icon, Modal, Row } from 'antd';

import { chunksOf } from './utils';
import { accountTypes } from './sample_data';

export default props => (
  <Modal title="Add Account" footer={null} {...props}>
    {chunksOf(4, accountTypes).map((row, i) => (
      <Row key={i} className="grid-row" gutter={48}>
        {row.map(({ id, name }) => (
          <Col key={id} span={6}>
            <div className="grid-item">
              <Icon className="grid-item-icon" type={id} />
              <span>{name}</span>
            </div>
          </Col>
        ))}
      </Row>
    ))}
  </Modal>
);
