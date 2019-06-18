import React from 'react';
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

const initials = ({ firstName, lastName }) =>
  `${firstName[0]}${lastName[0]}`;

const menu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Log out</Menu.Item>
  </Menu>
);

export default ({ loggedIn, user }) => (
  <Layout.Header>
    <Row type="flex" justify="end">
      <Col>
      {loggedIn && user && (
        <Dropdown placement="bottomRight" overlay={menu}>
          <Avatar>{initials(user)}</Avatar>
        </Dropdown>
      )}
      </Col>
    </Row>
  </Layout.Header>
);
