import type {Unit} from './dummy/types';
import {ArrowrightIcon} from '../../../assets/svg';
import {useState} from 'react';

interface UnitListItemProps extends Unit {
  index: number;
}

const UnitListItem = ({index, title, assignmentCount}: UnitListItemProps) => {
  return (
    <div
      className={`flex flex-col gap-2.5 pl-[40.8px] pr-[37.1px] py-[19px] border-stroke border-b-1 ${
        index === 0 ? 'border-t-1' : ''
      }`}>
      <span className='w-[70px] bg-light-black rounded-full px-3.5 py-1.5 text-white text-base font-medium'>
        {assignmentCount} 문제
      </span>
      <div className='flex justify-between'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <ArrowrightIcon width={18} />
      </div>
    </div>
  );
};

export default UnitListItem;
