# backend

The fab0 sandbox's backend: a small JSON service over HTTP. Its work comes from fab0 runs in
`fab0-sandbox/factory`, through the skills in `.claude/skills/`.

- **Stack:** Node 22 or later, ES modules, no dependencies. Don't add any.
- **Layout:** routes in `src/app.js` (a request in, a status and JSON body out), the HTTP server in `src/server.js`,
  tests in `tests/*.test.js`, specs in `docs/specs/<run>.md`.
- **Tests:** `node --test`, with `node:test` and `node:assert/strict`. Test routes by calling `handle()`; no server.
- **Style:** small functions, one route per entry in `routes`, errors as `{error: "<what went wrong>"}` with a 4xx
  status.
