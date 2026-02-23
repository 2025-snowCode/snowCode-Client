import type {Unit} from '@/entities/course/model/types';
import type {TUnitFormSchema} from '@/entities/unit/model/types';

// 단원 편집 모드 타입
export type Mode = 'idle' | 'creating' | 'editing';

export interface UnitFormProps {
  unit?: Unit;
  unitIndex: number;
  mode: Mode;
  onCreateUnit: (unit: TUnitFormSchema) => void;
  onUpdateUnit: (unitId: number, unit: TUnitFormSchema) => void;
  onDeleteUnit: (unitId: number) => void;
}
