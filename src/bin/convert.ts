#! /usr/bin/env node

import fs from 'fs';
import { program } from 'commander';

import type { FormatEnum } from 'sharp';

import { convertImage, convertDir, watchDir } from '../index';

program
  .command('convert <input> [output]')
  .option('-w, --width <width>')
  .option('-h, --height <height>')
  .option('-f, --format <format>')
  .option('-W --watch')
  .description('Convert an image')
  .action(action);

program.parse();

interface ConvertOptions {
  format?: keyof FormatEnum;
  watch?: boolean;
  width?: string;
  height?: string;
}

async function action(
  inputPath: string,
  outDir = '.',
  options: ConvertOptions
) {
  const { format = 'jpg', watch = false, width, height } = options;
  const rezise = {
    width: width ? parseInt(width) : undefined,
    height: height ? parseInt(height) : undefined,
  };

  const isDir = fs.statSync(inputPath).isDirectory();

  if (!format) {
    throw new Error('Not output image format defined');
  }

  if (watch && !isDir) {
    throw new Error(`${inputPath} is not a directory and cant be watched`);
  }

  if (watch) {
    console.log(`Watching for changes in ${inputPath}...`);
    return watchDir({ inputPath, outDir, format, rezise });
  }

  if (isDir) {
    await convertDir({ inputPath, outDir, format, rezise });

    return;
  }

  if (!isDir) {
    await convertImage({ inputPath, outDir, format, rezise });

    return;
  }
}
