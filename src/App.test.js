import { render, screen } from '@testing-library/react';
import App from './App';

test('affiche le slogan principal de Hark Elec', () => {
  render(<App />);
  const headline = screen.getByText(/l'expertise électrique/i);
  expect(headline).toBeInTheDocument();
});
