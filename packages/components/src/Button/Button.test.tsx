import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders a label", () => {
    const { getByText } = render(<Button label={"submit"} />);
    expect(getByText("submit"));
  });
});
