import { setCookie } from 'nookies';
import { api } from '@/services/axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { z } from 'zod';
import { signInSchema } from '@/lib/zod';

export async function handleSignIn(
  values: z.infer<typeof signInSchema>,
  setLoading: (v: boolean) => void,
  setUser: (v: any) => void,
  router: AppRouterInstance
) {
  setLoading(true);
  try {
    const res = await api.post('/auth/login', {
      email: values.email,
      password: values.password
    }, { withCredentials: true });

    setCookie(undefined, 'user-token', JSON.stringify(res.data), {
      maxAge: 604800,
      path: '/',
    });

    setUser(res.data);
    router.push('/restaurants');
  } catch (error) {
    console.log("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
}
