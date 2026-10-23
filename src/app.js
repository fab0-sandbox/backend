// The service's routes: a request in ({method, path, body}), a response out ({status, body}), with JSON bodies.
// server.js serves them over HTTP; tests call handle() directly.

const routes = {
  "GET /health": () => ({ status: 200, body: { ok: true } }),
};

export function handle({ method, path, body }) {
  const route = routes[`${method} ${path}`];
  if (!route) return { status: 404, body: { error: `no route ${method} ${path}` } };
  return route({ body });
}
