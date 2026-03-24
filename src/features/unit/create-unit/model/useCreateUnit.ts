import {unitMutations} from '@/entities/unit/api/unitMutations';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import type {TUnitFormSchema} from '@/entities/unit/model/schemas';
import useUnitStore from '@/entities/unit/model/useUnitStore';
import {ROUTES} from '@/shared/config/routes';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

interface UseCreateUnitProps {
  courseId: number;
}

export const useCreateUnit = ({courseId}: UseCreateUnitProps) => {
  const navigate = useNavigate();
  const {resetStore} = useUnitStore();
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    ...unitMutations.createUnit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: unitQueries.getUnitList(courseId).queryKey,
      });
      resetStore();
      alert('새 단원이 성공적으로 생성되었습니다.');
      navigate(ROUTES.ADMIN.UNITS.EDIT(courseId, data.id));
    },
    onError: (error) => {
      console.error('단원 생성 실패', error);
      alert('단원 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const submit = (unitForm: TUnitFormSchema) => {
    mutate({courseId, unitForm});
  };

  return {submit, isPending};
};
