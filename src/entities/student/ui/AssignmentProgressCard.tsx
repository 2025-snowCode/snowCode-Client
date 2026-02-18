import type {Student, ProgressStatus} from '../model/types';
import {ProgressIndicators} from '@/shared/ui/ProgressIndicators';
import Correct from '@/assets/svg/correct.svg?react';
import Incorrect from '@/assets/svg/incorrect.svg?react';
import Unsubmitted from '@/assets/svg/unsubmitted.svg?react';

interface AssignmentProgressCardProps {
  student: Student;
}

export const AssignmentProgressCard = ({
  student,
}: AssignmentProgressCardProps) => {
  const getStatusIcon = (status: ProgressStatus) => {
    switch (status) {
      case 'PASSED':
        return (
          <div className='w-[31px] h-[31px] rounded-full border border-primary flex items-center justify-center'>
            <Correct className='w-3 h-3' />
          </div>
        );
      case 'FAILED':
        return (
          <div className='w-[31px] h-[31px] rounded-full border border-badge-red flex items-center justify-center'>
            <Incorrect className='w-3 h-3' />
          </div>
        );
      default:
        return (
          <div className='w-[31px] h-[31px] rounded-full border border-light-black flex items-center justify-center'>
            <Unsubmitted className='w-3 h-3' />
          </div>
        );
    }
  };

  return (
    <div className='p-8 flex flex-col gap-6'>
      {/* 점수 전체 요약 부분 */}
      <div className='flex gap-10'>
        <div className='flex items-baseline gap-1'>
          <span className='text-2xl font-semibold text-primary'>
            {student.score}
          </span>
          <span className='text-2xl font-semibold text-secondary-black'>
            /{student.totalScore}
          </span>
        </div>
        <ProgressIndicators statuses={student.progress} />
      </div>

      {/* 단원 부분 */}
      {student.units?.map((unit) => (
        <table key={unit.id} className='w-full'>
          <thead>
            <tr className='text-sm text-secondary-black bg-gray'>
              <th className='text-left font-medium py-4.5 pl-4' colSpan={3}>
                <div className='flex items-center gap-[13px]'>
                  <span className='px-3.5 py-1.5 rounded-full bg-secondary-black text-white text-md font-medium'>
                    {unit.name}
                  </span>
                  <span className='font-medium text-secondary-black'>
                    {unit.title}
                  </span>
                  <span className='font-normal text-light-black'>
                    {unit.startDate} ~ {unit.endDate}
                  </span>
                </div>
              </th>
              <th className='text-center font-normal'>점수</th>
              <th className='text-center font-normal'>표절률</th>
              <th className='text-center font-normal'>코드조회</th>
            </tr>
          </thead>
          <tbody>
            {unit.assignments.map((assignment, index) => (
              <tr
                key={index}
                className='border-b border-purple-stroke last:border-b-0'>
                <td className='px-4 w-8 py-4.5 text-center text-[16px] text-light-black font-medium'>
                  <div className='rounded-full border border-purple-stroke w-[31px] h-[31px] flex items-center justify-center'>
                    {index + 1}
                  </div>
                </td>
                <td className='pl-4.5 py-4.5 text-base text-secondary-black'>
                  {assignment.assignmentName}
                </td>
                <td className='w-19 py-4.5 text-center items-center justify-center'>
                  <div className='flex items-center justify-center'>
                    {getStatusIcon(assignment.status)}
                  </div>
                </td>
                <td className='w-25 py-4.5 text-center text-sm text-secondary-black'>
                  {assignment.score}/{assignment.totalScore}
                </td>
                <td className='w-25 py-4.5 text-center text-sm text-secondary-black'>
                  {assignment.plagiarismRate}%
                </td>
                <td className='py-4.5 text-center'>
                  <button className='px-4 py-1.5 text-sm text-primary cursor-pointer'>
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};
