# NWC Frontend

This is the client-side interface for the 1977 NWC project. It is built with React, Vite, and react-router-dom.

The backend repository is:
https://github.com/DataAnalyticsinStudentHands/NWC_backend

## Requirements

- Node.js 24
- npm

If using nvm, select the project's Node.js version with:

```bash
nvm use
```

## Development

Install dependencies:

```bash
npm ci
```

Configure the required environment variables in `.env`. See `.env.example` for the available variables.

Start the local Vite development server:

```bash
npm run dev
```

Local development runs at the site root and does not use the `/dev/` staging path.

## Staging

The staging site is deployed under `/dev/`.

Create the staging build with:

```bash
npm run build:staging
```

This creates the static site in the `build` directory with `/dev/` configured as the application base path.

The staging environment should use:

```text
VITE_ENABLE_PRODUCTION=false
```

The `build` directory is served by PM2 on the web server.

## Production

Create the production build with:

```bash
npm run build
```

This creates the static site in the `build` directory with `/` as the application base path.

The production environment should use:

```text
VITE_ENABLE_PRODUCTION=true
```

The `build` directory is served by PM2 on the web server.

## Environment Variables

The frontend uses Vite environment variables. The required variables are:

```text
VITE_API_URL=
VITE_MAPBOX_ACCESS_TOKEN=
VITE_ENABLE_PRODUCTION=false
```

Use `.env.example` as the template. Environment-specific `.env` files containing actual configuration values should not be committed to the repository.