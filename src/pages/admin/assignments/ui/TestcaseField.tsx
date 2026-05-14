import {useMutation, useQueryClient} from '@tanstack/react-query';
import TestcaseRow from './TestcaseRow';
import Button from '@/shared/ui/button/Button';
import FileUpload from '@/shared/ui/FileUpload';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import {useToastStore} from '@/shared/model/useToastStore';
import {handleApiError} from '@/shared/lib/handleApiError';
import type {TAssignmentForm} from '@/entities/assignment/model/schemas';

export type TestcaseValue = TAssignmentForm['testcases'][number];

type TestcaseJsonValue = {
  testcase?: unknown;
  input?: unknown;
  answer?: unknown;
  output?: unknown;
  isPublic?: unknown;
  public?: unknown;
};

const normalizeTestcaseJson = (value: unknown): TestcaseValue[] => {
  const list = Array.isArray(value)
    ? value
    : typeof value === 'object' && value !== null && 'testcases' in value
      ? (value as {testcases?: unknown}).testcases
      : null;

  if (!Array.isArray(list)) {
    throw new Error('JSON은 배열이거나 testcases 배열을 포함해야 합니다.');
  }

  return list.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(
        `${index + 1}번째 테스트 케이스 형식이 올바르지 않습니다.`
      );
    }

    const testcase = item as TestcaseJsonValue;
    const input = testcase.testcase ?? testcase.input;
    const output = testcase.answer ?? testcase.output;

    if (input === undefined || output === undefined) {
      throw new Error(
        `${index + 1}번째 테스트 케이스에 입력 또는 출력이 없습니다.`
      );
    }

    return {
      testcase: String(input),
      answer: String(output),
      isPublic:
        typeof testcase.isPublic === 'boolean'
          ? testcase.isPublic
          : testcase.public === true,
    };
  });
};

interface TestcaseFieldProps {
  assignmentId?: number;
  value: TestcaseValue[];
  onChange: (value: TestcaseValue[]) => void;
}

const TestcaseField = ({assignmentId, value, onChange}: TestcaseFieldProps) => {
  const queryClient = useQueryClient();
  const {showToast} = useToastStore();

  const {mutate: uploadTestcasesBulk, isPending: isUploadingTestcases} =
    useMutation({
      ...assignmentMutations.uploadTestcasesBulk,
      onSuccess: () => {
        if (assignmentId) {
          queryClient.invalidateQueries({
            queryKey: assignmentQueries.getAssignment(assignmentId).queryKey,
          });
        }
        showToast('테스트 케이스 JSON을 업로드했습니다.');
      },
      onError: (error) =>
        handleApiError(error, '테스트 케이스 JSON 업로드에 실패했습니다.'),
    });

  const handleAddTestcase = () => {
    onChange([...value, {testcase: '', answer: '', isPublic: true}]);
  };

  const handleDeleteTestcase = (index: number) => {
    if (value.length === 1) {
      onChange([{testcase: '', answer: '', isPublic: true}]);
      return;
    }
    onChange(value.filter((_, idx) => idx !== index));
  };

  const handleTestcaseFileChange = async (file: File | null) => {
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      const normalizedTestcases = normalizeTestcaseJson(parsed);
      onChange(normalizedTestcases);

      if (assignmentId) {
        uploadTestcasesBulk({assignmentId, file});
      } else {
        showToast('테스트 케이스 JSON을 불러왔습니다.');
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '테스트 케이스 JSON을 불러오지 못했습니다.';
      showToast(message);
    }
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-2'>
        {value.map((tc, idx) => (
          <TestcaseRow
            key={`${idx}-${tc.testcase}-${tc.answer}`}
            index={idx}
            testcase={tc.testcase}
            answer={tc.answer}
            isPublic={tc.isPublic}
            onTestcaseChange={(val) => {
              const updated = [...value];
              updated[idx] = {...updated[idx], testcase: val};
              onChange(updated);
            }}
            onAnswerChange={(val) => {
              const updated = [...value];
              updated[idx] = {...updated[idx], answer: val};
              onChange(updated);
            }}
            onHiddenChange={(val) => {
              const updated = [...value];
              updated[idx] = {...updated[idx], isPublic: val};
              onChange(updated);
            }}
            onDelete={() => handleDeleteTestcase(idx)}
          />
        ))}
      </div>

      <Button
        color='tonal'
        size='compact'
        content='mixed'
        onClick={handleAddTestcase}>
        <AddIcon width={12} height={12} />
        추가
      </Button>

      <FileUpload
        label='테스트 케이스'
        description={isUploadingTestcases ? '업로드 중...' : '업로드하기'}
        accept='.json,application/json'
        onFileChange={handleTestcaseFileChange}
        className='mt-2'
      />
    </div>
  );
};

export default TestcaseField;
