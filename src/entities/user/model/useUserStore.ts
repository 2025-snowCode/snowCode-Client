import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {UserType} from '@/models/common';

type AuthenticatedUserType = Exclude<UserType, 'guest'>;

interface UserState {
  userType: UserType;
  userName: string;
  isAuthenticated: boolean;

  setUserType: (userType: UserType) => void;
  setUserName: (userName: string) => void;
  login: (userName: string, userType: AuthenticatedUserType) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: 'guest',
      userName: '',
      isAuthenticated: false,

      setUserType: (userType) => set({userType}),
      setUserName: (userName) => set({userName}),

      login: (userName, userType) => {
        set({
          userName,
          userType,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          userType: 'guest',
          userName: '',
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
