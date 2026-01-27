import Button from '@/components/common/Button';

const ActionButtonGroup = () => {
  return (
    <div className='flex justify-end gap-5'>
      <Button color='outlinePurple'>취소</Button>
      <Button color='primary'>등록</Button>
    </div>
  );
};

export default ActionButtonGroup;
