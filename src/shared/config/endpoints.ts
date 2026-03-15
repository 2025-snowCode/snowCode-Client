export const ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: '/oauth2/authorization',
  },
  COURSES: {
    ROOT: '/courses',
    MY: '/courses/my',
    DETAIL: (id: number | string) => `/courses/${id}`,
  },
  ASSIGNMENTS: {
    SCHEDULE: '/assignments/schedule',
    MY: '/assignments/my',
    DETAIL: (id: number | string) => `/assignments/${id}`,
    BY_COURSE: (courseId: number | string) => `/courses/${courseId}/assignments`,
  },
  UNITS: {
    BY_COURSE: (courseId: number | string) => `/courses/${courseId}/units`,
    DETAIL: (id: number | string) => `/units/${id}`,
    CREATE: (courseId: number | string) => `/units/${courseId}`,
    ASSIGNMENT_DETAIL: (unitId: number | string, assignmentId: number | string) =>
      `/units/${unitId}/assignments/${assignmentId}`,
  },
} as const;
