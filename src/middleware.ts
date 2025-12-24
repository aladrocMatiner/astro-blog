import type { MiddlewareHandler } from 'astro';
import { isAdmin } from './lib/admin';

export const onRequest: MiddlewareHandler = async (context, next) => {
  if (context.url.pathname.startsWith('/drafts')) {
    if (!isAdmin(context.cookies)) {
      const nextPath = encodeURIComponent(context.url.pathname);
      return context.redirect(`/admin?next=${nextPath}`);
    }
  }

  return next();
};
