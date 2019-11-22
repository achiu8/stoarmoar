import React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

import '../styles/Header.css';

const initials = ({ firstName, lastName }) =>
  `${firstName[0]}${lastName[0]}`;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/settings">Settings</Link>
    </Menu.Item>
    <Menu.Item>Log out</Menu.Item>
  </Menu>
);

export default ({ loggedIn, user }) => (
  <Layout.Header>
    <Row type="flex" justify="space-between">
      <Col>
        <Link to="/">
          <span className="atlas">Atlas</span>
        </Link>>
        <span className="atlas-motto">your map to the clouds</span>
      </Col>
      <Col>
        {loggedIn && user && (
          <Dropdown placement="bottomRight" overlay={menu}>
            <Avatar className="Header-avatar">{initials(user)}</Avatar>
          </Dropdown>
        )}
      </Col>
    </Row>
  </Layout.Header>
);
