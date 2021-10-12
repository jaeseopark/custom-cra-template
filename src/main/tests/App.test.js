import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("it renders the app", () => {
  const { container, getByText } = render(<App />);
  expect(getByText("Edit")).toBeTruthy();
  expect(container).toMatchSnapshot();
});
