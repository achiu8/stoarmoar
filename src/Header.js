import React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Col, Dropdown, Layout, Menu, Row } from 'antd';

import './styles/Header.css';

const initials = ({ firstName, lastName }) =>
  `${firstName[0]}${lastName[0]}`;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/" > Home </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/settings" > Settings </Link>
    </Menu.Item>
    <Menu.Item>Log out</Menu.Item>
  </Menu>
);

export default ({ loggedIn, user }) => (
  <Layout.Header>
    <Row type="flex" justify="space-between">
      <Col span={5}>
        <span className="atlas"> Atlas    </span>
        <span className="atlas-motto"> your map to the clouds </span>
      </Col>
      <Col span={1}>
      {loggedIn && user && (
        <Dropdown placement="bottomRight" overlay={menu}>
          <Avatar>{initials(user)}</Avatar>
        </Dropdown>
      )}
      </Col>
    </Row>
  </Layout.Header>
);
