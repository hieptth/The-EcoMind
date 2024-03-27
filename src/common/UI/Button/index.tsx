import { ButtonProps } from "antd/es/button/button";
import { StyledBaseButton } from "./button.styles";

export type CustomButtonProps = ButtonProps & {
  $color?: string;
};

export const BaseButton = (props: CustomButtonProps) => {
  return <StyledBaseButton {...props} />;
};
