import AssignmentFormLayout from '@/components/admin/assignments/AssignmentFormLayout';
import LabeledInput from '@/components/admin/form/LabeledInput';
import FileUpload from '@/components/admin/form/FileUpload';
import LabeledDropdown from '@/components/admin/form/LabeledDropdown';

const CourseCreatePage = () => {
  return (
    <AssignmentFormLayout
      title='강의 개설'
      content={
        <div className='space-y-6 max-w-[728px]'>
          <div className='grid grid-cols-[minmax(0,1fr)_324px] gap-6'>
            <LabeledInput
              label='강의 명'
              placeholder='강의 명을 입력하세요'
              className='w-full'
            />
            <LabeledInput
              label='분반'
              placeholder='강의 분반을 입력하세요'
              className='w-full'
            />
            <LabeledDropdown
              label='연도'
              placeholder='연도를 선택하세요'
              className='w-full'
              variant='year'
            />
            <LabeledDropdown
              label='학기'
              placeholder='학기를 선택하세요'
              className='w-full'
              variant='semester'
            />
          </div>

          <LabeledInput
            label='강의 소개를 입력하세요'
            placeholder='강의 소개를 입력하세요'
            className='w-full'
          />

          <FileUpload
            label='강의 공유'
            onFileChange={() => {}}
            className='mb-9'
          />
        </div>
      }
      onCancel={() => {}}
      onConfirm={() => {}}
    />
  );
};

export default CourseCreatePage;
