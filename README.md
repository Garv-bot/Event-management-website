# K Explore — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**. The visual direction uses a premium dark interface, lime accent colour, editorial typography and image-led event cards.

## Features

- Responsive layout for desktop, tablet and mobile.
- Hero section, event discovery grid, about section and call-to-action.
- Search by event title, category, venue and description.
- Category filters: Music, Technology, Art & Culture and Community.
- Event detail modal with date, time, venue, description and registration CTA.
- Registration form with JavaScript validation:
  - Full name (minimum 2 characters)
  - Valid email address
  - 10-digit Indian mobile number
  - Event selection
  - Consent checkbox
- Registration confirmation after successful validation.
- Registration records saved in browser `localStorage` under `kExploreRegistrations`.
- Dark/light theme preference saved in `localStorage`.
- Mobile navigation, keyboard shortcuts (`Ctrl/Cmd + K`) and Escape-to-close modals.

## Project structure

```text
k-explore-event-management/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

No build tools or package installation are required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`, or use VS Code **Live Server** for local development.

## Customising events

Open `script.js` and edit the `events` array near the top. Each event object contains:

- `id`: unique identifier
- `title`: event name
- `category`: filter category
- `date`: date in `YYYY-MM-DD` format
- `time`, `venue`, `price`
- `image`: image URL
- `short`: card summary
- `description`: full event description

Use a unique `id` for every event. To add a new category, add it to the category filter buttons in `index.html` and use the same category value in the event data.

## Registration data

This is a front-end demonstration. Registration data is stored only in the visitor's browser using local storage. It is **not sent to a server**, so it is not suitable for real event operations or collecting actual attendee data. A production version should use a backend/API, database, server-side validation, consent/privacy notice and appropriate security controls.

To inspect demo registrations, open browser Developer Tools → Application (Chrome) → Local Storage → your site origin → `kExploreRegistrations`.

To clear demo registrations, run this in the browser console:

```js
localStorage.removeItem("kExploreRegistrations");
```

## Images and fonts

Event photography is loaded from Unsplash image URLs and typography is loaded from Google Fonts. An internet connection is needed for these remote assets. Replace the URLs with locally licensed images if required by your submission.

## Git and GitHub submission

From the project directory, run:

```bash
git init
git add .
git commit -m "Build K Explore event management website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/k-explore-event-management.git
git push -u origin main
```

Create an empty repository on GitHub first, then replace `YOUR-USERNAME` with your GitHub username.

## Deployment

### GitHub Pages
1. Push the project to GitHub.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for the deployment URL shown in the Pages section.

### Netlify
1. Sign in to Netlify and choose **Add new site → Import an existing project**.
2. Connect GitHub and select this repository.
3. Leave the build command empty and set publish directory to `/` (the repository root).
4. Deploy. Netlify will provide a public URL.

### Vercel
1. Sign in to Vercel and choose **Add New → Project**.
2. Import the GitHub repository.
3. Choose **Other** as the framework preset; no build command is needed.
4. Set the output directory to `.` if prompted, then deploy.

## Tech stack

- HTML5 — semantic structure
- CSS3 — custom responsive styling, transitions and theme variables
- JavaScript (ES6+) — rendering, filtering, validation, modals and local storage
- Git/GitHub — source control and submission

## Notes for evaluation

- Test at mobile, tablet and desktop widths.
- Test each category filter and search with both matching and non-matching text.
- Try invalid form values before a valid submission.
- Confirm a successful registration is present in local storage.
- Refresh the page and verify the theme preference remains saved.
