(function () {
  "use strict";
  var DAYS = { mon: 0, tue: 1, wed: 2, thu: 3, sat: 5, sun: 6 };
  var DAY_ORDER = ["mon", "tue", "wed", "thu", "sat", "sun"];
  var START = new Date(PLAN_START[0], PLAN_START[1], PLAN_START[2]);
  var RACE = new Date(RACE_DATE[0], RACE_DATE[1], RACE_DATE[2]);

  /* ---------- storage ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var ticks = load("hc-ticks-2027-revised", {});
  var t5k = load("hc-5k", 1756);
  var voiceURI = load("hc-voice", "");
  var offlineStatus = 'Checking offline download…';
  var paceFastText = load('hc-pace-fast', ''), paceSlowText = load('hc-pace-slow', '');
  function parsePace(text) { var match = /^(\d{1,2}):([0-5]\d)$/.exec(text.trim()); return match ? +match[1]*60 + +match[2] : null; }
  var TARGET_PACES = ["tempo", "k10", "k5", "goal"];
  function stepRange(s) {
    if (!s || s.kind === "rec" || s.kind === "stride" || s.pace === "hill") return null;
    var p = paces();
    if (TARGET_PACES.indexOf(s.pace) >= 0) { var tol = s.pace === "goal" ? 8 : 10; return [p[s.pace] - tol, p[s.pace] + tol]; }
    if (s.pace === "easy") { var own = paceRange(); return own || [p.easy - 45, 9999]; }
    return paceRange();
  }
  function paceRange() { var a=parsePace(paceFastText), b=parsePace(paceSlowText); return a>=180 && b>a && b<=1200 ? [a,b] : null; }
  function validatePace() { var el=document.getElementById('paceValidation'); if(el) el.textContent=paceFastText || paceSlowText ? (paceRange() ? 'Alerts enabled while the app is visible.' : 'Enter both limits as m:ss, with the slow edge greater than the fast edge (3:00–20:00). Alerts are off.') : 'Pace alerts off. Follow effort.'; }

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
  var curWeek = Math.min(23, Math.max(0, Math.floor((RunCore.dayNumber(today) - RunCore.dayNumber(START)) / 7)));
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
      .map(function (k) { return '<button class="chip" data-learn="' + k + '">' + (k === "hills" || k === "intervals" ? "What are " : "What\u2019s ") + (k === "timetrial" ? "a time trial" : k === "goal" ? "goal pace" : k === "hills" ? "hill repeats" : k === "intervals" ? "intervals" : k === "progression" ? "a progression run" : k === "tempo" ? "tempo" : k === "fartlek" ? "fartlek" : "a stride") + "?</button>"; }).join("");
    return '<article class="session ' + run.type + (done ? " is-done" : "") + '">' +
      '<div class="s-top"><div><div class="s-day">' + fmtDate(date) + (key === "sat" ? ", morning" : "") + '</div>' +
      '<div class="s-title">' + esc(run.title) + (run.opt ? ' <span class="opt">optional</span>' : "") + '</div></div>' +
      '<label class="check"><input type="checkbox" data-tick="' + id + '"' + (done ? " checked" : "") + '> Done</label></div>' +
      '<details class="session-notes"><summary>Session instructions</summary><div class="s-how">' + esc(run.how) + '</div></details>' +
      (mins ? '<div class="s-meta">' + (run.steps.some(function(s){return s.km;}) ? 'Distance goal · duration varies' : mins + ' minutes total') + '</div>' : "") +
      '<div class="s-actions">' + (run.steps ? '<button class="go" data-start="' + i + ':' + key + '">Start guided run</button>' : "") + (run.steps ? '<button class="ghost" data-watch="' + i + ':' + key + '">Apple Watch setup</button>' : '') + learn + '</div></article>';
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
    var c = counts(), days = Math.max(0, RunCore.dayNumber(RACE) - RunCore.dayNumber(today)), w = WEEKS[viewWeek];
    var before = today < START;
    document.getElementById("v-week").innerHTML =
      '<section class="bib" aria-label="Race bib"><span class="pin l"></span><span class="pin r"></span>' +
      '<div class="event">Hamilton Half Marathon<br>Sunday 14 March 2027 · 8:00am, Hamilton Gardens</div>' +
      '<div class="number">' + days + '<small>' + (days === 1 ? "day" : "days") + ' to go</small></div>' +
      '<div class="runner"><b>Subash</b><span>Goal: under 2:00:00</span></div>' +
      '<div class="tab">' + c.done + ' of ' + c.total + ' sessions done<div class="bar"><i style="width:' + (c.done / c.total * 100) + '%"></i></div></div></section>' +
      '<div style="display:flex;justify-content:space-between;align-items:end;gap:10px">' +
      '<h1>Week ' + (viewWeek + 1) + '</h1><div style="display:flex;gap:6px;margin-bottom:12px">' +
      '<button class="ghost" data-wk="-1" aria-label="Previous week"' + (viewWeek === 0 ? " disabled" : "") + '>\u2039</button>' +
      '<button class="ghost" data-wk="1" aria-label="Next week"' + (viewWeek === 23 ? " disabled" : "") + '>\u203a</button></div></div>' +
      '<p class="muted">' + esc(w.focus) + (viewWeek === curWeek ? (before ? ". Starts " + fmtDate(START) : ". This week") : "") +
      (w.nike ? ". Nike phase: these are Nike\u2019s own sessions, so you can also run them with the matching NRC guided run." : ".") + '</p>' +
      '<p class="muted">Runs: Tuesday speed, Thursday easy (optional in weeks 1–4, building to 60 min), Saturday parkrun kept easy, and the long run on Sunday. Wednesday: gentle strength. Monday and Friday: rest.</p>' + weekSessions(viewWeek);
  }

  function renderPlan() {
    var c = counts(), html = '<h1>All 24 weeks</h1>';
    WEEKS.forEach(function (w, i) {
      if (i === 0) html += '<div class="phase">Base build: weeks 1 to 10</div>';
      if (i === 10) html += '<div class="phase">Race build: weeks 11 to 24</div>';
      var p = c.per[i];
      html += '<details class="week' + (i === curWeek ? " now" : "") + '"' + (i === curWeek ? " open" : "") + '><summary><span class="wk">' + (i + 1) + '</span>' +
        '<span class="wmeta"><b>' + esc(w.focus) + '</b><span>From ' + fmtDate(addDays(START, i * 7)) + '</span></span>' +
        '<span class="count' + (p[0] === p[1] ? " full" : "") + '">' + p[0] + '/' + p[1] + '</span></summary><div class="inner">' + weekSessions(i) + '</div></details>';
    });
    document.getElementById("v-plan").innerHTML = html;
  }

  function renderLearn() {
    var order = ["easy", "long", "warmup", "strides", "fartlek", "intervals", "tempo", "hills", "goal", "timetrial"];
    document.getElementById("v-learn").innerHTML = '<h1>Running words, explained</h1>' +
      '<p class="muted">The voice coach explains these at the start of each session too.</p>' +
      order.map(function (k) { return '<div class="card" id="learn-' + k + '"><h3>' + LEARN[k][0] + '</h3><p>' + LEARN[k][1] + '</p></div>'; }).join("");
  }

  function paceListHTML() {
    var p = paces(), f = Math.pow(21.0975 / 5, 1.06), half = t5k * f, need = 7200 / f;
    return '<dl class="paces"><dt>Easy</dt><dd>' + mmss(p.easy - 15) + '\u2013' + mmss(p.easy + 15) + ' /km</dd>' +
      '<dt>Tempo</dt><dd>' + mmss(p.tempo) + ' /km</dd><dt>10K pace</dt><dd>' + mmss(p.k10) + ' /km</dd>' +
      '<dt>5K pace</dt><dd>' + mmss(p.k5) + ' /km</dd><dt>Sub-2 race pace</dt><dd>5:41 /km</dd>' +
      '<dt>Predicted half today</dt><dd>' + mmss(half) + '</dd></dl>' +
      '<p style="margin-top:10px;font-weight:700">' + (half < 7200 ? "On track for sub-2." : "Sub-2 needs a 5K of about " + mmss(need) + ". You\u2019re " + mmss(t5k - need) + " away.") + '</p>';
  }

  function renderSetup() {
    var base = new URL('./', location.href), ics = new URL('plan.ics', base).href;
    document.getElementById('v-setup').innerHTML =
      '<h1>Setup for your run</h1>' +
      '<div class="card"><h3>Your 5K time</h3><span class="muted">Latest parkrun or time trial</span>' +
      '<div class="timeIn"><input id="t5kMin" class="t5k" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-label="Minutes" value="' + Math.floor(t5k / 60) + '">' +
      '<span class="colon">:</span><input id="t5kSec" class="t5k" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" aria-label="Seconds" value="' + String(t5k % 60).padStart(2, "0") + '">' +
      '<span class="muted">min : sec</span></div><div id="paceList">' + paceListHTML() + '</div>' +
      '<p class="muted">Speed sessions coach you to these paces. Update after each time trial.</p></div>' +
      '<div class="card"><h3>Phone in your belt? Use Apple Workout.</h3><p>This website cannot send live metrics or workouts to Apple Watch. For a locked-phone run, your Ultra records pace, distance and heart rate in Apple Workout. Use its custom intervals and Voice Feedback for alerts.</p><p>Open a session’s <b>Apple Watch setup</b> for the exact steps. There is no automatic sync with this website.</p></div>' +
      '<div class="card"><h3>Offline app</h3><p id="offlineStatus" role="status">' + esc(offlineStatus) + '</p><p>Safari → Share → Add to Home Screen. Open it online until it says ready. Offline voices depend on the voices installed on your iPhone; test in airplane mode with Bluetooth left on.</p><button class="go" id="demo">One-minute equipment check</button></div>' +
      '<div class="card"><h3>Phone GPS · app must stay visible</h3><label class="check option"><input type="checkbox" id="gpsToggle"' + (gpsOn ? ' checked' : '') + '> Show phone pace and distance; announce kilometres</label><p class="muted">Measured phone GPS, not Watch data. If GPS drops, distance goals wait. With GPS off, use your Watch and manually confirm distance with Next.</p></div>' +
      '<div class="card"><h3>Optional pace alerts</h3><p>Leave blank for effort-based training. These are your chosen limits, not a personalised prescription. Alerts are disabled for strides and recoveries.</p><div class="pace-inputs"><label>Fast edge /km<input id="paceFast" placeholder="6:30" inputmode="decimal" value="' + esc(paceFastText) + '"></label><label>Slow edge /km<input id="paceSlow" placeholder="8:00" inputmode="decimal" value="' + esc(paceSlowText) + '"></label></div><p id="paceValidation" role="status"></p></div>' +
      '<div class="card"><h3>Voice in your AirPods</h3><select id="voice" aria-label="Coaching voice"></select><div class="s-actions"><button class="go" id="testVoice">Test voice</button></div><p class="muted">Local voices are labelled. Audio follows your phone’s output. Music mixing varies by iOS and audio app; test it before running.</p></div>' +
      '<div class="card"><h3>Calendar · 121 sessions and reminders</h3><p>Calendar entries show the plan, not live workout metrics. All-day entries let you choose your own start times. Saturday is parkrun morning.</p><div class="s-actions"><a class="go" href="' + ics.replace(/^https?:/, 'webcal:') + '">Subscribe</a><a class="ghost" href="' + ics + '" download>Download calendar</a></div><p class="muted">Subscribed calendars are read-only and refresh on your calendar app’s schedule. Import the download into a separate calendar if you want editable times. Replace an older imported training calendar to avoid duplicates; keep unrelated calendars.</p></div>' +
      '<div class="card"><h3>Web coaching limits</h3><p>Keep this app visible and the screen awake. Touch guard blocks accidental touches; it does not unlock background tracking. Locking the phone or switching apps pauses this coach. GPS gaps are not counted. Use Apple Workout or NRC for dependable belt-running guidance.</p><p>Completion ticks are stored only in this browser. Old-plan ticks remain saved under their original key and have not been applied to different sessions.</p><button class="ghost" id="resetTicks">Clear revised-plan ticks</button></div>';
    fillVoices(); validatePace();
  }

  function watchSetup(i, key) {
    var run = WEEKS[i].runs[key];
    $('watchTitle').textContent = run.title;
    $('watchSteps').innerHTML = run.steps.map(function(step) { return '<li><b>' + esc(step.label) + '</b> — ' + (step.km ? step.km + ' km distance goal' : mmss(step.sec) + ' time goal') + '</li>'; }).join('');
    $('watchExtra').textContent = run.timeCap ? 'Stop at ' + Math.floor(run.timeCap/3600) + ' h ' + Math.round(run.timeCap%3600/60) + ' min if reached before the distance. Do not speed up to reach the kilometres.' : 'Use comfortable effort for easy running. Walking breaks are welcome.';
    $('watchDialog').showModal();
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
    if (t.dataset.tick) { if (t.checked) ticks[t.dataset.tick] = 1; else delete ticks[t.dataset.tick]; save("hc-ticks-2027-revised", ticks); renderWeek(); renderPlan(); }
    if (t.id === "gpsToggle") { gpsOn = t.checked; save("hc-gps", gpsOn); }
    if (t.id === "voice") { voiceURI = t.value; save("hc-voice", voiceURI); }
  });
  document.querySelector('main').addEventListener('input', function(e) {
    if (e.target.id === 't5kMin' || e.target.id === 't5kSec') {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2);
      var m = parseInt(document.getElementById('t5kMin').value, 10), sec = parseInt(document.getElementById('t5kSec').value || '0', 10);
      if (!isNaN(m) && m >= 12 && m <= 60 && !isNaN(sec) && sec <= 59) {
        t5k = m * 60 + sec; save('hc-5k', t5k);
        document.getElementById('paceList').innerHTML = paceListHTML(); renderWeek(); renderPlan();
        if (e.target.id === 't5kMin' && e.target.value.length === 2) document.getElementById('t5kSec').focus();
      }
      return;
    }
    if(e.target.id === 'paceFast') { paceFastText=e.target.value; save('hc-pace-fast', paceFastText); }
    if(e.target.id === 'paceSlow') { paceSlowText=e.target.value; save('hc-pace-slow', paceSlowText); }
    validatePace();
  });
  document.querySelector("main").addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("t5k")) e.target.select(); });
  document.querySelector("main").addEventListener("click", function (e) {
    var b = e.target.closest("button,a"); if (!b) return;
    if (b.dataset.start) { var p = b.dataset.start.split(":"); startRun(+p[0], p[1]); }
    else if (b.dataset.watch) { var wp=b.dataset.watch.split(":"); watchSetup(+wp[0], wp[1]); }
    else if (b.id === "demo") startRun(-1, "demo");
    else if (b.dataset.learn) { show("learn"); var el = document.getElementById("learn-" + b.dataset.learn); if (el) el.scrollIntoView(); }
    else if (b.dataset.wk) { viewWeek = Math.min(23, Math.max(0, viewWeek + (+b.dataset.wk))); renderWeek(); }
    else if (b.id === "testVoice") { unlockAudio(); say("Hi Subash. This is your coach. If you can hear this, your audio output works. Test the demo offline too.", true); beep(true); }
    else if (b.id === "resetTicks") { if (confirm("Clear every tick in the plan?")) { ticks = {}; save("hc-ticks-2027-revised", ticks); renderAll(); } }
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
    for (var i = 0; i < pref.length; i++) { var f = voices.filter(function (x) { return x.lang.replace("_", "-") === pref[i]; }); if (f.length) return f.find(function(v){return v.localService;}) || f[0]; }
    return voices.filter(function (x) { return /^en/i.test(x.lang); })[0] || voices[0];
  }
  function say(text, interrupt) {
    if (!("speechSynthesis" in window)) return;
    if (interrupt) speechSynthesis.cancel();
    else if (speechSynthesis.speaking || speechSynthesis.pending) return;
    var u = new SpeechSynthesisUtterance(text), v = pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = 1; u.onerror = function(event) { if(R && event.error!=='canceled' && event.error!=='interrupted') R.audioError='Voice unavailable. Use a downloaded local voice and run the demo before relying on cues.'; }; lastUtter = u; // keep a reference so iOS doesn't drop it
    speechSynthesis.speak(u);
  }
  function fillVoices() {
    var sel = document.getElementById("voice"); if (!sel) return;
    var en = voices.filter(function (v) { return /^en/i.test(v.lang); });
    if (!en.length) { sel.innerHTML = "<option>Default voice</option>"; return; }
    var cur = pickVoice();
    sel.innerHTML = en.map(function (v) { return '<option value="' + esc(v.voiceURI) + '"' + (cur && v.voiceURI === cur.voiceURI ? " selected" : "") + ">" + esc(v.name + " (" + v.lang + ")" + (v.localService ? " · local" : " · offline availability unknown")) + "</option>"; }).join("");
  }
  if ("speechSynthesis" in window) {
    voices = speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = function () { voices = speechSynthesis.getVoices(); fillVoices(); };
  }

  /* ---------- wake lock ---------- */
  var wakeLock = null;
  function lockScreenOn() {
    if (!('wakeLock' in navigator)) { if(R) R.wakeStatus='Screen wake lock unavailable; keep the screen on.'; return; }
    navigator.wakeLock.request('screen').then(function(lock) {
      if(!R || R.paused) { lock.release(); return; }
      wakeLock=lock; R.wakeStatus='Screen wake lock active.';
      lock.addEventListener('release', function(){ if(R) R.wakeStatus='Screen wake lock released; keep the app visible.'; });
    }).catch(function(){ if(R) R.wakeStatus='Could not keep the screen awake. Keep the app visible.'; });
  }
  document.addEventListener('visibilitychange', function() {
    if(document.visibilityState === 'hidden' && R && !R.paused) pauseRun('Paused because the app left the screen. Return and tap Resume.', R.lastTick);
  });

  /* ---------- run engine (with live GPS pace) ---------- */
  var R = null, timer = null, geoId = null;
  var $ = function (id) { return document.getElementById(id); };
  var gpsOn = load("hc-gps", true);

  function kindName(k) { return { work: "Hard", stride: "Stride", rec: "Recover", easy: "Easy", wu: "Warm-up", cd: "Cool-down" }[k] || "Run"; }
  function shortPace(p) { p = Math.round(p); var m = Math.floor(p / 60), s = p % 60; return m + " " + (s === 0 ? "flat" : s < 10 ? "oh " + s : s); }

  /* GPS does not integrate pauses, poor fixes or background gaps. */
  function gpsStart() {
    if (!gpsOn || !navigator.geolocation) return;
    if(!R.gps) R.gps = new RunCore.GPS();
    geoId=navigator.geolocation.watchPosition(function(pos) {
      if(R && R.gps && pos.timestamp >= R.lastResume) R.gps.add(pos, Date.now(), !R.paused && document.visibilityState==='visible');
    }, function(error) {
      if(R && R.gps) { R.gps.breakSegment(); R.gps.err=error.code===1 ? 'Location blocked. Distance goals will not auto-finish. End manually or allow location.' : 'GPS unavailable. Distance goals wait for a fresh fix.'; }
    }, {enableHighAccuracy:true, maximumAge:0, timeout:15000});
  }
  function gpsStop() { if(geoId!==null && navigator.geolocation) navigator.geolocation.clearWatch(geoId); geoId=null; }
  function gpsGood() { return !!(R && R.gps && R.gps.good(Date.now())); }
  function gpsDist() { return R && R.gps ? R.gps.dist : 0; }
  function curPace() { return R && R.gps && !R.paused ? R.gps.pace(Date.now()) : null; }

  function startRun(i, key) {
    var run = i < 0 ? DEMO : WEEKS[i].runs[key], p = paces();
    if(!confirm('Web coaching needs this app visible and the screen on. It cannot show live data on Apple Watch. For a locked phone in your belt, use Apple Watch setup instead. Start the web coach?')) return;
    unlockAudio();
    var steps = run.steps.map(function (s) { return Object.assign({}, s, { dur: stepSeconds(s, p) }); });
    var total = steps.reduce(function (a, s) { return a + s.dur; }, 0);
    R = { i: i, key: key, run: run, steps: steps, total: total, t0: Date.now(), paused: null, pausedTotal: 0,
      idx: -1, stepT0: 0, stepD0: 0, cues: [], p: p, lastKm: 0, kmT: 0, lastCheck: 0, lastCue: 0, lastOk: 0, off: "", offN: 0, distanceMode: gpsOn && navigator.geolocation ? "gps" : "manual", lastTick:Date.now(), lastFuel:0, skipped:false, pauseReason:"", audioError:"", wakeStatus:"Requesting screen wake lock…" };
    R.lastResume=Date.now();
    gpsStart();
    $("rTitle").textContent = run.title;
    $("rSegs").innerHTML = steps.map(function (s) { return '<i class="' + s.kind + '" style="flex:' + s.dur + '"></i>'; }).join("");
    $("rPause").textContent = "Pause";
    R.baseWarn = 'Touch guard is not a phone lock. Web coaching pauses when the app leaves the screen.';
    lockScreenOn();
    $('run').hidden = false;
    document.querySelector('main').inert=true; document.querySelector('nav').inert=true;
    $('rPause').focus();
    clearInterval(timer); timer = setInterval(tick, 250); tick();
  }

  function elapsed() { var now = R.paused || Date.now(); return Math.max(0, (now - R.t0 - R.pausedTotal) / 1000); }
  function byDistance(s) { return !!s.km; }

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
    say(text, true);

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
    var range=stepRange(s), now=Date.now();
    if(!range || !gpsGood() || R.paused || now-R.lastCheck<15000 || inT<45 || ['rec','stride'].includes(s.kind) || (!s.km && s.sec<90)) return;
    R.lastCheck=now;
    var pace=curPace(); if(!pace) return;
    var state=pace<range[0] ? 'fast' : pace>range[1] ? 'slow' : 'ok';
    R.offN=state===R.off ? R.offN+1 : 1; R.off=state;
    if(state!=='ok' && R.offN>=2 && now-R.lastCue>60000) {
      R.lastCue=now; R.offN=0;
      var named=TARGET_PACES.indexOf(s.pace)>=0, tgt=R.p[s.pace];
      if(named) say('You\u2019re at '+spokenPace(pace)+'. '+(state==='fast' ? 'A bit quick. Settle to ' : 'Pick it up a little. Aim for ')+spokenPace(tgt)+'.');
      else say('You\u2019re at '+spokenPace(pace)+'. '+(state==='fast' ? 'This should be easy. Ease back.' : 'Slower than your chosen range.'));
    }
  }

  function tick() {
    if (!R) return;
    var now=Date.now();
    if(!R.paused && (document.visibilityState !== 'visible' || now-R.lastTick>3000)) pauseRun('Paused after an interruption. Tap Resume when ready.',R.lastTick);
    R.lastTick=now;
    var e = elapsed();
    if (Date.now() < R.t0) { render(R.steps[0], R.steps[0].dur, 0, 0); return; }
    if (R.idx < 0) beginStep(0, e);
    var idx = R.idx, s = R.steps[idx], inT = e - R.stepT0, dist = gpsDist(), inD = dist - R.stepD0, bd = byDistance(s);
    var done = RunCore.stepComplete(s,inT,inD,R.distanceMode,gpsGood());
    if(!R.paused && R.run.timeCap && e >= R.run.timeCap) return finish(true, 'Time ceiling reached. Stop here even if you have not reached the distance.');
    if (!R.paused && done) { if (idx >= R.steps.length - 1) return finish(true); beginStep(idx + 1, s.km ? e : R.stepT0+s.sec); return tick(); }

    var pace = curPace();
    var remain = bd ? 0 : s.dur - inT;

    if (!R.paused) {
      R.cues.forEach(function (c) { if (!c.done && inT >= c.at) { c.done = true; if (inT - c.at < 4) { if (c.beep) beep(false); else say(c.text); } } });
      if (bd && R.distanceMode === "gps" && gpsGood()) {
        var left = s.km * 1000 - inD;
        if (!R.saidHalf && s.km >= 4 && inD >= s.km * 500) { R.saidHalf = true; say("Halfway through this block."); }
        if (!R.said200 && s.km >= 0.8 && left <= 200) { R.said200 = true; say("200 metres to go."); }
      }
      if (gpsGood() && Math.floor(dist / 1000) > R.lastKm) {
        R.lastKm=Math.floor(dist/1000);
        say('Distance '+(dist/1000).toFixed(2)+' kilometres.'+(pace ? ' Current pace '+spokenPace(pace)+'.' : ''));
      }
      if(R.run.fuel && e>=2400 && Math.floor(e/2400)>R.lastFuel) {
        R.lastFuel=Math.floor(e/2400);
        say('Fuelling reminder. If this run is lasting seventy five minutes or more, follow the food and drink routine you practised.');
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
    $("rPace").textContent = (TARGET_PACES.indexOf(s.pace) >= 0 ? "Target " + mmss(tp) + " /km · " : "") + (PACE_WORDS[s.pace] || "Comfortable effort") + (s.km ? (R.distanceMode === "manual" ? " · confirm distance on your Watch, then Next" : " · GPS km remaining") : " · time remaining");
    var range=stepRange(s), off=pace && range && s.kind!=="rec" && s.kind!=="stride" ? (pace<range[0] ? " fast" : pace>range[1] ? " slow" : " on") : "";
    $("rNow").textContent = pace ? mmss(pace) : "\u2013"; $("rNow").className = "v" + off;
    $("rDist").textContent = R.gps && (R.gps.lastFix || dist>0) ? (dist / 1000).toFixed(2) : "\u2013";
    $("rElapsed").textContent = mmss(e);
    var n = R.steps[idx + 1];
    $("rNext").textContent = n ? "Next: " + n.label + ", " + (n.km ? n.km + " km" : mmss(n.dur)) : "Last step";
    $("rOverall").textContent = mmss(e) + (R.steps.some(function(s){return s.km;}) ? " elapsed" : " / " + mmss(R.total));
    var segs = $("rSegs").children;
    for (var k = 0; k < segs.length; k++) segs[k].className = R.steps[k].kind + (k < idx ? " past" : k === idx ? " cur" : "");
    var warn = (R.paused ? R.pauseReason + " " : "") + R.audioError + " " + R.wakeStatus + " " + R.baseWarn;
    if (R.gps) warn = (R.gps.err || (!gpsGood() ? "Waiting for GPS. Live pace appears once you're moving outside." : R.gps.weak ? "GPS signal is weak." : "GPS live.")) + " " + warn;
    else if (gpsOn) warn = "This phone can't share location. " + warn;
    $("rWarn").textContent = warn;
    $("pClock").textContent = leftKm != null ? Math.max(0, leftKm).toFixed(2) + " km" : mmss(remain); $("pLabel").textContent = s.label + (pace ? ", " + mmss(pace) + " /km" : "");
  }

  function finish(complete, message) {
    clearInterval(timer); gpsStop();
    var run = R.run, id = "w" + R.i + "-" + R.key, dist = gpsDist();
    if (complete && R.skipped) complete=confirm("Some steps were skipped. Mark this session complete anyway?");
    if (complete) {
      if(R.i>=0) ticks[id] = 1; save("hc-ticks-2027-revised", ticks); beep(true);
      say((message || "Session complete. Well done.") + (dist > 500 ? " " + (dist / 1000).toFixed(1) + " kilometres." : ""), true);
    }
    if (wakeLock) { try { wakeLock.release(); } catch (e) {} wakeLock = null; }
    $("pocket").hidden = true;
    R = null;
    $("run").hidden = true;
    document.querySelector("main").inert=false; document.querySelector("nav").inert=false;
    document.querySelector("nav button[aria-current]").focus();
    renderWeek(); renderPlan();
    if (complete) setTimeout(function () { alert(run.title + " done and ticked off."); }, 300);
  }

  function pauseRun(reason, at) {
    if(!R || R.paused) return;
    R.paused=Math.max(R.t0,at || Date.now()); R.pauseReason=reason || 'Paused.';
    $('rPause').textContent='Resume';
    gpsStop(); if(R.gps) R.gps.breakSegment();
    if(window.speechSynthesis) speechSynthesis.cancel();
    if(wakeLock) { wakeLock.release().catch(function(){}); wakeLock=null; }
  }
  $('rPause').addEventListener('click', function() {
    if(!R) return;
    if(R.paused) {
      R.pausedTotal+=Date.now()-R.paused; R.paused=null; R.lastTick=Date.now(); R.lastResume=Date.now(); R.pauseReason='';
      this.textContent='Pause'; unlockAudio(); gpsStart(); lockScreenOn();
      say('Resuming. '+R.steps[Math.max(0,R.idx)].label+'.',true);
    } else { pauseRun('Paused.'); say('Paused.',true); }
  });
  $("rSkip").addEventListener("click", function () {
    if (!R || R.paused || R.idx < 0) return;
    var current=R.steps[R.idx];
    if(!confirm(current.km ? 'Confirm you completed this distance on your Watch? Only confirm the actual distance.' : 'Skip the remaining time in this step?')) return;
    if(!current.km) R.skipped=true;
    if (R.idx >= R.steps.length - 1) return finish(true);
    beginStep(R.idx + 1, elapsed()); tick();
  });
  $("rEnd").addEventListener("click", function () {
    if (!R) return;
    if (!confirm("End this run now?")) return;
    var markDone = confirm("Mark this session as done?");
    if (markDone && R.i>=0) { ticks["w" + R.i + "-" + R.key] = 1; save("hc-ticks-2027-revised", ticks); }
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
  hold.addEventListener('keydown',function(e){ if(e.key==='Enter' || e.key==='Escape') { $('pocket').hidden=true; holdEnd(); } });
  $("pocket").addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });

  /* ---------- go ---------- */
  renderAll();
  function offlineMessage(text) { offlineStatus=text; var el=$('offlineStatus'); if(el) el.textContent=text; }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    var reloading=false;
    navigator.serviceWorker.addEventListener('controllerchange',function(){ if(reloading) location.reload(); });
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      var bar=document.createElement('div'); bar.id='updateBar'; bar.hidden=true; bar.setAttribute('role','status');
      bar.innerHTML='<span>A new version of Half Coach is ready.</span><button id="applyUpdate">Update now</button>';
      document.body.insertBefore(bar, document.body.firstChild);
      bar.querySelector('button').addEventListener('click',function(){
        if(R) { alert('Finish or end your run first, then tap Update now.'); return; }
        if(!reg.waiting) { location.reload(); return; }
        reloading=true; reg.waiting.postMessage({type:'SKIP_WAITING'});
        setTimeout(function(){ location.reload(); }, 3000);
      });
      function status() {
        bar.hidden=!reg.waiting;
        if(reg.waiting) offlineMessage('Update downloaded. Tap Update now at the top of the screen (not during a run).');
        else if(reg.active) offlineMessage('App files saved for offline use. Test your selected voice separately.');
      }
      status(); navigator.serviceWorker.ready.then(status);
      reg.addEventListener('updatefound',function(){ var worker=reg.installing; if(worker) worker.addEventListener('statechange',status); });
      document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible' && !R) reg.update().catch(function(){}); });
    }).catch(function(){ offlineMessage('Offline download failed. Reconnect and reload before going offline.'); });
  } else offlineMessage('Offline installation requires HTTPS or localhost. Upload all files to GitHub Pages first.');
  $('closeWatch').addEventListener('click',function(){ $('watchDialog').close(); });
})();
