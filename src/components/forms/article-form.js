/* eslint-disable */
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

import style from './article-form.module.scss';

function ArticleForm({ onCommit, initialValue = null, h2 }) {
  if (!initialValue) {
    initialValue = {
      tagList: [''],
    };
  }
  if (initialValue.tagList.length === 0) {
    initialValue = { ...initialValue, tagList: [''] };
  }

  const handleCommit = (value) => {
    value = {
      ...value,
      tagList: value.tagList
        .map((tag) => tag ?? '')
        .map((tag) => tag.replace(/\s+/gim, ' ').trim())
        .filter((tag) => tag.length > 0),
    };
    onCommit(value);
  };
  return (
    <>
      <div>
        <h2>{h2}</h2>
        <Form requiredMark={false} layout="vertical" onFinish={handleCommit} initialValues={initialValue}>
          <Form.Item
            name="title"
            label="Title"
            requiredMark={false}
            rules={[{ required: true, message: 'Please enter article title' }]}
          >
            <Input type="text" placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Short Description"
            requiredMark={false}
            rules={[{ required: true, message: 'Please enter short description' }]}
          >
            <Input type="text" placeholder="Short Description" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Text"
            requiredMark={false}
            rules={[{ required: true, message: 'Please enter article text' }]}
          >
            <TextArea placeholder="Text" />
          </Form.Item>

          <Form.List name="tagList">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item key={field.key}>
                    <div className={style.tag}>
                      <Form.Item noStyle {...field}>
                        <Input type="text" placeholder="Tag" />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Button danger onClick={() => remove(field.name)}>
                          Delete
                        </Button>
                      ) : null}
                      {fields.length - 1 === index ? <Button className={style.add} onClick={() => add()}>Add tag</Button> : null}
                    </div>
                  </Form.Item>
                ))}
              </>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ArticleForm;
