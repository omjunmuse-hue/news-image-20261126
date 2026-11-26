// News image entry: the picture of Thursday 26 November 2026 is entry.png
// beside this file, drawn as an HTML poster (poster.html) and rendered to a
// 1024x1024 PNG. The program's whole job is to hand that image in: copy it
// to the output directory as entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
console.log('news image handed in: entry.png (Thursday 26 November 2026)');
