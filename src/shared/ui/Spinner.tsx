interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
const SIZE_MAP = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
};

export const Spinner = ({size = 'md'}: SpinnerProps) => {
  return (
    <div
      className={`${SIZE_MAP[size]} animate-spin rounded-full border-neutral-300 border-t-neutral-600`}
    />
  );
};
