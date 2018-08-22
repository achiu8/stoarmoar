import React from 'react';
import { Form, Input, Button } from 'antd';

import './Create.css';

const FormItem = Form.Item;

const Create = ({ form: { getFieldDecorator } }) => (
  <Form className="Create-form">
    <FormItem>
      {getFieldDecorator('firstname', {
        rules: [{ required: true, message: 'Please input your first name.' }]
      })(
        <Input placeholder="First name" />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator('lastname', {
        rules: [{ required: true, message: 'Please input your last name.' }]
      })(
        <Input placeholder="Last name" />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please select an ID.' }]
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
      {getFieldDecorator('confirm', {
        rules: [{ required: true, message: 'Please confirm your password.' }]
      })(
        <Input type="password" placeholder="Confirm password" />
      )}
    </FormItem>
    <FormItem>
      <Button type="primary" htmlType="submit" className="Create-form-button">
        Create Atlas Account
      </Button>
    </FormItem>
  </Form>
);

export default Form.create()(Create);
