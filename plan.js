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
  jog: "easy jog"
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

  /* ---- Nike 14-week phase ---- */
  { focus: "14 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: First Speed Run", how: "5 min easy, 8 × 1 min at 5K pace with 1 min easy", learn: ["intervals"], steps: cat(WU(5), R(8, 60, "k5", 60), CD(5)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "15 min very easy", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Nike: Easy Run", how: "25 min easy", learn: ["easy"], steps: E(25) },
    sat: { type: "park", title: "parkrun, One Hard Two Easy", how: "Nike's fartlek at parkrun: 1 min hard, 2 min easy, all the way round", learn: ["fartlek"], steps: R(12, 60, "k5", 120, "Hard minute") },
    sun: { type: "long", title: "Long run", how: "13 km easy", learn: ["long"], steps: K(13, "easy", "Long run") } } },
  { focus: "13 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Nike: No Time To Go", how: "5 min easy, ladder of 1–2–3–2–1 min (mile, 5K, 10K, 5K, mile pace) with 1 min easy", learn: ["intervals"],
      steps: cat(WU(5), [{ kind: "work", sec: 60, pace: "mile", label: "1 min, mile pace" }, { kind: "rec", sec: 60, pace: "jog", label: "Recovery" },
        { kind: "work", sec: 120, pace: "k5", label: "2 min, 5K pace" }, { kind: "rec", sec: 60, pace: "jog", label: "Recovery" },
        { kind: "work", sec: 180, pace: "k10", label: "3 min, 10K pace" }, { kind: "rec", sec: 60, pace: "jog", label: "Recovery" },
        { kind: "work", sec: 120, pace: "k5", label: "2 min, 5K pace" }, { kind: "rec", sec: 60, pace: "jog", label: "Recovery" },
        { kind: "work", sec: 60, pace: "mile", label: "1 min, mile pace" }], CD(5)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "15 min very easy", learn: ["easy"], steps: E(15, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "35 min easy", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun, Run Strong. Repeat.", how: "90 s hard, 45 s easy, repeated to the finish", learn: ["fartlek"], steps: R(14, 90, "k5", 45, "Hard block") },
    sun: { type: "long", title: "Long run", how: "14 km easy", learn: ["long"], steps: K(14, "easy", "Long run") } } },
  { focus: "12 weeks to go, Christmas week", nike: true, runs: {
    tue: { type: "speed", title: "Intervals", how: "10 min easy, 5 × 3 min at 10K pace with 90 s jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), R(5, 180, "k10", 90), CD(10)) },
    thu: { type: "easy", title: "Recovery run", how: "30 min easy", learn: ["easy"], steps: E(30, "Recovery run") },
    sat: { type: "park", title: "Boxing Day parkrun, easy", how: "If your event is on", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run", how: "15 km easy", learn: ["long"], steps: K(15, "easy", "Long run") } } },
  { focus: "11 weeks to go, lighter week", nike: true, runs: {
    tue: { type: "speed", title: "Easy run + strides", how: "20 min easy + 6 strides", learn: ["strides"], steps: cat(E(20), ST(6)) },
    thu: { type: "easy", title: "Recovery run", how: "30 min easy", learn: ["easy"], steps: E(30, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it. Checkpoint: around 28:00", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "12 km easy", learn: ["long"], steps: K(12, "easy", "Long run") } } },
  { focus: "10 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Tempo", how: "10 min easy, 25 min comfortably hard, 10 min easy", learn: ["tempo"], steps: cat(WU(10), T(25, "tempo"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "40 min easy", learn: ["easy"], steps: E(40, "Recovery run") },
    sat: { type: "park", title: "parkrun, tempo", how: "Comfortably hard the whole way", learn: ["tempo"], steps: K(5, "tempo", "Tempo parkrun") },
    sun: { type: "long", title: "Long run", how: "16 km easy", learn: ["long"], steps: K(16, "easy", "Long run") } } },
  { focus: "9 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "800 m repeats", how: "10 min easy, 6 × 800 m at 5K pace with 2 min jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), RK(6, 0.8, "k5", 120, "800 m"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "40 min easy", learn: ["easy"], steps: E(40, "Recovery run") },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run, fast finish", how: "17 km: 14 easy, last 3 at 5:41 /km", learn: ["long", "goal"], steps: cat(K(14, "easy", "Long run"), K(3, "goal", "Goal pace finish")) } } },
  { focus: "8 weeks to go, lighter week", nike: true, runs: {
    tue: { type: "speed", title: "Hill repeats", how: "10 min easy, 10 × 45 s uphill, jog down, 10 min easy", learn: ["hills"], steps: cat(WU(10), R(10, 45, "hill", 90, "Hill"), CD(10)) },
    thu: { type: "easy", title: "Recovery run", how: "35 min easy", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it. Checkpoint: around 27:15", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "13 km easy", learn: ["long"], steps: K(13, "easy", "Long run") } } },
  { focus: "7 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Goal pace repeats", how: "10 min easy, 3 × 2 km at 5:41 /km with 2 min jog, 10 min easy", learn: ["goal"], steps: cat(WU(10), RK(3, 2, "goal", 120), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "45 min easy", learn: ["easy"], steps: E(45, "Recovery run") },
    sat: { type: "park", title: "parkrun at goal pace", how: "Hold 5:41 /km", learn: ["goal"], steps: K(5, "goal", "Goal pace parkrun") },
    sun: { type: "long", title: "Long run", how: "18 km easy", learn: ["long"], steps: K(18, "easy", "Long run") } } },
  { focus: "6 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Tempo run", how: "10 min easy, 6 km comfortably hard, 10 min easy", learn: ["tempo"], steps: cat(WU(10), K(6, "tempo", "Tempo 6 km"), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "45 min easy", learn: ["easy"], steps: E(45, "Recovery run") },
    sat: { type: "park", title: "parkrun, easy", how: "Waitangi Day", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run with goal pace", how: "19 km: 7 easy, 5 at 5:41 /km, 7 easy", learn: ["long", "goal"], steps: cat(K(7, "easy", "Long run, first part"), K(5, "goal", "Goal pace block"), K(7, "easy", "Long run, last part")) } } },
  { focus: "5 weeks to go, lighter week", nike: true, runs: {
    tue: { type: "speed", title: "Pyramid", how: "10 min easy, 1–2–3–4–3–2–1 min at 5K to 10K effort with 1 min jog, 10 min easy", learn: ["intervals"],
      steps: cat(WU(10), [1, 2, 3, 4, 3, 2, 1].reduce(function (a, m, i, arr) { a.push({ kind: "work", sec: m * 60, pace: m <= 2 ? "k5" : "k10", label: m + " min, step " + (i + 1) + " of 7" }); if (i < arr.length - 1) a.push({ kind: "rec", sec: 60, pace: "jog", label: "Recovery" }); return a; }, []), CD(10)) },
    thu: { type: "easy", title: "Recovery run", how: "35 min easy", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun time trial", how: "Race it. Checkpoint: around 26:30", learn: ["timetrial"], steps: TT() },
    sun: { type: "long", title: "Long run", how: "14 km easy", learn: ["long"], steps: K(14, "easy", "Long run") } } },
  { focus: "4 weeks to go", nike: true, runs: {
    tue: { type: "speed", title: "Goal pace blocks", how: "10 min easy, 2 × 4 km at 5:41 /km with 3 min jog, 10 min easy. Wear the Evo SL", learn: ["goal"], steps: cat(WU(10), RK(2, 4, "goal", 180), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "45 min easy", learn: ["easy"], steps: E(45, "Recovery run") },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run with goal pace", how: "19 km: 6 easy, 8 at 5:41 /km, 5 easy. Evo SL", learn: ["long", "goal"], steps: cat(K(6, "easy", "Long run, first part"), K(8, "goal", "Goal pace block"), K(5, "easy", "Long run, last part")) } } },
  { focus: "3 weeks to go, peak long run", nike: true, runs: {
    tue: { type: "speed", title: "Kilometre repeats", how: "10 min easy, 5 × 1 km at 5K pace with 2 min jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), RK(5, 1, "k5", 120), CD(10)) },
    wed: { type: "easy", opt: true, title: "Recovery run", how: "25 min easy", learn: ["easy"], steps: E(25, "Recovery run") },
    thu: { type: "easy", title: "Recovery run", how: "40 min easy", learn: ["easy"], steps: E(40, "Recovery run") },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Peak long run", how: "20 km easy in full race kit and Evo SL. Practise your gels", learn: ["long"], steps: K(20, "easy", "Peak long run", "Peak long run. Twenty kilometres, easy. Race kit on. Take a gel around 45 minutes and again around 1 hour 30.") } } },
  { focus: "2 weeks to go, taper starts", nike: true, runs: {
    tue: { type: "speed", title: "Short intervals", how: "10 min easy, 6 × 2 min at 10K pace with 90 s jog, 10 min easy", learn: ["intervals"], steps: cat(WU(10), R(6, 120, "k10", 90), CD(10)) },
    thu: { type: "easy", title: "Recovery run", how: "35 min easy", learn: ["easy"], steps: E(35, "Recovery run") },
    sat: { type: "park", title: "parkrun, easy", how: "Conversational", learn: ["easy"], steps: K(5, "easy", "parkrun, easy") },
    sun: { type: "long", title: "Long run with goal pace", how: "14 km: 4 easy, 6 at 5:41 /km, 4 easy", learn: ["long", "goal"], steps: cat(K(4, "easy", "Long run, first part"), K(6, "goal", "Goal pace block"), K(4, "easy", "Long run, last part")) } } },
  { focus: "Race week", nike: true, runs: {
    tue: { type: "speed", title: "Race sharpener", how: "10 min easy, 3 × 1 km at 5:41 /km with 2 min jog, 10 min easy", learn: ["goal"], steps: cat(WU(10), RK(3, 1, "goal", 120), CD(10)) },
    thu: { type: "easy", title: "Easy run + strides", how: "20 min easy + 4 strides", learn: ["strides"], steps: cat(E(20), ST(4)) },
    sat: { type: "park", title: "Shakeout, no racing", how: "15 min very easy jog, or volunteer at parkrun", learn: ["easy"], steps: E(15, "Shakeout") },
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
  return { easy: k + 90, jog: k + 110, steady: k + 60, tempo: k + 20, k10: k + 12, k5: k, mile: k - 18, hill: k, goal: 341 };
}
function stepSeconds(step, paces) {
  if (step.sec) return step.sec;
  return Math.round(step.km * paces[step.pace]);
}

if (typeof module !== "undefined") module.exports = { WEEKS: WEEKS, LEARN: LEARN, PLAN_START: PLAN_START, pacesFrom5k: pacesFrom5k, stepSeconds: stepSeconds, PACE_WORDS: PACE_WORDS };
