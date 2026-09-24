(function () {
  "use strict";
  var DAYS = { tue: 1, wed: 2, thu: 3, sat: 5, sun: 6 };
  var DAY_ORDER = ["tue", "wed", "thu", "sat", "sun"];
  var START = new Date(PLAN_START[0], PLAN_START[1], PLAN_START[2]);
  var RACE = new Date(RACE_DATE[0], RACE_DATE[1], RACE_DATE[2]);

  /* ---------- storage ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var ticks = load("hc-ticks", {});
  var t5k = load("hc-5k", 1800);
  var voiceURI = load("hc-voice", "");

  /* ---------- helpers ---------- */
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function fmtDate(d) { return d.toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "short" }); }
  function mmss(s) { s = Math.max(0, Math.round(s)); var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return h ? h + ":" + String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0") : m + ":" + String(x).padStart(2, "0"); }
  function spokenTime(s) {
    s = Math.round(s);
    if (s < 60) return s + " seconds";
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60, out = [];
    if (h) out.push(h + (h === 1 ? " hour" : " hours"));
    if (m) out.push(m + (m === 1 ? " minute" : " minutes"));
    if (x && !h && m < 10) out.push(x + " seconds");
    return out.join(" ");
  }
  function spokenPace(p) { p = Math.round(p); var m = Math.floor(p / 60), s = p % 60; return m + " " + (s ? (s < 10 ? "oh " + s : s) : "minutes") + " per kilometre"; }
  function paces() { return pacesFrom5k(t5k); }
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var curWeek = Math.min(23, Math.max(0, Math.floor((today - START) / 864e5 / 7)));
  var viewWeek = curWeek;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function runSeconds(run) {
    if (!run.steps) return 0;
    var p = paces();
    return run.steps.reduce(function (a, s) { return a + stepSeconds(s, p); }, 0);
  }

  /* ---------- rendering ---------- */
  function sessionHTML(i, key, run) {
    var id = "w" + i + "-" + key, date = addDays(START, i * 7 + DAYS[key]), done = !!ticks[id];
    var mins = run.steps ? Math.round(runSeconds(run) / 60) : 0;
    var learn = (run.learn || []).filter(function (k) { return k !== "easy" && k !== "long"; })
      .map(function (k) { return '<button class="chip" data-learn="' + k + '">What\u2019s ' + (k === "timetrial" ? "a time trial" : k === "goal" ? "goal pace" : k === "hills" ? "hill repeats" : k === "intervals" ? "intervals" : k === "progression" ? "a progression run" : k === "tempo" ? "tempo" : k === "fartlek" ? "fartlek" : "a stride") + "?</button>"; }).join("");
    return '<article class="session ' + run.type + (done ? " is-done" : "") + '">' +
      '<div class="s-top"><div><div class="s-day">' + fmtDate(date) + (key === "sat" ? ", Hamilton Lake" : "") + '</div>' +
      '<div class="s-title">' + esc(run.title) + (run.opt ? ' <span class="opt">optional</span>' : "") + '</div></div>' +
      '<label class="check"><input type="checkbox" data-tick="' + id + '"' + (done ? " checked" : "") + '> Done</label></div>' +
      '<div class="s-how">' + esc(run.how) + '</div>' +
      (mins ? '<div class="s-meta">About ' + mins + ' min at your current paces</div>' : "") +
      '<div class="s-actions">' + (run.steps ? '<button class="go" data-start="' + i + ':' + key + '">Start guided run</button>' : "") + learn + '</div></article>';
  }

  function weekSessions(i) {
    var w = WEEKS[i];
    return DAY_ORDER.filter(function (k) { return w.runs[k]; }).map(function (k) { return sessionHTML(i, k, w.runs[k]); }).join("");
  }

  function counts() {
    var total = 0, done = 0, per = [];
    WEEKS.forEach(function (w, i) {
      var t = 0, d = 0;
      DAY_ORDER.forEach(function (k) { var r = w.runs[k]; if (!r || r.opt) return; t++; if (ticks["w" + i + "-" + k]) d++; });
      per.push([d, t]); total += t; done += d;
    });
    return { total: total, done: done, per: per };
  }

  function renderWeek() {
    var c = counts(), days = Math.max(0, Math.round((RACE - today) / 864e5)), w = WEEKS[viewWeek];
    var before = today < START;
    document.getElementById("v-week").innerHTML =
      '<section class="bib" aria-label="Race bib"><span class="pin l"></span><span class="pin r"></span>' +
      '<div class="event">Hamilton Half Marathon<br>Sunday 14 March 2027, 8:00am</div>' +
      '<div class="number">' + days + '<small>' + (days === 1 ? "day" : "days") + ' to go</small></div>' +
      '<div class="runner"><b>Subash</b><span>Target: under 2:00:00</span></div>' +
      '<div class="tab">' + c.done + ' of ' + c.total + ' runs done<div class="bar"><i style="width:' + (c.done / c.total * 100) + '%"></i></div></div></section>' +
      '<div style="display:flex;justify-content:space-between;align-items:end;gap:10px">' +
      '<h1>Week ' + (viewWeek + 1) + '</h1><div style="display:flex;gap:6px;margin-bottom:12px">' +
      '<button class="ghost" data-wk="-1" aria-label="Previous week"' + (viewWeek === 0 ? " disabled" : "") + '>\u2039</button>' +
      '<button class="ghost" data-wk="1" aria-label="Next week"' + (viewWeek === 23 ? " disabled" : "") + '>\u203a</button></div></div>' +
      '<p class="muted">' + esc(w.focus) + (viewWeek === curWeek ? (before ? ". Starts " + fmtDate(START) + "." : ". This week.") : "") +
      (w.nike ? " Nike phase: use the NRC app\u2019s guided runs if you prefer, or follow these." : "") + '</p>' +
      '<p class="muted">Monday and Friday: rest or gym.</p>' + weekSessions(viewWeek);
  }

  function renderPlan() {
    var c = counts(), html = '<h1>All 24 weeks</h1>';
    WEEKS.forEach(function (w, i) {
      if (i === 0) html += '<div class="phase">Base build: weeks 1 to 10</div>';
      if (i === 10) html += '<div class="phase">Nike\u2019s 14-week plan: weeks 11 to 24</div>';
      var p = c.per[i];
      html += '<details class="week' + (i === curWeek ? " now" : "") + '"' + (i === curWeek ? " open" : "") + '><summary><span class="wk">' + (i + 1) + '</span>' +
        '<span class="wmeta"><b>' + esc(w.focus) + '</b><span>From ' + fmtDate(addDays(START, i * 7)) + '</span></span>' +
        '<span class="count' + (p[0] === p[1] ? " full" : "") + '">' + p[0] + '/' + p[1] + '</span></summary><div class="inner">' + weekSessions(i) + '</div></details>';
    });
    document.getElementById("v-plan").innerHTML = html;
  }

  function renderLearn() {
    var order = ["easy", "long", "warmup", "strides", "fartlek", "intervals", "tempo", "hills", "progression", "timetrial", "goal"];
    document.getElementById("v-learn").innerHTML = '<h1>Running words, explained</h1>' +
      '<p class="muted">The voice coach explains these at the start of each session too.</p>' +
      order.map(function (k) { return '<div class="card" id="learn-' + k + '"><h3>' + LEARN[k][0] + '</h3><p>' + LEARN[k][1] + '</p></div>'; }).join("");
  }

  function renderSetup() {
    var p = paces(), half = t5k * Math.pow(21.0975 / 5, 1.06), need = 7200 / Math.pow(21.0975 / 5, 1.06);
    var base = location.href.replace(/[#?].*$/, "").replace(/[^/]*$/, "");
    var ics = base + "plan.ics", webcal = ics.replace(/^https?:/, "webcal:");
    document.getElementById("v-setup").innerHTML =
      '<h1>Setup</h1>' +
      '<div class="card"><h3>Your paces</h3><label for="t5k" class="muted">Latest parkrun time</label><br>' +
      '<input id="t5k" class="t5k" inputmode="numeric" value="' + mmss(t5k) + '">' +
      '<dl class="paces"><dt>Easy</dt><dd>' + mmss(p.easy - 15) + '\u2013' + mmss(p.easy + 15) + ' /km</dd>' +
      '<dt>Tempo</dt><dd>' + mmss(p.tempo) + ' /km</dd><dt>10K effort</dt><dd>' + mmss(p.k10) + ' /km</dd>' +
      '<dt>5K effort</dt><dd>' + mmss(p.k5) + ' /km</dd><dt>Sub-2 goal pace</dt><dd>5:41 /km</dd>' +
      '<dt>Predicted half today</dt><dd>' + mmss(half) + '</dd></dl>' +
      '<p style="margin-top:10px;font-weight:700">' + (half < 7200 ? "On track for sub-2." : "Sub-2 needs a parkrun of about " + mmss(need) + ".") + '</p>' +
      '<p class="muted">Update this after each time trial. Guided runs use these paces to time distance-based reps.</p></div>' +

      '<div class="card"><h3>Live pace</h3><label class="check" style="font-size:1rem;color:var(--ink);white-space:normal"><input type="checkbox" id="gpsToggle"' + (gpsOn ? " checked" : "") + '> Use the phone\u2019s GPS to show live pace and tell me when I\u2019m too fast or too slow</label>' +
      '<p class="muted" style="margin-top:8px">Your iPhone asks for location permission the first time. Your watch still records the run; this only powers the coaching.</p></div>' +
      '<div class="card"><h3>Voice coach</h3><select id="voice"></select>' +
      '<div class="s-actions"><button class="go" id="testVoice">Test in AirPods</button></div></div>' +

      '<div class="card"><h3>Add the plan to your calendar</h3>' +
      '<p>Every session is a calendar event with the details in the notes, so it also shows up on your Apple Watch.</p>' +
      '<div class="s-actions"><a class="go" style="text-decoration:none" href="' + webcal + '">Subscribe (updates automatically)</a>' +
      '<a class="ghost" style="text-decoration:none" href="' + ics + '" download>Download .ics</a></div>' +
      '<p class="muted" style="margin-top:10px">Default times: weekday runs 6:00am, parkrun 8:00am, long run 7:00am. Edit any event in Calendar to suit.</p></div>' +

      '<div class="card"><h3>Before your first guided run</h3><ol class="steps">' +
      '<li>Open this app from your Home Screen once while online, so it saves everything for offline use.</li>' +
      '<li>Connect your AirPods and tap Test in AirPods above.</li>' +
      '<li>Start your music first, then start the guided run. The coach talks over your music.</li>' +
      '<li>Keep this app open with the screen on. Tap Pocket lock so the screen goes black and ignores touches. If you lock the phone or switch apps, the voice stops until you come back.</li>' +
      '<li>For distance steps, the coach times them from your paces. Your watch still shows your real distance.</li></ol></div>' +
      '<div class="card"><button class="ghost" id="resetTicks">Clear all ticks</button></div>';
    fillVoices();
  }

  function renderAll() { renderWeek(); renderPlan(); renderLearn(); renderSetup(); }

  /* ---------- nav ---------- */
  function show(v) {
    document.querySelectorAll(".view").forEach(function (s) { s.hidden = s.id !== "v-" + v; });
    document.querySelectorAll("nav button").forEach(function (b) { if (b.dataset.v === v) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    window.scrollTo(0, 0);
  }
  document.querySelector("nav").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) show(b.dataset.v); });

  document.querySelector("main").addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.tick) { if (t.checked) ticks[t.dataset.tick] = 1; else delete ticks[t.dataset.tick]; save("hc-ticks", ticks); renderWeek(); renderPlan(); }
    if (t.id === "gpsToggle") { gpsOn = t.checked; save("hc-gps", gpsOn); }
    if (t.id === "voice") { voiceURI = t.value; save("hc-voice", voiceURI); }
  });
  document.querySelector("main").addEventListener("input", function (e) {
    if (e.target.id !== "t5k") return;
    var m = e.target.value.trim().match(/^(\d{1,2})[:.](\d{2})$/);
    if (m && +m[2] < 60) { t5k = (+m[1]) * 60 + (+m[2]); save("hc-5k", t5k); var pos = e.target.selectionStart; renderSetup(); renderWeek(); renderPlan();
      var el = document.getElementById("t5k"); el.focus(); try { el.setSelectionRange(pos, pos); } catch (x) {} }
  });
  document.querySelector("main").addEventListener("click", function (e) {
    var b = e.target.closest("button,a"); if (!b) return;
    if (b.dataset.start) { var p = b.dataset.start.split(":"); startRun(+p[0], p[1]); }
    else if (b.dataset.learn) { show("learn"); var el = document.getElementById("learn-" + b.dataset.learn); if (el) el.scrollIntoView(); }
    else if (b.dataset.wk) { viewWeek = Math.min(23, Math.max(0, viewWeek + (+b.dataset.wk))); renderWeek(); }
    else if (b.id === "testVoice") { unlockAudio(); say("Hi Subash. This is your coach. If you can hear me in your AirPods, you're all set.", true); beep(true); }
    else if (b.id === "resetTicks") { if (confirm("Clear every tick in the plan?")) { ticks = {}; save("hc-ticks", ticks); renderAll(); } }
  });

  /* ---------- audio ---------- */
  var actx = null, voices = [], lastUtter = null;
  function unlockAudio() {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
    } catch (e) {}
    if ("speechSynthesis" in window) { var u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); }
  }
  function beep(long) {
    if (!actx) return;
    try {
      var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime, d = long ? .35 : .12;
      o.frequency.value = long ? 660 : 990; o.type = "sine";
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.5, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  }
  function pickVoice() {
    if (!voices.length) return null;
    var v = voices.filter(function (x) { return x.voiceURI === voiceURI; })[0];
    if (v) return v;
    var pref = ["en-NZ", "en-AU", "en-GB", "en-US"];
    for (var i = 0; i < pref.length; i++) { var f = voices.filter(function (x) { return x.lang.replace("_", "-") === pref[i]; }); if (f.length) return f[0]; }
    return voices.filter(function (x) { return /^en/i.test(x.lang); })[0] || voices[0];
  }
  function say(text, interrupt) {
    if (!("speechSynthesis" in window)) return;
    if (interrupt) speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text), v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = 1; lastUtter = u; // keep a reference so iOS doesn't drop it
    speechSynthesis.speak(u);
  }
  function fillVoices() {
    var sel = document.getElementById("voice"); if (!sel) return;
    var en = voices.filter(function (v) { return /^en/i.test(v.lang); });
    if (!en.length) { sel.innerHTML = "<option>Default voice</option>"; return; }
    var cur = pickVoice();
    sel.innerHTML = en.map(function (v) { return '<option value="' + esc(v.voiceURI) + '"' + (cur && v.voiceURI === cur.voiceURI ? " selected" : "") + ">" + esc(v.name + " (" + v.lang + ")") + "</option>"; }).join("");
  }
  if ("speechSynthesis" in window) {
    voices = speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = function () { voices = speechSynthesis.getVoices(); fillVoices(); };
  }

  /* ---------- wake lock ---------- */
  var wakeLock = null;
  function lockScreenOn() {
    if (!("wakeLock" in navigator)) return false;
    navigator.wakeLock.request("screen").then(function (l) { wakeLock = l; }).catch(function () {});
    return true;
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && R) { lockScreenOn(); if (actx) actx.resume(); }
  });

  /* ---------- run engine (with live GPS pace) ---------- */
  var R = null, timer = null, geoId = null;
  var $ = function (id) { return document.getElementById(id); };
  var gpsOn = load("hc-gps", true);

  function kindName(k) { return { work: "Hard", stride: "Stride", rec: "Recover", easy: "Easy", wu: "Warm-up", cd: "Cool-down" }[k] || "Run"; }
  function shortPace(p) { p = Math.round(p); var m = Math.floor(p / 60), s = p % 60; return m + " " + (s === 0 ? "flat" : s < 10 ? "oh " + s : s); }

  /* GPS */
  function hav(a, b) {
    var R0 = 6371000, toR = Math.PI / 180, dLat = (b.lat - a.lat) * toR, dLon = (b.lon - a.lon) * toR;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R0 * Math.asin(Math.sqrt(x));
  }
  function gpsStart() {
    if (!gpsOn || !navigator.geolocation) return;
    R.gps = { pts: [], dist: 0, last: null, lastFix: 0, err: "" };
    geoId = navigator.geolocation.watchPosition(onPos, function (err) {
      if (R && R.gps) R.gps.err = err.code === 1 ? "Location is blocked, so there's no live pace. Allow location for Safari websites in Settings, Privacy & Security, Location Services." : "Looking for GPS\u2026";
    }, { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 });
  }
  function gpsStop() { if (geoId !== null && navigator.geolocation) navigator.geolocation.clearWatch(geoId); geoId = null; }
  function onPos(pos) {
    if (!R || !R.gps) return;
    var g = R.gps, c = pos.coords;
    if (c.accuracy > 35) { g.weak = true; return; }
    g.weak = false; g.err = "";
    var pt = { t: pos.timestamp || Date.now(), lat: c.latitude, lon: c.longitude };
    if (g.last) {
      var d = hav(g.last, pt), dt = (pt.t - g.last.t) / 1000;
      if (dt <= 0) return;
      if (d / dt > 8) return;           // faster than 8 m/s: a GPS jump, ignore
      if (d < 2) return;                // jitter while standing
      if (!R.paused && Date.now() >= R.t0) g.dist += d;
    }
    pt.cum = g.dist; g.last = pt; g.lastFix = Date.now();
    g.pts.push(pt);
    while (g.pts.length && pt.t - g.pts[0].t > 60000) g.pts.shift();
  }
  function gpsGood() { return !!(R && R.gps && R.gps.lastFix && Date.now() - R.gps.lastFix < 12000); }
  function gpsDist() { return R && R.gps ? R.gps.dist : 0; }
  function curPace() {
    if (!gpsGood()) return null;
    var pts = R.gps.pts, last = pts[pts.length - 1], first = null;
    for (var i = 0; i < pts.length; i++) if (last.t - pts[i].t <= 30000) { first = pts[i]; break; }
    if (!first) return null;
    var d = last.cum - first.cum, dt = (last.t - first.t) / 1000;
    if (d < 25 || dt < 10) return null;
    return dt / (d / 1000);
  }

  function startRun(i, key) {
    var run = WEEKS[i].runs[key], p = paces();
    unlockAudio();
    var steps = run.steps.map(function (s) { return Object.assign({}, s, { dur: stepSeconds(s, p) }); });
    var total = steps.reduce(function (a, s) { return a + s.dur; }, 0);
    R = { i: i, key: key, run: run, steps: steps, total: total, t0: Date.now() + 1500, paused: null, pausedTotal: 0,
      idx: -1, stepT0: 0, stepD0: 0, cues: [], p: p, lastKm: 0, kmT: 0, lastCheck: 0, lastCue: 0, lastOk: 0, off: "", offN: 0 };
    gpsStart();
    $("rTitle").textContent = run.title;
    $("rSegs").innerHTML = steps.map(function (s) { return '<i class="' + s.kind + '" style="flex:' + s.dur + '"></i>'; }).join("");
    $("rPause").textContent = "Pause";
    R.baseWarn = lockScreenOn()
      ? "Screen stays on while this is open. Use Pocket lock in your pocket. Locking the phone or switching apps pauses the voice."
      : "Set Auto-Lock to Never while running (Settings, Display & Brightness), and keep this app open.";
    $("run").hidden = false;
    var intro = "Starting " + run.title + ". About " + spokenTime(total) + " in total.";
    if (R.gps) intro += " Live pace is on. I'll tell you if you drift off pace.";
    var tip = (run.learn || []).filter(function (k) { return ["strides", "fartlek", "intervals", "tempo", "hills", "progression", "timetrial"].indexOf(k) >= 0; })[0];
    if (tip) intro += " Quick tip. " + LEARN[tip][1];
    say(intro, true);
    clearInterval(timer); timer = setInterval(tick, 250); tick();
  }

  function elapsed() { var now = R.paused || Date.now(); return Math.max(0, (now - R.t0 - R.pausedTotal) / 1000); }
  function byDistance(s) { return !!(s.km && gpsGood()); }

  function beginStep(idx, e) {
    R.idx = idx; R.stepT0 = e; R.stepD0 = gpsDist(); R.off = ""; R.offN = 0; R.said200 = false; R.saidHalf = false;
    var s = R.steps[idx], next = R.steps[idx + 1], pace = R.p[s.pace], text;
    var paceBit = ["k5", "k10", "tempo", "goal", "steady", "mile"].indexOf(s.pace) >= 0 ? ", around " + spokenPace(pace) : "";
    if (s.say) text = s.say + (s.km && !/kilometre/i.test(s.say) ? " " + s.km + " kilometres." : "");
    else if (s.kind === "work") text = s.label + ". Go! " + (s.km ? s.km + " kilometres" : spokenTime(s.dur)) + " at " + PACE_WORDS[s.pace] + paceBit + ".";
    else if (s.kind === "rec") text = "Recover. " + spokenTime(s.dur) + " of easy jogging." + (next ? " Next up, " + next.label + "." : "");
    else if (s.km) text = s.label + ". " + s.km + " kilometres at " + PACE_WORDS[s.pace] + ".";
    else text = s.label + ". " + spokenTime(s.dur) + " at " + PACE_WORDS[s.pace] + ".";
    beep(true);
    say(text, idx > 0);

    var c = [], d = s.dur;
    if ((s.kind === "work" || s.kind === "stride" || s.kind === "rec") && d >= 8 && !s.km) [3, 2, 1].forEach(function (n) { c.push({ at: d - n, beep: 1 }); });
    if (s.kind === "rec" && d >= 30 && next) c.push({ at: d - 10, text: "Get ready. " + next.label + " in 10 seconds." });
    if (s.kind === "work" && d >= 240 && !s.km) c.push({ at: d - 60, text: "One minute left. Hold it." });
    if ((s.kind === "easy" || s.kind === "wu" || s.kind === "cd") && d >= 900 && !s.km) {
      for (var t = 600; t < d - 150; t += 600) (function (t) { c.push({ at: t, text: Math.round(t / 60) + " minutes done. About " + Math.round((d - t) / 60) + " to go in this part." }); })(t);
    }
    if ((s.kind === "easy" || s.kind === "wu" || s.kind === "cd") && d >= 300 && next && !s.km) c.push({ at: d - 30, text: "30 seconds. Then, " + next.label + "." });
    R.cues = c;
  }

  function coach(s, inT) {
    var now = Date.now();
    if (!gpsGood() || R.paused || now - R.lastCheck < 15000) return;
    R.lastCheck = now;
    if (inT < 45 || s.kind === "rec" || s.kind === "stride" || s.pace === "hill" || s.pace === "jog") return;
    if (!s.km && s.dur < 90) return; // too short for GPS to judge
    var cp = curPace(); if (!cp) return;
    var target = R.p[s.pace], easyKind = s.kind === "easy" || s.kind === "wu" || s.kind === "cd", state = "ok";
    if (easyKind) { if (cp < target - 30) state = "fast"; }
    else { var tol = s.pace === "goal" ? 8 : 12; if (cp < target - tol) state = "fast"; else if (cp > target + tol) state = "slow"; }
    if (state === R.off) R.offN++; else { R.off = state; R.offN = 1; }
    if (state !== "ok" && R.offN >= 2 && now - R.lastCue > 60000) {
      R.lastCue = now; R.offN = 0;
      if (state === "fast" && easyKind) say("You're running " + shortPace(cp) + ". This should be easy. Ease back towards " + shortPace(target) + ".");
      else if (state === "fast") say("A bit quick. You're at " + shortPace(cp) + ". Settle to " + shortPace(target) + ".");
      else say("Pick it up a little. You're at " + shortPace(cp) + ". Aim for " + shortPace(target) + ".");
    } else if (state === "ok" && !easyKind && R.offN >= 2 && now - R.lastOk > 180000 && now - R.lastCue > 45000) {
      R.lastOk = now; R.lastCue = now; say("Right on pace. " + shortPace(cp) + ". Nice.");
    }
  }

  function tick() {
    if (!R) return;
    var e = elapsed();
    if (Date.now() < R.t0) { render(R.steps[0], R.steps[0].dur, 0, 0); return; }
    if (R.idx < 0) beginStep(0, e);
    var idx = R.idx, s = R.steps[idx], inT = e - R.stepT0, dist = gpsDist(), inD = dist - R.stepD0, bd = byDistance(s);
    var done = bd ? (inD >= s.km * 1000 || inT >= s.dur * 1.8) : inT >= s.dur;
    if (!R.paused && done) { if (idx >= R.steps.length - 1) return finish(true); beginStep(idx + 1, e); return tick(); }

    var pace = curPace();
    var remain = bd ? (s.km * 1000 - inD) * ((pace || R.p[s.pace]) / 1000) : s.dur - inT;

    if (!R.paused) {
      R.cues.forEach(function (c) { if (!c.done && inT >= c.at) { c.done = true; if (inT - c.at < 4) { if (c.beep) beep(false); else say(c.text); } } });
      if (bd) {
        var left = s.km * 1000 - inD;
        if (!R.saidHalf && s.km >= 4 && inD >= s.km * 500) { R.saidHalf = true; say("Halfway through this block."); }
        if (!R.said200 && s.km >= 0.8 && left <= 200) { R.said200 = true; say("200 metres to go."); }
      }
      if (gpsGood() && Math.floor(dist / 1000) > R.lastKm) {
        R.lastKm = Math.floor(dist / 1000);
        var split = e - R.kmT; R.kmT = e;
        say("Kilometre " + R.lastKm + ". That one was " + shortPace(split) + ".");
      }
      coach(s, inT);
    }
    render(s, remain, dist, pace, bd ? (s.km * 1000 - inD) / 1000 : null);
  }

  function render(s, remain, dist, pace, leftKm) {
    var idx = Math.max(0, R.idx), e = elapsed();
    $("rKind").textContent = kindName(s.kind); $("rKind").className = "r-kind " + s.kind;
    $("rLabel").textContent = s.label;
    $("rClock").textContent = leftKm !== null && leftKm !== undefined ? Math.max(0, leftKm).toFixed(2) : mmss(remain);
    var tp = R.p[s.pace];
    $("rPace").textContent = s.pace === "hill" ? "Strong effort uphill" : s.pace === "jog" ? "Easy jog or walk" : "Target " + mmss(tp) + " /km" + (leftKm != null ? ", km to go in this block" : s.km ? " for " + s.km + " km" : "");
    var off = pace && s.pace !== "jog" && s.pace !== "hill" ? (pace < tp - 12 ? " fast" : pace > tp + 12 ? " slow" : " on") : "";
    $("rNow").textContent = pace ? mmss(pace) : "\u2013"; $("rNow").className = "v" + off;
    $("rDist").textContent = R.gps ? (dist / 1000).toFixed(2) : "\u2013";
    $("rElapsed").textContent = mmss(e);
    var n = R.steps[idx + 1];
    $("rNext").textContent = n ? "Next: " + n.label + ", " + (n.km ? n.km + " km" : mmss(n.dur)) : "Last step";
    $("rOverall").textContent = mmss(e) + " of about " + mmss(R.total);
    var segs = $("rSegs").children;
    for (var k = 0; k < segs.length; k++) segs[k].className = R.steps[k].kind + (k < idx ? " past" : k === idx ? " cur" : "");
    var warn = R.baseWarn;
    if (R.gps) warn = (R.gps.err || (!gpsGood() ? "Waiting for GPS. Live pace appears once you're moving outside." : R.gps.weak ? "GPS signal is weak." : "GPS live.")) + " " + warn;
    else if (gpsOn) warn = "This phone can't share location. " + warn;
    $("rWarn").textContent = warn;
    $("pClock").textContent = leftKm != null ? Math.max(0, leftKm).toFixed(2) + " km" : mmss(remain); $("pLabel").textContent = s.label + (pace ? ", " + mmss(pace) + " /km" : "");
  }

  function finish(complete) {
    clearInterval(timer); gpsStop();
    var run = R.run, id = "w" + R.i + "-" + R.key, dist = gpsDist();
    if (complete) {
      ticks[id] = 1; save("hc-ticks", ticks); beep(true);
      say("Session complete. Brilliant work, Subash." + (dist > 500 ? " " + (dist / 1000).toFixed(1) + " kilometres." : ""), true);
    }
    if (wakeLock) { try { wakeLock.release(); } catch (e) {} wakeLock = null; }
    $("pocket").hidden = true;
    R = null;
    $("run").hidden = true;
    renderWeek(); renderPlan();
    if (complete) setTimeout(function () { alert(run.title + " done and ticked off."); }, 300);
  }

  $("rPause").addEventListener("click", function () {
    if (!R) return;
    if (R.paused) { R.pausedTotal += Date.now() - R.paused; R.paused = null; this.textContent = "Pause"; say("Resuming.", true); }
    else { R.paused = Date.now(); this.textContent = "Resume"; say("Paused.", true); }
  });
  $("rSkip").addEventListener("click", function () {
    if (!R || R.paused || R.idx < 0) return;
    if (R.idx >= R.steps.length - 1) return finish(true);
    beginStep(R.idx + 1, elapsed()); tick();
  });
  $("rEnd").addEventListener("click", function () {
    if (!R) return;
    if (!confirm("End this run now?")) return;
    var markDone = confirm("Mark this session as done?");
    if (markDone) { ticks["w" + R.i + "-" + R.key] = 1; save("hc-ticks", ticks); }
    if (window.speechSynthesis) speechSynthesis.cancel();
    finish(false);
  });

  /* pocket lock: black screen that ignores touches until you hold */
  var holdT = null;
  $("rPocket").addEventListener("click", function () { $("pocket").hidden = false; });
  var hold = $("pHold");
  function holdStart(e) { e.preventDefault(); hold.classList.add("holding"); hold.textContent = "Keep holding\u2026"; holdT = setTimeout(function () { $("pocket").hidden = true; holdEnd(); }, 1200); }
  function holdEnd() { clearTimeout(holdT); hold.classList.remove("holding"); hold.textContent = "Hold to unlock"; }
  hold.addEventListener("pointerdown", holdStart);
  hold.addEventListener("pointerup", holdEnd); hold.addEventListener("pointercancel", holdEnd); hold.addEventListener("pointerleave", holdEnd);
  $("pocket").addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });

  /* ---------- go ---------- */
  renderAll();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
