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
    <div className='bg-white px-3.5 py-1.5 rounded-[35px] text-center'>
      <span className='text-base font-normal'>{`${unitCount}단원 | ${assignmentCount}문제 ${
        studentCount ? `| ${studentCount}명` : ''
      }`}</span>
    </div>
  );
};

export default CourseStat;
