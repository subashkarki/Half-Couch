# Half Coach: Hamilton Half 2027

Offline iPhone app with voice-guided runs, plus a calendar feed of every session.

## Put it online (pick one)

**GitHub Pages (free)**
1. Create a new public repository, e.g. `half-coach`.
2. Upload everything in this folder (keep the `fonts` and `icons` folders).
3. Settings > Pages > Source: Deploy from a branch > `main` / root > Save.
4. After a minute your app is at `https://YOURNAME.github.io/half-coach/`.

**cPanel**
1. File Manager > `public_html` > create a folder, e.g. `run`.
2. Upload the zip into it and Extract.
3. Make sure the site has SSL on (cPanel > SSL/TLS Status > AutoSSL). The app needs https to work offline.
4. Your app is at `https://yourdomain/run/`.

## Install on your iPhone
1. Open the link in **Safari**.
2. Share button > Add to Home Screen.
3. Open it once from the Home Screen while online. After that it works offline.

## Calendar
In the app: Setup > Subscribe. Or on iPhone: Settings > Apps > Calendar > Calendar Accounts > Add Account > Other > Add Subscribed Calendar, and paste `https://YOUR-APP-LINK/plan.ics`.

## Updating later
Change files, then edit `sw.js` and bump `VERSION` (e.g. `half-coach-v2`) so your phone downloads the new version.
