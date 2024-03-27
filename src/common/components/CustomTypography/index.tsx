import { CSSProperties } from "styled-components";
import "./styles.scss";

type CustomTypographyProps = {
  styles?: CSSProperties;
  variant: string;
  color?: string;
  children: string | React.ReactElement | React.ReactNode;
  onClick?: () => void;
};

export const CustomTypography = (props: CustomTypographyProps) => {
  const { styles, variant, color, children, onClick } = props;

  return (
    <p
      className={`${variant} unset`}
      style={{ color, ...styles }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};
