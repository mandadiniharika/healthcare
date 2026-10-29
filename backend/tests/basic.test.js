const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const backendDir = path.resolve(__dirname, '..');

test('Backend server.js exists', () => {
  const serverPath = path.join(backendDir, 'server.js');
  assert.equal(fs.existsSync(serverPath), true);
});

test('Backend package.json is valid', () => {
  const packagePath = path.join(backendDir, 'package.json');
  const packageData = JSON.parse(
    fs.readFileSync(packagePath, 'utf8')
  );

  assert.equal(packageData.name, 'backend');
  assert.ok(packageData.scripts.start);
  assert.ok(packageData.scripts.test);
});

test('Required backend dependencies exist', () => {
  const packageData = JSON.parse(
    fs.readFileSync(path.join(backendDir, 'package.json'), 'utf8')
  );

  assert.ok(packageData.dependencies.express);
  assert.ok(packageData.dependencies.mongoose);
  assert.ok(packageData.dependencies.cors);
});