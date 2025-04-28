import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RestaurantSignUp } from '@/components/principal/HomeContent/restaurantSignUp';

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useActionState: jest.fn(),
  };
});

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
  }));
  
  jest.mock('next/headers', () => ({
    cookies: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(),
    })),
  }));
  
  jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
  }));
  

import { useActionState } from 'react';

jest.mock('@/utils/cepChange', () => ({
  handleCepChange: jest.fn(),
}));

describe('RestaurantSignUp component', () => {
  const mockSetHaveAccount = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useActionState as jest.Mock).mockReturnValue([{ errors: {}, message: '' }, jest.fn(), false]);
  });

  it('renders all input fields and labels', () => {
    render(<RestaurantSignUp setHaveAccount={mockSetHaveAccount} />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirme a senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('calls setHaveAccount when clicking "Login"', () => {
    render(<RestaurantSignUp setHaveAccount={mockSetHaveAccount} />);
    fireEvent.click(screen.getByText(/login/i));
    expect(mockSetHaveAccount).toHaveBeenCalledWith('login');
  });
});