interface TerminalProps {
  output: string | null;
}
const Terminal = ({output}: TerminalProps) => {
  return (
    <div>
      {output && (
        <div className='p-4 font-jetbrains-mono text-base text-white whitespace-pre-wrap'>
          {output}
        </div>
      )}
    </div>
  );
};

export default Terminal;
