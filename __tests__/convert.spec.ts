import path from 'path';
import * as child_process from 'child_process';
const exec = child_process.exec;

type CliResult = {
  code: number;
  error: child_process.ExecException | null;
  stdout: string;
  stderr: string;
};

function cli(args: string[], cwd: string | URL): Promise<CliResult> {
  return new Promise((resolve) => {
    exec(
      `node ${path.resolve('./build/bin/convert.js')} ${args.join(' ')}`,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      }
    );
  });
}

describe('cli', () => {
  it('should print help for command convert', async () => {
    const result = await cli(['convert', '--help'], '.');
    expect(result.code).toBe(0);
  });

  it('should convert image', async () => {
    const result = await cli(
      ['convert', __dirname + '/input/gen04.png', __dirname + '/output'],
      '.'
    );

    expect(result.stderr).toBe('');
  });

  it('should convert images in input folder', async () => {
    const result = await cli(
      ['convert', __dirname + '/input', __dirname + '/output'],
      '.'
    );

    expect(result.stderr).toBe('');
  });
});
