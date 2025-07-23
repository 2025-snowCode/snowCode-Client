interface ActionButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string; // 추가 스타일링 위해
  selected?: boolean;
  disabled?: boolean;
}

export default function ActionButton({
  label,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  selected = false,
}: ActionButtonProps) {
  const baseClass =
    'w-40 py-[15px] rounded-xl border border-stroke font-medium transition-colors';
  const selectedClass = selected
    ? 'bg-primary text-white'
    : 'bg-white text-primary-black hover:bg-hover hover:text-white';

  return (
    <button
      className={`${baseClass} ${selectedClass} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {label || children}
    </button>
  );
}
