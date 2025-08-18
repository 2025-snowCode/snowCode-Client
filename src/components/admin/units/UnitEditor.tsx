import {BinIcon} from '../../../assets/svg';
import IconButton from '../../common/IconButton';
import UnitForm from './UnitForm';
import {unit} from './dummy/unit';

const UnitEditor = () => {
  const unitInfo = unit.response;
  return (
    <div className='bg-background w-[670px] h-[629px] rounded-[30px]'>
      <div className='bg-[#EDE9FF] px-[30.1px] py-[16.5px] rounded-t-[30px]'>
        <h3>1. 단원</h3>
      </div>
      <UnitForm {...unitInfo} />
    </div>
  );
};

export default UnitEditor;
