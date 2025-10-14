import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  it('calls onSubmit with correct arguments when form is submitted', async () => {
    const mockOnSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SignInContainer onSubmit={mockOnSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign in'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit.mock.calls[0][0]).toEqual({
        username: 'testuser',
        password: 'password123',
      });
    });
  });
});
