# Todo List — React + Zustand

A responsive Todo List built with React and Vite. Zustand manages the tasks and filter state; Framer Motion provides interface animations.

## Features
- Add tasks
- Mark tasks complete or active
- Edit tasks (double-click a task title, or use its edit action)
- Delete tasks and swipe a task horizontally to delete it
- Filter all, active, and completed tasks
- Clear completed tasks
- Save tasks in browser local storage using Zustand `persist`
- Live clock, progress indicator, responsive layout, and animated visual details

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```

## Create a production build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
Import this GitHub repository into Vercel and keep the default Vite settings:
- Build command: `npm run build`
- Output directory: `dist`

## Notes
Tasks are stored in this browser's local storage, so they remain after refresh on the same browser/device. This is a front-end app; it does not use a server database.
