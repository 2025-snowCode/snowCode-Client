import type {SVGProps} from 'react';
const SvgAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 14 15'
    {...props}>
    <path
      stroke={props.color}
      strokeLinecap='round'
      strokeWidth={1.3}
      d='M1 7.32h12M7.004 1.5v12'
    />
  </svg>
);
export default SvgAddIcon;
