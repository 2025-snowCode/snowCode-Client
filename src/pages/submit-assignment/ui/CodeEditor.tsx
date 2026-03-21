import Button from '@/shared/ui/button/Button';
import {Editor, type Monaco, type OnMount} from '@monaco-editor/react';
import {useRef} from 'react';
import PlayIcon from '@/assets/svg/playIcon.svg?react';
import OneDarkPro from '@/themes/onedarkpro.json';

const editorOptions = {
  fontLigatures: true,
  wordWrap: 'on',
  minimap: {
    enabled: false,
  },
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  folding: false,
  glyphMargin: false,
  lineDecorationsWidth: 15,
  lineNumbers: 'off',
  renderLineHighlight: 'none',
  cursorBlinking: 'expand',
  quickSuggestions: false,
  suggestOnTriggerCharacters: false,
  acceptSuggestionOnEnter: 'off',
  tabCompletion: 'off',
  wordBasedSuggestions: 'off',
  parameterHints: {
    enabled: false,
  },
} as const;

type EditorInstance = Parameters<OnMount>[0];

interface CodeEditorProps {
  onSubmit: (code: string) => void;
  isSubmitPending: boolean;
  runCode: (code: string, input: string) => void;
  isRunning: boolean;
  assignmentCode?: string;
}

const CodeEditor = ({
  onSubmit,
  isSubmitPending,
  runCode,
  isRunning,
  assignmentCode,
}: CodeEditorProps) => {
  const editorRef = useRef<EditorInstance | null>(null);

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('OneDarkPro', {
      base: 'vs-dark',
      inherit: true,
      ...OneDarkPro,
      rules: [...OneDarkPro.rules, {token: 'comment', foreground: '#C4FFA4'}],
      colors: {
        ...OneDarkPro.colors,
        'editor.background': '#2C2A36',
      },
    });
  };

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
      <div className='bg-primary-black px-7 pt-4 pb-2.5 flex items-center justify-end'>
        {/* <Button color='tonal' size='xs' className='text-sm'>
          제출 이력
        </Button> */}
        <div className='flex gap-4'>
          <Button
            color='lightBlack'
            size='xs'
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
            size='xs'
            className='text-sm'
            onClick={handleSubmitCode}
            disabled={isSubmitPending}>
            {isSubmitPending ? '제출 중...' : '제출 및 채점'}
          </Button>
        </div>
      </div>

      <Editor
        theme='OneDarkPro'
        defaultLanguage='python'
        defaultValue={assignmentCode}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          placeholder: '# 코드를 작성하세요',
          padding: {top: 10, bottom: 15},
          fontFamily: 'jetbrains mono, monospace',
          fontSize: 15.5,
          ...editorOptions,
        }}
      />
    </div>
  );
};

export default CodeEditor;
