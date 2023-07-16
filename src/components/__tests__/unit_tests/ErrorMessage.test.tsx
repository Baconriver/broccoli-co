import { render, screen, cleanup } from "@testing-library/react";
import ErrorMessage from "../../ErrorMessage";

afterEach(() => {
  cleanup();
});

test("should render ErrorMessage component", () => {
  const message = "test";
  render(<ErrorMessage message={message} />);
  const errorElement = screen.getByTestId("error-message");
  expect(errorElement).toBeInTheDocument();
});

test("should contain correct text in footer", () => {
  const message = "Password is required.";
  render(<ErrorMessage message={message} />);
  const errorElement = screen.getByTestId("error-message");
  expect(errorElement).toHaveTextContent("Password is required.");
});
