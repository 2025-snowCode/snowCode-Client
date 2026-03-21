interface TerminalProps {
  output: string | null;
}
const Terminal = ({output}: TerminalProps) => {
  return (
    <div className='h-full bg-primary-black'>
      {output && (
        <div className='p-4 text-sm text-white whitespace-pre-wrap'>
          {output}
        </div>
      )}
    </div>
  );
};

export default Terminal;
