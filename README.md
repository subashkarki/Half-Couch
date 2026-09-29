# Half Coach: Hamilton Half 2027

An installable, static offline training planner with foreground voice coaching and a calendar feed. No build step, account, server or API key is required.

## What works — and what needs Apple Workout

| Feature | Half Coach website | Apple Workout on your Ultra |
|---|---|---|
| Offline 24-week plan and completion ticks | Yes, after the app files are cached | Calendar can show scheduled entries |
| Timed stride/fartlek cues in AirPods | While the web app stays visible; installed voice required offline | Custom interval alerts and Voice Feedback |
| Pace and distance | Phone GPS while visible; approximate and independent of the Watch | Native Watch tracking, including heart rate |
| Locked iPhone in a running belt | **Not dependable: the web coach pauses** | Recommended setup |
| Send a workout to Apple Watch | Not supported by a static website | Enter the session using its Apple Watch setup card |

Each running session includes **Apple Watch setup** with its ordered time/distance steps. Use Apple Workout for the belt-running scenario. The website and Watch do not synchronise starts, pauses, distance, completion or audio. Do not run both coaching voices at once. A native iOS/watchOS companion would be needed for integrated syncing and our own background coaching.

## Training plan

The revised plan runs from **28 September 2026 to 14 March 2027**. Tuesday is easy running or one controlled faster session, Thursday is a short easy run (optional in weeks 1–10), Saturday is easy 5 km parkrun, and Sunday is the long run, peaking at 20 km two weeks before race day (8:00am, Hamilton Gardens). Wednesday adds gentle strength. Race-eve parkrun is volunteer/rest. There are **98 calendar entries**, including the December review, strength, taper mobility and fuelling/summer reminders.

This is an original adaptation informed by Nike, Hamilton and ASICS, not Nike’s exact programme. There is no assumed sub-two-hour target. The earlier schedule and completion data are preserved in Git history / the old local-storage key; old ticks are not applied to changed sessions.

Sources: [Nike](https://www.nike.com/running/half-marathon-training-plan), [Hamilton](https://www.hamiltonhalfmarathon.co.nz/21km-training-program.html), [ASICS](https://www.asics.com/nz/en-nz/media/wysiwyg/pdf/ASICS_Marathon_Training_Plan-Half_2024.pdf), [AIS nutrition](https://www.ausport.gov.au/ais/nutrition/supplements/group_a/sports-foods2/sports-drink/how-and-when-do-i-use-it), [SunSmart](https://www.sunsmart.org.nz/sunsmart-communities/sunsmart-sports/).

## Web coaching

- Strides include each 20-second effort, every 80-second recovery and the cooldown. The 30-minute easy + six-stride workout totals **45 minutes**.
- Distance goals finish only with enough accepted GPS distance, or explicit manual confirmation using your Watch. Losing GPS never changes a distance goal into a timer.
- GPS rejects poor fixes, jumps and gaps. Distance during pauses or missing signal is not reconstructed, so the web total may undercount. Use native Watch tracking for race distance. Pace is smoothed over recent accepted points and should not guide a 20-second stride.
- Optional user-entered pace bands announce sustained deviations. Defaults are effort-based, with no inferred heart-rate zones or finish-time prediction. Kilometre announcements report distance and recent pace, not an invented exact split.
- The coach pauses when hidden and after a detected execution gap. Return and tap Resume. Touch guard prevents accidental input but is **not** a phone lock or background-running workaround.
- Long-run fuel reminders occur every 40 active minutes on flagged sessions. Follow the session’s written rehearsal instructions and your tolerance.
- Run the one-minute equipment check before relying on audio. Test on your actual iPhone with AirPods in airplane mode and Bluetooth enabled. Browser speech and music mixing vary; no claim of iPhone field validation is made.

## Put it online (pick one)

**GitHub Pages (free)**
1. Use this existing repository, `subashkarki/Half-Couch`.
2. Upload everything in this folder (keep the `fonts` and `icons` folders).
3. Settings > Pages > Source: Deploy from a branch > `main` / root > Save.
4. When Pages deployment succeeds, the default project URL is `https://subashkarki.github.io/Half-Couch/` (unless you configured a custom domain).

**cPanel**
1. File Manager > `public_html` > create a folder, e.g. `run`.
2. Upload the zip into it and Extract.
3. Make sure the site has SSL on (cPanel > SSL/TLS Status > AutoSSL). The app needs https to work offline.
4. Your app is at `https://yourdomain/run/`.

## Install on your iPhone
1. Open the link in **Safari**.
2. Share button > Add to Home Screen.
3. Open it from the Home Screen while online and check Setup says the app files are saved. The plan and UI then work offline. Test your selected installed voice separately.

## Calendar
In the app: Setup > Subscribe, or download `plan.ics`. Events are all-day because weekday and race start times are unconfirmed. A subscription is read-only and refreshes on the calendar app’s schedule. Import into a separate calendar for editable times. If you imported an earlier plan, preserve any custom notes/times, remove only that separate training calendar and import the replacement to avoid duplicates.

## Privacy

GPS coordinates stay in memory and are not sent to a server or saved as a route. Completion ticks and settings stay in local storage on that browser. There is no cloud sync. A selected non-local speech voice may depend on the platform’s speech service; choose a local voice for offline use. The bundled plan and name are visible to anyone who can access your hosted site; this update does not upload the Strava CSV or medical history.

## Updating later
Change files, then bump the version suffix in `sw.js`. Open the app online to download the update, finish any active run, then close all tabs/Home Screen instances and reopen. Updates wait rather than replacing code during a run. Caches are scoped to the repository path; other apps’ caches are untouched.

## Development checks

Run `node --test tests/run-core.test.cjs`. This covers real distance goals, stale/manual GPS, known-route pace, jump/pause/gap rejection, plan/calendar consistency, daylight-saving date arithmetic, stride totals and scoped service-worker caching. Run `node --check app.js` and `node --check sw.js` after JavaScript changes.

For a local preview, run `python3 -m http.server 8765` and open `http://localhost:8765/`. Native Watch integration and locked-screen iPhone audio cannot be established by desktop browser tests.
