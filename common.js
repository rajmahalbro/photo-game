// Shared by the dashboard (gallery.html) and the audience screen (screen.html).
var EXEC = 'https://script.google.com/macros/s/AKfycbwQ655otHkKiDgf3yTFR2SjloXX1K-gqqN3W__pvFCsiYKw5GhkcxPbwVb7eNDvDoTc/exec';
var THEMES = ['retro', 'glitz', 'noir', 'clean'];
function cleanEvent(s) { return (String(s || '').replace(/[^\w &'().-]/g, '').trim().slice(0, 60)) || 'My Event'; }
function cleanTheme(t) { return THEMES.indexOf(t) >= 0 ? t : 'retro'; }
function api(params, body) {
  var url = EXEC + '?' + new URLSearchParams(params).toString();
  return fetch(url, body ? { method: 'POST', body: JSON.stringify(body) } : {})
    .then(function (r) { return r.json(); })
    .then(function (j) { if (!j.ok) throw new Error(j.error || 'Something went wrong'); return j.data; });
}
function guestLink(ev, theme) {
  var base = location.href.split('?')[0].replace(/(gallery|screen)\.html$/, '');
  return base + '?' + new URLSearchParams({ event: ev, theme: theme }).toString();
}
function qrSvg(text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 8, margin: 0 }); }
function fmtTime(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
