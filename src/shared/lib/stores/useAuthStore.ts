import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {UserType} from '@/models/common';

type AuthenticatedUserType = Exclude<UserType, 'guest'>;

interface AuthState {
  userType: UserType;
  token: string | null;
  isAuthenticated: boolean;

  loginAs: (userType: AuthenticatedUserType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userType: 'guest',
      token: null,
      isAuthenticated: false,

      loginAs: (userType) => {
        set({
          userType,
          token: 'TEMP_TOKEN',
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          userType: 'guest',
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {name: 'auth-storage'}
  )
);
