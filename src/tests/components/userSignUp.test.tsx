import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserSignUp } from '@/components/principal/HomeContent/userSignUp';

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
import { handleCepChange } from '@/utils/cepChange';

jest.mock('@/utils/cepChange', () => ({
  handleCepChange: jest.fn(),
}));

describe('UserSignUp component', () => {
  const mockSetHaveAccount = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useActionState as jest.Mock).mockReturnValue([{ errors: {}, message: '' }, jest.fn(), false]);
  });

  it('renders all input fields and labels', () => {
    render(<UserSignUp setHaveAccount={mockSetHaveAccount} />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cep/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirme a senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('calls setHaveAccount when clicking "Login"', () => {
    render(<UserSignUp setHaveAccount={mockSetHaveAccount} />);
    fireEvent.click(screen.getByText(/login/i));
    expect(mockSetHaveAccount).toHaveBeenCalledWith('login');
  });

  it('calls handleCepChange on blur of zipCode input', () => {
    render(<UserSignUp setHaveAccount={mockSetHaveAccount} />);
    const cepInput = screen.getByPlaceholderText('12345-00');
    fireEvent.blur(cepInput, { target: { value: '12345-678' } });
    expect(handleCepChange).toHaveBeenCalledWith('12345-678');
  });
});