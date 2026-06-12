# Architecture

The platform is split into `frontend/` and `backend/`.

## Frontend

- Next.js App Router with individual public pages, dynamic service/project/blog routes, calculator routes, and admin dashboard routes.
- Shared data lives in `src/constants`.
- Shared Supabase clients live in `src/lib` and are initialized lazily to keep builds safe when environment variables are not present.
- Calculator UX is centralized through `CalculatorShell` for now, with route-level isolation and slugs ready to split into independent modules as requirements grow.

## Backend

- Express service shell with separate routes and validators.
- Intended folders: controllers, routes, middleware, services, repositories, models, database, validators, helpers, jobs, emails, config.

## Storage

Supabase Storage should contain buckets for:

- `brand`
- `projects`
- `services`
- `gallery`
- `team`
- `certificates`
- `downloads`
- `career-applications`
