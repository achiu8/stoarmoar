import React from 'react';
import { Col, Icon, Layout, Row } from 'antd';

import { chunksOf } from './utils';
import { files } from './sample_data';

import './Files.css';

const Content = Layout.Content;

export default () => (
  <Layout className="Files">
    <Content>
      <h1>My Files</h1>
      {chunksOf(12, files).map((row, i) => (
        <Row key={i} className="grid-row" gutter={48}>
          {row.map((file, j) => (
            <Col key={j} span={2}>
              <div className="grid-item">
                <Icon className="grid-item-icon" type={file} />
                <span>filename-{j}</span>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Content>
  </Layout>
);
