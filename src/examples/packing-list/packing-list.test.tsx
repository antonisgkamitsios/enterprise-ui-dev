import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);

  const button = screen.getByText('➕ Add New Item');
  const input = screen.getByLabelText('New Item Name');

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const userInput = 'Panagia';
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const button = screen.getByText('➕ Add New Item');

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();

  await user.type(input, userInput);

  expect(input).toHaveValue(userInput);
  expect(button).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const userInput = 'Panagia';
  const { user } = render(<PackingList />);

  const input = screen.getByLabelText('New Item Name');
  const button = screen.getByText('➕ Add New Item');

  await user.type(input, userInput);
  await user.click(button);
  const item = screen.getByLabelText(userInput);

  expect(item).not.toBeChecked();
});

