import React from 'react';
import { Avatar, Col, Layout, Row } from 'antd';

export default () => (
  <Layout.Header>
    <Row type="flex" justify="end">
      <Col>
          <Avatar icon="user" />
      </Col>
    </Row>
  </Layout.Header>
);
