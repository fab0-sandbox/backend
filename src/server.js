// Serves the routes in app.js on PORT (default 3000).

import { createServer } from "node:http";
import { handle } from "./app.js";

const server = createServer(async (req, res) => {
  let text = "";
  for await (const chunk of req) text += chunk;
  let body;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    res.writeHead(400, { "content-type": "application/json" }).end(JSON.stringify({ error: "the body isn't JSON" }));
    return;
  }
  const out = handle({ method: req.method, path: new URL(req.url, "http://x").pathname, body });
  res.writeHead(out.status, { "content-type": "application/json", "access-control-allow-origin": "*" }).end(JSON.stringify(out.body));
});
server.listen(Number(process.env.PORT ?? 3000));
