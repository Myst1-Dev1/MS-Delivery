import { render, screen, fireEvent } from '@testing-library/react';
import { Categories } from '@/components/principal/RestaurantPageContent/Categories';
import '@testing-library/jest-dom';

jest.mock('@/components/global/Modal', () => ({
    __esModule: true,
    default: ({ children }: any) => <div data-testid="modal">{children}</div>,
}));  

const handleAddToCartMock = jest.fn();

jest.mock('@/hooks/useCart', () => ({
  useCart: jest.fn(() => ({
    handleAddToCart: handleAddToCartMock,
    handleObservationChange: jest.fn(),
    observation: '',
  })),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}));

jest.mock('@radix-ui/react-dialog', () => ({
    __esModule: true,
    Root: ({ children }: any) => <div>{children}</div>,
    Trigger: ({ children }: any) => <div>{children}</div>,
    Content: ({ children }: any) => <div>{children}</div>,
    Title: ({ children }: any) => <div>{children}</div>,
}));  

jest.mock('@/utils/formatPrice', () => ({
  FormatPrice: (price: number) => `R$ ${price.toFixed(2)}`,
}));

jest.mock('@/components/global/Modal', () => ({
  Modal: ({ children }: any) => <div data-testid="modal">{children}</div>,
}));

describe('Categories component', () => {
  const mockOptions = ['Pizzas', 'Bebidas'];
  const mockDishes:any = [
    { id: '1', name: 'Pizza Calabresa', price: 30, description: 'Delicious', menuOption: 'Pizzas', image: '/pizza.jpg' },
    { id: '2', name: 'Coca-Cola', price: 10, description: 'Drink', menuOption: 'Bebidas', image: '/coca.jpg' },
  ];

  it('renders initial category and dishes', () => {
    render(<Categories options={mockOptions} dishes={mockDishes} id="restaurant-id" />);

    expect(screen.getByTestId('menu-option')).toHaveTextContent('Pizzas');
    expect(screen.getByText('Pizza Calabresa')).toBeInTheDocument();
  });

  it('filters dishes when clicking on another category', () => {
    render(<Categories options={mockOptions} dishes={mockDishes} id="restaurant-id" />);

    fireEvent.click(screen.getByText('Bebidas'));

    expect(screen.getByText('Coca-Cola')).toBeInTheDocument();
  });

  it('opens modal when clicking on a dish', () => {
    render(<Categories options={mockOptions} dishes={mockDishes} id="restaurant-id" />);

    fireEvent.click(screen.getByText('Pizza Calabresa'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('calls handleAddToCart when clicking "Adicionar" button in modal', async () => {
    render(<Categories options={mockOptions} dishes={mockDishes} id="restaurant-id" />);
  
    fireEvent.click(screen.getByText('Pizza Calabresa'));
  
    // 🧠 Espera o botão "Adicionar" aparecer no modal
    const addButton = await screen.findByRole('button', { name: /adicionar/i });
  
    fireEvent.click(addButton);
  
    expect(handleAddToCartMock).toHaveBeenCalled();
  });  
});