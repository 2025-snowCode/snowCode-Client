import {useParams} from 'react-router-dom';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import LabeledInput from '@/shared/ui/LabeledInput';
import TestcaseField from '@/pages/admin/assignments/ui/TestcaseField';
import {useAssignmentForm} from './model/useAssignmentForm';

const AssignmentFormPage = () => {
  const {id} = useParams();
  const assignmentId = id ? Number(id) : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    isEditMode,
    navigate,
  } = useAssignmentForm(assignmentId);

  const testcases = watch('testcases');

  return (
    <AssignmentFormLayout
      title='문제 등록 및 수정'
      content={
        <div className='space-y-6 w-full'>
          <div className='grid grid-cols-[minmax(0,1fr)_160px] gap-6'>
            <LabeledInput
              label='문제 이름'
              placeholder='입력하세요'
              {...register('title')}
            />
          </div>

          <div className='relative left-1/2 h-px w-[calc(100%+112px)] -translate-x-1/2 shrink-0 bg-purple-stroke' />

          <LabeledInput
            label='문제 설명'
            placeholder='입력하세요'
            {...register('description')}
          />

          <TestcaseField
            assignmentId={assignmentId}
            value={testcases}
            onChange={(val) => setValue('testcases', val)}
          />
        </div>
      }
      onCancel={() => navigate(-1)}
      onConfirm={handleSubmit}
      confirmLabel={isEditMode ? '수정' : '등록'}
    />
  );
};

export default AssignmentFormPage;
