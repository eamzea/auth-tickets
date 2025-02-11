import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LogIn from '../../src/components/LogIn';
import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

describe('LogIn Component', () => {
  const mockReplace = vi.fn();
  const mockGet = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ replace: mockReplace });
    (useSearchParams as Mock).mockReturnValue({ get: mockGet });
    mockGet.mockReturnValue('/');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders GitHub and Custom buttons', () => {
    const screen = render(<LogIn />);

    expect(screen.getByText('GitHub')).toBeTruthy();
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('calls signIn with GitHub provider when GitHub button is clicked', async () => {
    const screen = render(<LogIn />);

    const button = screen.getAllByTestId('github-login')[0]

    expect(button).toBeTruthy()

    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith('github', { callbackUrl: '/' });


  });

  it('calls signIn with credentials provider when Custom button is clicked', async () => {
    const screen = render(<LogIn />);
    const button = screen.getAllByTestId('custom-login')[0]

    expect(button).toBeTruthy()

    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith('credentials', { callbackUrl: '/' });
  });
});
