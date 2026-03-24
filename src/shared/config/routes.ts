export const ROUTES = {
  ROOT: '/',
  USER_ID: '/userid',
  AUTH_KAKAO_CALLBACK: '/auth/kakao/callback',

  ADMIN: {
    ROOT: '/admin',
    CHAT: '/admin/chat',
    ASSIGNMENTS: {
      MANAGE: '/admin/assignments/manage',
      CREATE: '/admin/assignments/create',
      SELECT: '/admin/assignments/select',
      DETAIL: (id: number | string) => `/admin/assignments/${id}`,
      SUBMIT: (courseId: number | string, assignmentId: number | string) =>
        `/admin/courses/${courseId}/assignments/${assignmentId}`,
    },
    COURSES: {
      CREATE: '/admin/courses/create',
      DETAIL: (id: number | string) => `/admin/courses/${id}`,
      EDIT: (id: number | string) => `/admin/courses/${id}/edit`,
    },
    STUDENT: {
      ROOT: (courseId: number | string) => `/admin/courses/${courseId}/students`,
      PROFILE: (courseId: number | string, studentId: number | string) =>
        `/admin/courses/${courseId}/students/${studentId}`,
    },
    UNITS: {
      CREATE: (courseId: number | string) => `/admin/units/${courseId}/create`,
      EDIT: (courseId: number | string, unitId: number | string) =>
        `/admin/units/${courseId}/edit/${unitId}`,
    },
  },

  STUDENT: {
    ROOT: '/student',
    CHAT: '/student/chat',
    COURSES: {
      DETAIL: (id: number | string) => `/student/courses/${id}`,
    },
    ASSIGNMENTS: {
      SUBMIT: (courseId: number | string, assignmentId: number | string) =>
        `/student/courses/${courseId}/assignments/${assignmentId}`,
    },
  },
} as const;
