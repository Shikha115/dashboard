# Environment Variables Configuration

This project uses environment variables to configure different API endpoints and settings for various environments.

## Environment Files

The project includes the following environment files:

- `.env` - Default environment variables (committed to repo)
- `.env.development` - Development environment variables (committed to repo)
- `.env.production` - Production environment variables (committed to repo)
- `.env.local.example` - Example for local environment (committed to repo)
- `.env.local` - Local overrides (NOT committed - add your personal settings here)

## Available Environment Variables

| Variable                 | Description                  | Example                         |
| ------------------------ | ---------------------------- | ------------------------------- |
| `REACT_APP_API_BASE_URL` | Base URL for API endpoints   | `https://api.prodv.rojgarapp.in` |
| `REACT_APP_WEB_URL`      | Base URL for web application | `https://bfsiportal.com`        |
| `REACT_APP_API_VERSION`  | API version path             | `api/v1`                        |

## Usage

### For Development

```bash
npm start
# This will automatically use .env.development
```

### For Production Build

```bash
npm run build
# This will automatically use .env.production
```

### For Local Development (with custom settings)

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Update the values in `.env.local` with your local settings
3. Run `npm start`

## Commands

| Command | API host it bakes in |
| ------- | -------------------- |
| `npm start` | `localhost:5001` (`.env.development`) |
| `npm run start:prod` | `api.prodv.rojgarapp.in` — dev server against the production API |
| `npm run build` | `api.prodv.rojgarapp.in` (`.env.production`) |
| `npm run build:prod` | same as `build`, named explicitly |
| `npm run build:local` | `localhost:5001` — production bundle against the local API |

### Why the odd-looking scripts

Create React App picks its env file from `NODE_ENV`, which the command fixes and
the script name cannot change: `react-scripts start` is always `development`,
`react-scripts build` is always `production`. No flag overrides it.

Since `REACT_APP_*` values from the ambient shell take priority over every env
file, `start:prod` and `build:local` load the other file themselves:

```
env $(grep -v '^#' .env.development | xargs) react-scripts build
```

`grep` strips comments, `xargs` flattens the file to `KEY=value` arguments, and
`env` puts them in the environment for that one command. No dependency needed —
but it is POSIX shell, so it will not run on Windows `cmd`. If Windows support
is ever needed, `env-cmd` replaces this idiom directly.

Values must stay quote-free and space-free in the env files for `xargs` to split
them correctly. Bare URLs are fine.

## Priority Order

Environment variables are loaded in this order (later ones override earlier ones):

1. `.env` - Default for all environments
2. `.env.local` - Local overrides (ignored by git)
3. `.env.development` / `.env.production` - Environment-specific
4. `.env.development.local` / `.env.production.local` - Local environment-specific (ignored by git)

## Which API host

| Host | State |
| ---- | ----- |
| `http://localhost:5001` | Local backend. What `.env.development` uses. |
| `https://api.prodv.rojgarapp.in` | Hardened API. What `.env.production` uses — the only remote host this build works against. |
| `https://api.dev.rojgarapp.in` | Hardened API, dev deployment. Usable. |
| `https://api.prod.rojgarapp.in` | Legacy backend. `/auth/refresh` returns 404, so the session dies on the first reload. |

The dashboard keeps its access token in memory and restores the session from an
httpOnly refresh cookie, which only the hardened backend issues. Any host used
here must also list this dashboard's origin in the backend's `CORS_ORIGINS`.

## Important Notes

- All environment variables must be prefixed with `REACT_APP_` to be accessible in the React application
- After changing environment variables, you must restart the development server
- `.env.local` and `*.local` files are ignored by git, so they won't be committed

## Accessing Environment Variables in Code

Environment variables are accessed using `process.env`:

```javascript
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const webUrl = process.env.REACT_APP_WEB_URL;
```

See `src/utils/URL.js` for the implementation.
