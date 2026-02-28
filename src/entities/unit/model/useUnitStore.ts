import type {Assignment} from '@/entities/assignment/model/types';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface UnitState {
  title: string;
  releaseDate: string;
  dueDate: string;
  assignments: Assignment[];
  storeFormData: (title: string, releaseDate: string, dueDate: string) => void;
  resetStore: () => void;
  setAssignments: (assignments: Assignment[]) => void;
}

export const useUnitStore = create<UnitState>()(
  persist(
    (set) => ({
      title: '',
      releaseDate: '',
      dueDate: '',
      assignments: [],

      // 단원 폼 임시 저장
      storeFormData: (title, releaseDate, dueDate) =>
        set({
          title: title,
          releaseDate: releaseDate,
          dueDate: dueDate,
        }),

      // 선택된 과제 ID 저장
      setAssignments: (assignments) => set({assignments}),

      // 단원 폼 초기화
      resetStore: () =>
        set({title: '', releaseDate: '', dueDate: '', assignments: []}),
    }),
    {
      name: 'unit-session-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        title: state.title,
        releaseDate: state.releaseDate,
        dueDate: state.dueDate,
        assignments: state.assignments,
      }),
    }
  )
);

export default useUnitStore;
