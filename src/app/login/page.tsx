"use client";

import { LoginPageWrapper } from "@components";
import { Checkbox, Divider, Form } from "antd";
import { BaseForm, CustomTypography } from "@common/components";
import { Bubble, Eye, EyeSlash } from "iconsax-react";
import Link from "next/link";
import { BaseButton } from "@common/UI";

const formID = "login-form";

export default function LoginPage() {

  const [loginForm] = Form.useForm();

  return <LoginPageWrapper>
    <BaseForm layout="vertical" form={loginForm} id={formID} autoComplete={"off"}>
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
          suffix: <Bubble/>,
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
          iconRender: (visible) => visible ? <Eye/> : <EyeSlash/>,
          className: "custom-input",
          autoComplete: "on",
        }}
      />
      <div className={"sub-btn-group"}>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox className="checkbox">
            <CustomTypography variant="T14R">
              {"Remember login for 30 days"}
            </CustomTypography>
          </Checkbox>
        </Form.Item>
        <Link href={"/login/forgot"}>
          <CustomTypography variant="T14M" color="#8F3523">
            {"Forgot password?"}
          </CustomTypography>
        </Link>
      </div>
    </BaseForm>

    <BaseButton onClick={() => loginForm.submit()} type="primary" className="login-btn">
      Login
    </BaseButton>

    <div className="divider">
      <Divider>{"or"}</Divider>
    </div>

  </LoginPageWrapper>;
}
