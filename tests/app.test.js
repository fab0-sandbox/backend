import assert from "node:assert/strict";
import { test } from "node:test";
import { handle } from "../src/app.js";

test("GET /health answers ok", () => {
  assert.deepEqual(handle({ method: "GET", path: "/health" }), { status: 200, body: { ok: true } });
});

test("an unknown route is a 404", () => {
  assert.equal(handle({ method: "GET", path: "/nope" }).status, 404);
});
