import Button from '@/shared/ui/button/Button';
import {Editor, type OnMount} from '@monaco-editor/react';
import {useRef} from 'react';
import PlayIcon from '@/assets/svg/playIcon.svg?react';
import {Panel, Group, Separator} from 'react-resizable-panels';

type EditorInstance = Parameters<OnMount>[0];

interface CodeEditorProps {
  onSubmit: (code: string) => void;
  isSubmitPending: boolean;
}

const CodeEditor = ({onSubmit, isSubmitPending}: CodeEditorProps) => {
  const editorRef = useRef<EditorInstance | null>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleSubmitCode = () => {
    const sourceCode = editorRef.current?.getValue() ?? '';
    onSubmit(sourceCode);
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
        <div className='px-10.5 py-3.5 flex items-center justify-between sticky top-0 z-10'>
          <Button color='tonal' size='compact'>
            제출 이력
          </Button>
          <div className='flex gap-4'>
            <Button
              color='lightBlack'
              size='compact'
              className='flex-center gap-2'>
              <PlayIcon className='w-4 h-4' />
              코드 실행
            </Button>
            <Button
              color='ghostWhite'
              size='compact'
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
            fontSize: 16,
            padding: {top: 25, bottom: 16},
          }}
        />
      </Panel>

      <Separator />
      {/* 하단 패널: 출력 결과 등 추가 정보 표시용 */}
      <Panel id='bottom-panel' className='bg-secondary-black rounded-t-[30px]'>
        {/* TODO: 하단 패널 */}
      </Panel>
    </Group>
  );
};

export default CodeEditor;
