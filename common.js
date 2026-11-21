// Shared by the guest page (index.html), dashboard (gallery.html) and audience screen (screen.html).
var EXEC = 'https://script.google.com/macros/s/AKfycbwQ655otHkKiDgf3yTFR2SjloXX1K-gqqN3W__pvFCsiYKw5GhkcxPbwVb7eNDvDoTc/exec';
// Colour palettes: id, name, good for, swatches [bg, ink, accent, accent2], default font
var PALETTES = [
  ['retro', 'Retro Disco', 'Retro, 70s–90s nights', ['#1d1433', '#fff6e5', '#ff8a1f', '#19c3b1'], 'righteous', '🕺'],
  ['glitz', 'Glitz Gala', 'Awards, galas, black tie', ['#070605', '#fbf3dc', '#e2b84a', '#f7e3a1'], 'cinzel', '🥂'],
  ['midnight', 'Midnight Silver', 'Corporate formal, tech', ['#0b1530', '#eef2fa', '#c7d0e0', '#5b8cff'], 'bebas', '✨'],
  ['clean', 'Clean Corporate', 'Conferences, daytime', ['#f5f6f8', '#16181d', '#2b59ff', '#00a37a'], 'poppins', '🎉'],
  ['emerald', 'Emerald & Gold', 'Hari Raya, festive', ['#062b1f', '#f6f1dc', '#d9b44a', '#2fbf71'], 'playfair', '🌙'],
  ['red', 'Lucky Red', 'CNY, Deepavali, festive', ['#5a0b0b', '#fff3df', '#ffcf4d', '#ff6b4a'], 'cinzel', '🧧'],
  ['blush', 'Blush & Rose Gold', 'Weddings, D&D, launches', ['#fbf1ef', '#3b2a2a', '#c7837a', '#d79a8a'], 'vibes', '💐'],
  ['neon', 'Neon Night', 'Parties, Y2K, music', ['#0a0614', '#ffffff', '#ff2fa8', '#21e6ff'], 'bungee', '🪩'],
  ['retronights', 'Retro Nights', 'Neon 70s–90s, disco, arcade', ['#0b0a36', '#ffffff', '#f7e06a', '#2ee6ff'], 'pacifico', '🪩'],
  ['noir', 'Hollywood Noir', 'Gatsby, movie night', ['#0a0a0a', '#ffffff', '#ffffff', '#9e9e9e'], 'playfair', '🎬']
];
// Font pairings: id, name, good for, title font, title weight
var FONTS = [
  ['righteous', 'Righteous + Inter', 'Retro, fun', 'Righteous', 400],
  ['cinzel', 'Cinzel + Inter', 'Gala, awards', 'Cinzel', 800],
  ['playfair', 'Playfair + Inter', 'Elegant, classic', 'Playfair Display', 700],
  ['bebas', 'Bebas Neue + Montserrat', 'Bold corporate', 'Bebas Neue', 400],
  ['vibes', 'Great Vibes + Montserrat', 'Weddings', 'Great Vibes', 400],
  ['bungee', 'Bungee + Inter', 'Party, neon', 'Bungee', 400],
  ['pacifico', 'Pacifico + Poppins', 'Retro script', 'Pacifico', 400],
  ['poppins', 'Poppins', 'Friendly, family day', 'Poppins', 700]
];
function findP(id) { for (var i = 0; i < PALETTES.length; i++) if (PALETTES[i][0] === id) return PALETTES[i]; return null; }
function findF(id) { for (var i = 0; i < FONTS.length; i++) if (FONTS[i][0] === id) return FONTS[i]; return null; }
function cleanEvent(s) { return (String(s || '').replace(/[^\w &'().-]/g, '').trim().slice(0, 60)) || 'My Event'; }
function cleanTheme(t) { return findP(t) ? t : 'retro'; }
function cleanFont(f, theme) { return findF(f) ? f : findP(cleanTheme(theme))[4]; }
function themeClass(theme, font) { return 'p-' + cleanTheme(theme) + ' f-' + cleanFont(font, theme); }
function themeEmoji(theme) { return findP(cleanTheme(theme))[5]; }
function api(params, body) {
  var url = EXEC + '?' + new URLSearchParams(params).toString();
  return fetch(url, body ? { method: 'POST', body: JSON.stringify(body) } : {})
    .then(function (r) { return r.json(); })
    .then(function (j) { if (!j.ok) throw new Error(j.error || 'Something went wrong'); return j.data; });
}
function guestLink(ev, theme, font) {
  var base = location.href.split('?')[0].replace(/(index|gallery|screen)\.html$/, '');
  return base + '?' + new URLSearchParams({ event: ev, theme: theme, font: cleanFont(font, theme) }).toString();
}
function qrSvg(text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 8, margin: 0 }); }
function fmtTime(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
