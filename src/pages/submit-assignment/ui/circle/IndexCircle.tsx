import {circleStyles, type CircleVariants} from './circle-styles';

interface IndexCircleProps extends CircleVariants {
  index: number;
  className?: string;
}
const IndexCircle = ({index, ...props}: IndexCircleProps) => {
  return <div className={circleStyles(props)}>{index}</div>;
};

export default IndexCircle;
