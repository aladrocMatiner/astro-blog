import type { AstroCookies } from 'astro';

const ADMIN_COOKIE = 'astro_admin';

export function isAdmin(cookies: AstroCookies): boolean {
  return cookies.get(ADMIN_COOKIE)?.value === '1';
}

export function validateAdminToken(token: string): boolean {
  const expected = import.meta.env.ADMIN_TOKEN ?? '';
  if (!expected) {
    return false;
  }
  return token === expected;
}

export function setAdminCookie(cookies: AstroCookies): void {
  cookies.set(ADMIN_COOKIE, '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD
  });
}

export function clearAdminCookie(cookies: AstroCookies): void {
  cookies.delete(ADMIN_COOKIE, { path: '/' });
}
