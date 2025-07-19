import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ActionButton from '../../components/common/ActionButton';
import SnowCodeEntryMini from '../../assets/images/snowCode_entry_mini.svg';
import {ArrowleftIcon} from '../../assets/svg';

export default function UserIdInputPage() {
  const navigate = useNavigate();
  const length = 7;
  const [userId, setUserId] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const {value} = e.target;
    if (!/^\d*$/.test(value)) return;

    const newId = [...userId];
    newId[index] = value.slice(-1);
    setUserId(newId);

    if (value && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const newId = [...userId];

    if (e.key === 'Backspace') {
      if (userId[index]) {
        newId[index] = '';
      } else if (index > 0) {
        newId[index - 1] = '';
        setActiveIndex(index - 1);
      }
      setUserId(newId);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const userIdString = userId.join('');

  const handleBeforeClick = () => {
    navigate('/');
  };

  return (
    <div className='relative flex flex-col items-center min-h-[calc(100vh-120px)] text-center'>
      <div className='absolute top-[43px] left-[60px] flex items-center gap-4'>
        <ArrowleftIcon className='w-[18px] h-[24px]' />
        <button
          onClick={handleBeforeClick}
          className='text-black text-[18px] font-medium'>
          이전으로
        </button>
      </div>

      <div className='w-[216px] h-[216px] mt-19'>
        <img src={SnowCodeEntryMini} alt='SnowCode Entry Mini' />
      </div>

      <div className='flex flex-col items-center gap-6'>
        <div className='text-[32px] text-primary-black not-italic font-semibold leading-[150%]'>
          학번을 입력해주세요
        </div>

        <div className='flex justify-center gap-2.5 mb-13'>
          {userId.map((digit, i) => (
            <input
              key={i}
              ref={(ref) => (inputRefs.current[i] = ref)}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onClick={() => setActiveIndex(i)}
              className={`
                w-10 h-12 text-center border rounded-md text-lg font-medium
                ${
                  activeIndex === i
                    ? 'border-primary focus:outline-none focus:ring-0'
                    : digit
                    ? 'border-stroke text-primary-black'
                    : 'border-stroke'
                }
              `}
            />
          ))}
        </div>

        <ActionButton
          label='확인'
          disabled={userIdString.length !== length}
          className={userIdString.length !== length ? 'cursor-not-allowed' : ''}
        />
      </div>
    </div>
  );
}
