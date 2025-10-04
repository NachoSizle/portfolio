import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  // Solo pasar al siguiente middleware, sin redirecciones
  // La detección de idioma se hace en el cliente si es necesario
  return next();
};
