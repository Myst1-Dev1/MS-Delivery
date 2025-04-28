import { render, screen } from '@testing-library/react';
import Restaurants from '@/app/(principal)/restaurants/page';
import { FetchRestaurants } from '@/services/fetchData/fetchRestaurants';

// Mock do fetch
jest.mock('@/services/fetchData/fetchRestaurants', () => ({
  FetchRestaurants: jest.fn(),
}));

// jest.mock('@/components/principal/FoodType', () => ({
//   FoodType: () => <div>Mocked FoodType</div>,
// }));

describe('Restaurants Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders restaurant data correctly', async () => {
    (FetchRestaurants as jest.Mock).mockResolvedValueOnce([
      {
        id: '1',
        name: 'Pizza Place',
        type: 'Italian',
        banner: '/images/restaurant-photo.webp',
        isOpen: true,
        avaliations: [{ stars: 4 }, { stars: 5 }],
      },
      {
        id: '2',
        name: 'Sushi World',
        type: 'Japanese',
        banner: '',
        isOpen: true,
        avaliations: [{ stars: 5 }],
      },
    ]);

    render(await Restaurants());

    expect(screen.getByText(/os melhores restaurantes/i)).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    expect(screen.getByText('Sushi World')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
    expect(screen.getByText('2 Resultados')).toBeInTheDocument();
  });

  it('renders loading when no restaurants available', async () => {
    (FetchRestaurants as jest.Mock).mockResolvedValueOnce([]);

    render(await Restaurants());

    expect(screen.getByText('0 Resultados')).toBeInTheDocument();
  });
});