import { CheckoutContent } from '@/components/principal/CheckoutContent';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn(() => ({
    cart: [
      {
        restaurantId: '1',
        product: { id: '1', name: 'Pizza', price: 50, image: '/pizza.jpg' },
        quantity: 2,
        observation: 'Sem cebola'
      }
    ],
    totalCart: 100,
  })),
}));

jest.mock('@/hooks/useUser', () => ({
  useUser: jest.fn(() => ({
    user: { id: 'user1', address: 'Rua A', zipCode: '12345-678' },
  })),
}));

jest.mock('@/hooks/useOrders', () => ({
    useOrders: jest.fn(() => ({
      order: [
        {
          id: 'order1',
          userId: 'user1',
          status: 'Pending',
          createdAt: new Date().toISOString(),
        },
      ],
    })),
}));
  

jest.mock('@/hooks/useNotifications', () => ({
  useNotifications: jest.fn(() => ({
    notifiedOrders: [],
    clearNotification: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: jest.fn(() => '/checkout/1'),
}));

jest.mock('@/utils/formatPrice', () => ({
  FormatPrice: (price: number) => `R$ ${price.toFixed(2)}`,
}));

jest.mock('@/app/actions/OrderActions', () => ({
  handleCreateOrder: jest.fn(),
  handleUpdateOrder: jest.fn(),
}));

jest.mock('@/app/actions/RestaurantActions', () => ({
  handleAvaliation: jest.fn(),
}));

jest.mock('@/components/global/Loading', () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

jest.mock('@/components/principal/Map', () => ({
  Map: () => <div data-testid="map">Map Component</div>,
}));

jest.mock('@/components/principal/CheckoutContent/Chat', () => ({
  Chat: () => <div data-testid="chat">Chat Component</div>,
}));

describe('CheckoutContent', () => {
  const mockOrders:any = [
    {
      id: 'order1',
      createdAt: new Date().toISOString(),
      status: 'Accepted',
      userId: 'user1',
    }
  ];

  const mockData = {};
  const mockRestaurant:any = { id: 'restaurant1', zipCode: '12345-678' };

  it('renders cart items when not loading', () => {
    render(<CheckoutContent orders={mockOrders} data={mockData} restaurant={mockRestaurant} />);

    expect(screen.getByText(/Seu Pedido/i)).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('R$ 50.00 x 2')).toBeInTheDocument();
  });

  it('shows loading spinner when finalizing order', async () => {
    render(<CheckoutContent orders={mockOrders} data={mockData} restaurant={mockRestaurant} />);
  
    fireEvent.click(screen.getByRole('button', { name: /finalizar pedido/i }));
  
    // enquanto o pedido está sendo criado, loading aparece
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
  });  

  it('shows order tracking after order is completed', async () => {
    render(<CheckoutContent orders={mockOrders} data={mockData} restaurant={mockRestaurant} />);

    fireEvent.click(screen.getByRole('button', { name: /finalizar pedido/i }));

    await waitFor(() => {
      expect(screen.getByText(/Acompanhe seu pedido/i)).toBeInTheDocument();
    });
  });
});