# Exp 8 - React Login + JWT Protected Routes + RBAC

This project combines:

- Responsive React login UI
- Client-side validation with React state/hooks
- JWT authentication with Express
- Protected routes with React Router
- Role-Based Access Control (RBAC) in backend and frontend

## Project Structure

- `backend/` Express API with JWT + middleware
- `frontend/` React app with route guards and role UI

## Demo Credentials

- Admin: `admin@example.com` / `Admin@123`
- Manager: `manager@example.com` / `Manager@123`
- User: `user@example.com` / `User@123`

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: `http://localhost:5000`

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Frontend Environment Variable

Create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

For production, set this to your deployed backend URL, for example:

```bash
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Backend API Endpoints

- `POST /api/auth/login` - returns JWT token and user payload
- `GET /api/protected/me` - validates token
- `GET /api/protected/user-area` - user and above
- `GET /api/protected/manager-area` - manager and above
- `GET /api/protected/admin-area` - admin only

## Auth and RBAC Flow

1. User logs in from React form.
2. Express validates credentials and signs JWT.
3. React stores token/user using auth context.
4. Protected routes require authentication.
5. Role routes require minimum role level.
6. Backend middleware enforces token and role checks for API security.

## Deployment (Recommended)

### Backend on Render

- Root Directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
	- `JWT_SECRET` = strong secret
	- `JWT_EXPIRES_IN` = `1h`
	- `FRONTEND_ORIGIN` = your frontend URL

### Frontend on Vercel/Netlify

- Root Directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
	- `VITE_API_BASE_URL` = backend URL + `/api`
