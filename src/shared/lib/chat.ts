/**
 * 서버에서 오는 ISO 문자열이 'Z'(UTC) 표시가 없을 경우를 대비하여
 * 명시적으로 UTC로 해석되도록 보정하는 헬퍼 함수입니다.
 */
const ensureUTC = (isoString: string) => {
  if (!isoString) return isoString;
  const trimmed = isoString.trim();
  // 이미 타임존 정보(Z 또는 +/-)가 있다면 그대로 반환
  if (trimmed.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  // T 구분이 없고 공백으로 되어있을 경우 T로 교체 (일부 브라우저 호환성)
  const standardized = trimmed.replace(' ', 'T');
  // 명시적으로 Z를 붙여 UTC로 처리
  return `${standardized}Z`;
};

export const formatTime = (isoString: string) => {
  return new Date(ensureUTC(isoString)).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateLabel = (isoString: string) => {
  return new Date(ensureUTC(isoString)).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
};

export const getDateKey = (isoString: string) => {
  return new Date(ensureUTC(isoString)).toDateString();
};
