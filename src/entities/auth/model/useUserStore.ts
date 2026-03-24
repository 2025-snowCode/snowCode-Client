import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {UserType} from '@/shared/model/types';

type AuthenticatedUserType = Exclude<UserType, 'guest'>;

interface UserState {
  userType: UserType;
  userName: string;
  memberId: number | null;
  isAuthenticated: boolean;
  accessToken: string | null;

  setUserType: (userType: UserType) => void;
  setUserName: (userName: string) => void;
  login: (
    userName: string,
    userType: AuthenticatedUserType,
    accessToken: string,
    memberId: number
  ) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: 'guest',
      userName: '',
      memberId: null,
      isAuthenticated: false,
      accessToken: null,

      setUserType: (userType) => set({userType}),
      setUserName: (userName) => set({userName}),

      login: (userName, userType, accessToken, memberId) => {
        set({
          userName,
          userType,
          accessToken,
          memberId,
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
        userName: state.userName,
        memberId: state.memberId,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
    }
  )
);
