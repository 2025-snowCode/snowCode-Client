import type {SubmissionStatus} from './course';

/**
 * 과제(Assignment) 인터페이스 정의
 */
export interface Assignment {
  id: number;
  title: string;
  submittedStatus?: SubmissionStatus;
}
