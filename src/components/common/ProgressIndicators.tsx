import type { StudentProgress } from '@/entities/student/model/types';

interface ProgressIndicatorsProps {
  statuses: StudentProgress[]; // progress 배열
  className?: string;
}

const ProgressIndicators = ({ statuses, className = '' }: ProgressIndicatorsProps) => {
  const getColorClass = (status: StudentProgress['status']) => {
    switch (status) {
      case 'PASSED':
        return 'bg-status-green';
      case 'NOT_SUBMITTED':
        return 'bg-white border border-stroke';
      case 'PARTIAL':
        return 'bg-status-yellow';
      case 'FAILED':
        return 'bg-status-red';
      default:
        return 'bg-white border border-stroke';
    }
  };

  return (
    <div className={`flex gap-1.5 ${className}`}>
      {statuses.map((progress, index) => (
        <div
          key={index}
          className={`w-5 h-5 rounded-full border border-purple-stroke ${getColorClass(progress.status)}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicators;

