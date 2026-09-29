/* Agreed 24-week plan, revised 28 September 2026 (long run moved to Sunday, 20 km peak). Original adaptation informed by
Nike, Hamilton and ASICS; not a reproduction of Nike's official schedule.
Distances are real GPS goals or manually confirmed goals, never timed substitutes. */
var PLAN_START = [2026, 8, 28];
var RACE_DATE = [2027, 2, 14];
var PACE_WORDS = {easy: 'easy conversational effort', controlled: 'controlled effort, six out of ten', relaxed: 'fast but relaxed, not a sprint', jog: 'easy jogging or walking', tempo: 'tempo, comfortably hard', k10: '10K pace, strong but controlled', k5: '5K pace, hard', goal: 'race pace', hill: 'strong effort uphill'};
var WEEKS = [
  {
    "focus": "Easy return",
    "runs": {
      "mon": {
        "title": "Half-marathon plan starts — rest / gentle mobility",
        "how": "Week 1 of 24. First run Tuesday. Race Sunday 14 March 2027. Runs: Tuesday, an optional short easy run on Thursday, Saturday parkrun (easy), and the long run on Sunday. Wednesday is strength. Monday is a recovery day. All entries are all-day placeholders; choose your own start times. Saturday parkrun remains a morning session.",
        "type": "note",
        "steps": null,
        "learn": [],
        "date": "2026-09-28"
      },
      "tue": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. Start gently; no pace target.\nIf not recovered, replace this with an easy run or rest. Do not stack a separate Nike workout on top.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-09-29"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-09-30"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-01"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-03"
      },
      "sun": {
        "title": "Long run — 6 km easy",
        "how": "Run 6 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 6,
            "pace": "easy",
            "label": "6 km easy",
            "say": "6 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-10-04"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "30 min easy + 4 × 20 sec strides",
        "how": "30 minutes easy, then 4 strides: 20 seconds smoothly building to fast, 80 seconds walk or jog between. Strides wake your legs up for the speed sessions ahead.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 4",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 4. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 4",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 4",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 4. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 4",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 4",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 4. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 4",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 4",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 4. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 4",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2026-10-06"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-10-07"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-08"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-10"
      },
      "sun": {
        "title": "Long run — 7 km easy",
        "how": "Run 7 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 7,
            "pace": "easy",
            "label": "7 km easy",
            "say": "7 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-10-11"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "Fartlek: 6 × (1 min hard, 2 min easy)",
        "how": "10 min easy, then 6 × 1 minute hard (about 5K effort, 7–8/10) with 2 minutes easy jogging between, then 10 min easy. Your first proper speed session.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Hard minute 1 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 1 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard minute 2 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 2 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard minute 3 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 3 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard minute 4 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 4 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard minute 5 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 5 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard minute 6 of 6 · 5K pace",
            "sec": 60,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "fartlek"
        ],
        "date": "2026-10-13"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-10-14"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-15"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-17"
      },
      "sun": {
        "title": "Long run — 8 km easy",
        "how": "Run 8 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 8,
            "pace": "easy",
            "label": "8 km easy",
            "say": "8 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-10-18"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. Start gently; no pace target.\nIf not recovered, replace this with an easy run or rest. Do not stack a separate Nike workout on top.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-20"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-10-21"
      },
      "thu": {
        "title": "20 min easy",
        "how": "Run 20 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1200,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 20 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-22"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-24"
      },
      "sun": {
        "title": "Long run — 6 km easy",
        "how": "Run 6 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 6,
            "pace": "easy",
            "label": "6 km easy",
            "say": "6 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-10-25"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "Intervals: 6 × 2 min at 5K pace",
        "how": "10 min easy, 6 × 2 minutes at 5K pace with 90 seconds easy jog between, 10 min easy. Run the first rep no faster than the last.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 1 of 5",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 2 of 5",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 3 of 5",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 4 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 4 of 5",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 5 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 5 of 5",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 6 of 6 · 5K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "intervals"
        ],
        "date": "2026-10-27"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-10-28"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-29"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-10-31"
      },
      "sun": {
        "title": "Long run — 9 km easy",
        "how": "Run 9 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 9,
            "pace": "easy",
            "label": "9 km easy",
            "say": "9 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-11-01"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "Tempo: 2 × 8 min",
        "how": "10 min easy, 2 × 8 minutes at tempo (comfortably hard, 6–7/10) with 3 minutes easy between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Tempo block 1 of 2 · tempo",
            "sec": 480,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Recover 1 of 1",
            "sec": 180,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Tempo block 2 of 2 · tempo",
            "sec": 480,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "tempo"
        ],
        "date": "2026-11-03"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-11-04"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-05"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-07"
      },
      "sun": {
        "title": "Long run — 10 km easy",
        "how": "Run 10 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 10,
            "pace": "easy",
            "label": "10 km easy",
            "say": "10 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-11-08",
        "fuel": true
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "30 min easy + 6 × 20 sec strides",
        "how": "Lighter week with a parkrun time trial on Saturday. 30 minutes easy, then 6 strides with 80 seconds walk or jog between.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 5 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 5 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 5 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 6 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 6 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 6 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2026-11-10"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-11-11"
      },
      "thu": {
        "title": "20 min easy",
        "how": "Run 20 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1200,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 20 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-12"
      },
      "sat": {
        "title": "parkrun time trial — race it",
        "how": "Warm up with 10 minutes easy jogging before the start. Then race the 5K: start a little slower than you want for the first kilometre, settle, and push the last kilometre. Rough checkpoint: around 29:00. Afterwards, enter your time in Setup so your training paces update. Tomorrow’s long run is shorter this week; keep it easy.",
        "type": "park",
        "steps": [
          {
            "kind": "work",
            "km": 5,
            "pace": "k5",
            "label": "5K time trial",
            "say": "Time trial. Start a little slower than you want for the first kilometre, settle in, then push hard over the last kilometre."
          }
        ],
        "learn": [
          "timetrial"
        ],
        "date": "2026-11-14"
      },
      "sun": {
        "title": "Long run — 8 km easy",
        "how": "Run 8 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 8,
            "pace": "easy",
            "label": "8 km easy",
            "say": "8 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-11-15"
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "Hills: 8 × 45 sec",
        "how": "10 min easy to a short, steady hill. 8 × 45 seconds strong up the hill (short quick steps, drive your arms), then jog or walk back down for 90 seconds. 10 min easy. Pace alerts are off for hills; go by effort.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Hill 1 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 1 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 2 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 2 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 3 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 3 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 4 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 4 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 5 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 5 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 6 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 6 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 7 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Recover 7 of 7",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hill 8 of 8 · strong uphill effort",
            "sec": 45,
            "kind": "work",
            "pace": "hill"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "hills"
        ],
        "date": "2026-11-17"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-11-18"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-19"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-21"
      },
      "sun": {
        "title": "Long run — 10 km easy",
        "how": "Run 10 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 10,
            "pace": "easy",
            "label": "10 km easy",
            "say": "10 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-11-22",
        "fuel": true
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "Intervals: 5 × 3 min at 10K pace",
        "how": "10 min easy, 5 × 3 minutes at 10K pace with 90 seconds easy jog between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 5 · 10K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 1 of 4",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 5 · 10K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 2 of 4",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 5 · 10K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 3 of 4",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 4 of 5 · 10K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 4 of 4",
            "sec": 90,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 5 of 5 · 10K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "intervals"
        ],
        "date": "2026-11-24"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-11-25"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-26"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-11-28"
      },
      "sun": {
        "title": "Long run — 11 km easy",
        "how": "Run 11 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 11,
            "pace": "easy",
            "label": "11 km easy",
            "say": "11 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-11-29",
        "fuel": true
      }
    }
  },
  {
    "focus": "Foundation",
    "runs": {
      "tue": {
        "title": "30 min easy + 6 × 20 sec strides",
        "how": "Lighter week. 30 minutes easy, then 6 strides with 80 seconds walk or jog between.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 5 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 5 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 5 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 6 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 6 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 6 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2026-12-01"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-12-02"
      },
      "thu": {
        "title": "20 min easy",
        "how": "Run 20 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nOptional in weeks 1–10: do it if Tuesday felt fine and your legs are fresh, otherwise rest. From week 11 it becomes a regular part of the week.",
        "type": "easy",
        "opt": true,
        "steps": [
          {
            "label": "Easy run",
            "sec": 1200,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 20 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-03"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-05"
      },
      "sun": {
        "title": "Long run — 8 km easy",
        "how": "Run 8 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 8,
            "pace": "easy",
            "label": "8 km easy",
            "say": "8 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-12-06"
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "mon": {
        "title": "Training review — before the 14-week build",
        "how": "Review completed runs, calf comfort, fatigue and recovery. If weeks 1–10 felt comfortable, Thursday’s short easy run now becomes a regular part of the week (four runs: Tuesday, Thursday, Saturday parkrun, Sunday long run). If you’re not recovering well, keep Thursday optional and repeat foundation weeks before building towards the 20 km peak.",
        "type": "note",
        "steps": null,
        "learn": [],
        "date": "2026-12-07"
      },
      "tue": {
        "title": "Tempo: 20 min continuous",
        "how": "10 min easy, 20 minutes at tempo (comfortably hard, 6–7/10), 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Tempo 1 of 1 · tempo",
            "sec": 1200,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "tempo"
        ],
        "date": "2026-12-08"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-12-09"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-10"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-12"
      },
      "sun": {
        "title": "Long run — 10 km easy",
        "how": "Run 10 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 10,
            "pace": "easy",
            "label": "10 km easy",
            "say": "10 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-12-13",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Goal pace: 8 × 2 min at 5:41",
        "how": "10 min easy, 8 × 2 minutes at your sub-2 race pace (5:41 /km) with 1 minute easy between, 10 min easy. Your first taste of race pace. It will feel quick right now; that’s the gap training closes.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 2 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 3 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 4 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 4 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 5 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 5 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 6 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 6 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 7 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 7 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 8 of 8 · goal race pace",
            "sec": 120,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2026-12-15"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-12-16"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-17"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-19"
      },
      "sun": {
        "title": "Long run — 11 km easy",
        "how": "Run 11 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 11,
            "pace": "easy",
            "label": "11 km easy",
            "say": "11 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-12-20",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Fartlek: 8 × (2 min at 10K pace, 1 min easy)",
        "how": "Christmas week. 10 min easy, 8 × 2 minutes at 10K effort with 1 minute easy between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Hard block 1 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 1 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 2 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 2 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 3 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 3 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 4 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 4 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 5 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 5 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 6 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 6 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 7 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Recover 7 of 7",
            "sec": 60,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Hard block 8 of 8 · 10K pace",
            "sec": 120,
            "kind": "work",
            "pace": "k10"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "fartlek"
        ],
        "date": "2026-12-22"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-12-23"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-24"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-26"
      },
      "sun": {
        "title": "Long run — 12 km easy",
        "how": "Run 12 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 12,
            "pace": "easy",
            "label": "12 km easy",
            "say": "12 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2026-12-27",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "30 min easy + 6 × 20 sec strides",
        "how": "Lighter week with a parkrun time trial on Saturday. 30 minutes easy, then 6 strides.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 5 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 5 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 5 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 6 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 6 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 6 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2026-12-29"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2026-12-30"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2026-12-31"
      },
      "sat": {
        "title": "parkrun time trial — race it",
        "how": "Warm up with 10 minutes easy jogging before the start. Then race the 5K: start a little slower than you want for the first kilometre, settle, and push the last kilometre. Rough checkpoint: around 28:00. Afterwards, enter your time in Setup so your training paces update. Tomorrow’s long run is shorter this week; keep it easy.",
        "type": "park",
        "steps": [
          {
            "kind": "work",
            "km": 5,
            "pace": "k5",
            "label": "5K time trial",
            "say": "Time trial. Start a little slower than you want for the first kilometre, settle in, then push hard over the last kilometre."
          }
        ],
        "learn": [
          "timetrial"
        ],
        "date": "2027-01-02"
      },
      "sun": {
        "title": "Long run — 9 km easy",
        "how": "Run 9 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 9,
            "pace": "easy",
            "label": "9 km easy",
            "say": "9 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-01-03"
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Goal pace: 3 × 8 min at 5:41",
        "how": "10 min easy, 3 × 8 minutes at race pace (5:41 /km) with 2 minutes easy between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 3 · goal race pace",
            "sec": 480,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 3 · goal race pace",
            "sec": 480,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 2 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 3 · goal race pace",
            "sec": 480,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2027-01-05"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-01-06"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-07"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-09"
      },
      "sun": {
        "title": "Long run — 13 km easy",
        "how": "Run 13 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 13,
            "pace": "easy",
            "label": "13 km easy",
            "say": "13 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-01-10",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Tempo: 25 min continuous",
        "how": "10 min easy, 25 minutes at tempo (comfortably hard), 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Tempo 1 of 1 · tempo",
            "sec": 1500,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "tempo"
        ],
        "date": "2027-01-12"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-01-13"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-14"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-16"
      },
      "sun": {
        "title": "Long run — 14 km, last 2 at race pace",
        "how": "Run 14 km: the first 12 at conversational effort, then the last 2 km at race pace (5:41 /km). The easy part stays, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 12,
            "pace": "easy",
            "label": "12 km easy",
            "say": "12 kilometres at comfortable effort."
          },
          {
            "kind": "work",
            "km": 2,
            "pace": "goal",
            "label": "Last 2 km at race pace",
            "say": "Last 2 kilometres at race pace, 5 41 per kilometre. Stay tall and smooth."
          }
        ],
        "learn": [
          "long",
          "goal"
        ],
        "date": "2027-01-17",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "30 min easy + 6 × 20 sec strides",
        "how": "Lighter week. 30 minutes easy, then 6 strides.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 5 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 5 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 5 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 6 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 6 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 6 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2027-01-19"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-01-20"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-21"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-23"
      },
      "sun": {
        "title": "Long run — 10 km easy",
        "how": "Run 10 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 10,
            "pace": "easy",
            "label": "10 km easy",
            "say": "10 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-01-24",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Intervals: 6 × 3 min at 5K pace",
        "how": "10 min easy, 6 × 3 minutes at 5K pace with 2 minutes easy jog between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 1 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 2 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 3 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 4 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 4 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 5 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Recover 5 of 5",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 6 of 6 · 5K pace",
            "sec": 180,
            "kind": "work",
            "pace": "k5"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "intervals"
        ],
        "date": "2027-01-26"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-01-27"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-28"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-01-30"
      },
      "sun": {
        "title": "Long run — 15 km easy",
        "how": "Run 15 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish. Stop at 2 hours 15 minutes if you reach that before the distance; do not speed up to reach the distance.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 15,
            "pace": "easy",
            "label": "15 km easy",
            "say": "15 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-01-31",
        "timeCap": 8100,
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Goal pace: 2 × 15 min at 5:41",
        "how": "10 min easy, 2 × 15 minutes at race pace (5:41 /km) with 3 minutes easy between, 10 min easy. A big confidence session.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Race-pace block 1 of 2 · goal race pace",
            "sec": 900,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 1",
            "sec": 180,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Race-pace block 2 of 2 · goal race pace",
            "sec": 900,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2027-02-02"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-02-03"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-04"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-06"
      },
      "sun": {
        "title": "Long run — 16 km, last 3 at race pace",
        "how": "Run 16 km: the first 13 at conversational effort, then the last 3 km at race pace (5:41 /km). The easy part stays, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish. Stop at 2 hours 15 minutes if you reach that before the distance; do not speed up to reach the distance.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 13,
            "pace": "easy",
            "label": "13 km easy",
            "say": "13 kilometres at comfortable effort."
          },
          {
            "kind": "work",
            "km": 3,
            "pace": "goal",
            "label": "Last 3 km at race pace",
            "say": "Last 3 kilometres at race pace, 5 41 per kilometre. Stay tall and smooth."
          }
        ],
        "learn": [
          "long",
          "goal"
        ],
        "date": "2027-02-07",
        "timeCap": 8100,
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "30 min easy + 6 × 20 sec strides",
        "how": "Lighter week with your final parkrun time trial on Saturday. 30 minutes easy, then 6 strides.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. You should be able to speak in full sentences."
          },
          {
            "label": "Stride 1 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 1 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 1 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 2 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 2 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 2 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 3 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 3 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 3 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 4 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 4 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 4 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 5 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 5 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 5 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          },
          {
            "label": "Stride 6 of 6",
            "sec": 20,
            "kind": "stride",
            "pace": "relaxed",
            "say": "Stride 6 of 6. Build speed smoothly. Tall and relaxed. No sprinting."
          },
          {
            "label": "Recover 6 of 6",
            "sec": 80,
            "kind": "rec",
            "pace": "jog",
            "say": "Ease down. Walk or jog for eighty seconds."
          }
        ],
        "learn": [
          "strides"
        ],
        "date": "2027-02-09"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-02-10"
      },
      "thu": {
        "title": "25 min easy",
        "how": "Run 25 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1500,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 25 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-11"
      },
      "sat": {
        "title": "parkrun time trial — race it",
        "how": "Warm up with 10 minutes easy jogging before the start. Then race the 5K: start a little slower than you want for the first kilometre, settle, and push the last kilometre. Rough checkpoint: around 27:00. Afterwards, enter your time in Setup so your training paces update. Tomorrow’s long run is shorter this week; keep it easy.",
        "type": "park",
        "steps": [
          {
            "kind": "work",
            "km": 5,
            "pace": "k5",
            "label": "5K time trial",
            "say": "Time trial. Start a little slower than you want for the first kilometre, settle in, then push hard over the last kilometre."
          }
        ],
        "learn": [
          "timetrial"
        ],
        "date": "2027-02-13"
      },
      "sun": {
        "title": "Long run — 12 km easy",
        "how": "Run 12 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 12,
            "pace": "easy",
            "label": "12 km easy",
            "say": "12 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-02-14",
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Tempo: 3 × 10 min",
        "how": "10 min easy, 3 × 10 minutes at tempo with 2 minutes easy between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Tempo block 1 of 3 · tempo",
            "sec": 600,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Recover 1 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Tempo block 2 of 3 · tempo",
            "sec": 600,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Recover 2 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Tempo block 3 of 3 · tempo",
            "sec": 600,
            "kind": "work",
            "pace": "tempo"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "tempo"
        ],
        "date": "2027-02-16"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-02-17"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-18"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-20"
      },
      "sun": {
        "title": "Long run — 18 km, last 3 at race pace",
        "how": "Run 18 km: the first 15 at conversational effort, then the last 3 km at race pace (5:41 /km). The easy part stays, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish. Stop at 2 hours 15 minutes if you reach that before the distance; do not speed up to reach the distance.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 15,
            "pace": "easy",
            "label": "15 km easy",
            "say": "15 kilometres at comfortable effort."
          },
          {
            "kind": "work",
            "km": 3,
            "pace": "goal",
            "label": "Last 3 km at race pace",
            "say": "Last 3 kilometres at race pace, 5 41 per kilometre. Stay tall and smooth."
          }
        ],
        "learn": [
          "long",
          "goal"
        ],
        "date": "2027-02-21",
        "timeCap": 8100,
        "fuel": true
      }
    }
  },
  {
    "focus": "Endurance build",
    "runs": {
      "tue": {
        "title": "Goal pace: 4 × 6 min at 5:41",
        "how": "Peak week, so the speed is moderate. 10 min easy, 4 × 6 minutes at race pace with 2 minutes easy between, 5 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 4 · goal race pace",
            "sec": 360,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 3",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 4 · goal race pace",
            "sec": 360,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 2 of 3",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 4 · goal race pace",
            "sec": 360,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 3 of 3",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 4 of 4 · goal race pace",
            "sec": 360,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 300,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 5 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2027-02-23"
      },
      "wed": {
        "title": "20–25 minutes gentle strength",
        "how": "20–25 minutes of comfortable strength work. Start with 3–5 minutes gentle walking or mobility. Do one round initially, progressing to two only if recovery is comfortable: 8 chair squats, 8 supported calf raises, 10 glute bridges, 8 light rows, and a 15–20 second side plank per side. Rest as needed and leave several repetitions in reserve. Finish with gentle mobility. Do not chase soreness or train to failure before Thursday. Shorten or skip if legs feel tired; stop painful movements.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-02-24"
      },
      "thu": {
        "title": "30 min easy",
        "how": "Run 30 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1800,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 30 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-25"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-02-27"
      },
      "sun": {
        "title": "Peak long run — 20 km easy",
        "how": "Run 20 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish. Stop at 2 hours 35 minutes if you reach that before the distance; do not speed up to reach the distance.\nYour longest run, two weeks before race day. Wear the Evo SL and full race kit, and practise race-morning breakfast and gels exactly as planned for 14 March. Once this feels manageable, the taper and race-day adrenaline cover the last 1.1 km.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 20,
            "pace": "easy",
            "label": "20 km easy",
            "say": "Peak long run. 20 kilometres at comfortable effort. Take your gels as rehearsed. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-02-28",
        "timeCap": 9300,
        "fuel": true
      }
    }
  },
  {
    "focus": "Taper",
    "runs": {
      "tue": {
        "title": "Taper: 3 × 5 min at 5:41",
        "how": "Taper week: less running, same sharpness. 10 min easy, 3 × 5 minutes at race pace with 2 minutes easy between, 10 min easy.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 3 · goal race pace",
            "sec": 300,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 3 · goal race pace",
            "sec": 300,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 2 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 3 · goal race pace",
            "sec": 300,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 600,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 10 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2027-03-02"
      },
      "wed": {
        "title": "10 minutes gentle mobility — taper",
        "how": "Optional comfortable mobility only. No new exercises or demanding leg strength work during the taper.",
        "type": "strength",
        "steps": null,
        "learn": [],
        "date": "2027-03-03"
      },
      "thu": {
        "title": "20 min easy",
        "how": "Run 20 minutes at conversational effort, about 2–4 out of 10. Walking breaks are welcome. No pace target.\nKeep this genuinely easy so Saturday parkrun and Sunday’s long run feel good. If your legs are tired, cut it to 15 minutes or rest.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1200,
            "kind": "easy",
            "pace": "easy",
            "say": "Run easily for 20 minutes. Keep your breathing comfortable. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-03-04"
      },
      "sat": {
        "title": "Saturday morning parkrun — 5 km easy",
        "how": "Run or run/walk 5 km at conversational effort. Keep it easy; this is part of the weekly plan. Your long run is tomorrow, so keep this truly easy. If your legs feel heavy, walk or skip it. Don’t race parkrun this block; if you ever do, make Tuesday easy and shorten Sunday. Check the local event start time and holiday availability.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "park",
        "steps": [
          {
            "kind": "easy",
            "km": 5,
            "pace": "easy",
            "label": "5 km easy",
            "say": "5 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-03-06"
      },
      "sun": {
        "title": "Long run — 12 km easy",
        "how": "Run 12 km at conversational effort, about 2–4 out of 10. Start slower than you think necessary. Planned walking breaks are fine. Sunday long run. Distance is the complete session, including the gentle opening and finish.\nOnly progress if last week felt manageable and recovery is normal. Repeat or shorten a week when needed. Never make up missed kilometres.\n\nFuelling rehearsal if this run will last roughly 75–90 minutes or longer: practise familiar carbohydrate, starting around 30 g/hour and adjusting for tolerance. For example, a gel containing 20 g carbohydrate at 40 minutes and every 40 minutes thereafter. Check product labels and follow water instructions; count carbohydrate from drinks too. This is practice, not a reason to extend the run. Plan water access and adjust drinking to thirst, conditions and your experience; do not force fluids.\n\nSummer preparation: choose an earlier/cooler time where practical, plan water access, and use comfortable effort rather than chasing pace in the heat. Check UV and use sun protection, including on cloudy days. Broad-spectrum water-resistant SPF30+ sunscreen, a hat and suitable clothing help; reapply as directed.",
        "type": "long",
        "steps": [
          {
            "kind": "easy",
            "km": 12,
            "pace": "easy",
            "label": "12 km easy",
            "say": "12 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "long"
        ],
        "date": "2027-03-07",
        "fuel": true
      }
    }
  },
  {
    "focus": "Race week",
    "runs": {
      "tue": {
        "title": "Race sharpener: 3 × 3 min at 5:41",
        "how": "Race week. 10 min easy, 3 × 3 minutes at race pace with 2 minutes easy between, 5 min easy. Should feel easy and smooth. Stop there.\nIf you’re not recovered, swap it for 30 minutes easy. Don’t add extra sessions to make up for a missed one.",
        "type": "speed",
        "steps": [
          {
            "label": "Warm up",
            "sec": 600,
            "kind": "wu",
            "pace": "easy",
            "say": "Warm up with 10 minutes of easy running. Save your energy for the efforts."
          },
          {
            "label": "Rep 1 of 3 · goal race pace",
            "sec": 180,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 1 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 2 of 3 · goal race pace",
            "sec": 180,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Recover 2 of 2",
            "sec": 120,
            "kind": "rec",
            "pace": "jog"
          },
          {
            "label": "Rep 3 of 3 · goal race pace",
            "sec": 180,
            "kind": "work",
            "pace": "goal"
          },
          {
            "label": "Cool down",
            "sec": 300,
            "kind": "cd",
            "pace": "easy",
            "say": "Cool down. 5 minutes of easy jogging. Let your breathing settle."
          }
        ],
        "learn": [
          "goal"
        ],
        "date": "2027-03-09"
      },
      "thu": {
        "title": "15–20 min easy — taper",
        "how": "Very easy running for 15–20 minutes, then stop. No fitness testing or missed-workout catch-up.",
        "type": "easy",
        "steps": [
          {
            "label": "Easy run",
            "sec": 1200,
            "kind": "easy",
            "pace": "easy",
            "say": "Twenty minutes very easy. This is your short taper run. Finish feeling fresh."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-03-11"
      },
      "sat": {
        "title": "Parkrun morning — volunteer or rest",
        "how": "Race tomorrow. Recommended exception to the usual 5 km: volunteer, spectate or rest. If a familiar short shakeout helps, do only 10 minutes very easy. Do not race parkrun.",
        "type": "note",
        "steps": null,
        "learn": [],
        "date": "2027-03-13"
      },
      "sun": {
        "title": "RACE DAY — Hamilton Half Marathon, 8:00am",
        "how": "Sunday 14 March 2027. Start comfortably; use your rehearsed run/walk strategy if helpful. Use familiar shoes, breakfast and fuelling. Start 8:00am at Hamilton Gardens, Hamilton. Check the organiser’s website for registration, race-pack pickup and any changes. The calendar entry is not a race registration.\n\nHold back over the opening kilometres, using comfortable effort rather than following faster runners. Use only the food, drink and run/walk pattern rehearsed in training. Confirm the organiser’s aid-station locations, available supplies and cutoff beforehand.",
        "type": "race",
        "steps": [
          {
            "kind": "easy",
            "km": 21.1,
            "pace": "easy",
            "label": "21.1 km easy",
            "say": "21.1 kilometres at comfortable effort. Walking breaks are welcome."
          }
        ],
        "learn": [
          "easy"
        ],
        "date": "2027-03-14"
      }
    }
  }
];
var LEARN = {
  intervals: ["Intervals","Set chunks of faster running with easy jogging in between. “6 × 2 min at 5K pace” means 2 minutes hard, recover, repeat 6 times. Run the first rep no faster than the last."],
  tempo: ["Tempo","Comfortably hard: you could say a few words but not chat. It teaches your body to hold a strong pace for longer, which is exactly what a sub-2 half needs."],
  hills: ["Hill repeats","Run up a short, steady hill for the set time with short quick steps and strong arms, then jog or walk down to recover. Builds strength with less pounding than flat speed work."],
  goal: ["Race pace","5:41 per kilometre gets you under 2 hours. Practising it teaches your body what race day should feel like: controlled, not flat out."],
  timetrial: ["Time trial","A full-effort parkrun to check your fitness. Start a touch slower than you want, then push the last kilometre. Enter the time in Setup and your training paces update."],
  "easy": [
    "Easy running",
    "You should be able to speak in full sentences, around 2–4 out of 10 effort. Slow down or walk when needed. A calculated pace is not a target."
  ],
  "long": [
    "Long runs",
    "Build endurance at comfortable effort. Walking breaks are welcome. Follow the stated time ceiling when present. Rehearse familiar food, drink and kit."
  ],
  "strides": [
    "Strides",
    "A smooth 20-second acceleration: build gradually, stay relaxed, then ease down. Not an all-out sprint. This plan uses 80 seconds walking or easy jogging after every stride, including the last."
  ],
  "fartlek": [
    "Fartlek",
    "Alternate controlled quicker running, about 6 out of 10 effort, with easy jogging or walking. The voice announces every change and repetition number."
  ],
  "warmup": [
    "Warm-up and cool-down",
    "Start gently and finish gently. The timed faster sessions include these parts; their total duration includes every recovery."
  ]
};
var DEMO = {"title": "One-minute equipment check", "type": "easy", "how": "Walk through this test. Keep the app visible. Check that the spoken cues reach your AirPods.", "learn": [], "steps": [{"kind": "easy", "sec": 20, "pace": "easy", "label": "Easy test", "say": "Equipment check. Walk easily for twenty seconds. Keep this app visible."}, {"kind": "work", "sec": 10, "pace": "controlled", "label": "Quicker test", "say": "Ten seconds slightly quicker walking."}, {"kind": "rec", "sec": 20, "pace": "jog", "label": "Recovery test", "say": "Recover. Twenty seconds of easy walking."}, {"kind": "cd", "sec": 10, "pace": "easy", "label": "Easy finish", "say": "Ten seconds easy to finish."}]};

function pacesFrom5k(t5k) { var k=t5k/5; return {easy:k+90, jog:k+110, controlled:k+35, relaxed:k, tempo:k+20, k10:k+12, k5:k, hill:k, goal:341}; }
// Estimates are for planning only. Never use this to complete a distance step.
function stepSeconds(step, paces) { return step.sec || Math.round(step.km * paces[step.pace]); }
if (typeof module !== 'undefined') module.exports = {WEEKS:WEEKS, LEARN:LEARN, DEMO:DEMO, PLAN_START:PLAN_START, RACE_DATE:RACE_DATE, pacesFrom5k:pacesFrom5k, stepSeconds:stepSeconds};
