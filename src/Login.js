import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import './Login.css';

const FormItem = Form.Item;

const Login = ({ form: { getFieldDecorator } }) => (
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
      <a href="" className="Login-form-forgot">Forgot password</a>
      <Button type="primary" htmlType="submit" className="Login-form-button">
        Log in
      </Button>
      Don't have an account? <Link to="/create">Create one now</Link>
    </FormItem>
  </Form>
);

export default Form.create()(Login);
