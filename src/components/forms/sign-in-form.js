/* eslint-disable */
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './form-container.module.scss';

function SignInForm({ signInFailed, onCommit }) {
  const [form] = useForm();

  useEffect(() => {
    if (!signInFailed) return;
    form.setFields([
      { name: 'email', errors: ['Invalid email or password'] },
      { name: 'password', errors: ['Invalid email or password'] },
    ]);
  }, [form, signInFailed]);
  return (
    <>
      <div>
        <h2>Sign In</h2>
        <Form form={form} requiredMark={false} layout="vertical" onFinish={onCommit}>
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
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button className={styles.signButton} type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>

      <p>
        Don’t have an account?
        <Link to="/sign-up">
          <Button className={styles.linkButton} type="link">
            Sign Up.
          </Button>
        </Link>
      </p>
    </>
  );
}

export default SignInForm;
