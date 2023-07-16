import { render, screen, cleanup, waitFor } from "@testing-library/react";
import ModalContent from "../../ModalContent";
import user from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

const setup = () => render(<ModalContent handleClose={() => {}} />);

test("should render ModalContent component", () => {
  setup();
  const modalContent = screen.getByTestId("modal-content");
  expect(modalContent).toBeInTheDocument();
});

test("should contain correct elements in ModalContent by default", () => {
  setup();
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
  setup();
  const button = screen.getByTestId("modal-button");
  await user.click(button);
  const errorMessages = await screen.findAllByTestId("error-message");
  await waitFor(() => {
    expect(errorMessages.length).toBe(3);
  });
});

test("should display full name input field less 3 characters validation", async () => {
  setup();
  const fullNameInput = screen.getByTestId("input-full-name");
  await user.type(fullNameInput, "ab");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Must be at least 3 characters");
  });
});

test("should display full name input field over 35 characters validation", async () => {
  setup();
  const fullNameInput = screen.getByTestId("input-full-name");
  await user.type(fullNameInput, "asdfasdfasdfasdfasdfasdfadsfasdfasdf");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Must be 35 characters or less");
  });
});

test("should display email validation", async () => {
  setup();
  const emailInput = screen.getByTestId("input-email");
  await user.type(emailInput, "asdfasdf");
  await user.tab();
  const error = await screen.findByTestId("error-message");
  await waitFor(() => {
    expect(error).toHaveTextContent("Invalid email address");
  });
});

test("should display confirm email validation", async () => {
  setup();
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
