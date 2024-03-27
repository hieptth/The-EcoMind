"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { StyledForm } from "./form.styles";
import { Form, FormInstance, FormProps, Input, InputProps } from "antd";
import { Rule } from "antd/es/form";
import { PasswordProps, TextAreaProps } from "antd/es/input";

type BaseLayoutType = "horizontal" | "vertical" | "inline";

let globalLayout: BaseLayoutType = "horizontal";

const renderItemLabel = (label: string, required: boolean) => {
  // const { t } = useTranslation({ keyPrefix: "common" });

  return required ? label : (
    <>
      {label}
      {globalLayout === "vertical" ? " " : <br/>}
      {/* {"(" + t("optional") + ")"}*/}
    </>
  );
};


type BaseFormProps = FormProps & {
  layout: BaseLayoutType;
  form: FormInstance;
  id: string;
  children: ReactNode;
}

export const BaseForm = (props: BaseFormProps) => {
  const { layout, form, children } = props;
  const [formLayout, setFormLayout] = useState<BaseLayoutType>("horizontal");

  useEffect(() => {
    globalLayout = layout;
    setFormLayout(layout);
  }, [layout]);

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  return (
    <StyledForm {...formItemLayout} initialValues={{ layout: formLayout }}
      labelWrap autoComplete="off" requiredMark={false}
      onFinish={() => form.resetFields()}
      {...props}
    >
      {children}
    </StyledForm>
  );
};

type ItemProps = {
  label: string;
  name: string;
  rules?: Rule;
  required?: boolean;
  className?: string
}

type TextInputProps = {
  itemProps: ItemProps,
  inputProps: InputProps
};

const TextInput = (props: TextInputProps) => {
  const { itemProps, inputProps } = props;
  // const { t } = useTranslation({ keyPrefix: "common" });
  const { t } = { t: (key: string) => key };

  return (
    <Form.Item {...itemProps}
      rules={[
        { required: itemProps?.required, message: `${itemProps.label + " " + t("inputRequired")}` },
        { ...itemProps?.rules },
      ]}
      label={renderItemLabel(itemProps.label, itemProps?.required || false)}
    >
      <Input {...inputProps} />
    </Form.Item>
  );
};

type PasswordInputProps = {
  itemProps: ItemProps,
  inputProps: PasswordProps
};

const PasswordInput = (props: PasswordInputProps) => {
  const { itemProps, inputProps } = props;
  // const { t } = useTranslation({ keyPrefix: "common" });
  const { t } = { t: (key: string) => key };

  return (
    <Form.Item {...itemProps}
      rules={[
        { required: itemProps?.required, message: `${itemProps.label + " " + t("inputRequired")}` },
        { ...itemProps?.rules },
      ]}
      label={renderItemLabel(itemProps.label, itemProps?.required || false)}
    >
      <Input.Password {...inputProps} />
    </Form.Item>
  );
};

type TextareaInputProps = {
  itemProps: ItemProps,
  inputProps: TextAreaProps
};

const TextareaInput = (props: TextareaInputProps) => {
  const { itemProps, inputProps } = props;
  // const { t } = useTranslation({ keyPrefix: "common" });
  const { t } = { t: (key: string) => key };

  return (
    <Form.Item {...itemProps}
      rules={[
        { required: itemProps?.required, message: `${itemProps.label + " " + t("inputRequired")}` },
        { ...itemProps?.rules },
      ]}
      label={renderItemLabel(itemProps.label, itemProps?.required || false)}
    >
      <Input.TextArea {...inputProps} />
    </Form.Item>
  );
};

BaseForm.Text = TextInput;
BaseForm.Password = PasswordInput;
BaseForm.Textarea = TextareaInput;
