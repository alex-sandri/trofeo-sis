import fs from 'node:fs/promises';
import path from 'node:path';
import { compileAsync, Logger } from 'sass';

const config = {
  dirs: {
    out: path.join(import.meta.dirname, '..', 'website', 'static', 'website'),
    bootstrapItalia: path.join(
      import.meta.dirname,
      '..',
      'node_modules',
      'bootstrap-italia',
      'dist',
    ),
  },
  filesToCopy: [
    path.join('js', 'bootstrap-italia.bundle.min.js'),
    path.join('svg', 'sprites.svg'),
  ],
};

const result = await compileAsync(
  path.join(import.meta.dirname, '..', 'scss', 'main.scss'),
  {
    style: 'compressed',
    loadPaths: [path.join(import.meta.dirname, '..', 'node_modules')],
    logger: Logger.silent,
  },
);

for (const dir of ['css', 'js', 'svg']) {
  await fs.mkdir(path.join(config.dirs.out, dir), { recursive: true });
}

await fs.writeFile(path.join(config.dirs.out, 'css', 'bootstrap-italia.css'), result.css);

for (const file of config.filesToCopy) {
  await fs.copyFile(
    path.join(config.dirs.bootstrapItalia, file),
    path.join(config.dirs.out, file),
  );
}

await fs.cp(
  path.join(config.dirs.bootstrapItalia, 'fonts'),
  path.join(config.dirs.out, 'fonts'),
  { recursive: true },
);
