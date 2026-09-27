/* Pure running calculations, shared by the UI and regression tests. */
(function (root) {
  'use strict';
  function metres(a, b) {
    var r = Math.PI / 180, x = Math.sin((b.lat-a.lat)*r/2)**2 + Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;
    return 6371000 * 2 * Math.asin(Math.sqrt(Math.min(1,x)));
  }
  function GPS() { this.dist=0; this.last=null; this.points=[]; this.lastFix=0; this.err='Waiting for GPS'; this.weak=false; }
  GPS.prototype.breakSegment=function () { this.last=null; this.points=[]; this.lastFix=0; };
  GPS.prototype.add=function (position, now, active) {
    var c=position.coords, t=position.timestamp;
    if (!active) { this.breakSegment(); return false; }
    if (![c.latitude,c.longitude,c.accuracy,t].every(Number.isFinite) || c.accuracy<0 || c.accuracy>35 || Math.abs(c.latitude)>90 || Math.abs(c.longitude)>180 || Math.abs(now-t)>15000) {
      this.weak=true; this.breakSegment(); return false;
    }
    var point={lat:c.latitude,lon:c.longitude,t:t,cum:this.dist};
    this.weak=false; this.err=''; this.lastFix=now;
    if (this.last) {
      var dt=(t-this.last.t)/1000, d=metres(this.last,point);
      if (dt<=0) return false;
      if (dt>15) { this.last=null; this.points=[]; }
      else if (d/dt>8) { this.breakSegment(); return false; }
      else if (d<3) return false;
      else { this.dist+=d; point.cum=this.dist; }
    }
    this.last=point; this.points.push(point);
    this.points=this.points.filter(function (p) { return t-p.t<=30000; });
    return true;
  };
  GPS.prototype.good=function(now) { return !this.weak && this.lastFix>0 && now-this.lastFix<12000; };
  GPS.prototype.pace=function(now) {
    if (!this.good(now) || this.points.length<2) return null;
    var first=this.points[0], last=this.points[this.points.length-1], d=last.cum-first.cum, dt=(last.t-first.t)/1000;
    return d>=25 && dt>=10 ? dt*1000/d : null;
  };
  // A distance step NEVER becomes a timer when GPS is unavailable.
  function stepComplete(step, seconds, distance, mode, good) {
    return step.km ? mode==='gps' && good && distance>=step.km*1000 : seconds>=step.sec;
  }
  function dayNumber(date) { return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000; }
  var api={GPS:GPS,metres:metres,stepComplete:stepComplete,dayNumber:dayNumber};
  if (typeof module!=='undefined') module.exports=api;
  else root.RunCore=api;
})(typeof window!=='undefined' ? window : globalThis);
