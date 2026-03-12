import AssignmentFormLayout from '@/widgets/assignment-form-layout/ui/AssignmentFormLayout';
import FileUpload from '@/shared/ui/FileUpload';
import LabeledInput from '@/shared/ui/LabeledInput';
import Button from '@/shared/ui/button/Button';
import AddIcon from '@/assets/svg/addIcon.svg?react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {assignmentMutations} from '@/entities/assignment/api/assignmentMutations';
import {assignmentQueries} from '@/entities/assignment/api/assignmentQueries';
import type {TAssignmentForm} from '@/entities/assignment/model/schemas';
import TestcaseRow from '@/pages/admin/assignments/ui/TestcaseRow';

const AssignmentFormPage = () => {
  const {id} = useParams();
  const assignmentId = id ? Number(id) : undefined;
  const isEditMode = !!assignmentId;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [score, setScore] = useState('');
  const [description, setDescription] = useState('');
  const [testcases, setTestcases] = useState([{testcase: '', answer: ''}]);

  const {data: assignmentData} = useQuery({
    ...assignmentQueries.getAssignment(assignmentId ?? 0),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (assignmentData) {
      setTitle(assignmentData.title);
      setDescription(assignmentData.description);
      setTestcases(
        assignmentData.testcases.map(({testcase, answer}) => ({
          testcase,
          answer,
        }))
      );
    }
  }, [assignmentData]);

  const {mutate: createAssignment} = useMutation({
    ...assignmentMutations.createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAllAssignments().queryKey,
      });
      alert('과제가 추가되었습니다.');
      navigate(-1);
    },
    onError: () => alert('과제 추가에 실패했습니다.'),
  });

  const {mutate: updateAssignment} = useMutation({
    ...assignmentMutations.updateAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assignmentQueries.getAllAssignments().queryKey,
      });
      alert('과제가 수정되었습니다.');
      navigate(-1);
    },
    onError: () => alert('과제 수정에 실패했습니다.'),
  });

  const handleAddTestcase = () => {
    setTestcases([...testcases, {testcase: '', answer: ''}]);
  };

  const handleConfirm = () => {
    const form: TAssignmentForm = {
      title,
      score: Number(score),
      description,
      testcases,
    };

    if (isEditMode) {
      updateAssignment({assignmentId: assignmentId!, form});
    } else {
      createAssignment(form);
    }
  };

  return (
    <AssignmentFormLayout
      title={isEditMode ? '문제 수정' : '문제 등록'}
      content={
        <div className='space-y-6 max-w-182'>
          <div className='grid grid-cols-[minmax(0,1fr)_160px] gap-6'>
            <LabeledInput
              label='문제 제목'
              placeholder='문제 제목을 입력하세요'
              className='w-full'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <LabeledInput
              label='점수'
              placeholder='점수를 입력하세요'
              className='w-full'
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <LabeledInput
            label='문제 설명'
            placeholder='문제 설명을 입력하세요'
            className='w-full'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='space-y-2'>
            {testcases.map((tc, idx) => (
              <TestcaseRow
                key={idx}
                index={idx}
                testcase={tc.testcase}
                answer={tc.answer}
                onTestcaseChange={(value) => {
                  const updated = [...testcases];
                  updated[idx] = {...updated[idx], testcase: value};
                  setTestcases(updated);
                }}
                onAnswerChange={(value) => {
                  const updated = [...testcases];
                  updated[idx] = {...updated[idx], answer: value};
                  setTestcases(updated);
                }}
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
            onFileChange={() => {}}
            className='mb-9'
          />
        </div>
      }
      onCancel={() => navigate(-1)}
      onConfirm={handleConfirm}
    />
  );
};

export default AssignmentFormPage;
