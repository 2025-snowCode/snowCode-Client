import type {Assignment} from '../../assignments/dummy/types';

interface UnitInfo {
  id: number;
  title: string;
  releaseDate: string;
  dueDate: string;
  assignmentCount: number;
  assignments: Assignment[];
}

interface UnitResponse {
  success: boolean;
  response: UnitInfo;
}

interface Unit {
  id: number;
  title: string;
  assignmentCount: number;
}

interface UnitListResponse {
  success: boolean;
  response: {
    count: number;
    units: Unit[];
  };
}

export type {UnitResponse, UnitListResponse, Unit, UnitInfo};
