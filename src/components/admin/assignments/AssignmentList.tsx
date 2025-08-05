const AssignmentList = () => {
  return (
    <div>
      <p className='mb-3 mt-10 font-medium text-lg'>{assignments.length}문제</p>
      <div className='flex flex-col'>
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} {...assignment} />
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;
