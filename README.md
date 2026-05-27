# Spec Help Center

Standalone static export of the Help Center currently sourced from `../specmarkets`.

## Build

```bash
npm run build
```

The build script:

- imports the current Help Center data from `specmarkets`
- generates static pages under language-specific paths
- compiles the standalone stylesheet
- copies the required logo and banner assets

## Output

After build, the repository root contains the static site that can be served directly by GitHub Pages.
