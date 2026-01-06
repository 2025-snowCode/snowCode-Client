import * as React from 'react';
import type {SVGProps} from 'react';
const SvgCorrect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 12 12'
    {...props}>
    <circle cx={6} cy={6} r={5.35} stroke='#856CFF' strokeWidth={1.3} />
  </svg>
);
export default SvgCorrect;
