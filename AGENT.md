# Agent Guidelines for makersleague.de

## Commands
- Build: `pnpm build` or `npm run build`
- Dev: `pnpm dev` or `npm run dev` 
- Lint: `pnpm lint` or `npm run lint`
- Format: `pnpm format` or `npm run format`
- Type check: `pnpm typecheck` or `npm run typecheck`

## Environment
- `lint` and `typecheck` need no env vars; `build` and `dev` need a valid easyVerein v2.0 token
- Read [docs/easyverein-token.md](docs/easyverein-token.md) for how the token is stored, rotated and provided locally
- Prefer `GLOBAL_CONFIG` over `EASYVEREIN_TOKEN`; never print or commit either
- Never call the easyVerein `refresh-token` endpoint by hand: it rotates the production token

## Code Style
- TypeScript with strict typing
- React & Next.js App Router structure
- Tailwind CSS for styling
- Format with Prettier (includes Tailwind class sorting)
- ESLint with Next.js and Prettier configs
- Component imports: use absolute imports with @ prefix
- Use function components with TypeScript types
- Follow existing naming conventions (PascalCase for components)
- Consistent error handling with try/catch blocks
- Organize imports by: React/Next, third-party, local components, styles

## Project Structure
- `/app`: Next.js routes and server components
- `/components`: React components
- `/lib`: Utility functions and API clients
- `/content`: MDX and content files
- `/styles`: Global CSS styles
- `/public`: Static assets