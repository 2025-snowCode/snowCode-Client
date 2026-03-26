import type {TUnit, TUnitFormSchema} from '@/entities/unit/model/schemas';
import type {Ref} from 'react';

export type TUnitLayoutContext = {
  unitList: Pick<TUnit, 'id' | 'title' | 'assignmentCount'>[];
  unitCount: number;
};

export type UnitFormHandle = {
  reset: (values?: Partial<TUnitFormSchema>) => void;
  getValues: () => TUnitFormSchema;
  requestSubmit: () => void;
};

export interface UnitFormProps {
  ref: Ref<UnitFormHandle>;
  defaultValues?: Partial<TUnitFormSchema>;
  onSubmit: (data: TUnitFormSchema) => void;
  assignmentList: TUnit['assignments'];
  assignmentListKey: string;
  onSelectAssignments?: () => void;
}
