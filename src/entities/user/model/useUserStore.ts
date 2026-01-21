import {create} from 'zustand';
import type {UserType} from '@/models/common';

interface UserState {
  userType: UserType;
  userName: string;
  setUserType: (userType: UserType) => void;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userType: 'guest',
  userName: '',
  setUserType: (userType) => set({userType}),
  setUserName: (userName) => set({userName}),
}));
