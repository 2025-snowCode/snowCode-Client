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
    ROOT: '/assignments',
    SCHEDULE: '/assignments/schedule',
    MY: '/assignments/my',
    DETAIL: (id: number | string) => `/assignments/${id}`,
    BY_COURSE: (courseId: number | string) =>
      `/courses/${courseId}/assignments`,
    CODE: (codeId: number | string) => `/code/${codeId}`,
    SUBMIT: (unitId: number | string, assignmentId: number | string) =>
      `/assignments/${unitId}/${assignmentId}/code`,
  },
  UNITS: {
    BY_COURSE: (courseId: number | string) => `/courses/${courseId}/units`,
    DETAIL: (id: number | string) => `/units/${id}`,
    CREATE: (courseId: number | string) => `/units/${courseId}`,
    ASSIGNMENT_DETAIL: (
      unitId: number | string,
      assignmentId: number | string
    ) => `/units/${unitId}/assignments/${assignmentId}`,
  },
  CHATS: {
    ROOT: '/chats',
    DETAIL: (chatRoomId: number | string) => `/chats/${chatRoomId}`,
  },
  ENROLLMENTS: {
    BY_COURSE: (courseId: number | string) => `/courses/${courseId}/enrollments`,
    DETAIL: (courseId: number | string, memberId: number | string) =>
      `/courses/${courseId}/enrollments/${memberId}`,
  },
} as const;
