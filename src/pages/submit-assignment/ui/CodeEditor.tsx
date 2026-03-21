import Button from '@/shared/ui/button/Button';
import {Editor, type OnMount} from '@monaco-editor/react';
import {useRef} from 'react';
import PlayIcon from '@/assets/svg/playIcon.svg?react';
import {Panel, Group, Separator} from 'react-resizable-panels';
import DragAndDropIcon from '@/assets/svg/dragAndDropIcon.svg?react';
import {useCodeExecution} from '@/features/assignment/run-assignment/lib/useCodeExecution';

type EditorInstance = Parameters<OnMount>[0];

interface CodeEditorProps {
  onSubmit: (code: string) => void;
  isSubmitPending: boolean;
  assignmentCode?: string;
}

const CodeEditor = ({
  onSubmit,
  isSubmitPending,
  assignmentCode,
}: CodeEditorProps) => {
  const editorRef = useRef<EditorInstance | null>(null);
  const {runCode, output, isRunning} = useCodeExecution();

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
    <Group
      orientation='vertical'
      className='h-full bg-[#1e1e1e] rounded-[30px]'>
      {/* 상단 패널: 코드 에디터와 버튼들 */}
      <Panel
        id='top-panel'
        minSize='30%'
        className='h-full'
        style={{overflow: 'hidden'}}>
        <div className='px-10.5 py-2.5 flex items-center justify-between z-10'>
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
          defaultValue={assignmentCode ?? '# 코드를 작성하세요'}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 15,
            padding: {top: 25, bottom: 16},
          }}
        />
      </Panel>

      <Separator
        className={`cursor-col-resize flex-center h-3 bg-gray-500 focus:outline-none data-[separator='active']:bg-gray-600/80`}>
        <DragAndDropIcon className='rotate-90 w-3 h-3 text-primary-black' />
      </Separator>

      {/* 하단 패널: 출력 결과 등 추가 정보 표시용 */}
      <Panel id='bottom-panel' minSize='10%' className='bg-black'>
        {output && (
          <div className='p-4 text-sm text-white whitespace-pre-wrap'>
            {output}
          </div>
        )}
      </Panel>
    </Group>
  );
};

export default CodeEditor;
