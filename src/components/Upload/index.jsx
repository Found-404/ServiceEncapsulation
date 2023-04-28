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
    accept: "audio/*,video/*,.pdf,.m4v,.mp4,.jpg",
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
