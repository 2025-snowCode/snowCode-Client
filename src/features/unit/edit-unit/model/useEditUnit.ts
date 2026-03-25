import {unitMutations} from '@/entities/unit/api/unitMutations';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import type {TUnitFormSchema} from '@/entities/unit/model/schemas';
import {ROUTES} from '@/shared/config/routes';
import {useToastStore} from '@/shared/model/useToastStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

interface UseEditUnitProps {
  courseId: number;
  unitId: number;
}

export const useEditUnit = ({courseId, unitId}: UseEditUnitProps) => {
  const navigate = useNavigate();
  const {showToast} = useToastStore();
  const queryClient = useQueryClient();
  const invalidateUnitList = () => {
    queryClient.invalidateQueries({
      queryKey: unitQueries.getUnitList(courseId).queryKey,
    });
  };

  const {mutate: updateUnit, isPending: isUpdating} = useMutation({
    ...unitMutations.updateUnit,
    onSuccess: () => {
      invalidateUnitList();
      showToast('단원이 수정되었습니다.');
    },
    onError: (error) => {
      console.error('단원 업데이트 실패', error);
      alert('단원 업데이트에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const {mutate: deleteUnit} = useMutation({
    ...unitMutations.deleteUnit,
    onSuccess: () => {
      invalidateUnitList();
      showToast('단원이 삭제되었습니다.');
      navigate(ROUTES.ADMIN.UNITS.CREATE(courseId));
    },
    onError: (error) => {
      console.error('단원 삭제 실패', error);
      alert('단원 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const submit = (unitForm: TUnitFormSchema) => {
    updateUnit({unitId, unit: unitForm});
  };

  const remove = () => {
    if (window.confirm('정말로 이 단원을 삭제하시겠습니까?')) {
      deleteUnit(unitId);
    }
  };

  return {submit, remove, isUpdating};
};
