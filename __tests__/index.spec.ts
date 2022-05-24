import { convertImage, convertDir } from '../src/index';

describe('convertImage', () => {
  it('should convert input image', async () => {
    const result = await convertImage({
      inputPath: __dirname + '/input/gen04.png',
      outDir: __dirname + '/output',
      format: 'webp',
    });
    
    if (result !== null) {
      expect(result.format).toBe('webp');
    }
  });

  it('should convert all images in input folder', async () => {
    await convertDir({
      inputPath: __dirname + '/input',
      outDir: __dirname + '/output',
      format: 'webp',
    });
  });
});
