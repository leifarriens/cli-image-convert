#! /usr/bin/env node

const { program } = require('commander');
const sharp = require('sharp');
const fs = require('fs');

program
  .command('convert <img>')
  .option('-f, --format <format>')
  .description('Convert an image')
  .action(convert);

program.parse();

async function convert(img, options) {
  const { format = 'jpeg' } = options;
  const file = fs.readFileSync(img);

  await sharp(file)
    .toFormat(format)
    .toFile(`${img.split('.')[0]}.${format}`);
}
