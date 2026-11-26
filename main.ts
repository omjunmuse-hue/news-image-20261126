// News image entry: the picture of Thursday 26 November 2026 is entry.png
// beside this file, drawn as an HTML poster (poster.html) and rendered to a
// 1024x1024 PNG. The program's whole job is to hand that image in: verify
// it is a whole PNG within the gate's limits, then copy it to the output
// directory as entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(src);

// The gate's shape, checked before handing in: a PNG signature, an IHDR
// whose dimensions stay within 1024 by 1024, and at most 1 MiB in all.
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) throw new Error('entry.png is not a PNG');
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over the 1024 limit`);
if (bytes.length > 1_048_576) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'entry.png'));
console.log(`news image handed in: entry.png (${width}x${height}, ${bytes.length} bytes) — Thursday 26 November 2026`);
