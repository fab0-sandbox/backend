// The service's routes: a request in ({method, path, body}), a response out ({status, body}), with JSON bodies.
// server.js serves them over HTTP; tests call handle() directly.

const MAX_NAME_LENGTH = 50;

function greet(body) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name) return { status: 400, body: { error: "name is required" } };
  if (name.length > MAX_NAME_LENGTH) {
    return { status: 400, body: { error: `name is too long (at most ${MAX_NAME_LENGTH} characters)` } };
  }
  return { status: 200, body: { greeting: `Hello, ${name}!` } };
}

const routes = {
  "GET /health": () => ({ status: 200, body: { ok: true } }),
  "POST /greet": ({ body }) => greet(body),
};

export function handle({ method, path, body }) {
  const route = routes[`${method} ${path}`];
  if (!route) return { status: 404, body: { error: `no route ${method} ${path}` } };
  return route({ body });
}
