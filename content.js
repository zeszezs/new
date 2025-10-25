// content script: injects spoofing code into the page context so it can override page JS APIs
if (CONFIG.modules.screen || CONFIG.modules.navigator) {
try {
if (CONFIG.modules.screen && window.screen) {
try {
const s = window.screen;
const makeProp = (obj, name, value) => {
try {
Object.defineProperty(obj, name, {
get: function() { return value; },
configurable: true
});
} catch (e) {}
};
const w = s.width, h = s.height;
const deltaW = Math.round((rng()-0.5) * (CONFIG.strength === 'high' ? 40 : CONFIG.strength === 'low' ? 6 : 16));
const deltaH = Math.round((rng()-0.5) * (CONFIG.strength === 'high' ? 40 : CONFIG.strength === 'low' ? 6 : 16));
makeProp(s, 'width', w + deltaW);
makeProp(s, 'height', h + deltaH);
// availWidth/Height
try { makeProp(s, 'availWidth', (s.availWidth || w) + deltaW); } catch(e){}
try { makeProp(s, 'availHeight', (s.availHeight || h) + deltaH); } catch(e){}
} catch(e){}
}


if (CONFIG.modules.navigator && window.navigator) {
try {
// override platform/oscpu/hardwareConcurrency
const nav = window.navigator;
try { Object.defineProperty(nav, 'hardwareConcurrency', { get: () => Math.max(1, Math.round((nav.hardwareConcurrency||4) + (rng()-0.5)*2)), configurable:true }); } catch(e){}
try { Object.defineProperty(nav, 'platform', { get: () => (nav.platform || 'Win32').split(' ')[0], configurable:true }); } catch(e){}
try { Object.defineProperty(nav, 'languages', { get: () => nav.languages || ['en-US','en'], configurable:true }); } catch(e){}
} catch(e){}
}
} catch (e) {
console.error('Screen/navigator spoof failed', e);
}
}


// basic fingerprinting-revealing APIs blocked/hardened
try {
// prevent access to some function source code which may leak behavior
['toString','valueOf'].forEach(name => {
try {
const orig = Function.prototype[name];
Object.defineProperty(Function.prototype, name, {
value: function() { return orig.apply(this, arguments); },
configurable: true,
writable: true
});
} catch(e) {}
});
} catch(e){}


})();
`;
(document.documentElement || document.head || document.body).appendChild(script);
// remove the script tag after injection to tidy up
script.parentNode.removeChild(script);
})();
