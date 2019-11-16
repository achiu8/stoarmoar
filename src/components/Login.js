import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Layout } from 'antd';

import SocialAuth from './SocialAuth';

import '../styles/Login.css';

const FormItem = Form.Item;

const handleClick = (history, onLogin) => e => {
  e.preventDefault();
  onLogin();
  history.push('/');
};

const Login = ({ form: { getFieldDecorator }, history, onLogin }) => (
  <Layout className="Login App-content">
    <Form className="Login-form">
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your Atlas ID.' }]
        })(
          <Input placeholder="Atlas ID" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your password.' }]
        })(
          <Input type="password" placeholder="Password" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a href="/" className="Login-form-forgot">Forgot password</a>
        <Button
          type="primary"
          htmlType="submit"
          className="Login-form-button"
          onClick={handleClick(history, onLogin)}
        >
          Log in
        </Button>
        Don't have an account? <Link to="/create">Create one now</Link>
      </FormItem>
    </Form>
    <SocialAuth />
  </Layout>
);

export default Form.create()(Login);
