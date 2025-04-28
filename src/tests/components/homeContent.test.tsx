import { handleSignIn } from '../../components/principal/HomeContent/homeContent';
import { setCookie } from 'nookies';
import { api } from '@/services/axios';

jest.mock('nookies', () => ({
  setCookie: jest.fn(),
}));
jest.mock('@/services/axios', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('handleSignIn', () => {
  const mockSetLoading = jest.fn();
  const mockSetUser = jest.fn();
  const mockRouter = { push: jest.fn() };

  const values = {
    email: 'user@email.com',
    password: '123456'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call API, set cookie, set user and redirect', async () => {
    const fakeUser = { id: 1, name: 'John' };
    (api.post as jest.MockedFunction<typeof api.post>).mockResolvedValue({ data: fakeUser });

    await handleSignIn(values, mockSetLoading, mockSetUser, mockRouter as any);

    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(api.post).toHaveBeenCalledWith('/auth/login', values, { withCredentials: true });
    expect(setCookie).toHaveBeenCalledWith(undefined, 'user-token', JSON.stringify(fakeUser), expect.any(Object));
    expect(mockSetUser).toHaveBeenCalledWith(fakeUser);
    expect(mockRouter.push).toHaveBeenCalledWith('/restaurants');
    expect(mockSetLoading).toHaveBeenLastCalledWith(false);
  });

  it('should handle API failure gracefully', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Failed'));

    await handleSignIn(values, mockSetLoading, mockSetUser, mockRouter as any);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenLastCalledWith(false);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});