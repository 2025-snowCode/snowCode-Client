import * as React from 'react';
import type {SVGProps} from 'react';
const SvgIncorrect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 12 12'
    {...props}>
    <path
      stroke='#FF6F6F'
      strokeLinecap='round'
      strokeWidth={1.3}
      d='M11 1 1 11M1 1l10 10'
    />
  </svg>
);
export default SvgIncorrect;
