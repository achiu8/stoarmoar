import React from 'react';
import { Col, Icon, Modal, Row } from 'antd';

import { chunksOf, accountName } from './utils';
import accountTypes from './utils/account_types';

export default props => (
  <Modal title="Add Account" footer={null} {...props}>
    {chunksOf(4, accountTypes).map((row, i) => (
      <Row key={i} className="grid-row" gutter={48}>
        {row.map(id => (
          <Col key={id} span={6}>
            <div className="grid-item">
              <Icon className="grid-item-icon" type={id} />
              <span>{accountName(id)}</span>
            </div>
          </Col>
        ))}
      </Row>
    ))}
  </Modal>
);
