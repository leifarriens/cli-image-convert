#! /usr/bin/env node

const { program } = require('commander');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

program
  .command('convert <img>')
  .option('-f, --format <format>')
  .description('Convert an image')
  .action(convert);

program.parse();

async function convert(inputPath, options) {
  const { format = 'jpeg' } = options;
  const stats = fs.statSync(inputPath);
  const isDir = stats.isDirectory();

  if (isDir) {
    const files = fs.readdirSync(inputPath).map((fileName) => {
      const filePath = path.resolve(inputPath, fileName);
      const outPath = path.resolve(
        inputPath.replace(fileName, ''),
        '../',
        `${path.parse(fileName).name}.${format}`
      );
      return {
        name: fileName,
        folder: inputPath,
        path: filePath,
        file: fs.readFileSync(filePath),
        outPath,
      };
    });

    const transforms = files.map((file) => {
      console.log(file.outPath);
      return convertImage(file.path, {
        format,
        outPath: file.outPath,
      });
    });

    return await Promise.all(transforms);
  }

  const fileBuffer = fs.readFileSync(path.resolve(inputPath));

  await convertImage(fileBuffer, {
    format,
    outPath: inputPath.replace(path.extname(inputPath), '') + `.${format}`,
  });
}

async function convertImage(fileBuffer, { format, outPath }) {
  return sharp(fileBuffer).toFormat(format).toFile(outPath);
}
