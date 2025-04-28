import { render, screen, fireEvent } from '@testing-library/react';
import { RestaurantPageContent } from '@/components/principal/RestaurantPageContent';

jest.mock('@/components/principal/RestaurantPageContent/About', () => ({
  About: () => <div data-testid="about">About Component</div>,
}));

jest.mock('@/components/principal/RestaurantPageContent/Categories', () => ({
  Categories: () => <div data-testid="categories">Categories Component</div>,
}));

jest.mock('@/components/principal/RestaurantPageContent/Testimonials', () => ({
  Testimonials: () => <div data-testid="testimonials">Testimonials Component</div>,
}));

describe('RestaurantPageContent', () => {
  const mockRestaurantDetails:any = {
    id: '1',
    name: 'Mock Restaurant',
    address: '123 Mock St',
    logo: '/mock-logo.png',
    banner: '/mock-banner.jpg',
    description: 'Mock description',
    menuOptions: [],
    dishes: [],
    avaliations: [
      { stars: 4 },
      { stars: 5 },
    ],
  };

  it('renders Categories by default', () => {
    render(<RestaurantPageContent restaurantDetails={mockRestaurantDetails} />);

    expect(screen.getByTestId('categories')).toBeInTheDocument();
  });

  it('renders About when clicking on "Sobre"', () => {
    render(<RestaurantPageContent restaurantDetails={mockRestaurantDetails} />);

    fireEvent.click(screen.getByText('Sobre'));

    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  it('renders Testimonials when clicking on "Avaliações"', () => {
    render(<RestaurantPageContent restaurantDetails={mockRestaurantDetails} />);

    fireEvent.click(screen.getByText('Avaliações'));

    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });
});