import type {StudentProgress} from '@/entities/student/model/types';

interface ProgressIndicatorsProps {
  statuses: StudentProgress[];
  className?: string;
}

const STATUS_CONFIG = {
  PASSED: {
    color: 'bg-status-green',
    label: '통과',
  },
  NOT_SUBMITTED: {
    color: 'bg-white border border-stroke',
    label: '미제출',
  },
  PARTIAL: {
    color: 'bg-status-yellow',
    label: '부분 제출',
  },
  FAILED: {
    color: 'bg-status-red',
    label: '실패',
  },
} as const;

export const ProgressIndicators = ({
  statuses,
  className = '',
}: ProgressIndicatorsProps) => {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      {statuses.map((progress, index) => {
        const config = STATUS_CONFIG[progress.status];

        return (
          <div
            key={index}
            role='status'
            aria-label={config.label}
            title={config.label}
            className={`w-6.5 h-6.5 rounded-full border border-purple-stroke ${config.color}`}
          />
        );
      })}
    </div>
  );
};
