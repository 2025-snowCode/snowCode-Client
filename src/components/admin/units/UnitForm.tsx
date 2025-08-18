import {AddIcon} from '../../../assets/svg';
import Button from '../../common/Button';
import AssignmentCard from '../assignments/AssignmentCard';
import type {UnitInfo} from './dummy/types';

interface UnitFormProps extends UnitInfo {}

const UnitForm = ({
  title,
  releaseDate,
  dueDate,
  assignments,
}: UnitFormProps) => {
  return (
    <form action=''>
      <section className='flex flex-col gap-[23.3px] text-base font-medium px-[30px] pt-[20.4px] pb-[56.7px] border-b-1 border-purple-stroke'>
        <label>
          {'제목'}
          <input
            type='text'
            placeholder='제목을 입력하세요'
            value={title}
            className='input-field'
          />
        </label>
        <div className='flex gap-[22px]'>
          <label>
            {'공개일'}
            <input
              type='date'
              placeholder='날짜를 선택하세요'
              value={releaseDate}
              className='input-field'
            />
          </label>
          <label>
            {'마감일'}
            <input
              type='date'
              placeholder='날짜를 선택하세요'
              value={dueDate}
              className='input-field'
            />
          </label>
        </div>
      </section>
      <section className='px-[30px]'>
        <h3 className='text-base font-medium pt-7 pb-[12.5px]'>문제 등록</h3>
        <div className='flex-center flex-col'>
          {assignments.map((a) => (
            <AssignmentCard
              key={a.id}
              {...a}
              selectMode={false}
              color='bg-white'
            />
          ))}
        </div>
        <div className='py-[12.5px]'>
          <Button
            theme='secondaryPurpleStroke'
            text='문제 연결'
            icon={<AddIcon width={12} height={12} color='#555267' />}
          />
        </div>
      </section>
    </form>
  );
};

export default UnitForm;
