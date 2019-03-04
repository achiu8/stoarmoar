import React from 'react';
import { Col, Icon, Layout, Row } from 'antd';

import { chunksOf, iconForType, filename } from './utils';

import './Files.css';

const Content = Layout.Content;

const COLUMNS = 8;

export default ({ files }) => (
  <Layout className="Files">
    <Content>
      <h1>My Files</h1>
      {chunksOf(COLUMNS, files).map((row, i) => (
        <Row key={i} className="grid-row" gutter={48}>
          {row.map(({ name, mimeType }, j) => (
            <Col key={j} span={24 / COLUMNS}>
              <div className="grid-item">
                <Icon className="grid-item-icon" type={iconForType(mimeType)} />
                <span>{filename(name)}</span>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Content>
  </Layout>
);
