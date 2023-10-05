// @vitest-environment happy-dom

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const initialCount = 5;
  render(<Counter initialCount={initialCount} />);
  const currentCount = screen.getByTestId('current-count');

  expect(currentCount).toHaveTextContent(String(initialCount));
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const initialCount = 5;
  const user = userEvent.setup();
  render(<Counter initialCount={initialCount} />);
  
  const header = screen.getByText(/Gitastrophe™/)
  const currentCount = screen.getByTestId('current-count');
  const button = screen.getByRole('button', { name: /reset/i });

  await user.click(button);

  expect(currentCount).toHaveTextContent('0');
});
