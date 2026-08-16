# Lorkut — Project Context

## Status

**Full-stack portfolio live in production.**

Current focus: project organization, documentation and refinement of existing features.

The application is functional locally and in production.

Avoid unnecessary rewrites. Refactor incrementally and preserve working functionality.

---

## Project Goal

Create a personal developer portfolio inspired by the visual language and nostalgia of Orkut, while functioning as a modern full-stack web application.

The project serves two purposes:

- Present Lorena Ferreira's professional profile, projects and development work
- Demonstrate practical full-stack development through real interactive features

The goal is not to reproduce Orkut exactly, but to reinterpret its recognizable social-network experience as a personal portfolio.

Production:

`lorenaferreira.dev`

---

## Stack

### Frontend

- React
- Vite
- React Router DOM
- CSS Modules
- react-i18next
- Cloudinary
- Vercel

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Maven
- REST API
- Railway

### Database

- MySQL
- Railway MySQL

### Infrastructure

- Git / GitHub
- Vercel — frontend
- Railway — backend and production database
- Cloudinary — media hosting

---

## Architecture

Single Git repository containing separate frontend and backend applications.

Current high-level structure:

```text
lorenaferreira.dev/
├── frontend/
├── backend/
├── docs/
│   └── screenshots/
├── README.md
├── PROJECT_CONTEXT.md
├── ROADMAP.md
└── .gitignore
```

Development principles:

- Preserve working functionality during refactors
- Keep frontend and backend responsibilities clearly separated
- Prefer reusable components when real repetition exists
- Avoid unnecessary abstractions
- Keep API communication centralized in services
- Keep credentials and environment-specific configuration outside Git
- Test locally before production deployment
- Document important architectural decisions
- Refactor incrementally instead of rewriting working features

---

## Frontend

The frontend contains the portfolio interface and Orkut-inspired experience.

Main responsibilities:

- Application routing
- Portfolio presentation
- Project browsing
- Profile information
- Communities
- Scraps
- Photos and videos
- Dynamic counters
- Internationalization
- API consumption
- Responsive UI

Frontend application:

`frontend/`

Production deployment:

Vercel

---

## Backend

The Spring Boot backend provides the application's REST API and persistence layer.

Main responsibilities:

- Project data
- Community data
- Scrap management
- Approval workflow
- Dynamic portfolio data
- MySQL persistence

Backend application:

`backend/`

Production deployment:

Railway

The backend should remain independent from the frontend deployment.

---

## Database

MySQL is used for persistent application data.

Production database:

Railway MySQL

Local development:

MySQL through MAMP.

Spring Boot uses environment variables for production database configuration and local fallback values for development.

Sensitive credentials must never be committed to Git.

---

## Projects

Portfolio projects are stored dynamically and consumed by the frontend through the backend API.

The application supports:

- Project listing
- Individual project pages
- Project metadata
- Technologies
- Project descriptions
- Repository/demo links where available

Project detail routing should use stable identifiers such as project slugs.

---

## Communities

Communities are part of the Orkut-inspired portfolio experience.

They are dynamically loaded from the backend and used to represent interests, technologies or parts of Lorena's professional identity.

---

## Scraps

The portfolio includes an interactive scraps feature inspired by Orkut.

Current flow:

1. Visitor submits a scrap
2. Scrap is stored in the backend
3. New scrap remains pending
4. Lorena can review pending scraps
5. Approved scraps become publicly visible

Demo scraps are intentionally included as part of the portfolio experience and should not be removed during refactoring.

---

## Dynamic Counters

Profile counters are connected to actual portfolio content where applicable.

Examples include:

- Scraps
- Photos
- Videos
- Fans / related profile metrics

When modifying content sources, verify that counters remain synchronized with the displayed content.

---

## Media

Cloudinary is used for hosted media where appropriate.

Static frontend assets remain inside the frontend application.

Documentation screenshots are stored separately:

`docs/screenshots/`

Do not mix README/documentation screenshots with application assets.

---

## Internationalization

The frontend uses `react-i18next`.

When adding or changing user-facing content:

- Avoid hardcoding translated UI text when translation infrastructure already exists
- Keep translation keys organized
- Verify all supported languages after significant UI changes

---

## Local Development

The full application requires three layers during local development:

1. MAMP → local MySQL
2. Spring Boot → backend API
3. Vite → frontend

Frontend:

```bash
cd frontend
npm run dev
```

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

A frontend page depending on API data may not function correctly if the local backend or database is offline.

---

## Production

### Frontend

Hosted on Vercel.

Vercel Root Directory:

`frontend`

SPA routing is handled through:

`frontend/vercel.json`

### Backend

Hosted on Railway.

Public backend networking targets the Spring Boot application.

Spring Boot port configuration:

```properties
server.port=${PORT:8080}
```

### Database

Hosted using Railway MySQL.

Production database credentials are provided through environment variables.

---

## Current Refactoring

The repository originally stored the frontend directly in the project root while the backend already had its own directory.

The frontend has now been moved into:

`frontend/`

Goal:

Create a clear full-stack repository structure without changing application behavior.

After structural changes always verify:

- Local frontend
- Local backend
- Database connection
- API requests
- React Router routes
- Production frontend deployment
- Production backend deployment

---

## Documentation

- `README.md` → public project overview displayed on GitHub
- `PROJECT_CONTEXT.md` → current architecture, decisions and development context
- `ROADMAP.md` → development progress and future work
- `frontend/DESIGN_SYSTEM.md` → visual system and reusable UI rules
- `docs/screenshots/` → screenshots used by project documentation

---

## Next Steps

Current priority:

1. Finish repository restructuring
2. Verify Vercel configuration after frontend move
3. Verify Railway configuration
4. Review repository root for misplaced files
5. Create/update Project Context
6. Create Design System documentation
7. Review Roadmap against current application state
8. Review README against current architecture
9. Test all frontend routes
10. Test all API-dependent features
11. Review responsive behavior
12. Review accessibility
13. Review SEO and metadata
14. Review production performance
15. Continue feature development only after structural cleanup is stable

---

## Resume From Here

**The portfolio is already a working full-stack application.**

Do not restart or unnecessarily rewrite working features.

The current phase is repository cleanup, architectural organization and documentation.

After restructuring, continue development from the existing application and improve features incrementally.