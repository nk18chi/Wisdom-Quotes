/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  label: string;
}

const ButtonStyles = css`
  color: white;
  :hover {
    opacity: 0.8;
    color: red;
  }
`;

const Button = ({ label, ...rest }: ButtonProps) => (
  <MuiButton {...rest} css={ButtonStyles}>
    {label}
  </MuiButton>
);

export default Button;
