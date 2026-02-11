import type {DashboardScheduleListResponse} from '@/models/course';
import {privateAxios} from '@/shared/api/axiosInstance';

export const getAssignmentSchedules =
  async (): Promise<DashboardScheduleListResponse> => {
    const response = await privateAxios.get('/assignments/schedule');
    return response.data;
  };
