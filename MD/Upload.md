## Form 接管 Upload 组件

实际业务当中对于文件的上传都需要使用到 `Form` 接管，但是请求到的文件列表该如何赋上初始文件呢 🧐

### 请求部分:

一个简单的 ~~axios~~ 请求

```js
import axios from "axios";

//页面数据
export function queryPage(payload) {
  return axios({
    url: "https://xxx(公司接口不做展示)",
    method: "post",
    params: payload,
    headers: {
      Authorization: "Bearer xxx", // token
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", // 避免两次请求
    },
  });
}
```

### 页面部分:

> 模拟很常见的业务场景

```js
import React, { useEffect } from "react";
import { Form, Select, Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { queryPage } from "./serve.js";

const UploadDemo = () => {
  const [form] = Form.useForm();

  const getLoad = async () => {
    const {
      data: { data }, // 双重结构
    } = await queryPage();
    console.log(data[0]);
    const { documentName, documentType, files } = data[0];
    const newfiles = files.map((item) => ({
      fileType: item.fileType,
      name: item.fileName,
      fileUri: item.fileUri,
      uid: item.fileId,
    }));
    /**
     * newfiles:
     * name: item.fileName
     * uid: xxx
     * fileType: "mp4"
     * fileUri: "https://xxx"
     */
    form.resetFields();
    form.setFieldsValue({ documentName, documentType, upload: newfiles });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const UploadProps = {
    name: "file",
    maxCount: 1,
    action: ``,
    headers: {
      Authorization: "",
      Accept: "application/json, text/plain, */*",
    },
    accept: "audio/*,video/*,.pdf,.m4v,.mp4",
  };

  useEffect(() => {
    getLoad();
  }, []);
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        labelCol={{ span: 4, offset: 2 }}
        wrapperCol={{ span: 20, offset: 2 }}
      >
        <Form.Item
          label="文件名称"
          name="documentName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="类型"
          name="documentType"
          rules={[{ required: true, message: "请选择类型" }]}
        >
          <Select
            options={[
              {
                label: "文档",
                value: "1",
              },
              {
                label: "视频",
                value: "2",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="upload"
          label="上传文件"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请选择上传文件" }]}
        >
          <Upload {...UploadProps}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => console.log(form.getFieldsValue())}
          >
            点击
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadDemo;
```

当请求到文件列表后就需要对数据重构成 Upload 可解析的结构，最重要的就是`name`和`fileType`

```js
...

const { documentName, documentType, files } = data[0];
const newfiles = files.map((item) => ({
  fileType: item.fileType,
  name: item.fileName,
  fileUri: item.fileUri,
  uid: item.fileId,
}));
/**
 * newfiles:
 * name: item.fileName
 * uid: xxx
 * fileType: "mp4"
 * fileUri: "https://xxx"
 */
form.resetFields();
form.setFieldsValue({ documentName, documentType, upload: newfiles });

...
```

为包裹 📦`<Upload/>`的`<Form.Item/>`添加`valuePropName="fileList"`和`getValueFromEvent`极其重要

```js

...

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

...

<Form.Item
  name="upload"
  label="上传文件"
  valuePropName="fileList"
  getValueFromEvent={normFile}
  rules={[{ required: true, message: "请选择上传文件" }]}
>
  <Upload {...UploadProps}>
    <Button icon={<UploadOutlined />}>点击上传</Button>
  </Upload>
</Form.Item>

...

```
