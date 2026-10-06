# ⚛️ CodeWithHassan Client

The client is the React/Vite website for the CodeWithHassan portfolio, blog, services, reader accounts, and admin interface. The API is in the sibling `server/` directory.

## Requirements

- Node.js 24.x and npm
- The API running locally or a deployed API URL

## Install and run

From this `client/` directory:

```bash
npm install
```

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`. If `VITE_API_URL` is omitted, the client uses `http://localhost:5000/api` in development and the configured production API fallback in production. Set `VITE_API_URL` explicitly for deployed environments.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Pages and routes

| Route | Description |
|---|---|
| `/` | Portfolio homepage; shows up to three newest blog posts |
| `/blogs` | Searchable and paginated published blog list |
| `/blog/:slug` | Public article with reactions, comments, and save controls |
| `/services` | Service cards, custom quote details, and inquiry path |
| `/login` | Reader login |
| `/signup` | Reader account registration |
| `/dashboard` | Protected reader overview |
| `/dashboard/saved` | Saved articles |
| `/dashboard/reactions` | Reader reactions |
| `/dashboard/history` | Reading history |
| `/dashboard/comments` | Reader's comments, with edit/delete controls |
| `/dashboard/profile` | Reader display name and profile details |
| `/dashboard/settings` | Account actions |
| `/admin` | Admin login |
| `/admin/dashboard` | Protected blog administration |

## How the client is organized

```text
src/
├── app/providers/       Theme and app-level providers
├── components/          Shared layout, SEO, and UI components
├── features/
│   ├── admin/            Admin login, dashboard, and blog editor
│   ├── blog/             Blog listing, detail, and reader interactions
│   ├── home/             Homepage sections and contact form
│   ├── services/         Services page
│   └── user/             Reader auth, protected dashboard, and account pages
├── lib/                  API base URL configuration
└── styles/               Global Tailwind styles
```

## API integration

The client sends requests to `VITE_API_URL`. For local development, the server should be available at `http://localhost:5000`, and the API prefix is `/api`.

Reader sign-in and account actions use `/api/users/*`. Admin blog management uses `/api/auth/login` and protected `/api/blogs/*` routes. Public articles and their comment/reaction summaries use `/api/blogs/*`. Contact form submissions use `POST /api/send-email`.

Reader accounts require the server's MongoDB configuration and `JWT_SECRET`. The reader token is stored separately from the admin token. Comment ownership is enforced by the server as well as reflected in the interface.

## Build and deployment

Run `npm run build` to create `dist/`. The included `vercel.json` rewrites client-side routes to `index.html` so direct visits to paths such as `/blogs` and `/dashboard` load the React app. Configure `VITE_API_URL` in the hosting provider to point to the deployed API, including its `/api` prefix.

Do not commit `.env` files. The client is covered by the repository's proprietary license; third-party packages and media remain under their own licenses.
