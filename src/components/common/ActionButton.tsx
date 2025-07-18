interface ActionButtonProps {
  label: string;
  onClick?: () => void;
}

export default function ActionButton({label, onClick}: ActionButtonProps) {
  return (
    <button
      className='w-40 py-[15px] rounded-xl border border-[#DFDBF0] bg-white text-primary-black font-medium hover:bg-gray-50 transition-colors'
      onClick={onClick}>
      {label}
    </button>
  );
}
