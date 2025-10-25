document.addEventListener('DOMContentLoaded', () => {
const strengthEl = document.getElementById('strength');
const m_canvas = document.getElementById('m_canvas');
const m_webgl = document.getElementById('m_webgl');
const m_audio = document.getElementById('m_audio');
const m_screen = document.getElementById('m_screen');
const m_nav = document.getElementById('m_nav');
const seedEl = document.getElementById('seed');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');


chrome.storage.local.get(['config'], (res) => {
const c = res.config || {};
const modules = (c.modules || {});
strengthEl.value = c.strength || 'medium';
m_canvas.checked = modules.canvas !== false;
m_webgl.checked = modules.webgl !== false;
m_audio.checked = modules.audio !== false;
m_screen.checked = modules.screen !== false;
m_nav.checked = modules.navigator !== false;
seedEl.value = c.seed || '';
});


saveBtn.addEventListener('click', () => {
const cfg = {
strength: strengthEl.value,
seed: seedEl.value || null,
modules: {
canvas: m_canvas.checked,
webgl: m_webgl.checked,
audio: m_audio.checked,
screen: m_screen.checked,
navigator: m_nav.checked
}
};
chrome.storage.local.set({config: cfg}, () => {
status.textContent = 'Saved.';
setTimeout(()=>status.textContent='',1500);
});
});
});


--- FILE: README.md ---
# Privacy Fingerprint Spoofer (Chrome extension)


## What it does
This extension injects a script into pages to spoof or perturb behaviors commonly used for fingerprinting: canvas, WebGL, audio, screen, and certain navigator fields.


## How to install (developer mode)
1. Save the files into a directory (manifest.json, background.js, content.js, options.html, options.js and icons folder).
2. Open `chrome://extensions` and enable "Developer mode".
3. Click "Load unpacked" and select the extension directory.


## Caveats & limitations
- This is *not* a perfect fingerprinting cure. It perturbs many JS-level APIs but cannot control server-side or network signals, browser-upgradable features, or some native-level fingerprints.
- Some sites may break when aggressive spoofing is enabled.
- Modifying headers like User-Agent requires additional permissions and is not covered here.


## Security & ethics
Use responsibly. Spoofing can be used to protect privacy, but be mindful of websites where accurate device data is required (banking, DRM-protected media, some games).

