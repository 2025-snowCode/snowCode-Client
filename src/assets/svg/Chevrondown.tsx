import * as React from 'react';
import type {SVGProps} from 'react';
const SvgChevrondown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 16 10'
    {...props}>
    <path
      stroke='#555267'
      strokeLinecap='round'
      strokeWidth={1.35}
      d='m1.115.903 6.059 7.27a.9.9 0 0 0 1.383 0l6.058-7.27'
    />
  </svg>
);
export default SvgChevrondown;
