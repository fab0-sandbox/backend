import assert from "node:assert/strict";
import { test } from "node:test";
import { handle } from "../src/app.js";

test("GET /health answers ok", () => {
  assert.deepEqual(handle({ method: "GET", path: "/health" }), { status: 200, body: { ok: true } });
});

test("an unknown route is a 404", () => {
  assert.equal(handle({ method: "GET", path: "/nope" }).status, 404);
});

const greetReq = (body) => handle({ method: "POST", path: "/greet", body });
const TOO_LONG = { error: "name is too long (at most 50 characters)" };

test("R1.1: a name gets a greeting", () => {
  assert.deepEqual(greetReq({ name: "Ada" }), { status: 200, body: { greeting: "Hello, Ada!" } });
});

test("R1.2: the name is trimmed", () => {
  assert.deepEqual(greetReq({ name: "  Ada  " }), { status: 200, body: { greeting: "Hello, Ada!" } });
});

test("R1.3: markup is kept unchanged", () => {
  assert.equal(greetReq({ name: "<b>Ada</b>" }).body.greeting, "Hello, <b>Ada</b>!");
});

test("R2.1: a 50-character name is accepted", () => {
  const name = "a".repeat(50);
  assert.deepEqual(greetReq({ name }), { status: 200, body: { greeting: `Hello, ${name}!` } });
});

test("R2.2: a 51-character name is refused", () => {
  assert.deepEqual(greetReq({ name: "a".repeat(51) }), { status: 400, body: TOO_LONG });
});

test("R2.3: a 200-character name is refused", () => {
  assert.deepEqual(greetReq({ name: "a".repeat(200) }), { status: 400, body: TOO_LONG });
});

test("R2.4: 50 characters padded with spaces are accepted", () => {
  assert.equal(greetReq({ name: ` ${"a".repeat(50)} ` }).status, 200);
});

test("R2.5: a missing, blank or non-string name is required", () => {
  for (const body of [{ name: "" }, { name: "   " }, {}, { name: 42 }, undefined]) {
    assert.deepEqual(greetReq(body), { status: 400, body: { error: "name is required" } });
  }
});
