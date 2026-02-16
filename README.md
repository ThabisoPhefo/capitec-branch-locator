# Capitec Branch Locator

A modern, production-ready Next.js application for locating Capitec Bank branches with interactive maps, search functionality, and filtering capabilities.

## Features

- 🗺️ Interactive map with branch locations
- 🔍 Search branches by name, city, or address
- 📍 Filter by province and radius
- 📱 Responsive design with mobile support
- ⚡ Built with Next.js 16 and React 19
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Docker** (optional, for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd capitec-branch-locator
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

The dev script uses `--turbo` flag for faster builds. If you encounter issues, you can remove it from `package.json`.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The production server will run on `http://localhost:3000`

## Docker Deployment

### Building the Docker Image

Build the Docker image:

```bash
docker build -t capitec-branch-locator .
```

### Running with Docker

Run the container:

```bash
docker run -p 3000:3000 capitec-branch-locator
```

The application will be available at `http://localhost:3000`

### Docker Compose (Optional)

You can also use Docker Compose for easier management. The project includes a `docker-compose.yml` file with health checks and proper configuration.

Run:

```bash
docker-compose up -d
```

## Testing

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

### Type Checking

The project uses TypeScript. Type checking is performed during the build process:

```bash
npm run build
```

For development, you can use your IDE's TypeScript integration or run:

```bash
npx tsc --noEmit
```

## Project Structure

```
capitec-branch-locator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── branch-*.tsx      # Branch-related components
│   ├── site-header.tsx   # Site header component
│   └── ui/               # UI components
├── lib/                   # Utility functions
│   ├── branches.ts       # Branch data and utilities
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   └── capiteclogo-preview.png
├── Dockerfile            # Docker configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Configuration

### Environment Variables

The application can be configured using environment variables. Create a `.env.local` file for local development:

```env
# Example environment variables (if needed)
NEXT_PUBLIC_API_URL=
```

### Next.js Configuration

The `next.config.mjs` file contains production-grade settings:
- Standalone output mode for optimized Docker builds
- TypeScript error checking enabled
- ESLint error checking enabled

## Production Deployment

### Build Optimization

The production build includes:
- Code splitting and tree shaking
- Optimized images and assets
- Standalone output for containerized deployments
- TypeScript and ESLint validation

### Docker Production Build

The Dockerfile uses a multi-stage build process:
1. **Dependencies stage**: Installs npm dependencies
2. **Builder stage**: Builds the Next.js application
3. **Runner stage**: Creates a minimal production image

This approach results in a smaller final image (~150MB) and improved security by running as a non-root user.

### Health Checks

For production deployments, consider adding a health check endpoint or using Docker health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Change the port: `PORT=3001 npm run dev`
   - Or kill the process using port 3000

2. **Build errors**
   - Ensure all dependencies are installed: `npm install`
   - Clear the `.next` directory: `rm -rf .next`
   - Try removing `--turbo` from the dev script if you encounter build errors

3. **Docker build fails**
   
   **Windows-specific: Docker Desktop not running**
   - Error: `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified`
   - **Solution**: Start Docker Desktop application
     - Open Docker Desktop from Start Menu or Desktop shortcut
     - Wait for Docker to fully start (whale icon in system tray should be steady)
     - Verify Docker is running: `docker ps` (should not show an error)
   - If Docker Desktop is not installed:
     - Download from: https://www.docker.com/products/docker-desktop
     - Install and restart your computer
     - Start Docker Desktop before running Docker commands
   
   **Package lock file out of sync**
   - Error: `npm ci can only install packages when your package.json and package-lock.json are in sync`
   - **Solution**: Regenerate the lock file:
     ```bash
     npm install
     ```
     - This updates `package-lock.json` to match `package.json`
     - Commit the updated `package-lock.json` to version control
     - Then rebuild: `docker build -t capitec-branch-locator .`
   
   **General Docker issues**:
   - Ensure Docker is running: `docker ps` (should not show an error)
   - Check that you have sufficient disk space
   - Verify Node.js version compatibility (20.x)
   - On Windows, ensure WSL 2 is enabled (Docker Desktop requires it)

4. **TypeScript errors**
   - Run `npx tsc --noEmit` to see detailed error messages
   - Ensure all dependencies are installed

### Getting Help

- Check the Next.js documentation: https://nextjs.org/docs
- Review the TypeScript configuration in `tsconfig.json`
- Check Docker logs: `docker logs <container-id>`

## Development Notes

1. **Logo**: The logo file is located at `public/capiteclogo-preview.png`.

2. **Turbo Mode**: The dev script uses `--turbo` flag for faster builds. This is optional and can be removed if it causes issues.

3. **Hot Reload**: Changes to components and pages will automatically reload in development mode.

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, please contact the project developer **phefothabiso@gmail.com**
