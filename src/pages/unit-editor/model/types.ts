import type {TUnit, TUnitFormSchema} from '@/entities/unit/model/schemas';

// 단원 편집 모드 타입
export type Mode = 'creating' | 'editing';

export interface UnitFormProps {
  unit?: TUnit;
  unitIndex: number;
  mode: Mode | null;
  onCreateUnit: (unit: TUnitFormSchema) => void;
  onUpdateUnit: (unitId: number, unit: TUnitFormSchema) => void;
  onDeleteUnit: (unitId: number) => void;
  isPending: boolean;
}
