/***********************************************
 * Copyright 2025 Vasiliy Vasilyuk
 * SPDX-License-Identifier: AGPL-3.0-only
 ***********************************************/

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';
import console from 'node:console';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function isValidSemver(version) {
  // Basic semver check: X.Y.Z or with suffix
  return /^\d+\.\d+\.\d+(-[\w.-]+)?$/.test(version);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // 1. Read package.json for version
  const pkgRaw = await fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
  const pkg = JSON.parse(pkgRaw);
  const packageVersion = pkg.version || process.env.npm_package_version;

  if (!packageVersion) {
    console.error('❌ No version found in package.json or env');
    process.exit(1);
  }
  if (!isValidSemver(packageVersion)) {
    console.error(`❌ Version "${packageVersion}" is not a valid semver format`);
    process.exit(1);
  }
  console.log(`📦 Using version: ${packageVersion}`);

  // 2. Update manifest.json
  const manifestPath = path.join(__dirname, 'manifest.json');
  const manifestRaw = await fs.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestRaw);
  manifest.version = packageVersion;
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
  console.log('✅ Updated manifest.json with new version');

  // 3. Update or create versions.json
  const versionsPath = path.join(__dirname, 'versions.json');
  let versions = {};
  const versionsExists = await fileExists(versionsPath);
  if (versionsExists) {
    const versionsRaw = await fs.readFile(versionsPath, 'utf-8');
    versions = JSON.parse(versionsRaw);
    console.log('🔄 versions.json found and loaded');
  } else {
    console.log('🆕 versions.json does not exist, creating new file');
  }
  versions[packageVersion] = manifest.minAppVersion;
  await fs.writeFile(versionsPath, JSON.stringify(versions, null, 2) + '\n', 'utf-8');
  console.log(
      `✅ Updated versions.json: {"${packageVersion}": "${manifest.minAppVersion}"}`
  );

  console.log('🎉 All bumps applied successfully!');
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
