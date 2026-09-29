const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {GPS,stepComplete,dayNumber}=require('../run-core.js');
const {WEEKS,DEMO,PLAN_START,RACE_DATE}=require('../plan.js');
const fix=(time,metres,accuracy=5)=>({timestamp:time,coords:{latitude:0,longitude:metres/111194.92664455874,accuracy}});
test('distance is never silently replaced by time, including stale and manual GPS',()=>{
  assert.equal(stepComplete({km:5},100000,4999,'gps',true),false);
  assert.equal(stepComplete({km:5},100000,5000,'gps',false),false);
  assert.equal(stepComplete({km:5},100000,6000,'manual',true),false);
  assert.equal(stepComplete({km:5},1,5000,'gps',true),true);
  assert.equal(stepComplete({sec:20},19.9,1000,'gps',true),false);
  assert.equal(stepComplete({sec:20},20,0,'manual',false),true);
});
test('GPS pace and distance on a known 3 m/s route',()=>{
  const gps=new GPS(); for(let s=0;s<=20;s+=2) gps.add(fix(100000+s*1000,s*3),100000+s*1000,true);
  assert.ok(Math.abs(gps.dist-60)<0.01); assert.ok(Math.abs(gps.pace(120000)-1000/3)<0.1);
  assert.equal(gps.pace(140000),null);
});
test('paused movement, weak fixes, stale fixes, jumps and outages never bridge distance',()=>{
  const gps=new GPS(); gps.add(fix(100000,0),100000,true); gps.add(fix(105000,15),105000,true);
  const before=gps.dist;
  gps.add(fix(106000,30),106000,false); gps.add(fix(110000,40),110000,true);
  assert.equal(gps.dist,before);
  gps.add(fix(115000,60,100),115000,true); assert.equal(gps.good(115000),false);
  gps.add(fix(120000,80),120000,true); assert.equal(gps.dist,before);
  gps.add(fix(121000,500),121000,true); assert.equal(gps.dist,before);
  gps.add(fix(122000,85),122000,true);
  gps.add(fix(150000,160),150000,true); assert.equal(gps.dist,before);
  gps.add(fix(151000,163),180000,true); assert.equal(gps.dist,before);
});
test('calendar and plan agree across NZ daylight saving, with all 121 events',()=>{
  let total=0; const dates=[];
  WEEKS.forEach(w=>Object.values(w.runs).forEach(r=>{total++;dates.push(r.date);}));
  assert.equal(WEEKS.length,24); assert.equal(total,121); assert.equal(new Set(dates).size,121);
  assert.deepEqual(PLAN_START,[2026,8,28]); assert.deepEqual(RACE_DATE,[2027,2,14]);
  assert.equal(dayNumber(new Date(2026,8,28))-dayNumber(new Date(2026,8,21)),7);
  const ics=fs.readFileSync(require('node:path').join(__dirname,'../plan.ics'),'utf8').replace(/\r?\n /g,'');
  assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,121);
  dates.forEach(date=>assert.ok(ics.includes('DTSTART;VALUE=DATE:'+date.replaceAll('-',''))));
  assert.ok(WEEKS.slice(0,23).every(w=>w.runs.sat.steps[0].km===5));
  assert.ok(WEEKS.slice(0,23).every(w=>w.runs.sun.type==='long' && w.runs.sun.steps[0].km>0));
  assert.ok(WEEKS.slice(0,23).every(w=>w.runs.thu.type==='easy'));
  assert.equal(Math.max(...WEEKS.slice(0,23).map(w=>w.runs.sun.steps[0].km)),20);
  assert.equal(WEEKS[21].runs.sun.steps[0].km,20); assert.equal(WEEKS[21].runs.sun.date,'2027-02-28');
  assert.equal(WEEKS[23].runs.sat.steps,null);
  assert.equal(WEEKS[23].runs.sun.steps[0].km,21.1);
});
test('six strides include six recoveries and finish at exactly 40 minutes',()=>{
  const run=WEEKS[6].runs.tue;
  assert.equal(run.steps.filter(s=>s.kind==='stride').length,6);
  assert.equal(run.steps.filter(s=>s.kind==='rec').length,6);
  assert.equal(run.steps.reduce((n,s)=>n+s.sec,0),2400);
  const tempo=WEEKS[10].runs.tue.steps.find(s=>s.kind==='work');
  assert.equal(tempo.pace,'tempo'); assert.equal(tempo.sec,1200);
  assert.equal(DEMO.steps.reduce((n,s)=>n+s.sec,0),60);
});
test('service worker precache files exist; activation preserves other sites caches',async()=>{
  const handlers={},deleted=[],puts=[];
  const scope='https://example.github.io/Half-Couch/';
  const own='half-coach-'+encodeURIComponent('/Half-Couch/')+'-';
  const cache={addAll:async urls=>urls.forEach(url=>assert.ok(fs.existsSync(require('node:path').join(__dirname,'..',new URL(url).pathname.replace('/Half-Couch/','')||'index.html')))),match:async()=>undefined,put:async(...args)=>puts.push(args)};
  const context={URL,Response,Promise,encodeURIComponent,
    self:{registration:{scope},location:{origin:'https://example.github.io'},clients:{claim:async()=>{}},addEventListener:(name,fn)=>handlers[name]=fn},
    caches:{open:async()=>cache,keys:async()=>['other-app',own+'v4',own+'v8','half-coach-v4'],delete:async key=>deleted.push(key)},
    fetch:async()=>{throw Error('offline');}};
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../sw.js'),'utf8'),context);
  let pending; handlers.install({waitUntil:p=>pending=p}); await pending;
  handlers.activate({waitUntil:p=>pending=p}); await pending;
  assert.deepEqual(deleted,[own+'v4']);
  let response;
  handlers.fetch({request:{method:'GET',url:scope+'missing.js',mode:'cors'},respondWith:p=>response=p});
  assert.equal((await response).type,'error');
});
