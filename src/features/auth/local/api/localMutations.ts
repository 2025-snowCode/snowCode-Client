import {localLogin, type LocalLoginParams} from '@/entities/auth/api/authApi';

export const localMutations = {
  localLogin: {
    mutationKey: ['localLogin'],
    mutationFn: (params: LocalLoginParams) => localLogin(params),
  },
};
