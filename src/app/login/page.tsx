"use client";

import { LoginPageWrapper } from "@components";
import { Form } from "antd";
import { BaseForm } from "@common/components";

const formID = "login-form";

export default function LoginPage() {

  const [loginForm] = Form.useForm();

  return <LoginPageWrapper>
    <BaseForm layout="vertical" form={loginForm} id={formID}>
      <BaseForm.Text
        itemProps={{
          label: "Email",
          name: "email",
          required: true,
          rules: {
            type: "email",
            message: "Invalid email",
          },
        }}
        inputProps={{
          placeholder: "Enter your email",
        }}
      />
      <BaseForm.Text
        itemProps={{
          label: "Password",
          name: "password",
          required: true,
        }}
        inputProps={{
          placeholder: "Enter your password",
        }}
      />
    </BaseForm>
  </LoginPageWrapper>;
}
