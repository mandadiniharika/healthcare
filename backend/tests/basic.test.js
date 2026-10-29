
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const request = require("supertest");

const backendDir = path.resolve(__dirname, "..");
const app = require("../server");

test("Backend server.js exists", () => {
  assert.equal(
    fs.existsSync(path.join(backendDir, "server.js")),
    true
  );
});

test("Backend package.json is valid", () => {
  const packageData = JSON.parse(
    fs.readFileSync(
      path.join(backendDir, "package.json"),
      "utf8"
    )
  );

  assert.equal(packageData.name, "backend");
  assert.ok(packageData.scripts.start);
  assert.ok(packageData.scripts.test);
});

test("Required backend dependencies are declared", () => {
  const packageData = JSON.parse(
    fs.readFileSync(
      path.join(backendDir, "package.json"),
      "utf8"
    )
  );

  assert.ok(packageData.dependencies.express);
  assert.ok(packageData.dependencies.mongoose);
  assert.ok(packageData.dependencies.cors);
});

test("GET / returns the PulseCare API status", async () => {
  const response = await request(app).get("/");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, {
    message: "PulseCare API is running"
  });
});
