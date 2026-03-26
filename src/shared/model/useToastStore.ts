import {create} from 'zustand';

interface ToastStore {
  isOpen: boolean;
  message: string;
  timeoutId: ReturnType<typeof setTimeout> | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>()((set, get) => ({
  isOpen: false,
  message: '',
  timeoutId: null,

  // 메시지를 받아 토스트를 표시하고, 2초 후에 자동으로 숨김
  showToast: (message: string) => {
    const {timeoutId} = get();
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      set({isOpen: false, message: '', timeoutId: null});
    }, 2000);

    set({isOpen: true, message, timeoutId: id});
  },

  // 토스트를 즉시 숨김
  hideToast: () => {
    const {timeoutId} = get();
    if (timeoutId) clearTimeout(timeoutId);
    set({isOpen: false, message: '', timeoutId: null});
  },
}));
