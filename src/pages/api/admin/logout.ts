import type { APIRoute } from 'astro';
import { clearAdminCookie } from '../../../lib/admin';

export const POST: APIRoute = async ({ cookies }) => {
  clearAdminCookie(cookies);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/'
    }
  });
};
