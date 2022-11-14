/* eslint-disable */
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './form-container.module.scss';

function SignUpForm({ onCommit }) {
  const [form] = useForm();
  
  return (
    <>
      <div style={{width: "400px"}}>
        <h2>Create new account</h2>
        <Form requiredMark={false} form={form} layout="vertical" onFinish={onCommit}>
          <Form.Item
            className={styles.validateText}
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please enter username' }
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            className={styles.validateText}
            name="email"
            label="Email Address"
            requiredMark={false}
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' },
            ]}
          >
            <Input type="email" placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            className={styles.validateText}
            name="password"
            label="Password"
            requiredMark={false}
            rules={[
              { required: true, message: 'Please enter password' },
              { min: 6, message: 'Password should be at least 6 chars' },
              { max: 40, message: 'Password should be at most 40 chars' },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            className={styles.validateText}
            name="repeatPassword"
            label="Repeat Password"
            requiredMark={false}
            rules={[
              { required: true, message: 'Please repeat password' },
              {
                validator: (_, value, callback) => {
                  const original = form.getFieldValue('password');
                  value && original !== value ? callback('Password does not match') : callback();
                },
              },
            ]}
          >
            <Input type="password" placeholder="Repeat Password" />
          </Form.Item>

          <Divider />

          <Form.Item
            className={styles.validateText}
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value, callback) => {
                  value ? callback() : callback('Please confirm personal information processing');
                },
              },
            ]}
          >
            <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
          </Form.Item>

          <Button className={styles.signButton} type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>

      <p>
        Already have an account?
        <Link to="/sign-in">
          <Button className={styles.linkButton} type="link">Sign In.</Button>
        </Link>
      </p>
    </>
  );
}

export default SignUpForm;
