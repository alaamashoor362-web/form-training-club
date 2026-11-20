# FORM Training Club

Responsive gym frontend concept built with React, TypeScript and CSS, bundled with Vite.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

## Build and deploy

```sh
npm run build
```

Upload the contents of `dist/` to any static host. No server, database, API key or environment variables are needed.

## GitHub Pages

The checked-in `docs/` folder contains the production build. GitHub Pages publishes it from `main` and `/docs`.

After editing, run `npm run build`, replace `docs/` with the contents of `dist/`, and keep an empty `docs/.nojekyll` file. Asset paths are relative so the site works under a GitHub project path.

## Features

- Responsive layout with orange, teal and violet cards.
- Hero animation, scroll reveals, hover effects and reduced-motion support.
- Weekly timetable with day/type filters and an empty-state reset.
- Monthly/annual sample prices and membership selection.
- Demo enquiry validation, keyboard submission, confirmation and edit state.
- Accessible FAQ controls and section navigation.

FORM is fictional. Classes, memberships and policies are examples. The enquiry is a local demonstration; nothing is sent, booked, paid or stored after reload.

Illustrative gym photograph: Jakub Żerdzicki on Unsplash.
https://unsplash.com/photos/weights-and-equipment-are-ready-for-a-workout-Il9YbhIBiOA

React and React DOM retain their own third-party software license notices in the generated JavaScript bundle.
