import SurfaceCard from '@/components/common/SurfaceCard';
import CourseSelector from './ui/CourseSelector';
import AssignmentPageLayout from './AssignmentPageLayout';
import SectionTitle from './ui/SectionTitle';
import {response} from './models/Response';
import ProblemListContainer from './ui/ProblemListContainer';
import ActionButtonGroup from './ui/ActionButtonGroup';
import {formatCourseTermWithSlash} from '@/utils/course';

const ProblemSelectPage = () => {
  const {count, courses} = response.response;

  const COURSE_OPTIONS = courses.map(
    (course) =>
      `${course.title} ${formatCourseTermWithSlash(course.year, course.semester, course.section)}`
  );

  return (
    <SurfaceCard size='large' className='mx-auto'>
      <AssignmentPageLayout
        header={
          <>
            <SectionTitle title='문제 선택' />
            <CourseSelector options={COURSE_OPTIONS} />
          </>
        }
        list={
          <>
            <h3 className='text-lg/[27px] font-medium mb-4'>{count}문제</h3>
            <ProblemListContainer courseList={courses} />
          </>
        }
        footer={<ActionButtonGroup />}
      />
    </SurfaceCard>
  );
};

export default ProblemSelectPage;
