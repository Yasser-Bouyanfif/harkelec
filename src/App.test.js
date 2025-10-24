import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le numéro de téléphone de contact", () => {
  render(<App />);
  const phoneLinks = screen.getAllByRole("link", { name: /06 73 26 23 71/i });
  expect(phoneLinks.length).toBeGreaterThan(0);
});
