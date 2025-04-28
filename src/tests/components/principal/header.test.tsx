import { useUser } from '@/hooks/useUser';
import { HeaderContent } from '@/components/principal/Header/HeaderContent';
import { render, screen } from '@testing-library/react';
import { useCart } from '@/hooks/useCart';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/hooks/useUser', () => ({
  useUser: jest.fn(),
}));

jest.mock('@/hooks/useCart', () => ({
    useCart: jest.fn(() => ({
      cart: [],
    })),
}));

jest.mock('@gsap/react', () => ({
    useGSAP: jest.fn(),
}));

describe('HeaderContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /system/restaurantAdmin when user.isAdmin is true', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { isAdmin: true },
    });

    render(<HeaderContent />);
    
    expect(pushMock).toHaveBeenCalledWith('/system/restaurantAdmin');
  });

  it('renders "Carregando..." when user is null', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
    });

    render(<HeaderContent />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders notification icon when user is present', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { isAdmin: false },
    });

    render(<HeaderContent />);
    expect(screen.getByTestId('bell')).toBeInTheDocument();
  });

  it('render cart bag when cart have itens', () => {
    (useCart as jest.Mock).mockReturnValueOnce({
        cart: [ { quantity:1, product: 'Pizza' }]
    })

    render(<HeaderContent />)
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  })
});