import {tv} from 'tailwind-variants';

export const modalStyles = tv({
  slots: {
    base: 'w-160 flex flex-col rounded-[24px] text-secondary-black shadow-card',
    header:
      'w-full flex justify-between items-center rounded-t-[24px] px-6.5 py-5',
    titleWrapper: 'flex items-center gap-3',
    title: 'text-base font-medium',
    contentWrapper:
      'flex flex-col min-h-25 pl-6.5 pr-21.25 pt-3.5 pb-7 text-secondary-black',
    tcWrapper: 'flex items-center gap-3.5',
    tcDescription: 'text-base/6',
    outputWrapper: 'flex flex-col gap-1.5',
    outputTerm: 'text-sm/[21px] text-light-black',
    outputDescription: 'bg-white rounded-[10px] px-6 py-1.5 text-sm',
  },
  variants: {
    color: {
      PASSED: {
        header: 'bg-[#99FF62] text-secondary-black',
        base: 'bg-[#F2FFEB]',
      },
      FAILED: {
        header: 'bg-[#FF6F6F] text-white',
        base: 'bg-[#FFF4F4]',
      },
    },
  },
});
