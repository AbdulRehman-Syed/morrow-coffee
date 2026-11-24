/** Optional diagnostics. Deliberately does not block `npm run dev`. */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const major = Number(process.versions.node.split('.')[0]);
let problems = 0;
const ok = (message) => console.log(`✓ ${message}`);
const fail = (message) => { console.error(`✗ ${message}`); problems++; };

if (major >= 20) ok(`Node ${process.versions.node}`);
else fail(`Node ${process.versions.node} is outdated. Use Node 20 LTS or newer.`);
for (const file of ['package.json', 'index.html', 'vite.config.ts', 'src/main.tsx', 'src/App.tsx']) {
  existsSync(resolve(root, file)) ? ok(`${file} found`) : fail(`${file} is missing`);
}
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
for (const name of Object.keys(dependencies)) {
  // Declaration-only @types packages cannot be checked with require.resolve().
  // ESM-only packages may not have a CommonJS entry point, either.
  const location = resolve(root, 'node_modules', ...name.split('/'), 'package.json');
  if (!existsSync(location)) fail(`${name} not installed`);
}
if (problems) {
  console.error(`\n${problems} issue(s) detected. From the folder with package.json, run:\n  npm install --include=dev\n  npm run dev\n`);
  process.exitCode = 1;
} else console.log(`\nAll ${Object.keys(dependencies).length} dependencies are present. Start with: npm run dev\n`);
