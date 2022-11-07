import { Button, Form, Input } from 'antd';
import React from 'react';

function ProfileForm({ defaultValue = null, onCommit }) {
  return (
    <div>
      <h2>Edit Profile</h2>
      <Form initialValues={defaultValue} requiredMark={false} layout="vertical" onFinish={onCommit}>
        <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter username' }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
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
          name="password"
          label="New Password"
          rules={[
            { min: 6, message: 'Password should be at least 6 chars' },
            { max: 40, message: 'Password should be at most 40 chars' },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Avatar Image (url)"
          requiredMark={false}
          rules={[
            { required: true, message: 'Please enter avatar image url' },
            { type: 'url', message: 'Please enter valid url' },
          ]}
        >
          <Input type="url" placeholder="Avatar image" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
