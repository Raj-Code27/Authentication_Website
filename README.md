# New Authentication

A full-stack authentication project with a React frontend and an Express API.
The backend stores users in MongoDB, hashes passwords with bcrypt, and issues
JWTs in HTTP-only cookies.

## Project structure

```text
New_Authentication/
├── Backend/
│   ├── src/
│   │   ├── controller/       # Signup, login, and logout logic
│   │   ├── db/                # MongoDB connection and JWT creation
│   │   ├── models/            # Mongoose schemas
│   │   └── routes/            # Authentication API routes
│   ├── .env                   # Local secrets (not committed)
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── src/
    │   └── pages/             # Signup, login, and logout screens
    ├── package.json
    └── ...
```

## Requirements

- Node.js and npm
- A MongoDB instance, such as a local MongoDB server or MongoDB Atlas

## Configure the backend

Create `Backend/.env` with your own local values:

```env
PORT=8000
MONGODB_URL=<your MongoDB connection string>
JWT_SECRET=<a long, random secret>
FRONTEND_URL=http://localhost:5173
NODE_ENVIRONMENT=development
```

Do not commit `.env` files or put real credentials in this README. The
repository `.gitignore` excludes environment files.

## Run locally

Open two terminal windows from the project root.

Backend:

```bash
cd Backend
npm install
npm run dev
```

The API listens on port `8000` by default.

Frontend:

```bash
cd Frontend
npm install
npm run dev
```

Vite prints the local frontend URL, usually `http://localhost:5173`.

The frontend defaults to the API base URL `http://localhost:8000/api`. To use
a different backend URL, create `Frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
```

Restart the frontend development server after changing environment variables.

## Authentication API

Base URL: `http://localhost:8000/api`

### `POST /signup`

Creates an account. Required JSON fields:

```json
{
  "firstname": "Ada",
  "lastname": "Lovelace",
  "username": "ada",
  "email": "ada@example.com",
  "password": "use-a-strong-password"
}
```

On success, returns public user details and sets an HTTP-only JWT cookie.
Duplicate email or username returns `409 Conflict`.

### `POST /login`

Accepts `email` and `password`. On success, returns public user details and
sets the authentication cookie.

### `POST /logout`

Clears the authentication cookie.

## Production and deployment notes

- Configure `MONGODB_URL`, `JWT_SECRET`, and `FRONTEND_URL` in the hosting
  provider's secret/environment settings.
- Set `VITE_API_URL` to the deployed backend API URL when building the
  frontend.
- Use HTTPS and secure cookie settings in production. For a frontend and API
  hosted on different sites, confirm the cookie `SameSite` and `Secure`
  settings work with the deployment's domain arrangement.
- Allow only the deployed frontend origin in CORS.
- The backend currently issues JWTs but does not yet include middleware to
  verify them on protected routes. Add token verification before relying on
  the API to protect private resources.

## Useful commands

Backend:

```bash
npm run dev     # Start with Nodemon
npm start       # Start with Node.js
```

Frontend:

```bash
npm run dev     # Start Vite development server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run preview # Preview the production build locally
```

## Learning notes

Additional backend learning material is available in:

- `Backend/PROJECT_BACKEND_GUIDE.txt`
- `Backend/BACKEND_INTERVIEW_CONCEPTS.txt`
