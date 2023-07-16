import { render, screen, cleanup } from "@testing-library/react";
import Footer from "../../Footer";

afterEach(() => {
  cleanup();
});

test("should render footer component", () => {
  render(<Footer />);
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
});

test("should contain correct text in footer", () => {
  render(<Footer />);
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toHaveTextContent("Made with ❤️ in Melbourne.");
  expect(footerElement).toHaveTextContent(
    "@ 2016 Broccoli & Co. All rights reserved."
  );
});
