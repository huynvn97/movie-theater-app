import React from 'react';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import Chip from './index'; // Adjust the import path as necessary

describe('Chip Component testing', () => {
  it('renders correctly - simple', () => {
    render(<Chip label="Test Chip" />);
    expect(screen).toMatchSnapshot();
  });

  it('renders correctly - has pressable', async () => {
    const fn = jest.fn();
    const user = userEvent.setup();

    render(<Chip label="Test Chip Press" onPress={fn} />);

    await user.press(screen.getByTestId('ChipPressableTestID'));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(screen).toMatchSnapshot();
  });
});
