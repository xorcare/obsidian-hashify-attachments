/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import {promises as fs} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import process from 'node:process';
import console from 'node:console';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = ['package.json', 'manifest.json', 'versions.json', 'package-lock.json'];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function isValidSemver(version) {
  // Basic semver check: X.Y.Z or with suffix
  return /^\d+\.\d+\.\d+(-[\w.-]+)?$/.test(version);
}

async function main() {
  // 1. Check file existence
  for (const f of files) {
    const exists = await fileExists(path.join(__dirname, f));
    if (!exists) {
      console.error(`❌ File "${f}" not found!`);
      process.exit(1);
    } else {
      console.log(`✅ File "${f}" found`);
    }
  }

  // 2. Read package.json
  const pkgRaw = await fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
  const pkg = JSON.parse(pkgRaw);
  const packageVersion = pkg.version || process.env.npm_package_version;

  if (!packageVersion) {
    console.error('❌ No version found in package.json');
    process.exit(1);
  }
  console.log(`📦 Version from package.json: ${packageVersion}`);

  // 3. Validate version format
  if (!isValidSemver(packageVersion)) {
    console.error(`❌ Version "${packageVersion}" is not a valid semver format`);
    process.exit(1);
  } else {
    console.log('✅ Version is valid (semver)');
  }

  // 4. Read manifest.json
  const manifestRaw = await fs.readFile(path.join(__dirname, 'manifest.json'), 'utf-8');
  const manifest = JSON.parse(manifestRaw);

  if (manifest.version !== packageVersion) {
    console.error(
        `❌ Version mismatch: manifest.json (${manifest.version}) vs package.json (${packageVersion})`);
    process.exit(1);
  } else {
    console.log('✅ manifest.json version matches package.json');
  }

  // 5. Check versions.json consistency
  const versionsRaw = await fs.readFile(path.join(__dirname, 'versions.json'), 'utf-8');
  const versions = JSON.parse(versionsRaw);

  const minAppVersion = manifest.minAppVersion;
  if (versions[manifest.version] !== minAppVersion) {
    console.error(
        `❌ versions.json does not contain the expected entry: {"${manifest.version}": "${minAppVersion}"}`);
    process.exit(1);
  } else {
    console.log(`✅ versions.json contains {"${manifest.version}": "${minAppVersion}"}`);
  }

  // 6. Read package-lock.json
  const lockRaw = await fs.readFile(path.join(__dirname, 'package-lock.json'), 'utf-8');
  const lock = JSON.parse(lockRaw);

  // 6.1 check top-level version field
  if (lock.version !== packageVersion) {
    console.error(
        `❌ package-lock.json "version" (${lock.version}) does not match package.json (${packageVersion})`,
    );
    process.exit(1);
  } else {
    console.log('✅ package-lock.json "version" matches package.json');
  }

  // 6.2 check packages[""].version field
  if (
      !lock.packages ||
      !lock.packages[''] ||
      lock.packages[''].version !== packageVersion
  ) {
    console.error(
        `❌ package-lock.json packages[""].version (${lock.packages?.['']?.version}) does not match package.json (${packageVersion})`,
    );
    process.exit(1);
  } else {
    console.log('✅ package-lock.json packages[""].version matches package.json');
  }

  console.log('🎉 All checks passed successfully!');
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
