import React from "react";
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import ModalContent from "../../ModalContent";
import user from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

test("should render ModalContent component", () => {
  render(<ModalContent />);
  const modalContent = screen.getByTestId("modal-content");
  expect(modalContent).toBeInTheDocument();
});

test("should contain correct elements in ModalContent by default", () => {
  render(<ModalContent />);
  const modalContentTitle = screen.getByTestId("modal-content-title");
  const fullNameInput = screen.getByTestId("input-full-name");
  const emailInput = screen.getByTestId("input-email");
  const confirmEmailInput = screen.getByTestId("input-confirm-email");
  const button = screen.getByTestId("modal-button");

  expect(modalContentTitle).toHaveTextContent("Request an invite");
  expect(fullNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(confirmEmailInput).toBeInTheDocument();
  expect(button).toHaveTextContent("Send");
});

test("should display required validation", async () => {
  render(<ModalContent />);
  const button = screen.getByTestId("modal-button");
  await user.click(button);
  const errorMessages = await screen.findAllByTestId("error-message");
  await waitFor(() => {
    expect(errorMessages.length).toBe(3);
  });
});

test("should display full name input field less 3 characters validation", async () => {
  render(<ModalContent />);
  const fullNameInput = screen.getByTestId("input-full-name");
  await user.type(fullNameInput, "ab");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Must be at least 3 characters");
  });
});

test("should display full name input field over 35 characters validation", async () => {
  render(<ModalContent />);
  const fullNameInput = screen.getByTestId("input-full-name");
  await user.type(fullNameInput, "asdfasdfasdfasdfasdfasdfadsfasdfasdf");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Must be 35 characters or less");
  });
});

test("should display email validation", async () => {
  render(<ModalContent />);
  const emailInput = screen.getByTestId("input-email");
  await user.type(emailInput, "asdfasdf");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Invalid email address");
  });
});

test("should display confirm email validation", async () => {
  render(<ModalContent />);
  const emailInput = screen.getByTestId("input-email");
  const confirmEmailInput = screen.getByTestId("input-confirm-email");
  await user.type(emailInput, "test@gmail.com");
  await user.type(confirmEmailInput, "testt@gmail.com");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Confirm email is not the same");
  });
});
