/**
 * MOFA 다운로드 URL → 페이지 이동 URL로 변환
 * @param rawUrl 서버에서 내려온 url 문자열
 * @returns 변환된 페이지 이동 url (없으면 null)
 */
export const convertMofaUrl = (rawUrl: string): string | null => {
  if (!rawUrl) return null;

  // 여러 개면 첫 번째만 사용
  const firstUrl = rawUrl.split(",")[0];

  try {
    const urlObj = new URL(firstUrl);
    const seq = urlObj.searchParams.get("seq");

    if (!seq) return null;

    return `https://www.mofa.go.kr/www/brd/m_24815/view.do?seq=${seq}`;
  } catch (e) {
    console.error("Invalid MOFA URL", e);
    return null;
  }
};
