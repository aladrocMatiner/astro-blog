import type { APIRoute } from 'astro';
import { setAdminCookie, validateAdminToken } from '../../../lib/admin';

export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();
  const token = String(form.get('token') ?? '');
  const next = String(form.get('next') ?? '/drafts');
  const safeNext = next.startsWith('/') ? next : '/drafts';

  if (!validateAdminToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }

  setAdminCookie(cookies);
  return new Response(null, {
    status: 302,
    headers: {
      Location: safeNext
    }
  });
};
