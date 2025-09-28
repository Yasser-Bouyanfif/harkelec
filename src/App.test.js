import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le titre des services haut de gamme", () => {
  render(<App />);
  const heading = screen.getByText(/solutions électriques haut de gamme/i);
  expect(heading).toBeInTheDocument();
});
