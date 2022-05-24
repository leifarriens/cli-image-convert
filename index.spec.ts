import { convertImage, convertDir } from './index';

describe('convertImage', () => {
  it('should convert input image', async () => {
    const result = await convertImage({
      inputPath: __dirname + '/__tests__/input/gen04.png',
      outDir: __dirname + '/__tests__/output',
      format: 'webp',
    });
    expect(result.format).toBe('webp');
  });

  it('should convert all images in input folder', async () => {
    await convertDir({
      inputPath: __dirname + '/__tests__/input',
      outDir: __dirname + '/__tests__/output',
      format: 'webp',
    });
  });
});
