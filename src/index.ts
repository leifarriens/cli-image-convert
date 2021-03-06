import sharp, {
  ResizeOptions,
  OutputInfo,
  FormatEnum,
  format as formats,
} from "sharp";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import chalk from "chalk";

interface ConvertImageParams {
  inputPath: string;
  outDir: string;
  format?: keyof FormatEnum;
  rezise?: ResizeOptions;
}

type ConvertDirParams = ConvertImageParams;
type WatchDirParams = ConvertImageParams;

async function convertImage({
  inputPath,
  outDir,
  format = "jpg",
  rezise = {},
}: ConvertImageParams): Promise<OutputInfo | null> {
  const { name, dir: inputDir, ext } = path.parse(inputPath);

  if (!ext || Object.keys(formats).includes(ext)) {
    return null;
  }

  const file = fs.readFileSync(inputPath);

  const fileName = name + "." + format;
  const outputDir = path.resolve(inputDir, outDir);
  const outputPath = path.resolve(inputDir, outDir, fileName);

  fs.mkdirSync(outputDir, { recursive: true });

  console.info(
    `${chalk.yellow(inputPath)} -> ${chalk.green(`${outDir}/${fileName}`)}`
  );

  return sharp(file).resize(rezise).toFormat(format).toFile(outputPath);
}

async function convertDir({
  inputPath,
  outDir,
  format = "jpg",
  rezise = {},
}: ConvertDirParams) {
  const files = fs
    .readdirSync(inputPath)
    .map((filename) => path.resolve(inputPath, filename));

  files.forEach(async (filepath) => {
    const isDir = fs.statSync(filepath).isDirectory();
    if (!isDir) {
      await convertImage({ inputPath: filepath, outDir, format, rezise });
    }
  });
}

async function watchDir({ inputPath, outDir, format, rezise }: WatchDirParams) {
  chokidar.watch(inputPath).on("add", async function (filePath) {
    await convertImage({ inputPath: filePath, outDir, format, rezise });
  });
}

export { convertImage, convertDir, watchDir };
