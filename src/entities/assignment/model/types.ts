import type {SubmissionStatus} from '@/shared/model/common';

/**
 * 과제(Assignment) 인터페이스 정의
 */
export interface Assignment {
  id: number;
  title: string;
  submittedStatus?: SubmissionStatus;
}
