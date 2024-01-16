import React from "react";

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return (
    <button id='button' className='button-class' data-test-id='button'>
      {label}
    </button>
  );
};

export default Button;
