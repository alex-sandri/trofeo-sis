import fs from 'node:fs/promises';
import path from 'node:path';
import { compileAsync, Logger } from 'sass';

const config = {
  outDir: path.join(import.meta.dirname, '..', 'dist', 'css'),
};

const result = await compileAsync('scss/main.scss', {
  style: 'compressed',
  loadPaths: [path.join(import.meta.dirname, '..', 'node_modules')],
  logger: Logger.silent,
});

await fs.mkdir(config.outDir, { recursive: true });

await fs.writeFile(path.join(config.outDir, 'main.css'), result.css);
