import styled from "styled-components";
import { Button } from "antd";
import { CustomButtonProps } from "./index";

export const StyledBaseButton = styled(Button)<CustomButtonProps>((props) => {
  const { $color } = props;

  return {
    width: "fit-content",
    height: "unset",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    padding: props.type === "primary" ? "8px 16px" : "8px 12px",

    "&.ant-btn-primary": {
      borderColor: "transparent",
      backgroundColor: $color ?? "#8F3523",
      "&:disabled": {
        backgroundColor: "#EAEDF0",
        color: "#BFC5CF",
      },

      "&:not(:disabled):hover": {
        backgroundColor: $color ?? "#8F3523CC",
      },
    },

    "&.ant-btn-default": {
      border: "1px solid #FFD6BE",
      fontWeight: 600,
      boxShadow: "unset",
    },

    "&.ant-btn-dashed": {
      border: "transparent",
      boxShadow: "unset",
      fontWeight: 600,
      backgroundColor: "#FFF1E9",
      color: $color ?? "#FF7828",

      "&:hover": {
        boxShadow: "0 0px 7px 0 rgba(0, 0, 0, 0.06)",
      },

      "&:disabled": {
        backgroundColor: "#EAEDF0",
        color: "#BFC5CF",
      },
    },

    "&.ant-btn-link": {
      color: "#FF7828",
      "&:hover": {
        backgroundColor: $color ?? "#FFF1E9 !important",
        span: {
          color: "#ff6c16",
        },
      },
      "span": {
        color: "#FF7828",
      },
    },

    "span": {
      fontSize: "14px",
      lineHeight: "20px",
      // fontFamily: "Nunito Sans, sans-serif",
      fontWeight: 600,
    },

    "& .ant-btn-icon svg path": {
      strokeWidth: 2,
    },

    "& .ant-btn-icon-only": {
      width: "unset",
      padding: "0 14px",
    },
  };
});
