import {useUserStore} from '@/entities/auth/model/useUserStore';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';
const BASE_URL = '/api';

/**
 * publicAxios: 인증 불필요한 요청용
 * 예: 로그인, 회원가입
 */
export const publicAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * privateAxios: 인증 필요한 요청용
 * 예: 대시보드, 강의상세정보, 학생관리 등
 */
export const privateAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// privateAxios 요청 인터셉터 설정
privateAxios.interceptors.request.use(
  (config) => {
    const {accessToken} = useUserStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// privateAxios 응답 인터셉터 설정
let isLoggingOut = false;
privateAxios.interceptors.response.use(
  // 성공적인 응답 처리
  (response: AxiosResponse) => {
    isLoggingOut = false;
    return response;
  },
  // 오류 응답 처리
  (error: AxiosError) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      console.error('인증이 만료되었습니다. 다시 로그인해주세요!');

      // 사용자 상태 초기화
      useUserStore.getState().logout();

      // 로그인 페이지로 리다이렉트
      const isBrowser = typeof window !== 'undefined';
      if (isBrowser) {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);
