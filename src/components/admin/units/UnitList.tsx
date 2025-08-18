import Button from '../../common/Button';
import {AddIcon} from '../../../assets/svg';
import {allUnits} from './dummy/allUnits';
import UnitListItem from './UnitListItem';
import {useState} from 'react';

const UnitList = () => {
  const unitList = allUnits.response.units;
  return (
    <div>
      <h1 className='py-8 pl-12 text-2xl font-semibold'>단원 보기</h1>
      {unitList.map((unit, index) => (
        <UnitListItem key={unit.id} index={index} {...unit} />
      ))}
      <div className='mt-[17.9px] mb-[106.1px] ml-[40.8px]'>
        <Button
          theme='secondaryPurple'
          text='단원 추가'
          icon={<AddIcon width={12} height={12} color='white' />}
        />
      </div>
    </div>
  );
};

export default UnitList;
