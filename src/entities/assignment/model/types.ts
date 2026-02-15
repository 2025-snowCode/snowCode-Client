import type {SubmissionStatus} from '@/entities/course/model/types';

/**
 * 과제(Assignment) 인터페이스 정의
 */
export interface Assignment {
  id: number;
  title: string;
  submittedStatus: SubmissionStatus;
}
