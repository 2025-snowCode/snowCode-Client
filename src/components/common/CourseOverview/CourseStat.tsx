interface CourseStatProps {
  unitCount: number;
  assignmentCount: number;
  studentCount?: number;
}

const CourseStat = ({
  unitCount,
  assignmentCount,
  studentCount,
}: CourseStatProps) => {
  return (
    <div className='px-3.5 py-1.5 text-center bg-white rounded-[35px]'>
      <span className='text-base font-normal'>{`${unitCount}단원 | ${assignmentCount}문제 ${
        studentCount ? `| ${studentCount}명` : ''
      }`}</span>
    </div>
  );
};

export default CourseStat;
