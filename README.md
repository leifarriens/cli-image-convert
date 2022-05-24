# cli-image-convert

CLI tool to convert images.

## CLI

```sh
image convert <path> <outDir> -f <format> -w <watchMode>
```

`<path>` refs to an image file or folder

`<outDir>` refs the output directory relative to `<path>`

### -f --format

Formats can be found in the [sharp docs](https://sharp.pixelplumbing.com/api-output#toformat).

### -w --watch

Watch mode mode lets you watch for file changes in your defined input path. In watch mode the input path hast to be a directory.
Watch mode does not trigger on files changes in subfolders of the defined input directory.
