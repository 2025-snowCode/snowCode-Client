import React, {useState} from 'react';
import type {StudentDetail} from '@/entities/student/model/types';
import {ProgressIndicators} from '@/shared/ui/ProgressIndicators';
import Correct from '@/assets/svg/correct.svg?react';
import Unsubmitted from '@/assets/svg/unsubmitted.svg?react';
import CodePreview from '@/features/student/ui/CodePreview';

interface AssignmentProgressCardProps {
  student: StudentDetail;
}

export const AssignmentProgressCard = ({
  student,
}: AssignmentProgressCardProps) => {
  const [expandedCodeIds, setExpandedCodeIds] = useState<Set<number>>(
    new Set()
  );

  const getStatusIcon = (isCorrect: boolean) => {
    if (isCorrect) {
      return (
        <div className='w-7.75 h-7.75 rounded-full border border-primary flex items-center justify-center'>
          <Correct className='w-3 h-3' />
        </div>
      );
    }
    return (
      <div className='w-7.75 h-7.75 rounded-full border border-light-black flex items-center justify-center'>
        <Unsubmitted className='w-3 h-3' />
      </div>
    );
  };

  const toggleExpandCode = (codeId: number) => {
    setExpandedCodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(codeId)) {
        next.delete(codeId);
      } else {
        next.add(codeId);
      }
      return next;
    });
  };

  return (
    <div className='p-8 flex flex-col gap-6'>
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

      {student.units.map((unit, unitIndex) => (
        <table key={unit.id} className='w-full border-collapse'>
          <thead>
            <tr className='text-sm text-secondary-black bg-gray'>
              <th className='text-left font-medium py-4.5 pl-4' colSpan={3}>
                <div className='flex items-center gap-3.25'>
                  <span className='px-3.5 py-1.5 rounded-full bg-secondary-black text-white text-md font-medium'>
                    {unitIndex + 1}
                  </span>
                  <span className='font-medium text-secondary-black'>
                    {unit.title}
                  </span>
                  <span className='font-normal text-light-black'>
                    {unit.releaseDate} ~ {unit.dueDate}
                  </span>
                </div>
              </th>
              <th className='text-center font-normal'>점수</th>
              <th className='text-center font-normal'>코드조회</th>
            </tr>
          </thead>
          <tbody>
            {unit.assignments.map((assignment, index) => (
              <React.Fragment key={assignment.id}>
                <tr className='border-b border-purple-stroke last:border-b-0'>
                  <td className='px-4 w-8 py-4.5 text-center text-[16px] text-light-black font-medium'>
                    <div className='rounded-full border border-purple-stroke w-7.75 h-7.75 flex items-center justify-center'>
                      {index + 1}
                    </div>
                  </td>
                  <td className='pl-4.5 py-4.5 text-base text-secondary-black'>
                    {assignment.title}
                  </td>
                  <td className='w-19 py-4.5 text-center items-center justify-center'>
                    <div className='flex items-center justify-center'>
                      {getStatusIcon(assignment.isCorrect)}
                    </div>
                  </td>
                  <td className='w-25 py-4.5 text-center text-sm text-secondary-black'>
                    {assignment.score}/{assignment.totalScore}
                  </td>
                  <td className='py-4.5 text-center'>
                    <button
                      className='px-4 py-1.5 text-sm text-primary cursor-pointer hover:underline disabled:opacity-30 disabled:cursor-not-allowed'
                      disabled={!assignment.submittedCodeId}
                      onClick={() =>
                        toggleExpandCode(assignment.submittedCodeId)
                      }>
                      {expandedCodeIds.has(assignment.submittedCodeId)
                        ? '닫기'
                        : '보기'}
                    </button>
                  </td>
                </tr>
                {expandedCodeIds.has(assignment.submittedCodeId) && (
                  <tr>
                    <td colSpan={5} className='px-4 pb-4 bg-gray/10'>
                      <CodePreview codeId={assignment.submittedCodeId} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};
