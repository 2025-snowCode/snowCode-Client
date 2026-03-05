import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import LabeledInput from '@/shared/ui/LabeledInput';
import FileUpload from '@/shared/ui/FileUpload';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';
import {useCreateCourse} from '@/features/course/create-course/model/useCreateCourse';
import {
  courseFormSchema,
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
  SEMESTER_CODE_MAP,
} from '@/features/course/create-course/model/courseFormSchema';
import type {CourseFormValues} from '@/features/course/create-course/model/courseFormSchema';

export const CourseCreatePage = () => {
  const navigate = useNavigate();
  const {mutate, isPending} = useCreateCourse();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
  });

  const onSubmit = (data: CourseFormValues) => {
    mutate({
      title: data.title,
      section: data.section,
      year: Number(data.year),
      semester: SEMESTER_CODE_MAP[data.semester],
      description: data.description,
      students: [],
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
                {...register('title')}
              />
              <LabeledInput
                label='분반'
                placeholder='강의 분반을 입력하세요'
                className='w-full'
                errorMessage={errors.section?.message}
                {...register('section')}
              />
              <LabeledDropdown
                label='연도'
                placeholder='연도를 선택하세요'
                className='w-full'
                options={[...YEAR_OPTIONS]}
                errorMessage={errors.year?.message}
                onSelect={(value) =>
                  setValue('year', value as CourseFormValues['year'], {shouldValidate: true})
                }
              />
              <input
                type='hidden'
                {...register('year')}
              />
              <LabeledDropdown
                label='학기'
                placeholder='학기를 선택하세요'
                className='w-full'
                options={[...SEMESTER_OPTIONS]}
                errorMessage={errors.semester?.message}
                onSelect={(value) =>
                  setValue('semester', value as CourseFormValues['semester'], {
                    shouldValidate: true,
                  })
                }
              />
              <input
                type='hidden'
                {...register('semester')}
              />
            </div>

            <LabeledInput
              label='강의 소개를 입력하세요'
              placeholder='강의 소개를 입력하세요'
              className='w-full'
              errorMessage={errors.description?.message}
              {...register('description')}
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