import React from 'react';
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Log out</Menu.Item>
  </Menu>
);

export default () => (
  <Layout.Header>
    <Row type="flex" justify="end">
      <Col>
        <Dropdown placement="bottomRight" overlay={menu}>
          <Avatar icon="user" />
        </Dropdown>
      </Col>
    </Row>
  </Layout.Header>
);
