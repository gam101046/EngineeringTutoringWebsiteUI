# Project Overview

* **What this project does**: Engenius is an online engineering tutoring platform ("ติวออนไลน์สำหรับวิศวกรรม").
* **Primary technologies**: Next.js (Frontend) and Bun with Elysia and Prisma (Backend).
* **Architecture summary**: A decoupled client-server architecture using a monorepo-style structure. The frontend is built with Next.js App Router and Ant Design. The backend is a fast REST API built with Elysia running on the Bun runtime, utilizing Prisma as the ORM.
* **Entry points**: 
  * Frontend: `Frontend/src/app/page.tsx`
  * Backend: `Backend/src/index.ts`
* **Important modules**: 
  * `Frontend/src/components/`: Contains UI components organized by feature (e.g., `auth`, `catalog`, `checkout`, `courses`, `landing`).
  * `Frontend/src/app/`: Next.js App Router definitions.
  * `Backend/src/`: Contains `config`, `db`, `middlewares`, `modules`, and `router` directories.

# Directory Structure

* `Backend/`
  * `prisma/`: Database schemas (`schema.prisma`) and migrations.
  * `src/config/`: Backend configuration files.
  * `src/db/`: Database connection and utilities.
  * `src/middlewares/`: Elysia middlewares.
  * `src/modules/`: Feature-specific backend logic.
  * `src/router/`: API route definitions.
* `Frontend/`
  * `src/app/`: Next.js App Router pages and layouts.
  * `src/components/`: Reusable React components organized by feature folders.
  * `src/context/`: React Context providers for state management.
  * `src/lib/`: Frontend utility functions.
  * `public/`: Static assets.

# Development Commands

**Frontend (supports both npm and pnpm)**
* `npm i` or `pnpm install`: Install dependencies
* `npm run dev` or `pnpm dev`: Start Next.js development server with Turbopack
* `npm run build` or `pnpm build`: Build for production
* `npm run lint` or `pnpm lint`: Run Next.js linting

**Backend (uses Bun)**
* `bun install`: Install dependencies
* `bun run dev`: Start Elysia development server with watch mode
* `bun run start`: Start production server
* `bun run db:push`: Push Prisma schema to the database
* `bun run db:studio`: Open Prisma Studio UI
* `bun run db:migrate`: Deploy Prisma migrations

# Coding Standards

* **Naming conventions**: PascalCase for React components (`MainLayout.tsx`). kebab-case for directories containing features.
* **File organization**: Features are grouped into domain-specific folders (e.g., `src/components/auth`, `src/components/courses`).
* **Component organization**: UI components rely on Ant Design (`antd`). Wrapper layouts are used (e.g., `MainLayout`).
* **Error handling**: Unknown (not explicitly patterned yet).
* **Logging**: Unknown (standard console logging is used in entry points).
* **Async patterns**: Unknown (assumed standard Promises/async-await).
* **Code style / Formatting / Linting**: Strict TypeScript (`strict: true` in tsconfig). Next.js default linting for frontend.
* **Comments / Documentation expectations**: Keep code self-documenting; add comments for complex logic.

# Architecture

* **Layers**: 
  * Presentation Layer (Frontend - Next.js)
  * API Layer (Backend - Elysia)
  * Data Layer (Backend - Prisma)
* **Data flow**: Client (Next.js) requests -> Server (Elysia) -> Database (Prisma) -> Server response -> Client renders.
* **Dependency direction**: Frontend components depend on Ant Design. Backend modules depend on Prisma client.
* **State management**: Handled via React Context (`Frontend/src/context/`) and standard React hooks.
* **API structure**: Elysia routes (setup pending in `Backend/src/router/`).
* **Database access**: Prisma ORM (currently configured with SQLite).
* **Services**: Feature modules in `Backend/src/modules/`.
* **Utilities**: `Frontend/src/lib/`.
* **Reusable components**: `Frontend/src/components/`.

# AI Agent Rules

* Never rewrite unrelated code.
* Preserve existing architecture.
* Follow current style (e.g., use Ant Design for UI components; do not inject Tailwind CSS unless explicitly configured).
* Avoid unnecessary dependencies.
* Update tests when behavior changes.
* Update documentation when APIs change.
* Prefer existing utilities over new implementations.
* Minimize breaking changes.
* Keep commits logically scoped.

# Testing Strategy

* **Test framework**: Unknown (Backend scripts echo "no test specified", Frontend lacks test scripts).
* **Test locations**: Unknown.
* **Mocking strategy**: Unknown.
* **Coverage expectations**: Unknown.

# Environment

* **Required environment variables**: 
  * Backend: `PORT` (defaults to 3000), Prisma database connection string.
* **Configuration files**: 
  * `Frontend/next.config.ts`, `Frontend/tsconfig.json`, `Frontend/pnpm-workspace.yaml`.
  * `Backend/prisma.config.ts`, `Backend/tsconfig.json`.
* **Secrets handling**: Uses `.env` files (ignored in `.gitignore`).

# Dependencies

* **Frontend**:
  * `next` (^15.2.4): React framework.
  * `react` & `react-dom` (^18.3.1): UI library.
  * `antd` (^5.24.4) & `@ant-design/icons`: Component library.
* **Backend**:
  * `elysia`: Fast web framework for Bun.
  * `@prisma/client` & `prisma` (^7.8.0): ORM and database CLI.
  * `bun-types`: Type definitions for Bun runtime.

# Common Workflows

* **Adding a feature**: Create corresponding folder in `Frontend/src/components/`, define context if needed, and add backend logic in `Backend/src/modules/`.
* **Adding an API endpoint**: Define the route in `Backend/src/router/` and map it to a module.
* **Adding a UI component**: Add it to the relevant domain folder inside `Frontend/src/components/` using Ant Design components.
* **Adding a database migration**: Update `Backend/prisma/schema.prisma` and run `bun run db:push` or `bun run db:migrate`.

# Known Conventions

* The project uses Ant Design for all frontend styling. (A `default_shadcn_theme.css` exists but `tailwindcss` is not installed or configured).
* Next.js App Router is used exclusively (no `pages` directory).
* Layouts are heavily utilized (e.g., `MainLayout` wraps page content).

# Important Files

* `Frontend/src/app/layout.tsx`: Root layout for the Next.js app, setting up Ant Design registry and contexts.
* `Backend/src/index.ts`: The Elysia application entry point.
* `Backend/prisma/schema.prisma`: The single source of truth for the database schema.
* `pnpm-workspace.yaml`: Indicates the repository might be managed or planned to be managed as a monorepo workspace.

# Improvement Opportunities

* **Testing**: Implement a testing framework (e.g., Vitest for Backend, Jest/React Testing Library for Frontend).
* **Database Models**: Prisma schema currently contains no models.
* **API Implementation**: Backend router and modules are currently empty.
* **CSS Cleanup**: Clarify the use of `default_shadcn_theme.css` given the absence of Tailwind CSS in dependencies.
