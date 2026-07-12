# E-ComSupport API

NestJS + PostgreSQL API for the E-ComSupport platform.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Run `npm install`.
3. Run `npx prisma migrate dev --name init`.
4. Run `npm run start:dev`.

API base: `http://localhost:3000/api/v1`; Swagger: `/api/docs`; health: `/api/v1/health`.

## Render

Create a Blueprint from `render.yaml`, set `CORS_ORIGIN` to the frontend URL, and deploy. Render supplies `PORT`; migrations run before each production start.

## Implemented foundation

- JWT registration/login with bcrypt hashing
- Role-aware question answering
- Questions, answers, accepted solutions, reputation rewards, and votes data model
- Expert application model and moderation-ready roles
- Validation, CORS, Helmet, Swagger, PostgreSQL/Prisma, and Render Blueprint
