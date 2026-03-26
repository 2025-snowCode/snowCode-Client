import {unitMutations} from '@/entities/unit/api/unitMutations';
import {unitQueries} from '@/entities/unit/api/unitQueries';
import type {TUnitFormSchema} from '@/entities/unit/model/schemas';
import {ROUTES} from '@/shared/config/routes';
import {handleApiError} from '@/shared/lib/handleApiError';
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

  // 단원 목록 갱신
  const invalidateUnitList = () => {
    queryClient.invalidateQueries({
      queryKey: unitQueries.getUnitList(courseId).queryKey,
    });
  };

  // 단원 상세 갱신
  const invalidateUnitDetail = () => {
    queryClient.invalidateQueries({
      queryKey: unitQueries.getUnitDetail(unitId).queryKey,
    });
  };

  const {mutate: updateUnit, isPending: isUpdating} = useMutation({
    ...unitMutations.updateUnit,
    onSuccess: () => {
      invalidateUnitDetail();
      invalidateUnitList();
      showToast('단원이 수정되었습니다.');
    },
    onError: (error) => {
      handleApiError(error, '단원 수정에 실패했습니다. 다시 시도해주세요.');
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
      handleApiError(error, '단원 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const submit = (unitForm: TUnitFormSchema) => {
    updateUnit({unitId, unit: unitForm});
  };

  const remove = () => {
    deleteUnit(unitId);
  };

  return {submit, remove, isUpdating};
};
