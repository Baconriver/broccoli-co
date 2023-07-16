import { render, screen, cleanup } from "@testing-library/react";
import NavBar from "../../NavBar";

afterEach(() => {
  cleanup();
});

test("should render navbar component", () => {
  render(<NavBar />);
  const navBarElement = screen.getByTestId("navbar");
  expect(navBarElement).toBeInTheDocument();
});

test("should contain correct text in navbar", () => {
  render(<NavBar />);
  const navBarElement = screen.getByTestId("navbar");
  expect(navBarElement).toHaveTextContent("BROCCOLI & CO.");
});
