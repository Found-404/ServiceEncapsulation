import React from "react";
import { FormItem, Input, FormGrid } from "@formily/antd";
import { FormProvider, createSchemaField } from "@formily/react";
import { createForm } from "@formily/core";
import { Row, Col } from "antd";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    FormGrid,
  },
});

const form = createForm();
const Formily = () => {
  return (
    <Row>
      <Col span={8} offset={2}>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{
                maxColumns: 3,
                minColumns: 2,
              }}
            >
              <SchemaField.String
                name="aaa"
                title="aaa"
                x-decorator="FormItem"
                x-decorator-props={{ gridSpan: 2 }}
                x-component="Input"
              />
              <SchemaField.String
                name="bbb"
                title="bbb"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="ccc"
                title="ccc"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="ddd"
                title="ddd"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="eee"
                title="eee"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="fff"
                title="fff"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="ggg"
                title="ggg"
                x-decorator="FormItem"
                x-component="Input"
              />
            </SchemaField.Void>
          </SchemaField>
        </FormProvider>
      </Col>
    </Row>
  );
};

export default Formily;
