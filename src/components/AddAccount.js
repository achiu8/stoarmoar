import React from 'react';
import { Col, Icon, Modal, Row } from 'antd';
import { Link } from "react-router-dom";

import { chunksOf, accountName } from '../utils';
import accountTypes from '../utils/account_types';

import '../styles/AddAccount.css';

export default props => (
  <Modal title="Add Account" footer={null} {...props}>
    {chunksOf(4, accountTypes).map((row, i) => (
      <Row key={i} className="grid-row" gutter={[48, 48]}>
        {row.map(id => (
          <Col key={id} span={6}>
            <div className="grid-item" href="www.#.com">
              <Link className="grid-item" to="www.#.com">
                <Icon className="grid-item-icon" type={id} />
                <span>{accountName(id)}</span>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    ))}
  </Modal>
);
