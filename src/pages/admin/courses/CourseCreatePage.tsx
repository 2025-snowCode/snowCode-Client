import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import LabeledInput from '@/shared/ui/LabeledInput';
import FileUpload from '@/shared/ui/FileUpload';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';
import {useCreateCourseMutation} from '@/entities/course';
import type {SemesterCode} from '@/shared/model/common';

const YEAR_OPTIONS = ['2021', '2022', '2023', '2024', '2025', '2026'];
const SEMESTER_OPTIONS = ['1학기', '2학기', '여름학기', '겨울학기'] as const;

const SEMESTER_CODE_MAP: Record<(typeof SEMESTER_OPTIONS)[number], SemesterCode> = {
  '1학기': 'FIRST',
  '2학기': 'SECOND',
  여름학기: 'SUMMER',
  겨울학기: 'WINTER',
};

interface CourseCreateForm {
  title: string;
  section: string;
  year: string;
  semester: string;
  description: string;
}

const CourseCreatePage = () => {
  const navigate = useNavigate();
  const {mutate, isPending} = useCreateCourseMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<CourseCreateForm>();

  const onSubmit = (data: CourseCreateForm) => {
    mutate({
      title: data.title,
      section: data.section,
      year: Number(data.year),
      semester: SEMESTER_CODE_MAP[data.semester as keyof typeof SEMESTER_CODE_MAP],
      description: data.description,
    });
  };

  return (
    <AssignmentFormLayout
      title='강의 개설'
      content={
        <form id='course-create-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-6 w-full'>
            <div className='grid grid-cols-[minmax(0,1fr)_324px] gap-6'>
              <LabeledInput
                label='강의 명'
                placeholder='강의 명을 입력하세요'
                className='w-full'
                errorMessage={errors.title?.message}
                {...register('title', {required: '강의 명을 입력해주세요.'})}
              />
              <LabeledInput
                label='분반'
                placeholder='강의 분반을 입력하세요'
                className='w-full'
                errorMessage={errors.section?.message}
                {...register('section', {required: '분반을 입력해주세요.'})}
              />
              <LabeledDropdown
                label='연도'
                placeholder='연도를 선택하세요'
                className='w-full'
                options={YEAR_OPTIONS}
                errorMessage={errors.year?.message}
                onSelect={(value) => setValue('year', value, {shouldValidate: true})}
              />
              <input
                type='hidden'
                {...register('year', {required: '연도를 선택해주세요.'})}
              />
              <LabeledDropdown
                label='학기'
                placeholder='학기를 선택하세요'
                className='w-full'
                options={[...SEMESTER_OPTIONS]}
                errorMessage={errors.semester?.message}
                onSelect={(value) => setValue('semester', value, {shouldValidate: true})}
              />
              <input
                type='hidden'
                {...register('semester', {required: '학기를 선택해주세요.'})}
              />
            </div>

            <LabeledInput
              label='강의 소개를 입력하세요'
              placeholder='강의 소개를 입력하세요'
              className='w-full'
              errorMessage={errors.description?.message}
              {...register('description', {required: '강의 소개를 입력해주세요.'})}
            />

            <div className='relative left-1/2 h-px w-[calc(100%+112px)] -translate-x-1/2 shrink-0 bg-purple-stroke' />

            <FileUpload
              label='강의 공유'
              onFileChange={() => {}}
              className='mb-9'
            />
          </div>
        </form>
      }
      onCancel={() => navigate('/admin')}
      onConfirm={() => {
        document
          .getElementById('course-create-form')
          ?.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
      }}
      confirmDisabled={isPending}
    />
  );
};

export default CourseCreatePage;
