import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main call to actions", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: /discutons de votre projet électrique/i,
      level: 2,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /demander un devis sous 48h/i })
  ).toBeInTheDocument();
});
