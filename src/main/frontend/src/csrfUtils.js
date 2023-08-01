export function getCsrfTokenFromCookie() {
  const cookies = document.cookie;

  const cookieArray = cookies.split(';');

  {/* 쿠키 배열에서 CSRF 토큰을 추출합니다. */}
  let csrfToken = null;
  for (const cookie of cookieArray) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith('XSRF-TOKEN=')) {
      csrfToken = trimmedCookie.substring('XSRF-TOKEN='.length);
      break;
    }
  }

  return csrfToken;
}