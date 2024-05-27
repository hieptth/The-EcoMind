"use client";

import { LoginPageWrapper } from "@components";
import { Checkbox, Divider, Form } from "antd";
import { BaseForm, CustomTypography } from "@common/components";
import {
  ArrowLeft,
  Bubble,
  Eye,
  EyeSlash,
  Facebook,
  Google,
} from "iconsax-react";
import Link from "next/link";
import { BaseButton } from "@common/UI";
import { SocialLogin } from "./register.styles";

const formID = "login-form";

export default function LoginPage() {
  const [loginForm] = Form.useForm();

  return (
    <LoginPageWrapper>
      <BaseForm
        layout="vertical"
        form={loginForm}
        id={formID}
        autoComplete={"off"}
      >
        <BaseForm.Text
          itemProps={{
            label: "Email",
            name: "email",
            required: true,
            className: "form-row",
            rules: {
              type: "email",
              message: "Invalid email",
            },
          }}
          inputProps={{
            placeholder: "Enter your email",
            className: "custom-input",
            suffix: <Bubble />,
          }}
        />
        <BaseForm.Password
          itemProps={{
            label: "Password",
            name: "password",
            required: true,
            className: "form-row",
          }}
          inputProps={{
            placeholder: "Enter your password",
            iconRender: (visible) => (visible ? <Eye /> : <EyeSlash />),
            className: "custom-input",
            autoComplete: "on",
          }}
        />
        <BaseForm.Password
          itemProps={{
            label: "Re-enter Password",
            name: "re-password",
            required: true,
            className: "form-row",
          }}
          inputProps={{
            placeholder: "Enter your password again",
            iconRender: (visible) => (visible ? <Eye /> : <EyeSlash />),
            className: "custom-input",
            autoComplete: "on",
          }}
        />
      </BaseForm>

      <BaseButton
        onClick={() => loginForm.submit()}
        type="primary"
        className="login-btn"
      >
        Sign up
      </BaseButton>

      <SocialLogin>
        <ArrowLeft size="16" color="#737D8C" />
        <Link href={"./login"}>{"Return to login"}</Link>
      </SocialLogin>
    </LoginPageWrapper>
  );
}
