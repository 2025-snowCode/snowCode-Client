import {forwardRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import LabeledInput from '@/shared/ui/LabeledInput';
import FileUpload from '@/shared/ui/FileUpload';
import LabeledDropdown from '@/shared/ui/LabeledDropdown';
import {
  courseFormSchema,
  YEAR_OPTIONS,
  SEMESTER_OPTIONS,
} from '@/features/course/create-course/model/schemas';
import type {CourseFormValues} from '@/features/course/create-course/model/schemas';

interface CourseFormProps {
  defaultValues?: Partial<CourseFormValues>;
  onSubmit: (data: CourseFormValues) => void;
}

export const CourseForm = forwardRef<HTMLFormElement, CourseFormProps>(
  ({defaultValues, onSubmit}, ref) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  });

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
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
            value={watch('year')}
            errorMessage={errors.year?.message}
            onSelect={(value) =>
              setValue('year', value as CourseFormValues['year'], {
                shouldValidate: true,
              })
            }
          />
          <input type='hidden' {...register('year')} />
          <LabeledDropdown
            label='학기'
            placeholder='학기를 선택하세요'
            className='w-full'
            options={[...SEMESTER_OPTIONS]}
            value={watch('semester')}
            errorMessage={errors.semester?.message}
            onSelect={(value) =>
              setValue('semester', value as CourseFormValues['semester'], {
                shouldValidate: true,
              })
            }
          />
          <input type='hidden' {...register('semester')} />
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
  );
});

CourseForm.displayName = 'CourseForm';
