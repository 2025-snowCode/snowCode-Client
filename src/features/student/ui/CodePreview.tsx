import {useQuery} from '@tanstack/react-query';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {Editor, type Monaco} from '@monaco-editor/react';
import OneDarkPro from '@/themes/onedarkpro.json';

interface CodePreviewProps {
  codeId: number;
}

const editorOptions = {
  readOnly: true,
  readOnlyMessage: {value: ''},
  fontSize: 14,
  fontFamily: 'jetbrains mono, monospace',
  minimap: {enabled: false},
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: {top: 16, bottom: 16},
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  folding: false,
  glyphMargin: false,
  lineDecorationsWidth: 15,
  cursorBlinking: 'expand' as const,
  contextmenu: false,
  renderLineHighlight: 'none' as const,
  selectionHighlight: false,
  occurrencesHighlight: 'off' as const,
  matchBrackets: 'never' as const,
  links: false,
  hover: {enabled: false},
  codeLens: false,
  smoothScrolling: true,
};

const CodePreview = ({codeId}: CodePreviewProps) => {
  const {data: assignmentCode, isLoading} = useQuery(
    assignmentQueries.getAssignmentCode(codeId)
  );

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

  return (
    <div className='bg-[#2C2A36] w-full h-[400px] rounded-[15px] overflow-hidden border border-white/10 my-2'>
      {isLoading ? (
        <div className='h-full flex items-center justify-center text-white/40 text-sm'>
          코드를 불러오는 중...ㄴ
        </div>
      ) : (
        <Editor
          theme='OneDarkPro'
          language={assignmentCode?.language?.toLowerCase() || 'python'}
          value={assignmentCode?.code || ''}
          beforeMount={handleEditorWillMount}
          options={editorOptions}
        />
      )}
    </div>
  );
};

export default CodePreview;
