export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateLabel = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
};

export const getDateKey = (isoString: string) => {
  return new Date(isoString).toDateString();
};
