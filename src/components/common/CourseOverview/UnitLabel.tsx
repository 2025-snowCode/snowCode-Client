interface UnitLabelProps {
  unitNo: number;
}

const UnitLabel = ({unitNo}: UnitLabelProps) => {
  return (
    <div className='bg-secondary-black px-3.5 py-1.5 rounded-[35px] text-center'>
      <span className='text-base text-white font-medium'>{`${unitNo}단원`}</span>
    </div>
  );
};

export default UnitLabel;
