# Rally — Stitch Sports Community Platform

## Project Overview

**Rally** is a Vietnamese-language sports community platform focused on badminton, enabling users to find matches, create matches, join games, manage player profiles, and connect with local sports communities.

**Current Phase:** Phase 1 (Auth + Onboarding + Dashboard) ✅

**Tech Stack:**
- Frontend: Vanilla JavaScript (ES modules), HTML/CSS
- Backend: Firebase (Authentication + Firestore)
- Design System: Custom CSS with Material Design tokens

---

## Key File Structure

```
rally-app/
├── index.html              Landing page (routes based on auth state)
├── auth.html               Sign up / Sign in (Email+Password, Google OAuth)
├── onboarding.html         Player profile creation (Step 3 of user flow)
├── dashboard.html          Home page (authenticated users only)
├── findmatch.html          Browse & filter available matches
├── creatematch.html        Host creates a new match
├── css/style.css           Shared design system (colors, buttons, forms)
└── js/
    ├── firebase-config.js  Single Firebase initialization point
    ├── profile-service.js  Player profile CRUD operations
    └── match-service.js    Match data operations (planned)
```

---

## Design System & Colors

Reference: [web_design_system_sports_community.md](web_design_system_sports_community.md)

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary Purple** | `#6C4BF4` | Buttons, active states, brand elements |
| **Primary Dark** | `#5135C9` | Hover states, strong accents |
| **Primary Light** | `#EEEAFE` | Backgrounds, tags, soft highlights |
| **Accent Lime** | `#D9F65A` | LIVE badges, NEW badges, highlights |
| **Ink** | `#17151F` | Main headings, primary text |
| **Surface** | `#FFFFFF` | Cards, modals, surfaces |
| **Background** | `#FAFAFC` | Page background |

**Text Colors:** `--text-secondary: #6F6B78`, `--text-muted: #9A96A3`

---

## Core Architecture

### Firebase Setup
- **Single Config File:** All pages import from `js/firebase-config.js` (one initialization point)
- **Auth:** Email/Password + Google OAuth via Firebase Auth
- **Database:** Firestore with collection `users/{uid}` for player profiles
- **Security:** Firestore Rules enforce user-level access control

### Data Model

**Collection: `users`**
```javascript
{
  uid: string,
  displayName: string,
  email: string,
  photoURL: string (optional),
  skillLevel: "Beginner" | "Intermediate" | "Advanced",
  playingStyle: ["Singles", "Doubles"],
  favoriteCourt: string,
  rating: number (default: 0),
  matchesPlayed: number (default: 0),
  playersMet: number (default: 0),
  followers: number (default: 0),
  following: number (default: 0),
  createdAt: timestamp
}
```

**Collection: `matches` (planned)**
```javascript
{
  id: string,
  hostId: string,
  title: string,
  area: string,
  courtName: string,
  date: string (YYYY-MM-DD),
  startTime: string (HH:mm),
  endTime: string (HH:mm),
  skillLevel: "All" | "Beginner" | "Intermediate" | "Advanced",
  playingStyle: ["Singles", "Doubles"],
  maxPlayers: number,
  currentPlayers: number,
  pricePerPerson: number (optional),
  status: "DRAFT" | "PUBLISHED" | "JOINING" | "FULL" | "COMPLETED",
  participants: [{ uid, status: "confirmed" | "pending" }],
  createdAt: timestamp
}
```

---

## User Flows

### Flow 1: New User Registration
```
Landing → Sign Up → Create Profile → Dashboard
```
**Route Guards:** `onAuthStateChanged()` redirects unauthenticated users to `auth.html`

### Flow 2: Find Matches
```
Dashboard → Find Match Page → Filter (location, skill, date) → View Cards → Join
```
**Filters:** District/area, skill level, date, only-open-slots checkbox

### Flow 3: Create Match (Planned - Phase 2)
```
Dashboard → Create Match Form → Auto-fill court from profile → Publish → Appears in searches
```

---

## Development Conventions

### 1. **Naming & Language**
- All UI text is **Vietnamese**
- File names: English, lowercase, hyphens (e.g., `firebase-config.js`)
- Variables/functions: camelCase in English
- Collections: English (e.g., `users`, `matches`)

### 2. **Module Imports**
- Always import from `js/firebase-config.js` for Firebase objects
- Use ES6 module syntax: `import { auth, db } from "../js/firebase-config.js"`
- Single Firebase app instance (no multiple inits)

### 3. **Route Guards**
```javascript
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.replace("auth.html");
  // Proceed with authenticated user
});
```

### 4. **Error Handling**
- Display errors in `.error-box` (styled, appears with `.show` class)
- Common patterns:
  ```javascript
  const denied = err?.code === "permission-denied";
  if (denied) { /* Firestore rules issue */ }
  ```

### 5. **Form Validation**
- Use HTML5 `required` attribute + custom JS validation
- Show errors in `.error-box` before submission
- Disable button during submission: `btn.disabled = true`

### 6. **UI Patterns**
- **Loading state:** Show spinner, hide content via `display: none`
- **Buttons:** `.btn-primary` (purple), `.btn-outline`, `.btn-dark`
- **Cards:** `.card` or `.feature-card` with hover animations
- **Pills:** Radio/checkbox with `.pill-option` styling

---

## Build & Deployment

### Local Development
```bash
cd rally-app
python3 -m http.server 5500
# or
npx serve .
```
**⚠️ Important:** Cannot open `file://` URLs due to ES module CORS restrictions. Must use local HTTP server.

### Firebase Configuration
1. Enable **Email/Password** and **Google OAuth** in Firebase Console
2. Add authorized domains to Firebase → Authentication → Settings
3. Create/configure Firestore Database in **Production** mode
4. Set appropriate Firestore security rules

---

## Next Steps (Phase 2)

| Feature | Status | Notes |
|---------|--------|-------|
| Find Match | Partial | UI ready, needs Firestore listener |
| Create Match | Partial | Form ready, needs save logic |
| Join Match | Planned | Request → host confirm/reject |
| Find Court | Planned | Geolocation, court availability |
| Chat System | Planned | Real-time messaging |
| Notifications | Planned | Browser/Firebase notifications |

---

## Common Tasks

### Add a New Page
1. Create `.html` file in `rally-app/`
2. Import Firebase + helpers from `js/firebase-config.js`
3. Add route guard: `onAuthStateChanged(auth, (user) => { if (!user) location.replace("auth.html"); })`
4. Link from navbar in existing pages
5. Test with local HTTP server

### Update Firestore Data
```javascript
import { db, setDoc, doc, serverTimestamp } from "../js/firebase-config.js";

await setDoc(doc(db, "users", user.uid), {
  displayName: "New Name",
  updatedAt: serverTimestamp()
}, { merge: true });
```

### Add Form Field
1. Define in HTML with `.field` class
2. Bind to JavaScript variable
3. Validate before submit
4. Show errors in `.error-box`
5. Disable button during submission

---

## Debugging Tips

- **Firebase issues:** Check Firebase Console → Authentication/Firestore rules & permissions
- **CORS errors:** Use local HTTP server, not `file://`
- **Module errors:** Verify import paths start with `../js/`
- **Route guards fail:** Ensure `onAuthStateChanged()` is in page `<script type="module">`
- **Firestore reads timeout:** Set 5-second timeout fallback in production

---

## References

- [User Flow Documentation](luonghoatdongsieuchitiiet.md)
- [Design System](web_design_system_sports_community.md)
- [README (Rally Phase 1)](files/rally-app-phase1/rally-app/README.md)
