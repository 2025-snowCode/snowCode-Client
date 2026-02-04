import axios, {type AxiosInstance} from 'axios';
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
  headers: {
    'Content-Type': 'application/json',
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = import.meta.env.VITE_DEV_ACCESS_TOKEN;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
