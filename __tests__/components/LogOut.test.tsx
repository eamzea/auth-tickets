import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { signOut } from 'next-auth/react';
import LogOut from '../../src/components/LogOut';

vi.mock('next-auth/react', () => ({
  signOut: vi.fn(),
}));

describe('LogOut component', () => {
  it('renders the logout button', () => {
    const screen = render(<LogOut />);

    const button = screen.getAllByTestId('logout')[0];

    expect(button).toBeTruthy();
  });

  it('calls signOut on button click', async () => {
    const screen = render(<LogOut />);

    const button = screen.getAllByTestId('logout')[0];

    expect(button).toBeTruthy();

    fireEvent.click(button);

    expect(signOut).toHaveBeenCalledWith({ redirect: true, callbackUrl: '/signin' });
  });
});
