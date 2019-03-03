import React from 'react';
import { Col, Icon, Layout, Row } from 'antd';

import { chunksOf } from './utils';

import './Files.css';

const Content = Layout.Content;

export default ({ files }) => (
  <Layout className="Files">
    <Content>
      <h1>My Files</h1>
      {chunksOf(12, files).map((row, i) => (
        <Row key={i} className="grid-row" gutter={48}>
          {row.map(({ name }, j) => (
            <Col key={j} span={2}>
              <div className="grid-item">
                <Icon className="grid-item-icon" type="file" />
                <span>{name}</span>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Content>
  </Layout>
);
