import type {HTMLAttributes, ReactNode} from 'react';
import {tv} from 'tailwind-variants';

const surfaceCard = tv({
  base: 'bg-white rounded-[30px] w-[900px] shadow-[0px_0px_14px_0px_rgba(223,219,240,0.40)]',
  variants: {
    size: {
      medium: 'min-h-[690px]',
      large: 'min-h-[760px]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

type SurfaceCardProps = {
  size?: 'medium' | 'large';
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const SurfaceCard = ({
  size,
  children,
  className,
  ...rest
}: SurfaceCardProps) => {
  return (
    <div className={surfaceCard({size, className})} {...rest}>
      {children}
    </div>
  );
};

export default SurfaceCard;
