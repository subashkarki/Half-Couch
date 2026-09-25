/* Hamilton Half plan: 24 weeks, Mon 28 Sep 2026 to race day Sun 14 Mar 2027.
   Steps are time-based. Distance steps (km) are converted to time from your paces. */

var PLAN_START = [2026, 8, 28]; // year, month (0-based), day. Monday of week 1
var RACE_DATE = [2027, 2, 14];

var PACE_WORDS = {
  easy: "easy, conversational pace",
  steady: "steady, a touch quicker than easy",
  tempo: "tempo, comfortably hard",
  k10: "10K effort, strong but controlled",
  k5: "5K effort, hard",
  mile: "fast, mile effort",
  goal: "goal race pace",
  hill: "strong up the hill, short quick steps",
  jog: "easy jog",
  best: "best effort, fast but smooth, not an all-out sprint"
};

/* ---------- builders ---------- */
function E(min, label) { return [{ kind: "easy", sec: min * 60, pace: "easy", label: label || "Easy running" }]; }
function WU(min) { return [{ kind: "wu", sec: min * 60, pace: "easy", label: "Warm-up", say: "Warm-up. " + min + " minutes of easy jogging. Nice and relaxed." }]; }
function CD(min) { return [{ kind: "cd", sec: min * 60, pace: "easy", label: "Cool-down", say: "Cool-down. " + min + " minutes of easy jogging. Let your breathing settle." }]; }
function ST(n) {
  var out = [];
  for (var i = 1; i <= n; i++) {
    out.push({ kind: "stride", sec: 20, pace: "mile", label: "Stride " + i + " of " + n,
      say: "Stride " + i + " of " + n + ". Build up smoothly to fast. Tall, relaxed, quick feet." });
    if (i < n) out.push({ kind: "rec", sec: 60, pace: "jog", label: "Walk or jog back", say: "Ease off. Walk or jog back for a minute." });
  }
  return out;
}
function R(n, workSec, pace, recSec, name) {
  var out = [];
  for (var i = 1; i <= n; i++) {
    out.push({ kind: "work", sec: workSec, pace: pace, label: (name || "Rep") + " " + i + " of " + n });
    if (i < n && recSec) out.push({ kind: "rec", sec: recSec, pace: "jog", label: "Recovery" });
  }
  return out;
}
function RK(n, km, pace, recSec, name) {
  var out = [];
  for (var i = 1; i <= n; i++) {
    out.push({ kind: "work", km: km, pace: pace, label: (name || (km < 1 ? km * 1000 + " m" : km + " km")) + " " + i + " of " + n });
    if (i < n && recSec) out.push({ kind: "rec", sec: recSec, pace: "jog", label: "Recovery" });
  }
  return out;
}
function K(km, pace, label, say) { return [{ kind: pace === "easy" ? "easy" : "work", km: km, pace: pace, label: label || km + " km", say: say }]; }
function T(min, pace, label) { return [{ kind: "work", sec: min * 60, pace: pace, label: label || "Tempo" }]; }
function PROG() {
  var p = ["easy", "easy", "steady", "steady", "tempo"], out = [];
  for (var i = 0; i < 5; i++) out.push({ kind: i < 2 ? "easy" : "work", km: 1, pace: p[i], label: "Kilometre " + (i + 1),
    say: i === 0 ? "Progression run. Kilometre 1, relaxed." : "Kilometre " + (i + 1) + ". A touch quicker than the last." });
  return out;
}
function TT() {
  return [{ kind: "work", km: 5, pace: "k5", label: "Time trial",
    say: "Time trial. Start a little slower than you want to for the first kilometre, settle in, then push hard over the last kilometre. Tap stop when you cross the line." }];
}
function PR(steps) { return steps; } // parkrun alias for readability

var PACE_LABEL = { mile: "mile pace", k5: "5K pace", k10: "10K pace", tempo: "tempo", best: "best effort", easy: "recovery pace", goal: "goal race pace", steady: "steady" };
function rep(n, x) { var a = []; for (var i = 0; i < n; i++) a.push(x); return a; }
/* IV: list of [workSec, pace, recSec, optional label]. Labels read "Rep 3 of 8: 1:30 at 5K pace". */
function IV(list) {
  var out = [], n = list.length;
  list.forEach(function (x, i) {
    var sec = x[0], m = Math.floor(sec / 60), s = sec % 60, t = m ? m + (s ? ":" + String(s).padStart(2, "0") : " min") : s + " s";
    out.push({ kind: x[1] === "easy" ? "easy" : "work", sec: sec, pace: x[1], label: "Rep " + (i + 1) + " of " + n + ": " + t + " " + (x[3] || "at " + PACE_LABEL[x[1]]).replace(/^at best effort$/, "best effort") });
    if (x[2] && i < n - 1) out.push({ kind: "rec", sec: x[2], pace: "jog", label: "Recovery" });
  });
  return out;
}
var PARK = "Jog 5 min before the start. Tap Start guided run as the whistle goes. ";
function FIN() { return [{ kind: "easy", sec: 720, pace: "easy", label: "Easy to the finish", say: "That's the workout done. Run easy to the finish line, then tap End run." }]; }

function cat() { return [].concat.apply([], arguments); }

/* ---------- the weeks ---------- */
var WEEKS = [
  { focus: "Settle in after Cambridge", runs: {
    tue: { type: "speed", title: "Easy run + strides", how: "30 min easy, then 6 × 20 s strides", learn: ["easy", "strides"], steps: cat(E(30), ST(6)) },
    thu: { type: "easy", title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    sat: { type: "park", title: "parkrun, easy", how: "Fully conversational. No watch-checking.", learn: ["easy"], steps: PR(K(5, "easy", "parkrun, easy")) },
    sun: { type: "long", title: "Long run", how: "10 km easy", learn: ["long"], steps: K(10, "easy", "Long run") } } },
  { focus: "Wake the legs up", runs: {
    tue: { type: "speed", title: "Fartlek", how: "10 min easy, 8 × (1 min hard, 2 min easy), 10 min easy", learn: ["fartlek"], steps: cat(WU(10), R(8, 60, "k5", 120, "Hard minute"), CD(10)) },
    thu: { type: "easy", title: "Easy run", how: "35 min easy", learn: ["easy"], steps: E(35) },
    sat: { type: "park", title: "parkrun, progression", how: "Each km a touch quicker than the last", learn: ["progression"], steps: PROG() },
    sun: { type: "long", title: "Long run", how: "11 km easy", learn: ["long"], steps: K(11, "easy", "Long run") } } },
  { focus: "Build the long run", runs: {
    tue: { type: "speed", title: "Intervals", how: "10 min easy, 6 × 2 min at 5K effort with 90 s jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), R(6, 120, "k5", 90), CD(10)) },
    thu: { type: "easy", title: "Easy run", how: "35 min easy", learn: ["easy"], steps: E(35) },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run", how: "12 km easy", learn: ["long"], steps: K(12, "easy", "Long run") } } },
  { focus: "Lighter week, first checkpoint", runs: {
    tue: { type: "speed", title: "Easy run + strides", how: "20 min easy + 6 strides", learn: ["strides"], steps: cat(E(20), ST(6)) },
    thu: { type: "easy", title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    sat: { type: "park", title: "parkrun time trial", how: "Race it. Checkpoint: around 29:30", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "9 km easy", learn: ["long"], steps: K(9, "easy", "Long run") } } },
  { focus: "Labour Day week", runs: {
    tue: { type: "speed", title: "Intervals", how: "10 min easy, 5 × 3 min at 10K effort with 90 s jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), R(5, 180, "k10", 90), CD(10)) },
    wed: { type: "easy", opt: true, title: "Easy run", how: "25 min easy", learn: ["easy"], steps: E(25) },
    thu: { type: "easy", title: "Easy run", how: "35 min easy", learn: ["easy"], steps: E(35) },
    sat: { type: "park", title: "parkrun, progression", how: "Each km a touch quicker", learn: ["progression"], steps: PROG() },
    sun: { type: "long", title: "Long run", how: "12 km easy", learn: ["long"], steps: K(12, "easy", "Long run") } } },
  { focus: "Longer efforts", runs: {
    tue: { type: "speed", title: "Tempo", how: "10 min easy, 2 × 8 min comfortably hard with 3 min jog, 10 min easy", learn: ["tempo"], steps: cat(WU(10), R(2, 480, "tempo", 180, "Tempo block"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    thu: { type: "easy", title: "Easy run", how: "40 min easy", learn: ["easy"], steps: E(40) },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run", how: "13 km easy", learn: ["long"], steps: K(13, "easy", "Long run") } } },
  { focus: "Strength through hills", runs: {
    tue: { type: "speed", title: "Hill repeats", how: "10 min easy, 8 × 45 s up a short hill, jog down, 10 min easy", learn: ["hills"], steps: cat(WU(10), R(8, 45, "hill", 90, "Hill"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    thu: { type: "easy", title: "Easy run", how: "40 min easy", learn: ["easy"], steps: E(40) },
    sat: { type: "park", title: "parkrun, progression", how: "Each km a touch quicker", learn: ["progression"], steps: PROG() },
    sun: { type: "long", title: "Long run", how: "14 km easy", learn: ["long"], steps: K(14, "easy", "Long run") } } },
  { focus: "Lighter week, second checkpoint", runs: {
    tue: { type: "speed", title: "Easy run + strides", how: "20 min easy + 6 strides", learn: ["strides"], steps: cat(E(20), ST(6)) },
    thu: { type: "easy", title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    sat: { type: "park", title: "parkrun time trial", how: "Race it. Checkpoint: around 28:45", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "10 km easy", learn: ["long"], steps: K(10, "easy", "Long run") } } },
  { focus: "First taste of goal pace", runs: {
    tue: { type: "speed", title: "Kilometre repeats", how: "10 min easy, 4 × 1 km at 5K effort with 2 min jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), RK(4, 1, "k5", 120), CD(10)) },
    wed: { type: "easy", opt: true, title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    thu: { type: "easy", title: "Easy run", how: "40 min easy", learn: ["easy"], steps: E(40) },
    sat: { type: "park", title: "parkrun at goal pace", how: "Hold 5:41 /km, your sub-2 pace", learn: ["goal"], steps: K(5, "goal", "Goal pace parkrun", "Goal pace parkrun. Lock into 5 41 per kilometre. It should feel controlled, not a race.") },
    sun: { type: "long", title: "Long run", how: "14 km easy", learn: ["long"], steps: K(14, "easy", "Long run") } } },
  { focus: "Base done, Nike's plan starts next", runs: {
    tue: { type: "speed", title: "Tempo", how: "10 min easy, 20 min comfortably hard, 10 min easy", learn: ["tempo"], steps: cat(WU(10), T(20, "tempo"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Easy run", how: "30 min easy", learn: ["easy"], steps: E(30) },
    thu: { type: "easy", title: "Easy run", how: "40 min easy", learn: ["easy"], steps: E(40) },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run", how: "15 km easy", learn: ["long"], steps: K(15, "easy", "Long run") } } },

  /* ---- Nike 14-week phase: Nike's exact sessions (NRC Half-Marathon plan) ----
     Tue = Nike Speed Run 1. Wed (optional) = Nike Recovery Run 1. Thu = Nike Recovery Run 2.
     Sat parkrun = Nike Speed Run 2 where it fits a flat 5K; otherwise it moves to Thu and parkrun is the recovery run.
     Sun = long run: Nike's distance or the Hamilton plan's, whichever suits the build. */
  { focus: "14 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: First Speed Run", how: "5 min warm-up, 8 × 1 min at 5K pace with 1 min recovery, 5 min cool-down", learn: ["intervals"], steps: cat(WU(5), IV(rep(8, [60, "k5", 60])), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 14 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Easy Run", how: "25 min recovery run", learn: ["easy"], steps: E(25, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's One Hard Two Easy", how: PARK + "1 min hard, 2 min easy for 21 min, then easy to the finish.", learn: ["fartlek"], steps: cat(IV(rep(7, [60, "k5", 120])), FIN()) },
    sun: { type: "long", title: "Long run", how: "13 km as a progression run. Nike's is a 5K here; you're already past that.", learn: ["long"], steps: K(13, "easy", "Long run") } } },
  { focus: "13 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: No Time Go Time", how: "5 min warm-up; 1 min mile pace, 2 min 5K, 3 min 10K, 2 min 5K, 1 min mile; 1 min recovery between; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([[60, "mile", 60], [120, "k5", 60], [180, "k10", 60], [120, "k5", 60], [60, "mile", 0]]), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 13 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Recovery Run with Headspace", how: "35 min recovery run", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's Run Strong. Repeat.", how: PARK + "4 × 90 s at 5K pace (45 s easy), 1 × 90 s at mile pace (1 min easy), all twice. Then easy to the finish.", learn: ["intervals"],
      steps: cat(IV(rep(4, [90, "k5", 45]).concat([[90, "mile", 60]], rep(4, [90, "k5", 45]), [[90, "mile", 60]])), FIN()) },
    sun: { type: "long", title: "Long run", how: "14 km progression run", learn: ["long"], steps: K(14, "easy", "Long run") } } },
  { focus: "12 weeks to go, Christmas week", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Runner Up (hills)", how: "5 min warm-up, then 5 × (45 s uphill at 10K effort, 1:15 jog down, 15 s best effort, 45 s easy), 5 min cool-down", learn: ["hills"],
      steps: cat(WU(5), IV(rep(5, [45, "k10", 75, "uphill at 10K effort"]).reduce(function (a, x) { return a.concat([x, [15, "best", 45, "best effort"]]); }, [])), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 12 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Just A Run", how: "30 min recovery run", learn: ["easy"], steps: E(30, "Recovery run") },
    sat: { type: "park", title: "Boxing Day parkrun: Nike's Triple 7s", how: PARK + "3 × 7 min at 5K pace with 2:30 easy, then easy to the finish. If there's no parkrun, run it anywhere flat.", learn: ["intervals"], steps: cat(IV(rep(3, [420, "k5", 150])), FIN()) },
    sun: { type: "long", title: "Long run", how: "15 km progression run", learn: ["long"], steps: K(15, "easy", "Long run") } } },
  { focus: "11 weeks to go, time trial", nike: true, runs: {
    tue: { type: "speed", title: "Nike: The Rundown", how: "5 min warm-up; 3 × 1 min mile pace, 3 × 2 min 5K, 2 × 1 min mile, 2 × 2 min 5K, 1 × 1 min mile, 1 × 2 min 5K. 1 min easy after mile reps, 90 s after 5K reps. 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([].concat(rep(3, [60, "mile", 60]), rep(3, [120, "k5", 90]), rep(2, [60, "mile", 60]), rep(2, [120, "k5", 90]), [[60, "mile", 60], [120, "k5", 0]])), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 11 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Running Towards Your Goal", how: "40 min recovery run", learn: ["easy"], steps: E(40, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it, in place of Nike's Tempo Run with Emily Infeld. Checkpoint: around 28:00. Update your time in Setup after.", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "12 km easy. Nike: 10K", learn: ["long"], steps: K(12, "easy", "Long run") } } },
  { focus: "10 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Sneaky Speed", how: "5 min warm-up; 3 rounds of (90 s at 5K pace, 3 × 45 s at mile pace), 1 min easy between every rep; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([].concat([[90, "k5", 60]], rep(3, [45, "mile", 60]), [[90, "k5", 60]], rep(3, [45, "mile", 60]), [[90, "k5", 60]], rep(3, [45, "mile", 60]))), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 10 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: 30 Minute Head Starts", how: "30 min recovery run", learn: ["easy"], steps: E(30, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's Out Strong Back Fast", how: PARK + "23 min progression tempo: start steady, build to tempo, finish at 10K effort. Then easy to the finish.", learn: ["tempo", "progression"],
      steps: cat([{ kind: "work", sec: 480, pace: "steady", label: "Progression: steady" }, { kind: "work", sec: 480, pace: "tempo", label: "Progression: tempo" }, { kind: "work", sec: 420, pace: "k10", label: "Progression: 10K effort" }], FIN()) },
    sun: { type: "long", title: "Long run", how: "16 km progression run. Nike: 10K", learn: ["long"], steps: K(16, "easy", "Long run") } } },
  { focus: "9 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Run Fast. Repeat.", how: "5 min warm-up; 20 × 30 s at mile pace (reps 1 and 11 at 5K pace), 1 min easy between; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV(rep(20, [30, "mile", 60]).map(function (x, i) { return i === 0 || i === 10 ? [30, "k5", 60] : i === 19 ? [30, "mile", 0] : x; })), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 9 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "speed", title: "Nike: Hill Hillier Hilliest", how: "Moved from Saturday, as Hamilton Lake is flat. 5 min warm-up; 3 × (1 min uphill at 10K effort, 2 min easy; 45 s at 5K effort, 90 s easy; 30 s at mile effort, 1 min easy); 5 min cool-down", learn: ["hills"],
      steps: cat(WU(5), IV([].concat.apply([], rep(3, null).map(function () { return [[60, "k10", 120, "uphill at 10K effort"], [45, "k5", 90, "uphill at 5K effort"], [30, "mile", 60, "uphill at mile effort"]]; }))), CD(5)) },
    sat: { type: "park", title: "parkrun, easy", how: "Your recovery run this week, in place of Nike's 45 min run with Shalane Flanagan. Add 10 min easy after if you feel good.", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run, fast finish", how: "17 km: 14 easy, last 3 at 5:41 /km. Nike: 12.5K", learn: ["long", "goal"], steps: cat(K(14, "easy", "Long run"), K(3, "goal", "Goal pace finish")) } } },
  { focus: "8 weeks to go, time trial", nike: true, runs: {
    tue: { type: "speed", title: "Nike: The Shifter", how: "5 min warm-up; 4 min recovery pace into 1 min mile pace, 1 min easy; 3 min 10K into 1 min mile, 90 s easy; 2 min 5K into 1 min mile, 2 min easy; 1 min mile into 1 min best effort; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([[240, "easy", 0, "at recovery pace"], [60, "mile", 60], [180, "k10", 0], [60, "mile", 90], [120, "k5", 0], [60, "mile", 120], [60, "mile", 0], [60, "best", 0, "best effort"]]), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 8 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Breaking Through Barriers", how: "31 min recovery run", learn: ["easy"], steps: E(31, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it, in place of Nike's Power Pyramid. Checkpoint: around 27:15. Update your time in Setup after.", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "15 km easy progression (Nike's 15K)", learn: ["long"], steps: K(15, "easy", "Long run") } } },
  { focus: "7 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Deuces", how: "5 min warm-up; 10 × 2 min at 5K pace, 1 min easy between (2 min after reps 4 and 8); 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV(rep(10, [120, "k5", 60]).map(function (x, i) { return i === 3 || i === 7 ? [120, "k5", 120] : i === 9 ? [120, "k5", 0] : x; })), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 7 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Just Another Run", how: "35 min recovery run", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's One Hard. One Easy.", how: PARK + "1 min hard, 1 min easy for 15 min, then easy to the finish.", learn: ["fartlek"], steps: cat(IV(rep(8, [60, "k5", 60])), FIN()) },
    sun: { type: "long", title: "Long run", how: "18 km easy progression. Nike: 16K", learn: ["long"], steps: K(18, "easy", "Long run") } } },
  { focus: "6 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Rock n Roller", how: "6 min warm-up; 5 min 10K, 2:30 5K, 1 min mile, 30 s best, 30 s best, 1 min mile, 2:30 5K, 5 min 10K. 90 s easy after 10K and 5K reps, 1 min after mile and best; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(6), IV([[300, "k10", 90], [150, "k5", 90], [60, "mile", 60], [30, "best", 60, "best effort"], [30, "best", 60, "best effort"], [60, "mile", 60], [150, "k5", 90], [300, "k10", 0]]), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 6 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "speed", title: "Nike: 8K Tempo Run", how: "Moved from Saturday, as it's longer than parkrun. 2 km easy, 8 km tempo, 2 km easy. Legs heavy? Make the tempo 6 km.", learn: ["tempo"], steps: cat(K(2, "easy", "Warm-up 2 km"), K(8, "tempo", "Tempo 8 km"), K(2, "easy", "Cool-down 2 km")) },
    sat: { type: "park", title: "parkrun, easy (Waitangi Day)", how: "Your recovery run this week, in place of Nike's Suckcess Run", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run with goal pace", how: "16 km: 6 easy, 5 at 5:41 /km, 5 easy (Nike's 16K)", learn: ["long", "goal"], steps: cat(K(6, "easy", "Long run, first part"), K(5, "goal", "Goal pace block"), K(5, "easy", "Long run, last part")) } } },
  { focus: "5 weeks to go, time trial", nike: true, runs: {
    tue: { type: "speed", title: "Nike: 90s", how: "5 min warm-up; 3 rounds of 90 s at 5K pace, 90 s at 10K pace, 90 s at mile pace, with 90 s easy between every rep; 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([].concat.apply([], rep(3, null).map(function () { return [[90, "k5", 90], [90, "k10", 90], [90, "mile", 90]]; })).map(function (x, i, a) { return i === a.length - 1 ? [90, "mile", 0] : x; })), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 5 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Thank You Run", how: "45 min recovery run", learn: ["easy"], steps: E(45, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it, in place of Nike's Speedurance. Checkpoint: around 26:30. Update your time in Setup after.", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Nike: Dress Rehearsal", how: "14 km in full race kit and Evo SL. Practise your race-morning breakfast and a gel. Nike: 13.1K", learn: ["long"], steps: K(14, "easy", "Dress rehearsal") } } },
  { focus: "4 weeks to go, peak long run", nike: true, runs: {
    tue: { type: "speed", title: "Nike: 5 × 5 at 10K Pace", how: "5 min warm-up; 5 × 5 min at 10K pace with 2 min easy; 5 min cool-down", learn: ["intervals"], steps: cat(WU(5), IV(rep(5, [300, "k10", 120])), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 4 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Whole Run", how: "45 min recovery run", learn: ["easy"], steps: E(45, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's Two Hard. One Easy.", how: PARK + "2 min hard, 1 min easy for 21 min, then easy to the finish.", learn: ["fartlek"], steps: cat(IV(rep(7, [120, "k5", 60])), FIN()) },
    sun: { type: "long", title: "Nike: 20K Run", how: "20 km easy progression, your longest run. Race kit, practise gels at 45 and 90 min", learn: ["long"], steps: K(20, "easy", "Peak long run", "Peak long run. Twenty kilometres, easy. Take a gel around 45 minutes and again around 1 hour 30.") } } },
  { focus: "3 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Long and Strong and Fast", how: "5 min warm-up; 3 rounds of 8 min at 10K pace (3 min easy), 4 min at 5K (2 min easy), 2 min at mile (2 min easy); 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([].concat.apply([], rep(3, null).map(function () { return [[480, "k10", 180], [240, "k5", 120], [120, "mile", 120]]; })).map(function (x, i, a) { return i === a.length - 1 ? [120, "mile", 0] : x; })), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 3 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Run with Eliud Kipchoge", how: "60 min recovery run (45 min if Tuesday left you tired)", learn: ["easy"], steps: E(60, "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's Bring It Down", how: PARK + "15 min progression tempo: 5 min recovery pace, 4 min 10K, 3 min 5K, 2 min mile, 1 min best. Then easy to the finish.", learn: ["tempo", "progression"],
      steps: cat([{ kind: "easy", sec: 300, pace: "easy", label: "Recovery pace" }, { kind: "work", sec: 240, pace: "k10", label: "10K pace" }, { kind: "work", sec: 180, pace: "k5", label: "5K pace" }, { kind: "work", sec: 120, pace: "mile", label: "Mile pace" }, { kind: "work", sec: 60, pace: "best", label: "Best effort" }], FIN()) },
    sun: { type: "long", title: "Long run with goal pace", how: "16 km: 4 easy, 8 at 5:41 /km, 4 easy, in the Evo SL. Nike: 60 min", learn: ["long", "goal"], steps: cat(K(4, "easy", "Long run, first part"), K(8, "goal", "Goal pace block"), K(4, "easy", "Long run, last part")) } } },
  { focus: "2 weeks to go, taper", nike: true, runs: {
    tue: { type: "speed", title: "Nike: Stronger Faster", how: "5 min warm-up; 3 rounds of 3 min at 5K pace (2 min easy), then 4 × 30 s at mile pace (1 min easy); 5 min cool-down", learn: ["intervals"],
      steps: cat(WU(5), IV([].concat.apply([], rep(3, null).map(function () { return [[180, "k5", 120]].concat(rep(4, [30, "mile", 60])); })).map(function (x, i, a) { return i === a.length - 1 ? [30, "mile", 0] : x; })), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 2 Weeks to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: 5K Head Starts", how: "5 km recovery run", learn: ["easy"], steps: K(5, "easy", "Recovery run") },
    sat: { type: "park", title: "parkrun: Nike's In Control", how: PARK + "1 min mile pace (30 s easy), 3 min 5K (90 s easy), 5 min 10K (2:30 easy), 7 min recovery pace, then easy to the finish.", learn: ["intervals"],
      steps: cat(IV([[60, "mile", 30], [180, "k5", 90], [300, "k10", 150], [420, "easy", 0, "at recovery pace"]]), FIN()) },
    sun: { type: "long", title: "Long run with goal pace", how: "12 km: 4 easy, 5 at 5:41 /km, 3 easy. Nike: 11K", learn: ["long", "goal"], steps: cat(K(4, "easy", "Long run, first part"), K(5, "goal", "Goal pace block"), K(3, "easy", "Long run, last part")) } } },
  { focus: "Race week", nike: true, runs: {
    tue: { type: "speed", title: "Nike: The Speed Run Before\u2026", how: "5 min warm-up; 1 min 5K pace, 2 min 10K, 5 min at half marathon goal pace (5:41), 2 min 10K, 1 min 5K; 1 min easy between; 5 min cool-down", learn: ["goal"],
      steps: cat(WU(5), IV([[60, "k5", 60], [120, "k10", 60], [300, "goal", 60, "at goal race pace"], [120, "k10", 60], [60, "k5", 0]]), CD(5)) },
    wed: { type: "easy", opt: true, title: "Nike: 1 Week to Go", how: "15 min recovery run", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Big Day Run", how: "25 min recovery run", learn: ["easy"], steps: E(25, "Recovery run") },
    sat: { type: "park", title: "Nike: Two Mile Run (no racing)", how: "3.2 km very easy. If you go to parkrun, jog or walk it, or volunteer. Collect your race pack.", learn: ["easy"], steps: K(3.2, "easy", "Shakeout") },
    sun: { type: "race", title: "RACE: Hamilton Half Marathon", how: "8:00am start, Hamilton Gardens. Go out at 5:45, settle into 5:41, then race the last 5 km.", learn: ["goal"], steps: null } } }
];

var LEARN = {
  easy: ["Easy and recovery runs", "Slow enough that you could chat in full sentences. If you can't, slow down, and walk breaks are fine. Most of your running should feel like this. It builds your engine without wearing you out."],
  long: ["Long runs", "Your weekly endurance run, at easy pace. Time on your feet matters more than speed. Carry water on runs over about 75 minutes and practise eating a gel on the longest ones."],
  strides: ["Strides", "About 20 seconds where you smoothly build from jogging to fast, hold it briefly, then ease off. Not a sprint: think tall, relaxed shoulders, quick light feet. Walk or jog back for a minute between each. They teach your legs to move quickly without tiring you."],
  fartlek: ["Fartlek", "Swedish for 'speed play'. You alternate hard and easy running on a timer: for example 1 minute hard, then 2 minutes easy. Hard means breathing heavily but still in control, not flat out. The easy parts are real jogging, not stopping."],
  intervals: ["Intervals", "Set chunks of fast running (a rep) with recovery jogging in between. '6 × 2 min at 5K effort' means 2 minutes hard, recover, repeat 6 times. Run the first rep no faster than the last one."],
  tempo: ["Tempo", "Comfortably hard: you could say a few words but not hold a conversation. It's the effort you could keep up for about an hour. This teaches your body to hold a strong pace for longer."],
  hills: ["Hill repeats", "Run up a short, steady hill for the set time with short quick steps, driving your arms, then jog or walk back down to recover. Builds leg strength and power with less pounding than speed on the flat."],
  progression: ["Progression run", "Start relaxed and get a little quicker each kilometre, finishing at a strong but controlled effort. Great practice for finishing a race well."],
  timetrial: ["Time trial", "A full effort to see where your fitness is. Start slightly slower than you want to, settle, then push the last kilometre. Enter your time on the Paces screen afterwards and your training paces update."],
  goal: ["Goal pace", "5:41 per kilometre is the pace that gets you under 2 hours. Practising it teaches your body exactly what race day should feel like. It should feel controlled, not like a race."],
  warmup: ["Warm-up and cool-down", "Easy jogging before and after hard sessions. The warm-up gets your muscles ready for speed; the cool-down helps you recover. Don't skip them on speed days."]
};

/* paces in seconds per km, from a 5K time in seconds */
function pacesFrom5k(t5k) {
  var k = t5k / 5;
  return { easy: k + 90, jog: k + 110, steady: k + 60, tempo: k + 20, k10: k + 12, k5: k, mile: k - 18, best: k - 30, hill: k, goal: 341 };
}
function stepSeconds(step, paces) {
  if (step.sec) return step.sec;
  return Math.round(step.km * paces[step.pace]);
}

if (typeof module !== "undefined") module.exports = { WEEKS: WEEKS, LEARN: LEARN, PLAN_START: PLAN_START, pacesFrom5k: pacesFrom5k, stepSeconds: stepSeconds, PACE_WORDS: PACE_WORDS };
