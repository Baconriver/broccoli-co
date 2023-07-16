import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import MainBody from "../../MainBody";

afterEach(() => {
  cleanup();
});

test("should render MainBody component", () => {
  render(<MainBody />);
  const mainBodyElement = screen.getByTestId("main-body");
  expect(mainBodyElement).toBeInTheDocument();
});

test("should contain correct elements in MainBody", () => {
  render(<MainBody />);
  const mainBodyTitle = screen.getByTestId("main-body-title");
  const mainBodySubTitle = screen.getByTestId("main-body-subtitle");
  const button = screen.getByTestId("main-body-button");
  expect(mainBodyTitle).toHaveTextContent("A better way to enjoy every day.");
  expect(mainBodySubTitle).toHaveTextContent(
    "Be the first to know when we launch."
  );
  expect(button).toHaveTextContent("Request an invite");
});

test("should open/close the modal", async () => {
  render(<MainBody />);
  const requestButton = screen.getByTestId("main-body-button");
  fireEvent.click(requestButton);
  const modal = screen.getByTestId("register-modal");
  // eslint-disable-next-line
  const backdrop = document.querySelector(".MuiModal-backdrop");
  expect(modal).toBeInTheDocument();
  fireEvent.click(backdrop!);

  expect(modal).not.toBeInTheDocument();
});
