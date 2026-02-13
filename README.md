# capitec-branch-locator

## Project Setup Instructions

## Installation

This project uses npm. Install dependencies with:

```bash
npm install
```

## Running the Project

### Development Server
```bash
npm run dev
```
This will start the Next.js development server on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Notes

1. **Logo**: The logo file is located at `public/capiteclogo-preview.png`.

2. **Turbo Mode**: The dev script uses `--turbo` flag for faster builds. If you encounter issues, you can remove it from `package.json`.

## Troubleshooting

If the server won't start:
- Make sure all dependencies are installed: `npm install`
- Check that port 3000 is not in use
- Try removing `--turbo` from the dev script if you get build errors

