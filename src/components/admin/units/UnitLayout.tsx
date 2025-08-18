import Button from '../../common/Button';
import UnitEditor from './UnitEditor';
import UnitList from './UnitList';
const UnitLayout = () => {
  return (
    <div className='flex gap-[14.83px]'>
      <aside className='w-112.5 h-188 overflow-y-scroll bg-white rounded-[30px]'>
        <UnitList />
      </aside>
      <section className='w-[737.3px] h-188 bg-white rounded-[30px] pl-[30.6px] pr-[36.7px] pt-[33.72px] pb-[89.2px]'>
        <UnitEditor />
        <div className='flex justify-end gap-[21.8px] pt-[23.4px]'>
          <Button theme='primaryWhite' text='취소' />
          <Button theme='primaryPurple' text='저장' />
        </div>
      </section>
    </div>
  );
};

export default UnitLayout;
