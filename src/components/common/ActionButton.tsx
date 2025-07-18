export default function ActionButton({label}: {label: string}) {
  return (
    <button className='w-40 py-[15px] rounded-xl border border-[#DFDBF0] bg-white text-[#2C2A36] font-medium'>
      {label}
    </button>
  );
}
