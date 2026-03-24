import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {UserType} from '@/shared/model/common';

type AuthenticatedUserType = Exclude<UserType, 'guest'>;

interface UserState {
  userType: UserType;
  userName: string;
  isAuthenticated: boolean;
  accessToken: string | null;

  setUserType: (userType: UserType) => void;
  setUserName: (userName: string) => void;
  login: (
    userName: string,
    userType: AuthenticatedUserType,
    accessToken: string
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: 'guest',
      userName: '',
      isAuthenticated: false,
      accessToken: null,

      setUserType: (userType) => set({userType}),
      setUserName: (userName) => set({userName}),

      login: (userName, userType, accessToken) => {
        set({
          userName,
          userType,
          accessToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          userType: 'guest',
          userName: '',
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
    }
  )
);
