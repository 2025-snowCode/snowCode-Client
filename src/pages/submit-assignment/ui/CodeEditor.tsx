import Button from '@/shared/ui/button/Button';
import {Editor, type OnMount} from '@monaco-editor/react';
import {useRef} from 'react';
import PlayIcon from '@/assets/svg/playIcon.svg?react';

type EditorInstance = Parameters<OnMount>[0];

interface CodeEditorProps {
  onSubmit: (code: string) => void;
  isSubmitPending: boolean;
  runCode: (code: string, input: string) => void;
  isRunning: boolean;
}

const CodeEditor = ({
  onSubmit,
  isSubmitPending,
  runCode,
  isRunning,
}: CodeEditorProps) => {
  const editorRef = useRef<EditorInstance | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleSubmitCode = () => {
    const sourceCode = editorRef.current?.getValue() ?? '';
    onSubmit(sourceCode);
  };

  const handleRunCode = () => {
    const sourceCode = editorRef.current?.getValue() ?? '';
    const input = '';
    runCode(sourceCode, input);
  };

  return (
    <div className='h-full'>
      <div className='px-10.5 py-2.5 flex items-center justify-between'>
        <Button color='tonal' size='compact' className='text-sm'>
          제출 이력
        </Button>
        <div className='flex gap-4'>
          <Button
            color='lightBlack'
            size='compact'
            className='flex-center gap-2 text-sm'
            onClick={handleRunCode}
            disabled={isRunning}>
            {isRunning ? (
              '실행 중...'
            ) : (
              <>
                <PlayIcon className='w-3 h-3' />
                코드 실행
              </>
            )}
          </Button>
          <Button
            color='ghostWhite'
            size='compact'
            className='text-sm'
            onClick={handleSubmitCode}
            disabled={isSubmitPending}>
            {isSubmitPending ? '제출 중...' : '제출 및 채점'}
          </Button>
        </div>
      </div>

      <Editor
        theme='vs-dark'
        defaultLanguage='python'
        defaultValue='# 코드를 작성하세요'
        onMount={handleEditorDidMount}
        options={{
          fontSize: 15,
          padding: {top: 25, bottom: 16},
        }}
      />
    </div>
  );
};

export default CodeEditor;
