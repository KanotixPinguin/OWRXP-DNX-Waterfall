(async function () {
  async function lp(n){ try{ if(window.Plugins && Plugins.load) await Plugins.load(n); }catch(e){} }
  await lp("utils");
  await lp("notify");
  try { await Plugins.load("dnx_mode_colors"); } catch(e) {}
  try { await Plugins.load("dnx_matrix"); } catch(e) {}
  try { await Plugins.load("https://0xaf.github.io/openwebrxplus-plugins/receiver/freq_scanner/freq_scanner.js"); } catch(e) {}
})();




/* DNX_AUTO_OPEN_PHOTO_DESC_START */
(function(){
  if(window.__dnxAutoOpenPhotoDesc) return;
  window.__dnxAutoOpenPhotoDesc = true;

  function isOpen(){
    var c = document.querySelector(".openwebrx-description-container");
    if(!c) return false;
    return c.classList.contains("expanded") || getComputedStyle(c).display !== "none";
  }

  function tryOpen(){
    try {
      if(window.localStorage.getItem("dnx.rxdetails.open") === "0") return false;
    } catch(e){}
    if(isOpen()) return true;

    var targets = [
      ".openwebrx-rx-details-arrow",
      ".openwebrx-photo-trigger",
      ".openwebrx-rx-details-arrow.openwebrx-photo-trigger",
      ".webrx-rx-texts.openwebrx-photo-trigger",
      ".openwebrx-top-container .openwebrx-photo-trigger"
    ];

    for(var i=0;i<targets.length;i++){
      var el = document.querySelector(targets[i]);
      if(el){
        try{ el.click(); }catch(e){}
        try{
          el.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:window}));
        }catch(e){}
        if(isOpen()) return true;
      }
    }

    var c = document.querySelector(".openwebrx-description-container");
    if(c){
      c.classList.add("expanded");
      c.style.setProperty("display","block","important");
      c.style.setProperty("max-height","none","important");
      c.style.setProperty("height","auto","important");
      c.style.setProperty("visibility","visible","important");
      c.style.setProperty("opacity","1","important");
    }

    var a = document.querySelector(".openwebrx-rx-details-arrow");
    if(a){
      a.classList.add("openwebrx-rx-details-arrow-up");
    }

    return isOpen();
  }

  function boot(){
    var tries = 0;
    var t = setInterval(function(){
      tries++;
      tryOpen();
      if(isOpen() || tries > 30) clearInterval(t);
    }, 500);

    setTimeout(tryOpen, 200);
    setTimeout(tryOpen, 1000);
    setTimeout(tryOpen, 2500);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);
})();
/* DNX_AUTO_OPEN_PHOTO_DESC_END */

/* DNX_FORCE_INNER_PHOTO_OPEN_START */
(function(){
  if(window.__dnxForceInnerPhotoOpen) return;
  window.__dnxForceInnerPhotoOpen = true;

  function forceOpen(){
    try {
      if(window.localStorage.getItem("dnx.rxdetails.open") === "0") return false;
    } catch(e){}
    var btn = document.querySelector("a.openwebrx-rx-details-arrow.openwebrx-photo-trigger");
    var box = document.querySelector(".openwebrx-description-container");
    if(!btn && !box) return false;

    if(btn){
      btn.classList.add("openwebrx-rx-details-arrow--up");
      btn.classList.add("openwebrx-rx-details-arrow-up");
      try{
        btn.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:window}));
      }catch(e){}
      try{ btn.click(); }catch(e){}
    }

    if(box){
      box.classList.add("expanded");
      box.style.setProperty("display","block","important");
      box.style.setProperty("visibility","visible","important");
      box.style.setProperty("opacity","1","important");
      box.style.setProperty("max-height","none","important");
      box.style.setProperty("height","auto","important");
      box.style.setProperty("overflow","visible","important");
    }

    return true;
  }

  function boot(){
    var n = 0;
    var t = setInterval(function(){
      n++;
      forceOpen();
      if(n > 40) clearInterval(t);
    }, 300);

    setTimeout(forceOpen, 100);
    setTimeout(forceOpen, 800);
    setTimeout(forceOpen, 1600);
    setTimeout(forceOpen, 3000);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);
})();
/* DNX_FORCE_INNER_PHOTO_OPEN_END */

/* DNX_PHOTO_DESC_TOGGLE_BUTTON_START */
(function(){
  if(window.__dnxPhotoDescToggleBtn) return;
  window.__dnxPhotoDescToggleBtn = true;

  var BTN_ID = "dnx-photo-desc-toggle-btn";
  var STYLE_ID = "dnx-photo-desc-toggle-style";

  function desc(){
    return document.querySelector(".openwebrx-description-container");
  }

  function arrow(){
    return document.querySelector(".openwebrx-rx-details-arrow");
  }

  function isOpen(){
    var c = desc();
    if(!c) return false;
    return c.classList.contains("expanded") && getComputedStyle(c).display !== "none";
  }

  function openDesc(){
    var c = desc();
    if(!c) return;

    c.classList.add("expanded");
    c.style.setProperty("display","block","important");
    c.style.setProperty("visibility","visible","important");
    c.style.setProperty("opacity","1","important");
    c.style.setProperty("max-height","none","important");
    c.style.setProperty("height","auto","important");
    c.style.setProperty("overflow","visible","important");

    var a = arrow();
    if(a){
      a.classList.add("openwebrx-rx-details-arrow--up");
      a.classList.add("openwebrx-rx-details-arrow-up");
      a.classList.remove("openwebrx-rx-details-arrow--down");
      a.classList.remove("openwebrx-rx-details-arrow-down");
    }
  }

  function closeDesc(){
    var c = desc();
    if(!c) return;

    c.classList.remove("expanded");
    c.style.setProperty("display","none","important");
    c.style.setProperty("visibility","hidden","important");
    c.style.setProperty("opacity","0","important");
    c.style.setProperty("max-height","0px","important");
    c.style.setProperty("height","0px","important");
    c.style.setProperty("overflow","hidden","important");

    var a = arrow();
    if(a){
      a.classList.remove("openwebrx-rx-details-arrow--up");
      a.classList.remove("openwebrx-rx-details-arrow-up");
      a.classList.add("openwebrx-rx-details-arrow--down");
      a.classList.add("openwebrx-rx-details-arrow-down");
    }
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = [
      "#" + BTN_ID + " {",
      "  position:fixed !important;",
      "  top:80px !important;",
      "  right:20px !important;",
      "  z-index:1000600 !important;",
      "  height:30px !important;",
      "  padding:0 12px !important;",
      "  border-radius:999px !important;",
      "  border:1px solid #ffffff !important;",
      "  background:#1414b8 !important;",
      "  color:#ffffff !important;",
      "  font:700 12px/30px 'Segoe UI',sans-serif !important;",
      "  cursor:pointer !important;",
      "  box-shadow:0 0 10px rgba(20,20,184,.25) !important;",
      "}",
      "#" + BTN_ID + ".is-closed {",
      "  background:#444 !important;",
      "}"
    ].join("\n");
    document.head.appendChild(st);
  }

  function syncBtn(){
    var b = document.getElementById(BTN_ID);
    if(!b) return;
    var open = isOpen();
    b.textContent = open ? "noVNC / Foto aus" : "noVNC / Foto ein";
    b.classList.toggle("is-closed", !open);
  }

  function ensureBtn(){
    ensureStyle();

    var b = document.getElementById(BTN_ID);
    if(b) return b;

    b = document.createElement("button");
    b.id = BTN_ID;
    b.type = "button";
    b.addEventListener("click", function(){
      if(isOpen()) closeDesc();
      else openDesc();
      syncBtn();
    });

    document.body.appendChild(b);
    syncBtn();
    return b;
  }

  function boot(){
    ensureBtn();
    syncBtn();
    setTimeout(syncBtn, 300);
    setTimeout(syncBtn, 1200);
    setTimeout(syncBtn, 2500);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }
  window.addEventListener("load", boot);
})();
/* DNX_PHOTO_DESC_TOGGLE_BUTTON_END */

Plugins.load('https://0xaf.github.io/openwebrxplus-plugins/receiver/colorful_spectrum/colorful_spectrum.js');


/* === DNX_BYPASS_LINES_FINAL === */
(function(){

function ready(){
  return typeof demodulators!=="undefined" &&
         typeof center_freq!=="undefined" &&
         typeof hz_per_pixel!=="undefined";
}

function px(f, rect){
  return rect.left + (f-center_freq)/hz_per_pixel;
}

function mk(id,color){
  let e=document.getElementById(id);
  if(!e){
    e=document.createElement("div");
    e.id=id;
    e.style.cssText="position:fixed;width:1px;background:"+color+";z-index:1000040;pointer-events:none";
    document.body.appendChild(e);
  }
  return e;
}

setInterval(function(){
  try{
    if(!ready()) return;
    if(!demodulators.length) return;

    let d=demodulators[0];
    if(!d) return;

    let wf=document.querySelector("#openwebrx-waterfall-container");
    if(!wf) return;

    let r=wf.getBoundingClientRect();

    let left = d.offset_frequency + d.low_cut;
    let right = d.offset_frequency + d.high_cut;

    let l = mk("dnx-bypass-left","#00ff00");
    let rr = mk("dnx-bypass-right","#00ff00");

    l.style.left = px(left,r)+"px";
    rr.style.left = px(right,r)+"px";

    l.style.top = r.top+"px";
    rr.style.top = r.top+"px";

    l.style.height = r.height+"px";
    rr.style.height = r.height+"px";

  }catch(e){}
},100);

})();


/* === DNX_BYPASS_REAL === */
(function(){
  if(window.__dnxBypassReal) return;
  window.__dnxBypassReal = true;

  function ensure(id){
    let e=document.getElementById(id);
    if(!e){
      e=document.createElement("div");
      e.id=id;
      e.style.cssText="position:fixed;width:1px;background:#00ff00;z-index:1000041;pointer-events:none";
      document.body.appendChild(e);
    }
    return e;
  }

  function loop(){
    try{
      if(typeof demodulators==="undefined" || !demodulators.length) return;

      let d = demodulators[0];
      if(!d || !d.low_cut) return;

      let wf=document.querySelector("#openwebrx-waterfall-container");
      if(!wf) return;

      let r=wf.getBoundingClientRect();

      let l=ensure("dnx-bypass-left");
      let rr=ensure("dnx-bypass-right");

      let left = (d.offset_frequency + d.low_cut - center_freq) / hz_per_pixel;
      let right = (d.offset_frequency + d.high_cut - center_freq) / hz_per_pixel;

      l.style.left = (r.left + left) + "px";
      rr.style.left = (r.left + right) + "px";

      l.style.top = r.top + "px";
      rr.style.top = r.top + "px";

      l.style.height = r.height + "px";
      rr.style.height = r.height + "px";

    }catch(e){}
    requestAnimationFrame(loop);
  }

  loop();
})();


/* === DNX_BYPASS_HOOKED === */
(function(){
  if(window.__dnxBypassHooked) return;
  window.__dnxBypassHooked = true;

  function ensure(id){
    let e=document.getElementById(id);
    if(!e){
      e=document.createElement("div");
      e.id=id;
      e.style.cssText="position:fixed;width:1px;background:#00ff00;z-index:1000011;pointer-events:none";
      document.body.appendChild(e);
    }
    return e;
  }

  function update(){
    try{
      if(typeof demodulators==="undefined") return;
      if(!demodulators.length) return;

      let d = demodulators[0];
      if(!d) return;

      let wf=document.querySelector("#openwebrx-waterfall-container");
      if(!wf) return;

      let r=wf.getBoundingClientRect();

      let leftLine = ensure("dnx-bypass-left");
      let rightLine = ensure("dnx-bypass-right");

      let left = (d.offset_frequency + d.low_cut - center_freq) / hz_per_pixel;
      let right = (d.offset_frequency + d.high_cut - center_freq) / hz_per_pixel;

      leftLine.style.left = (r.left + left) + "px";
      rightLine.style.left = (r.left + right) + "px";

      leftLine.style.top = r.top + "px";
      rightLine.style.top = r.top + "px";

      leftLine.style.height = r.height + "px";
      rightLine.style.height = r.height + "px";

    }catch(e){}
  }

  setInterval(update, 50);

})();


/* DNX_YELLOW_GREEN_FULLSCREEN_START */
(function(){
  if(window.__dnxLinesFixed) return;
  window.__dnxLinesFixed = true;

  try{
    if(!document.getElementById('dnx-line-hide-style')){
      const style = document.createElement('style');
      style.id = 'dnx-line-hide-style';
      style.textContent = ''
        + 'body.dnx-hide-yellow-line #dnx-follow,'
        + 'body.dnx-hide-yellow-line #dnx-follow-line,'
        + 'body.dnx-hide-yellow-line #dnx-follow-line-glow,'
        + 'body.dnx-hide-yellow-line #dnx-follow-topcap,'
        + 'body.dnx-hide-yellow-line #dnx-seg-yellow,'
        + 'body.dnx-hide-yellow-line .dnx-seg-yellow{display:none !important;opacity:0 !important;}'
        + 'body.dnx-hide-green-line #dnx-center,'
        + 'body.dnx-hide-green-line #dnx-left,'
        + 'body.dnx-hide-green-line #dnx-right,'
        + 'body.dnx-hide-green-line #dnx-green-extension-adaptive-line,'
        + 'body.dnx-hide-green-line #dnx-green-extension-adaptive-glow,'
        + 'body.dnx-hide-green-line #dnx-seg-green,'
        + 'body.dnx-hide-green-line .dnx-seg-green{display:none !important;opacity:0 !important;}';
      document.head.appendChild(style);
    }
  }catch(e){}

  const STORE_Y = 'dnx.line.yellow.enabled';
  const STORE_G = 'dnx.line.green.enabled';

  function loadFlag(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(raw === null) return fallback;
      return raw === '1';
    }catch(e){}
    return fallback;
  }

  function saveFlag(key, value){
    try{ localStorage.setItem(key, value ? '1' : '0'); }catch(e){}
  }

  window.__dnxYellowEnabled = loadFlag(STORE_Y, true);
  window.__dnxGreenEnabled = loadFlag(STORE_G, true);

  function ensurePanel(){
    const receiver =
      document.getElementById('dnx-fx-box-inline') ||
      document.getElementById('openwebrx-panel-receiver') ||
      document.querySelector('#openwebrx-panel-receiver');
    if(!receiver) return null;

    let host = document.getElementById('dnx-line-toggle-box');
    if(host) return host;

    host = document.createElement('div');
    host.id = 'dnx-line-toggle-box';
    host.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0 8px 0;';

    function mkBtn(id, label, getter, setter){
      const b = document.createElement('button');
      b.type = 'button';
      b.id = id;
      b.style.cssText = 'height:26px;padding:0 10px;border-radius:999px;border:1px solid #ffffff;background:#666666;color:#ffffff;font:700 12px/1 Segoe UI,sans-serif;cursor:pointer;';
      function paint(){
        const on = getter();
        b.textContent = label + ': ' + (on ? 'On' : 'Off');
        b.style.setProperty('border', '1px solid #ffffff', 'important');
        if (label === 'Gelb Hover') {
          b.style.setProperty('background', on ? '#ffd400' : '#666666', 'important');
          b.style.setProperty('color', on ? '#000000' : '#ffffff', 'important');
        } else {
          b.style.setProperty('background', on ? '#22ff2f' : '#666666', 'important');
          b.style.setProperty('color', on ? '#000000' : '#ffffff', 'important');
        }
      }
      b.addEventListener('click', function(){
        setter(!getter());
        paint();
      });
      paint();
      return b;
    }

    host.appendChild(mkBtn(
      'dnx-btn-yellow-line',
      'Gelb Hover',
      function(){ return !!window.__dnxYellowEnabled; },
      function(v){
        window.__dnxYellowEnabled = !!v;
        saveFlag(STORE_Y, !!v);
        syncLineVisibility();
      }
    ));

    host.appendChild(mkBtn(
      'dnx-btn-green-line',
      'Gruen Tuning',
      function(){ return !!window.__dnxGreenEnabled; },
      function(v){
        window.__dnxGreenEnabled = !!v;
        saveFlag(STORE_G, !!v);
        syncLineVisibility();
      }
    ));

    if (receiver.id === 'dnx-fx-box-inline') {
      receiver.appendChild(host);
    } else {
      receiver.insertBefore(host, receiver.firstChild);
    }
    return host;
  }

  function wfRect(){
    const wf =
      document.querySelector('#openwebrx-waterfall-container') ||
      document.querySelector('.openwebrx-waterfall-container');
    return wf ? wf.getBoundingClientRect() : null;
  }

  function mk(id,color,w,op){
    let e=document.getElementById(id);
    if(!e){
      e=document.createElement('div');
      e.id=id;
      e.style.cssText='position:fixed;pointer-events:none;z-index:1000011;width:'+w+'px;background:'+color+';opacity:'+op+';display:none';
      document.body.appendChild(e);
    }
    return e;
  }

  const yellow = mk('dnx-follow','#ffd400',1,1);
  const greenC = mk('dnx-center','#22ff2f',2,1);
  const greenL = mk('dnx-left','#22ff2f',1,0.6);
  const greenR = mk('dnx-right','#22ff2f',1,0.6);

  function hardHide(el){
    try{
      if(el) el.style.display='none';
    }catch(e){}
  }

  function hideAll(selector){
    try{
      document.querySelectorAll(selector).forEach(function(el){
        el.style.display='none';
      });
    }catch(e){}
  }

  function syncLineVisibility(){
    try{
      document.body.classList.toggle('dnx-hide-yellow-line', !window.__dnxYellowEnabled);
      document.body.classList.toggle('dnx-hide-green-line', !window.__dnxGreenEnabled);
    }catch(e){}

    if(!window.__dnxYellowEnabled){
      hardHide(yellow);
      hardHide(window.yellowLine);
      hardHide(window.yellowCap);
      hideAll('#dnx-follow, #dnx-follow-line, #dnx-follow-line-glow, #dnx-follow-topcap, #dnx-seg-yellow, .dnx-seg-yellow');
    }
    if(!window.__dnxGreenEnabled){
      hardHide(greenC);
      hardHide(greenL);
      hardHide(greenR);
      hardHide(window.greenCenter);
      hardHide(window.greenLeft);
      hardHide(window.greenRight);
      hardHide(window.greenCCap);
      hardHide(window.greenLCap);
      hardHide(window.greenRCap);
      hardHide(document.getElementById('dnx-green-extension-adaptive-line'));
      hardHide(document.getElementById('dnx-green-extension-adaptive-glow'));
      hideAll('#dnx-center, #dnx-left, #dnx-right, #dnx-seg-green, .dnx-seg-green, #dnx-green-extension-adaptive-line, #dnx-green-extension-adaptive-glow');
    }
  }

  function setLine(e,x,t,h){
    e.style.left=Math.round(x)+'px';
    e.style.top=Math.round(t)+'px';
    e.style.height=Math.round(h)+'px';
    e.style.display='';
  }

  function hide(e){e.style.display='none';}

  function currentRange(){
    try{
      if(typeof get_visible_freq_range==='function') return get_visible_freq_range();
    }catch(e){}
    try{
      if(typeof visible_range!=='undefined') return visible_range;
    }catch(e){}
    return null;
  }

  function freqToX(freq){
    const r=wfRect();
    if(!r) return null;

    const range=currentRange();
    if(range && typeof scale_px_from_freq==='function'){
      return r.left+scale_px_from_freq(freq,range);
    }

    if(range && range.start && range.bw){
      return r.left+((freq-range.start)/range.bw)*r.width;
    }

    return null;
  }

  function updateGreen(){
    try{
      if(!window.__dnxGreenEnabled){
        hide(greenC); hide(greenL); hide(greenR);
        hardHide(window.greenCenter);
        hardHide(window.greenLeft);
        hardHide(window.greenRight);
        hardHide(window.greenCCap);
        hardHide(window.greenLCap);
        hardHide(window.greenRCap);
        hideAll('#dnx-center, #dnx-left, #dnx-right, #dnx-seg-green, .dnx-seg-green');
        return;
      }
      const r=wfRect();
      if(!r) return;

      const d=UI.getDemodulator();
      if(!d) return;

      let off=0;
      if(d.get_offset_frequency) off=d.get_offset_frequency()||0;

      const bp=d.getBandpass();
      if(!bp) return;

      const xC=freqToX(center_freq+off);
      const xL=freqToX(center_freq+off+bp.low_cut);
      const xR=freqToX(center_freq+off+bp.high_cut);

      if(xC==null) return;

      setLine(greenC,xC,r.top,r.height);

      if(xL && xR && Math.abs(xR-xL)>6){
        setLine(greenL,xL,r.top,r.height);
        setLine(greenR,xR,r.top,r.height);
      } else {
        hide(greenL); hide(greenR);
      }

    }catch(e){}
  }

  document.addEventListener('mousemove',function(e){
    if(!window.__dnxYellowEnabled){
      hide(yellow);
      hardHide(window.yellowLine);
      hardHide(window.yellowCap);
      hideAll('#dnx-follow, #dnx-follow-line, #dnx-follow-line-glow, #dnx-follow-topcap, #dnx-seg-yellow, .dnx-seg-yellow');
      return;
    }
    const r=wfRect();
    if(!r) return;

    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){
      hide(yellow);
      return;
    }

    setLine(yellow,e.clientX,r.top,r.height);
  },{passive:true});

  setInterval(function(){ ensurePanel(); updateGreen(); },120);
  ensurePanel();
  syncLineVisibility();
  updateGreen();

})();
/* DNX_YELLOW_GREEN_FULLSCREEN_END */

(function(){
  if(window.__dnxGlobalLineKiller) return;
  window.__dnxGlobalLineKiller = true;

  function hide(el){
    try{
      if(!el) return;
      el.style.display = 'none';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      el.style.background = 'transparent';
      el.style.boxShadow = 'none';
      el.style.filter = 'none';
    }catch(e){}
  }

  function wipeBox(id){
    try{
      var box = document.getElementById(id);
      if(!box) return;
      box.style.display = 'none';
      box.style.opacity = '0';
      box.style.visibility = 'hidden';
      box.innerHTML = '';
    }catch(e){}
  }

  function loop(){
    try{
      if(window.__dnxYellowEnabled === false){
        hide(window.yellowLine);
        hide(document.getElementById('dnx-follow-line'));
        hide(document.getElementById('dnx-follow-line-glow'));
        hide(document.getElementById('dnx-follow-topcap'));
        hide(window.yellowCap);
        wipeBox('dnx-seg-yellow');
      }
      if(window.__dnxGreenEnabled === false){
        hide(window.greenCenter);
        hide(window.greenLeft);
        hide(window.greenRight);
        hide(window.greenCCap);
        hide(window.greenLCap);
        hide(window.greenRCap);
        hide(document.getElementById('dnx-green-extension-adaptive-line'));
        hide(document.getElementById('dnx-green-extension-adaptive-glow'));
        wipeBox('dnx-seg-green');
      }
    }catch(e){}
    requestAnimationFrame(loop);
  }

  loop();
})();




/* DNX_SEGMENT_SMOOTH_START */
(function(){
  if(window.__dnxSmoothSeg) return;
  window.__dnxSmoothSeg = true;

  function getSeg(box,i,w){
    let el=box.children[i];
    if(!el){
      el=document.createElement('div');
      el.dataset.l='0';
      el.style.cssText='position:fixed;pointer-events:none;width:'+w+'px;transition:all 80ms linear;';
      box.appendChild(el);
    }
    return el;
  }

  function mix(a,b,t){return a+(b-a)*t;}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

  function rgb(r,g,b){
    return 'rgb('+Math.round(r)+','+Math.round(g)+','+Math.round(b)+')';
  }

  function style(el,base,lum){
    let prev=parseFloat(el.dataset.l||lum);
    lum=mix(prev,lum,0.25);
    el.dataset.l=lum;

    let t=clamp((lum-50)/140,0,1);

    let r,g,b;

    if(base==='#ffd400'){
      r=mix(255,140,t);
      g=mix(240,110,t);
      b=mix(120,0,t);
    }else{
      r=mix(140,10,t);
      g=mix(255,120,t);
      b=mix(150,20,t);
    }

    const col=rgb(r,g,b);

    el.style.background=col;
    el.style.boxShadow='0 0 '+(8*(1-t)).toFixed(1)+'px '+col;
    el.style.filter='brightness('+mix(1.2,0.75,t).toFixed(2)+')';
  }

  function apply(line,cap,base,id){
    if(id==='dnx-seg-yellow' && window.__dnxYellowEnabled === false) return;
    if(id==='dnx-seg-green' && window.__dnxGreenEnabled === false) return;
    if(!line) return;

    const x=parseFloat(line.style.left||'NaN');
    const top=parseFloat(line.style.top||'NaN');
    const h=parseFloat(line.style.height||'NaN');
    if(!isFinite(x)||!isFinite(top)||!isFinite(h)) return;

    let box=document.getElementById(id);
    if(!box){
      box=document.createElement('div');
      box.id=id;
      document.body.appendChild(box);
    }

    const segH=5;
    const count=Math.ceil(h/segH);

    for(let i=0;i<count;i++){
      const seg=getSeg(box,i,parseFloat(line.style.width||2));

      const y=top+i*segH;

      seg.style.left=x+'px';
      seg.style.top=y+'px';
      seg.style.height=segH+'px';
      seg.style.display='';

      let lum=120;
      try{
        const c=document.querySelector('canvas');
        if(c){
          const r=c.getBoundingClientRect();
          const ctx=c.getContext('2d',{willReadFrequently:true});
          const px=(x-r.left)*(c.width/r.width);
          const py=(y-r.top)*(c.height/r.height);
          const d=ctx.getImageData(px,py,1,1).data;
          lum=0.2126*d[0]+0.7152*d[1]+0.0722*d[2];
        }
      }catch(e){}

      style(seg,base,lum);
    }

    for(let i=box.children.length-1;i>=count;i--){
      box.children[i].style.display='none';
    }

    if(cap){
      cap.style.background=base;
    }
  }

  setInterval(function(){
    if(window.__dnxYellowEnabled !== false){
      apply(window.yellowLine, window.yellowCap, '#ffd400', 'dnx-seg-yellow');
    } else {
      try{
        var by = document.getElementById('dnx-seg-yellow');
        if(by){ by.innerHTML=''; by.style.display='none'; }
        document.querySelectorAll('.dnx-seg-yellow').forEach(function(el){ el.style.display='none'; });
      }catch(e){}
    }

    if(window.__dnxGreenEnabled !== false){
      apply(window.greenCenter, window.greenCCap, '#22ff2f', 'dnx-seg-green');
    } else {
      try{
        var bg = document.getElementById('dnx-seg-green');
        if(bg){ bg.innerHTML=''; bg.style.display='none'; }
        document.querySelectorAll('.dnx-seg-green').forEach(function(el){ el.style.display='none'; });
      }catch(e){}
    }
  },70);

})();
 /* DNX_SEGMENT_SMOOTH_END */



/* DNX_SEGMENTS_TRUE_PER_SEG_START */
(function(){
  if(window.__dnxTrueSeg) return;
  window.__dnxTrueSeg = true;

  function findCanvas(){
    return document.querySelector('#openwebrx-waterfall-container canvas')
        || document.querySelector('.openwebrx-waterfall-container canvas');
  }

  function getRect(){
    const c = findCanvas();
    return c ? c.getBoundingClientRect() : null;
  }

  function ensureBox(id){
    let b = document.getElementById(id);
    if(!b){
      b = document.createElement('div');
      b.id = id;
      document.body.appendChild(b);
    }
    return b;
  }

  function getSeg(box,i,w){
    let el = box.children[i];
    if(!el){
      el = document.createElement('div');
      el.style.cssText = 'position:fixed;pointer-events:none;width:'+w+'px;';
      box.appendChild(el);
    }
    return el;
  }

  function lumaAt(x, y){
    try{
      const c = findCanvas();
      if(!c) return null;
      const r = c.getBoundingClientRect();
      const ctx = c.getContext('2d',{willReadFrequently:true});

      const px = Math.floor((x - r.left) * (c.width / r.width));
      const py = Math.floor((y - r.top)  * (c.height/ r.height));

      if(px < 0 || py < 0 || px >= c.width || py >= c.height) return null;

      const d = ctx.getImageData(px, py, 1, 1).data;
      return 0.2126*d[0] + 0.7152*d[1] + 0.0722*d[2];
    }catch(e){
      return null;
    }
  }

  function style(el, base, lum){
    if(lum == null) return;

    // DIREKT + INVERTIERT (kein smoothing)
    let t = lum / 255;
    t = 1 - t;

    let r,g,b;
    if(base === '#ffd400'){
      r = 200 + t*55;
      g = 150 + t*90;
      b = 0   + t*40;
    } else {
      r = 0   + t*120;
      g = 130 + t*120;
      b = 0   + t*80;
    }

    const col = 'rgb('+ (r|0) +','+ (g|0) +','+ (b|0) +')';
    el.style.background = col;
    el.style.boxShadow = '0 0 '+ (4 + t*8).toFixed(1) +'px '+ col;
    el.style.filter = 'none';
  }

  function apply(line, base, boxId){
    if(boxId==='dnx-seg-yellow' && window.__dnxYellowEnabled === false) return;
    if(boxId==='dnx-seg-green' && window.__dnxGreenEnabled === false) return;
    if(!line) return;

    const x = parseFloat(line.style.left||'NaN');
    const top = parseFloat(line.style.top||'NaN');
    const h = parseFloat(line.style.height||'NaN');
    const w = parseFloat(line.style.width||'2');
    if(!isFinite(x)||!isFinite(top)||!isFinite(h)) return;

    const r = getRect();
    if(!r) return;

    // Original-Linie unsichtbar machen
    line.style.background='transparent';
    line.style.boxShadow='none';

    const box = ensureBox(boxId);

    const segH = 6;
    const count = Math.max(1, Math.ceil(h/segH));

    for(let i=0;i<count;i++){
      const seg = getSeg(box, i, w);
      const y = top + i*segH;
      const realH = Math.min(segH, top + h - y);

      seg.style.left = Math.round(x)+'px';
      seg.style.top  = Math.round(y)+'px';
      seg.style.height = Math.max(1, Math.round(realH))+'px';
      seg.style.display = '';

      const lum = lumaAt(x, y);
      style(seg, base, lum);
    }

    for(let i=box.children.length-1;i>=count;i--){
      box.children[i].style.display='none';
    }
  }

  setInterval(function(){
    if(window.__dnxYellowEnabled !== false){
      apply(window.yellowLine, '#ffd400', 'dnx-seg-yellow');
    } else {
      try{
        var by = document.getElementById('dnx-seg-yellow');
        if(by){ by.innerHTML=''; by.style.display='none'; }
        document.querySelectorAll('.dnx-seg-yellow').forEach(function(el){ el.style.display='none'; });
      }catch(e){}
    }

    if(window.__dnxGreenEnabled !== false){
      apply(window.greenCenter, '#22ff2f', 'dnx-seg-green');
    } else {
      try{
        var bg = document.getElementById('dnx-seg-green');
        if(bg){ bg.innerHTML=''; bg.style.display='none'; }
        document.querySelectorAll('.dnx-seg-green').forEach(function(el){ el.style.display='none'; });
      }catch(e){}
    }
  }, 60);

})();
 /* DNX_SEGMENTS_TRUE_PER_SEG_END */



;


;


;


;


;

;

;

;
/* === DNX_DISABLE_PRINT === */
(function(){
 if(window.__dnxNoPrint) return;
 window.__dnxNoPrint=true;
 window.print=function(){console.log("print blocked");};
 document.addEventListener("keydown",function(e){
   if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="p"){
     e.preventDefault(); e.stopPropagation(); return false;
   }
 },true);
 
})();

;

;

;

;

;



/* === DNX_DISABLE_PRINT === */
(function(){
 if(window.__dnxNoPrint) return;
 window.__dnxNoPrint=true;
 window.print=function(){console.log("print blocked");};
 document.addEventListener("keydown",function(e){
   if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="p"){
     e.preventDefault(); e.stopPropagation(); return false;
   }
 },true);
 
})();
/* dnx_overlay_test disabled: local file missing */

/* DNX_RECEIVER_OVERLAY_START */
(function(){
  if(window.__dnxReceiverOverlayV2) return;
  window.__dnxReceiverOverlayV2 = true;

  var PANEL_ID = "openwebrx-panel-receiver";
  var WRAP_ID = "dnx-receiver-overlay";
  var BAR_ID = "dnx-receiver-overlay-bar";
  var BODY_ID = "dnx-receiver-overlay-body";
  var STYLE_ID = "dnx-receiver-overlay-style";
  var STORE_KEY = "dnx.receiver.overlay.v2.pos";

  var wrap = null;
  var body = null;
  var drag = false;
  var sx = 0, sy = 0, sl = 0, st = 0;

  function savePos(x, y){
    try{
      localStorage.setItem(STORE_KEY, JSON.stringify({x: Math.round(x), y: Math.round(y)}));
    }catch(e){}
  }

  function loadPos(){
    try{
      var raw = localStorage.getItem(STORE_KEY);
      if(!raw) return null;
      var v = JSON.parse(raw);
      if(typeof v.x !== "number" || typeof v.y !== "number") return null;
      return v;
    }catch(e){
      return null;
    }
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#" + WRAP_ID + "{position:fixed;left:-9999px;top:-9999px;visibility:hidden;z-index:2147483647;background:rgba(4,20,8,.28);border:2px solid rgba(50,255,120,.88);border-radius:12px;box-shadow:0 0 14px rgba(30,255,110,.55), 0 0 30px rgba(20,200,80,.32), 0 0 48px rgba(20,160,70,.18), inset 0 0 12px rgba(40,180,70,.18);overflow:visible;min-width:320px;padding:2px 0 2px 2px;box-sizing:border-box;}",
      "#" + WRAP_ID + ".dragging{opacity:.98;}",
      "#" + BAR_ID + "{position:absolute;top:0;left:0;width:100%;height:5px;line-height:5px;padding:0;cursor:move;background:rgba(255,0,0,.85);border:none;color:transparent;font-size:0;user-select:none;border-radius:6px 6px 0 0;z-index:2147483647;}",
      "#" + BODY_ID + "{position:relative;background:transparent;padding-top:5px;}",
      "#" + WRAP_ID + " #" + PANEL_ID + "{position:relative !important;left:0 !important;top:0 !important;right:auto !important;bottom:auto !important;transform:none !important;margin:0 !important;display:block !important;z-index:auto !important;}",
      "body > #" + PANEL_ID + "{display:none !important;}"
    ].join("\\n");
    document.head.appendChild(style);
  }

  function clamp(){
    if(!wrap) return;
    var r = wrap.getBoundingClientRect();
    var left = Math.max(0, Math.min(r.left, window.innerWidth - r.width));
    var top = Math.max(0, Math.min(r.top, window.innerHeight - r.height));
    wrap.style.left = left + "px";
    wrap.style.top = top + "px";
  }

  function ensureWrap(){
    wrap = document.getElementById(WRAP_ID);
    if(wrap) {
      body = document.getElementById(BODY_ID);
      return wrap;
    }

    wrap = document.createElement("div");
    wrap.id = WRAP_ID;

    var bar = document.createElement("div");
    bar.id = BAR_ID;
    bar.textContent = "";

    body = document.createElement("div");
    body.id = BODY_ID;

    wrap.appendChild(bar);
    wrap.appendChild(body);
    document.body.appendChild(wrap);

    var saved = loadPos();
    if(saved){
      wrap.style.setProperty("left", saved.x + "px", "important");
      wrap.style.setProperty("top", saved.y + "px", "important");
      wrap.style.setProperty("right", "auto", "important");
      wrap.style.setProperty("bottom", "auto", "important");
    } else {
      wrap.style.setProperty("left", "20px", "important");
      wrap.style.setProperty("top", "120px", "important");
      wrap.style.setProperty("right", "auto", "important");
      wrap.style.setProperty("bottom", "auto", "important");
    }
    wrap.style.setProperty("visibility", "visible", "important");

    bar.addEventListener("mousedown", function(e){
      if(e.button !== 0) return;
      var r = wrap.getBoundingClientRect();
      drag = true;
      sx = e.clientX;
      sy = e.clientY;
      sl = r.left;
      st = r.top;
      wrap.classList.add("dragging");
      e.preventDefault();
      e.stopPropagation();
    }, true);

    document.addEventListener("mousemove", function(e){
      if(!drag) return;
      wrap.style.setProperty("left", (sl + (e.clientX - sx)) + "px", "important");
      wrap.style.setProperty("top",  (st + (e.clientY - sy)) + "px", "important");
      wrap.style.setProperty("right", "auto", "important");
      wrap.style.setProperty("bottom", "auto", "important");
    }, true);

    document.addEventListener("mouseup", function(){
      if(!drag) return;
      drag = false;
      wrap.classList.remove("dragging");
      clamp();
      var r = wrap.getBoundingClientRect();
      savePos(r.left, r.top);
    }, true);

    window.addEventListener("resize", function(){
      clamp();
      var r = wrap.getBoundingClientRect();
      savePos(r.left, r.top);
    });

    return wrap;
  }

  function attachPanel(){
    var panel = document.getElementById(PANEL_ID);
    if(!panel) return false;

    ensureStyle();
    ensureWrap();

    var saved = loadPos();
    if(saved){
      wrap.style.setProperty("left", saved.x + "px", "important");
      wrap.style.setProperty("top", saved.y + "px", "important");
      wrap.style.setProperty("right", "auto", "important");
      wrap.style.setProperty("bottom", "auto", "important");
    } else {
      wrap.style.setProperty("left", "20px", "important");
      wrap.style.setProperty("top", "120px", "important");
      wrap.style.setProperty("right", "auto", "important");
      wrap.style.setProperty("bottom", "auto", "important");
    }
    wrap.style.setProperty("visibility", "visible", "important");

    if(panel.parentNode !== body){
      body.appendChild(panel);
    }

    var wrapOpen = "1";
    try{ wrapOpen = localStorage.getItem("dnx.receiver.overlay.visible") || "1"; }catch(e){}
    wrap.style.setProperty("display", wrapOpen === "1" ? "block" : "none", "important");

    panel.style.setProperty("display", "block", "important");
    panel.style.setProperty("position", "relative", "important");
    panel.style.setProperty("left", "0px", "important");
    panel.style.setProperty("top", "0px", "important");
    panel.style.setProperty("right", "auto", "important");
    panel.style.setProperty("bottom", "auto", "important");
    panel.style.setProperty("transform", "none", "important");
    panel.style.setProperty("margin", "0", "important");

    setTimeout(function(){
      try{
        var pr = panel.getBoundingClientRect();
        if(pr.width > 40){
          wrap.style.width = Math.ceil(pr.width) + "px";
        }
      }catch(e){}
      clamp();
    }, 50);

    return true;
  }

  function boot(){
    attachPanel();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){
    attachPanel();
  });

  new MutationObserver(function(){
    var panel = document.getElementById(PANEL_ID);
    if(panel && body && panel.parentNode !== body){
      attachPanel();
    }
  }).observe(document.documentElement, {childList:true, subtree:true});
})();
 /* DNX_RECEIVER_OVERLAY_END */

/* DNX_RED_BAR_OVERRIDE_START */
(function(){
  if(window.__dnxRedBarOverride) return;
  window.__dnxRedBarOverride = true;

  function apply(){
    var bar = document.getElementById("dnx-receiver-overlay-bar");
    var body = document.getElementById("dnx-receiver-overlay-body");
    if(!bar) return;

    bar.style.setProperty("position", "relative", "important");
    bar.style.setProperty("display", "block", "important");
    bar.style.setProperty("width", "100%", "important");
    bar.style.setProperty("height", "10px", "important");
    bar.style.setProperty("line-height", "10px", "important");
    bar.style.setProperty("padding", "0", "important");
    bar.style.setProperty("margin", "0", "important");
    bar.style.setProperty("background", "rgba(255,0,0,0.9)", "important");
    bar.style.setProperty("cursor", "move", "important");
    bar.style.setProperty("border", "none", "important");
    bar.style.setProperty("border-radius", "8px 8px 0 0", "important");
    bar.style.setProperty("z-index", "2147483647", "important");
    bar.textContent = "";

    if(body){
      body.style.setProperty("padding-top", "0", "important");
      body.style.setProperty("margin-top", "0", "important");
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(apply, 350);
    }, {once:true});
  } else {
    setTimeout(apply, 350);
  }

  window.addEventListener("load", function(){
    setTimeout(apply, 500);
  });

  window.addEventListener("resize", function(){ setTimeout(apply, 120); });
})();
/* DNX_RED_BAR_OVERRIDE_END */

/* DNX_RED_BAR_FIT_START */
(function(){
  if(window.__dnxRedBarFit) return;
  window.__dnxRedBarFit = true;

  function fit(){
    var bar = document.getElementById("dnx-receiver-overlay-bar");
    var panel = document.getElementById("openwebrx-panel-receiver");
    if(!bar || !panel) return;

    var pw = panel.getBoundingClientRect().width;
    if(!pw || pw < 50) return;

    bar.style.setProperty("width", Math.round(pw) + "px", "important");
    bar.style.setProperty("max-width", Math.round(pw) + "px", "important");
    bar.style.setProperty("min-width", Math.round(pw) + "px", "important");
    bar.style.setProperty("left", "0px", "important");
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(fit, 350);
    }, {once:true});
  } else {
    setTimeout(fit, 350);
  }

  window.addEventListener("load", function(){
    setTimeout(fit, 500);
  });

  window.addEventListener("resize", fit);
  window.addEventListener("resize", function(){ setTimeout(fit, 120); });
})();
/* DNX_RED_BAR_FIT_END */

/* DNX_FXBOX_FIX_START */
(function(){
  if(window.__dnxFxBoxFix) return;
  window.__dnxFxBoxFix = true;

  function placeFx(){
    var receiver = document.getElementById("openwebrx-panel-receiver");
    var box = document.getElementById("dnx-fx-box");
    if(!receiver || !box) return;

    box.style.setProperty("display", "block", "important");
    box.style.setProperty("visibility", "visible", "important");
    box.style.setProperty("opacity", "1", "important");

    var freqBlock =
      receiver.querySelector(".webrx-actual-freq-holder") ||
      receiver.querySelector(".webrx-actual-freq") ||
      receiver.firstElementChild;

    if(freqBlock && freqBlock.parentNode === receiver){
      if(box.nextElementSibling !== freqBlock){
        receiver.insertBefore(box, freqBlock);
      }
    } else if(receiver.firstElementChild !== box) {
      receiver.insertBefore(box, receiver.firstChild);
    }
  }

  function boot(){
    placeFx();
    setTimeout(placeFx, 300);
    setTimeout(placeFx, 1200);
    setTimeout(placeFx, 2500);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){
    setTimeout(placeFx, 500);
  });

  new MutationObserver(placeFx).observe(document.documentElement, {
    childList:true,
    subtree:true
  });

  setInterval(placeFx, 1000);
})();
/* DNX_FXBOX_FIX_END */

/* DNX_FXBOX_INLINE_START */
(function(){
  if(window.__dnxFxInline) return;
  window.__dnxFxInline = true;

  var BOX_ID = "dnx-fx-box-inline";
  var STORE = "dnx_fx_state_v2";

  function loadState(){
    try{
      return Object.assign({vol:18,pitch:100,len:80,sound:"Soft",mute:false,collapsed:false}, JSON.parse(localStorage.getItem(STORE) || "{}"));
    }catch(e){
      return {vol:18,pitch:100,len:80,sound:"Soft",mute:false,collapsed:false};
    }
  }

  function saveState(state){
    try{ localStorage.setItem(STORE, JSON.stringify(state)); }catch(e){}
  }

  function beep(state){
    if(state.mute) return;
    try{
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      var ctx = new AC();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      var type = "sine";
      var base = 880;
      if(state.sound === "Click"){ type = "square"; base = 1200; }
      if(state.sound === "Digital"){ type = "sawtooth"; base = 1500; }
      if(state.sound === "Retro"){ type = "triangle"; base = 700; }

      osc.type = type;
      osc.frequency.value = Math.max(80, base * (state.pitch/100));
      gain.gain.value = Math.max(0, Math.min(1, state.vol/100)) * 0.12;

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      var dur = Math.max(20, state.len);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur/1000);
      osc.stop(ctx.currentTime + dur/1000 + 0.02);

      setTimeout(function(){ try{ ctx.close(); }catch(e){} }, dur + 120);
    }catch(e){}
  }

  function row(labelText, inputEl, valueEl){
    var row = document.createElement("div");
    row.className = "dnx-fx-row";

    var label = document.createElement("label");
    label.className = "dnx-fx-label";
    label.textContent = labelText;

    var mid = document.createElement("div");
    mid.className = "dnx-fx-mid";
    mid.appendChild(inputEl);

    row.appendChild(label);
    row.appendChild(mid);
    if(valueEl) row.appendChild(valueEl);
    return row;
  }

  function makeRange(min,max,val){
    var el = document.createElement("input");
    el.type = "range";
    el.min = String(min);
    el.max = String(max);
    el.value = String(val);
    el.className = "dnx-fx-range";
    return el;
  }

  function build(){
    var receiver = document.getElementById("openwebrx-panel-receiver");
    if(!receiver) return;

    var old = document.getElementById(BOX_ID);
    if(old) old.remove();

    var state = loadState();

    var box = document.createElement("div");
    box.id = BOX_ID;
    box.setAttribute("data-dnx-collapsed", state.collapsed ? "1" : "0");

    var style = document.createElement("style");
    style.textContent = `
      #${BOX_ID}{
        margin:0 0 8px 0;
        padding:8px 10px 10px 10px;
        border-radius:8px;
        background:rgba(90,90,90,.58);
        box-sizing:border-box;
        color:#fff;
        font-size:12px;
      }
      #${BOX_ID} *{ box-sizing:border-box; }
      #${BOX_ID} .dnx-fx-title{ font-weight:700; font-size:13px; margin:0 0 8px 0; cursor:pointer; user-select:none; }
      #${BOX_ID} .dnx-fx-row{ display:grid; grid-template-columns:86px 1fr 72px; gap:8px; align-items:center; margin:0 0 8px 0; }
      #${BOX_ID} .dnx-fx-row.dnx-fx-sound{ grid-template-columns:86px 1fr 20px; }
      #${BOX_ID} .dnx-fx-label{ color:#fff; font-weight:600; }
      #${BOX_ID} .dnx-fx-range{ width:100%; }
      #${BOX_ID} .dnx-fx-value{ text-align:right; color:#fff; font-weight:700; }
      #${BOX_ID} select{
        width:100%; height:28px; border-radius:4px; border:0; padding:2px 8px;
        background:rgba(20,20,20,.35); color:#fff; font-size:12px;
      }
      #${BOX_ID} .dnx-fx-bottom{ display:flex; align-items:center; gap:10px; margin-top:4px; }
      #${BOX_ID} .dnx-fx-mute{ display:flex; align-items:center; gap:6px; font-weight:600; }
      #${BOX_ID} .dnx-fx-test{
        height:28px; padding:0 10px; border-radius:4px; border:0;
        background:#ececec; color:#111; cursor:pointer; font-weight:700;
      }
      #${BOX_ID} .dnx-fx-status{ margin-top:6px; color:#7fe3ff; font-weight:600; }
    `;
    box.appendChild(style);

    var title = document.createElement("div");
    title.className = "dnx-fx-title";
    title.textContent = (state.collapsed ? "▸ " : "▾ ") + "FX / Pip";
    box.appendChild(title);

    var title = document.createElement("div");
    title.className = "dnx-fx-title";
    title.textContent = "FX / Pip";
    box.appendChild(title);

    var vol = makeRange(0,100,state.vol);
    var volVal = document.createElement("div");
    volVal.className = "dnx-fx-value";
    box.appendChild(row("Lautst.", vol, volVal));

    var pitch = makeRange(10,100,state.pitch);
    var pitchVal = document.createElement("div");
    pitchVal.className = "dnx-fx-value";
    box.appendChild(row("Tonhöhe", pitch, pitchVal));

    var leng = makeRange(20,300,state.len);
    var lenVal = document.createElement("div");
    lenVal.className = "dnx-fx-value";
    box.appendChild(row("Länge", leng, lenVal));

    var sel = document.createElement("select");
    ["Soft","Click","Digital","Retro"].forEach(function(v){
      var o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      if(v === state.sound) o.selected = true;
      sel.appendChild(o);
    });
    var arrow = document.createElement("div");
    arrow.className = "dnx-fx-value";
    arrow.textContent = "▾";
    var soundRow = row("Sound", sel, arrow);
    soundRow.classList.add("dnx-fx-sound");
    box.appendChild(soundRow);

    var bottom = document.createElement("div");
    bottom.className = "dnx-fx-bottom";

    var muteWrap = document.createElement("label");
    muteWrap.className = "dnx-fx-mute";
    var mute = document.createElement("input");
    mute.type = "checkbox";
    mute.checked = !!state.mute;
    muteWrap.appendChild(mute);
    muteWrap.appendChild(document.createTextNode("Stumm"));

    var test = document.createElement("button");
    test.type = "button";
    test.className = "dnx-fx-test";
    test.textContent = "Test";

    bottom.appendChild(muteWrap);
    bottom.appendChild(test);
    box.appendChild(bottom);

    var status = document.createElement("div");
    status.className = "dnx-fx-status";
    status.textContent = "Modus-Ton: aktiv";
    box.appendChild(status);

    function applyCollapsed(){
      var isCollapsed = box.getAttribute("data-dnx-collapsed") === "1";
      [soundRow, bottom, status].forEach(function(el){
        el.style.display = isCollapsed ? "none" : "";
      });
      [vol.closest(".dnx-fx-row"), pitch.closest(".dnx-fx-row"), leng.closest(".dnx-fx-row")].forEach(function(el){
        if(el) el.style.display = isCollapsed ? "none" : "";
      });
      title.classList.remove("openwebrx-rx-details-arrow--up");
      title.classList.remove("openwebrx-rx-details-arrow-up");
      title.classList.remove("openwebrx-rx-details-arrow--down");
      title.classList.remove("openwebrx-rx-details-arrow-down");
      title.textContent = (isCollapsed ? "▸ " : "▾ ") + "FX / Pip";
    }

    title.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      var next = !(box.getAttribute("data-dnx-collapsed") === "1");
      box.setAttribute("data-dnx-collapsed", next ? "1" : "0");
      var st = currentState();
      st.collapsed = next;
      saveState(st);
      applyCollapsed();
    }, true);

    function currentState(){
      return {
        vol: parseInt(vol.value,10)||0,
        pitch: parseInt(pitch.value,10)||100,
        len: parseInt(leng.value,10)||80,
        sound: sel.value || "Soft",
        mute: !!mute.checked,
        collapsed: box.getAttribute("data-dnx-collapsed") === "1"
      };
    }

    function sync(){
      var st = currentState();
      volVal.textContent = st.vol + "%";
      pitchVal.textContent = st.pitch + "%";
      lenVal.textContent = st.len + "ms";
      saveState(st);
    }

    [vol,pitch,leng,sel,mute].forEach(function(el){
      el.addEventListener("input", sync);
      el.addEventListener("change", sync);
    });

    test.addEventListener("click", function(){
      var st = currentState();
      sync();
    applyCollapsed();
      beep(st);
    });

    sync();

    var freqBlock =
      receiver.querySelector(".webrx-actual-freq-holder") ||
      receiver.querySelector(".webrx-actual-freq") ||
      receiver.firstElementChild;

    if(freqBlock && freqBlock.parentNode === receiver){
      receiver.insertBefore(box, freqBlock);
    } else {
      receiver.insertBefore(box, receiver.firstChild);
    }
  }

  function boot(){
    build();
    setTimeout(build, 400);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);

  window.addEventListener("resize", function(){ setTimeout(build, 120); });
})();
/* DNX_FXBOX_INLINE_END */

(function(){
  if(window.__dnxFxTitleDedup) return;
  window.__dnxFxTitleDedup = true;

  function dedup(){
    var box = document.getElementById("dnx-fx-box-inline");
    if(!box) return;

    var titles = box.querySelectorAll(".dnx-fx-title");
    if(titles.length <= 1) return;

    for(var i = 0; i < titles.length - 1; i++){
      titles[i].remove();
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", dedup, {once:true});
  } else {
    dedup();
  }

  window.addEventListener("load", dedup);
  window.setInterval(dedup, 300);
})();


(function(){
  if(window.__dnxFxTitleArrowStrip) return;
  window.__dnxFxTitleArrowStrip = true;

  function clean(){
    var title = document.querySelector("#dnx-fx-box-inline .dnx-fx-title");
    if(!title) return;
    title.classList.remove("openwebrx-rx-details-arrow");
    title.classList.remove("openwebrx-photo-trigger");
    title.classList.remove("openwebrx-rx-details-arrow--up");
    title.classList.remove("openwebrx-rx-details-arrow-up");
    title.classList.remove("openwebrx-rx-details-arrow--down");
    title.classList.remove("openwebrx-rx-details-arrow-down");
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", clean, {once:true});
  } else {
    clean();
  }
  window.addEventListener("load", clean);
  window.setInterval(clean, 300);
})();


/* DNX_FX_MODE_HOOK_START */
(function(){
  if(window.__dnxFxModeHook) return;
  window.__dnxFxModeHook = true;

  var STORE = "dnx_fx_state_v2";
  var lastBeep = 0;
  var MODES = {
    "FM":1,"WFM":1,"AM":1,"LSB":1,"USB":1,"CW":1,"SAM":1,"DATA":1,
    "DMR":1,"D-STAR":1,"DSTAR":1,"NXDN":1,"YSF":1,"M17":1,
    "FREEDV":1,"FREE":1,"RADEL":1,"RADEU":1,"RADE":1,"DRM":1,"DAB":1,"HDR":1,"DIG":1
  };

  function loadState(){
    try{
      return Object.assign({vol:18,pitch:100,len:80,sound:"Soft",mute:false}, JSON.parse(localStorage.getItem(STORE) || "{}"));
    }catch(e){
      return {vol:18,pitch:100,len:80,sound:"Soft",mute:false};
    }
  }

  function beep(state){
    if(state.mute) return;
    try{
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      var ctx = new AC();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      var type = "sine";
      var base = 880;
      if(state.sound === "Click"){ type = "square"; base = 1200; }
      if(state.sound === "Digital"){ type = "sawtooth"; base = 1500; }
      if(state.sound === "Retro"){ type = "triangle"; base = 700; }

      osc.type = type;
      osc.frequency.value = Math.max(80, base * (state.pitch/100));
      gain.gain.value = Math.max(0, Math.min(1, state.vol/100)) * 0.12;

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      var dur = Math.max(20, state.len);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur/1000);
      osc.stop(ctx.currentTime + dur/1000 + 0.02);

      setTimeout(function(){ try{ ctx.close(); }catch(e){} }, dur + 120);
    }catch(e){}
  }

  function norm(t){
    return String(t || "").replace(/\s+/g, " ").trim().toUpperCase();
  }

  function modeFromTarget(target){
    var n = target;
    while(n && n !== document){
      var txt = norm(n.textContent);
      if(MODES[txt]) return txt;

      var dm = n.getAttribute && (n.getAttribute("data-modulation") || n.getAttribute("data-mode"));
      if(dm){
        dm = norm(dm);
        if(MODES[dm]) return dm;
      }

      n = n.parentNode;
    }
    return null;
  }

  function updateStatus(mode){
    var el = document.querySelector("#dnx-fx-box-inline .dnx-fx-status, #dnx-fx-box .dnx-fx-status");
    if(el){
      el.textContent = "Modus-Ton: aktiv" + (mode ? " (" + mode + ")" : "");
    }
  }

  function hook(){
    var receiver = document.getElementById("openwebrx-panel-receiver");
    if(!receiver || receiver.dataset.dnxFxModeHook === "1") return;
    receiver.dataset.dnxFxModeHook = "1";

    receiver.addEventListener("click", function(e){
      var mode = modeFromTarget(e.target);
      if(!mode) return;

      var now = Date.now();
      if(now - lastBeep < 120) return;
      lastBeep = now;

      var st = loadState();
      updateStatus(mode);
      beep(st);
    }, true);
  }

  function boot(){
    hook();
    setTimeout(hook, 400);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){
    setTimeout(hook, 500);
  });

  window.addEventListener("resize", function(){ setTimeout(hook, 120); });
})();
/* DNX_FX_MODE_HOOK_END */







/* DNX_RECEIVER_OVERLAY_TOGGLE_SIMPLE_START */
(function(){
  if(window.__dnxReceiverOverlayToggleSimple) return;
  window.__dnxReceiverOverlayToggleSimple = true;

  var VIS_KEY = "dnx.receiver.overlay.visible";
  var WRAP_ID = "dnx-receiver-overlay";
  var BTN_SEL = '[data-toggle-panel="openwebrx-panel-receiver"]';

  function getWrap(){ return document.getElementById(WRAP_ID); }

  function loadVisible(){
    try{
      var raw = localStorage.getItem(VIS_KEY);
      if(raw === null) return true;
      return raw === "1";
    }catch(e){
      return true;
    }
  }

  function saveVisible(v){
    try{ localStorage.setItem(VIS_KEY, v ? "1" : "0"); }catch(e){}
  }

  function applyState(){
    var wrap = getWrap();
    if(!wrap) return;

    var open = loadVisible();
    wrap.style.setProperty("display", open ? "block" : "none", "important");
    if(open) wrap.style.setProperty("visibility", "visible", "important");

    document.querySelectorAll(BTN_SEL).forEach(function(btn){
      btn.classList.toggle("openwebrx-button-selected", open);
      btn.setAttribute("aria-pressed", open ? "true" : "false");
    });
  }

  function bindButtons(){
    document.querySelectorAll(BTN_SEL).forEach(function(btn){
      if(btn.dataset.dnxReceiverOverlayToggleSimpleBound === "1") return;
      btn.dataset.dnxReceiverOverlayToggleSimpleBound = "1";

      btn.addEventListener("click", function(ev){
        var wrap = getWrap();
        if(!wrap) return;

        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        saveVisible(!loadVisible());
        applyState();
        return false;
      }, true);
    });
  }

  function boot(){
    bindButtons();
    applyState();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){ setTimeout(boot, 250); });
})();
 /* DNX_RECEIVER_OVERLAY_TOGGLE_SIMPLE_END */

/* DNX_RECEIVER_OVERLAY_TOGGLE_SIMPLE_START */
(function(){
  if(window.__dnxReceiverOverlayToggleSimple) return;
  window.__dnxReceiverOverlayToggleSimple = true;

  var VIS_KEY = "dnx.receiver.overlay.visible";
  var WRAP_ID = "dnx-receiver-overlay";
  var BTN_SEL = '[data-toggle-panel="openwebrx-panel-receiver"]';

  function getWrap(){ return document.getElementById(WRAP_ID); }

  function loadVisible(){
    try{
      var raw = localStorage.getItem(VIS_KEY);
      if(raw === null) return true;
      return raw === "1";
    }catch(e){
      return true;
    }
  }

  function saveVisible(v){
    try{ localStorage.setItem(VIS_KEY, v ? "1" : "0"); }catch(e){}
  }

  function applyState(){
    var wrap = getWrap();
    if(!wrap) return;

    var open = loadVisible();
    wrap.style.setProperty("display", open ? "block" : "none", "important");
    if(open) wrap.style.setProperty("visibility", "visible", "important");

    document.querySelectorAll(BTN_SEL).forEach(function(btn){
      btn.classList.toggle("openwebrx-button-selected", open);
      btn.setAttribute("aria-pressed", open ? "true" : "false");
    });
  }

  function bindButtons(){
    document.querySelectorAll(BTN_SEL).forEach(function(btn){
      if(btn.dataset.dnxReceiverOverlayToggleSimpleBound === "1") return;
      btn.dataset.dnxReceiverOverlayToggleSimpleBound = "1";

      btn.addEventListener("click", function(ev){
        var wrap = getWrap();
        if(!wrap) return;

        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        saveVisible(!loadVisible());
        applyState();
        return false;
      }, true);
    });
  }

  function boot(){
    bindButtons();
    applyState();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){ setTimeout(boot, 250); });
})();
 /* DNX_RECEIVER_OVERLAY_TOGGLE_SIMPLE_END */

/* DNX_RECEIVER_OVERLAY_RESIZE_START */
(function(){
  if(window.__dnxReceiverOverlayResize) return;
  window.__dnxReceiverOverlayResize = true;

  var WRAP_ID = "dnx-receiver-overlay";
  var BODY_ID = "dnx-receiver-overlay-body";
  var PANEL_ID = "openwebrx-panel-receiver";
  var STYLE_ID = "dnx-receiver-overlay-resize-style";
  var SIZE_KEY = "dnx.receiver.overlay.size.v2";
  var BAR_H = 10;
  var MIN_W = 260;
  var MIN_H = 320;
  var MAX_W = Math.max(520, window.innerWidth - 40);
  var MAX_H = Math.max(520, window.innerHeight - 40);

  var resizing = false;
  var mode = null;
  var sx = 0, sy = 0;
  var startW = 0, startH = 0, startL = 0, startT = 0;

  function getWrap(){ return document.getElementById(WRAP_ID); }
  function getBody(){ return document.getElementById(BODY_ID); }
  function getPanel(){ return document.getElementById(PANEL_ID); }

  function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }

  function loadSize(){
    try{
      var raw = localStorage.getItem(SIZE_KEY);
      if(!raw) return null;
      var v = JSON.parse(raw);
      if(typeof v.w !== "number" || typeof v.h !== "number") return null;
      return v;
    }catch(e){
      return null;
    }
  }

  function saveSize(w, h){
    try{ localStorage.setItem(SIZE_KEY, JSON.stringify({w: Math.round(w), h: Math.round(h)})); }catch(e){}
  }

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#dnx-receiver-overlay .dnx-resize-handle{position:absolute;z-index:2147483647;background:transparent;}",
      "#dnx-receiver-overlay .dnx-rh-n{left:12px;right:12px;top:-4px;height:8px;cursor:ns-resize;}",
      "#dnx-receiver-overlay .dnx-rh-s{left:12px;right:12px;bottom:-4px;height:8px;cursor:ns-resize;}",
      "#dnx-receiver-overlay .dnx-rh-w{top:12px;bottom:12px;left:-4px;width:8px;cursor:ew-resize;}",
      "#dnx-receiver-overlay .dnx-rh-e{top:12px;bottom:12px;right:-4px;width:8px;cursor:ew-resize;}",
      "#dnx-receiver-overlay .dnx-rh-nw{left:-6px;top:-6px;width:14px;height:14px;cursor:nwse-resize;}",
      "#dnx-receiver-overlay .dnx-rh-ne{right:-6px;top:-6px;width:14px;height:14px;cursor:nesw-resize;}",
      "#dnx-receiver-overlay .dnx-rh-sw{left:-6px;bottom:-6px;width:14px;height:14px;cursor:nesw-resize;}",
      "#dnx-receiver-overlay .dnx-rh-se{right:-6px;bottom:-6px;width:14px;height:14px;cursor:nwse-resize;}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function applySize(w, h, left, top){
    var wrap = getWrap();
    var body = getBody();
    var panel = getPanel();
    if(!wrap || !body || !panel) return;

    MAX_W = Math.max(MIN_W, window.innerWidth - 20);
    MAX_H = Math.max(MIN_H, window.innerHeight - 20);

    w = clamp(w, MIN_W, MAX_W);
    h = clamp(h, MIN_H, MAX_H);

    if(typeof left === "number"){
      left = clamp(left, 0, window.innerWidth - w);
      wrap.style.setProperty("left", Math.round(left) + "px", "important");
    }
    if(typeof top === "number"){
      top = clamp(top, 0, window.innerHeight - h);
      wrap.style.setProperty("top", Math.round(top) + "px", "important");
    }

    var innerW = Math.round(w - 6);
    var innerH = Math.round(h - BAR_H - 4);

    body.style.setProperty("width", innerW + "px", "important");
    body.style.setProperty("min-width", innerW + "px", "important");
    body.style.setProperty("max-width", innerW + "px", "important");
    body.style.setProperty("height", innerH + "px", "important");
    body.style.setProperty("overflow", "hidden", "important");
    body.style.setProperty("margin", "0", "important");
    body.style.setProperty("padding", "0", "important");
    body.style.setProperty("box-sizing", "border-box", "important");

    panel.style.setProperty("width", innerW + "px", "important");
    panel.style.setProperty("min-width", innerW + "px", "important");
    panel.style.setProperty("max-width", innerW + "px", "important");
    panel.style.setProperty("height", "100%", "important");
    panel.style.setProperty("margin", "0", "important");

    wrap.style.setProperty("width", (innerW + 4) + "px", "important");
    wrap.style.setProperty("min-width", (innerW + 4) + "px", "important");
    wrap.style.setProperty("max-width", (innerW + 4) + "px", "important");
    wrap.style.setProperty("height", Math.round(h) + "px", "important");
    wrap.style.setProperty("padding-right", "2px", "important");
    wrap.style.setProperty("padding-left", "2px", "important");
    wrap.style.setProperty("box-sizing", "border-box", "important");

    var bar = document.getElementById("dnx-receiver-overlay-bar");
    if(bar){
      bar.style.setProperty("width", (innerW + 2) + "px", "important");
      bar.style.setProperty("min-width", (innerW + 2) + "px", "important");
      bar.style.setProperty("max-width", (innerW + 2) + "px", "important");
      bar.style.setProperty("margin-left", "0", "important");
      bar.style.setProperty("margin-right", "0", "important");
    }

    saveSize(w, h);
  }

  function ensureHandles(){
    var wrap = getWrap();
    if(!wrap) return;
    ensureStyle();

    ["n","s","w","e","nw","ne","sw","se"].forEach(function(pos){
      var cls = "dnx-rh-" + pos;
      if(wrap.querySelector("." + cls)) return;

      var h = document.createElement("div");
      h.className = "dnx-resize-handle " + cls;
      h.setAttribute("data-mode", pos);
      h.addEventListener("mousedown", function(e){
        if(e.button !== 0) return;
        var r = wrap.getBoundingClientRect();
        resizing = true;
        mode = pos;
        sx = e.clientX;
        sy = e.clientY;
        startW = r.width;
        startH = r.height;
        startL = r.left;
        startT = r.top;
        e.preventDefault();
        e.stopPropagation();
      }, true);
      wrap.appendChild(h);
    });
  }

  function boot(){
    ensureHandles();
    var wrap = getWrap();
    if(!wrap) return;
    var saved = loadSize();
    if(saved){
      applySize(saved.w, saved.h);
    } else {
      var r = wrap.getBoundingClientRect();
      applySize(r.width || 320, r.height || 520);
    }
  }

  document.addEventListener("mousemove", function(e){
    if(!resizing) return;

    var dx = e.clientX - sx;
    var dy = e.clientY - sy;

    var w = startW;
    var h = startH;
    var l = startL;
    var t = startT;

    if(mode.indexOf("e") !== -1) w = startW + dx;
    if(mode.indexOf("s") !== -1) h = startH + dy;
    if(mode.indexOf("w") !== -1){ w = startW - dx; l = startL + dx; }
    if(mode.indexOf("n") !== -1){ h = startH - dy; t = startT + dy; }

    if(w < MIN_W){
      if(mode.indexOf("w") !== -1) l -= (MIN_W - w);
      w = MIN_W;
    }
    if(h < MIN_H){
      if(mode.indexOf("n") !== -1) t -= (MIN_H - h);
      h = MIN_H;
    }

    applySize(w, h, l, t);
  }, true);

  document.addEventListener("mouseup", function(){
    resizing = false;
    mode = null;
  }, true);

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 200); }, {once:true});
  } else {
    setTimeout(boot, 200);
  }

  window.addEventListener("load", function(){ setTimeout(boot, 300); });
  window.addEventListener("resize", function(){ setTimeout(boot, 120); });
})();
/* DNX_RECEIVER_OVERLAY_RESIZE_END */

/* DNX_FRAME_RUNTIME_BALANCE_START */
(function(){
  if(window.__dnxFrameRuntimeBalance) return;
  window.__dnxFrameRuntimeBalance = true;

  function fit(){
    var wrap  = document.getElementById("dnx-receiver-overlay");
    var body  = document.getElementById("dnx-receiver-overlay-body");
    var panel = document.getElementById("openwebrx-panel-receiver");
    var bar   = document.getElementById("dnx-receiver-overlay-bar");
    if(!wrap || !body || !panel || !bar) return;

    var pw = Math.round(panel.getBoundingClientRect().width);
    var ph = Math.round(panel.getBoundingClientRect().height);
    if(!pw || pw < 100) return;

    var leftPad = 1;
    var rightPad = 3;
    var topPad = 2;
    var bottomPad = 2;

    wrap.style.setProperty("padding-left", leftPad + "px", "important");
    wrap.style.setProperty("padding-right", rightPad + "px", "important");
    wrap.style.setProperty("padding-top", topPad + "px", "important");
    wrap.style.setProperty("padding-bottom", bottomPad + "px", "important");
    wrap.style.setProperty("box-sizing", "border-box", "important");

    body.style.setProperty("width", pw + "px", "important");
    body.style.setProperty("min-width", pw + "px", "important");
    body.style.setProperty("max-width", pw + "px", "important");
    if(ph > 100){
      body.style.setProperty("height", ph + "px", "important");
    }

    panel.style.setProperty("width", pw + "px", "important");
    panel.style.setProperty("min-width", pw + "px", "important");
    panel.style.setProperty("max-width", pw + "px", "important");
    panel.style.setProperty("margin", "0", "important");

    wrap.style.setProperty("width", (pw + leftPad + rightPad) + "px", "important");
    wrap.style.setProperty("min-width", (pw + leftPad + rightPad) + "px", "important");
    wrap.style.setProperty("max-width", (pw + leftPad + rightPad) + "px", "important");

    bar.style.setProperty("width", (pw + rightPad - 1) + "px", "important");
    bar.style.setProperty("min-width", (pw + rightPad - 1) + "px", "important");
    bar.style.setProperty("max-width", (pw + rightPad - 1) + "px", "important");
    bar.style.setProperty("margin-left", "0", "important");
    bar.style.setProperty("margin-right", "0", "important");
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(fit, 250);
      setTimeout(fit, 900);
    }, {once:true});
  } else {
    setTimeout(fit, 250);
    setTimeout(fit, 900);
  }

  window.addEventListener("load", function(){ setTimeout(fit, 300); });
  window.addEventListener("resize", function(){ setTimeout(fit, 120); });
})();
/* DNX_FRAME_RUNTIME_BALANCE_END */

/* DNX_FRAME_SYMMETRY_FIX_START */
(function(){
  if(window.__dnxFrameSymmetryFix) return;
  window.__dnxFrameSymmetryFix = true;

  function fit(){
    var wrap  = document.getElementById("dnx-receiver-overlay");
    var body  = document.getElementById("dnx-receiver-overlay-body");
    var panel = document.getElementById("openwebrx-panel-receiver");
    var bar   = document.getElementById("dnx-receiver-overlay-bar");
    if(!wrap || !body || !panel || !bar) return;

    var pw = Math.round(panel.getBoundingClientRect().width);
    var ph = Math.round(panel.getBoundingClientRect().height);
    if(!pw || pw < 100) return;

    var side = 2;
    var top = 2;
    var bottom = 2;

    wrap.style.setProperty("box-sizing", "border-box", "important");
    wrap.style.setProperty("padding-left", side + "px", "important");
    wrap.style.setProperty("padding-right", side + "px", "important");
    wrap.style.setProperty("padding-top", top + "px", "important");
    wrap.style.setProperty("padding-bottom", bottom + "px", "important");
    wrap.style.setProperty("width", (pw + side + side) + "px", "important");
    wrap.style.setProperty("min-width", (pw + side + side) + "px", "important");
    wrap.style.setProperty("max-width", (pw + side + side) + "px", "important");

    body.style.setProperty("box-sizing", "border-box", "important");
    body.style.setProperty("width", pw + "px", "important");
    body.style.setProperty("min-width", pw + "px", "important");
    body.style.setProperty("max-width", pw + "px", "important");
    body.style.setProperty("margin", "0", "important");
    body.style.setProperty("padding", "0", "important");
    if(ph > 100){
      body.style.setProperty("height", ph + "px", "important");
    }

    panel.style.setProperty("box-sizing", "border-box", "important");
    panel.style.setProperty("width", pw + "px", "important");
    panel.style.setProperty("min-width", pw + "px", "important");
    panel.style.setProperty("max-width", pw + "px", "important");
    panel.style.setProperty("margin", "0", "important");

    bar.style.setProperty("box-sizing", "border-box", "important");
    bar.style.setProperty("display", "block", "important");
    bar.style.setProperty("width", pw + "px", "important");
    bar.style.setProperty("min-width", pw + "px", "important");
    bar.style.setProperty("max-width", pw + "px", "important");
    bar.style.setProperty("margin", "0", "important");
    bar.style.setProperty("left", "0", "important");
    bar.style.setProperty("right", "auto", "important");
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(fit, 250);
      setTimeout(fit, 900);
    }, {once:true});
  } else {
    setTimeout(fit, 250);
    setTimeout(fit, 900);
  }

  window.addEventListener("load", function(){ setTimeout(fit, 300); });
  window.addEventListener("resize", function(){ setTimeout(fit, 120); });
})();
/* DNX_FRAME_SYMMETRY_FIX_END */

/* DNX_FX_COLLAPSE_START */
(function(){
  if(window.__dnxFxCollapse) return;
  window.__dnxFxCollapse = true;

  var KEY = "dnx.fx.collapsed.v2";

  function loadState(){
    try{ return localStorage.getItem(KEY) === "1"; }catch(e){ return false; }
  }

  function saveState(v){
    try{ localStorage.setItem(KEY, v ? "1" : "0"); }catch(e){}
  }

  function apply(box, collapsed){
    var rows = box.querySelectorAll(".dnx-fx-row, .dnx-fx-bottom, .dnx-fx-status");
    var arrow = box.querySelector(".dnx-fx-collapse-arrow");
    rows.forEach(function(el){
      el.style.setProperty("display", collapsed ? "none" : "", "important");
    });
    if(arrow) arrow.textContent = collapsed ? "▸" : "▾";
  }

  function enhance(){
    var box = document.getElementById("dnx-fx-box-inline") || document.getElementById("dnx-fx-box");
    if(!box) return;

    var title = box.querySelector(".dnx-fx-title");
    if(!title) return;

    var arrow = box.querySelector(".dnx-fx-collapse-arrow");
    if(!arrow){
      arrow = document.createElement("span");
      arrow.className = "dnx-fx-collapse-arrow";
      arrow.style.cssText = "display:inline-block;margin-right:6px;color:#fff;font-size:13px;cursor:pointer;min-width:10px;";
      title.insertBefore(arrow, title.firstChild);
    }

    if(title.dataset.dnxFxCollapseBound !== "1"){
      title.dataset.dnxFxCollapseBound = "1";
      title.style.setProperty("cursor", "pointer", "important");
      title.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var collapsed = !(box.getAttribute("data-dnx-collapsed") === "1");
        box.setAttribute("data-dnx-collapsed", collapsed ? "1" : "0");
        saveState(collapsed);
        apply(box, collapsed);
      }, true);
    }

    var collapsed = loadState();
    box.setAttribute("data-dnx-collapsed", collapsed ? "1" : "0");
    apply(box, collapsed);
  }

  function boot(){
    enhance();
    setTimeout(enhance, 400);
    setTimeout(enhance, 1200);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){ setTimeout(enhance, 300); });
})();
/* DNX_FX_COLLAPSE_END */



/* DNX_FX_COLLAPSE_STYLE_START */
(function(){
  if(window.__dnxFxCollapseStyle) return;
  window.__dnxFxCollapseStyle = true;

  function styleIt(){
    var box = document.getElementById("dnx-fx-box-inline") || document.getElementById("dnx-fx-box");
    if(!box) return;

    var title = box.querySelector(".dnx-fx-title");
    var arrow = box.querySelector(".dnx-fx-collapse-arrow");
    if(!title || !arrow) return;

    title.style.setProperty("display", "flex", "important");
    title.style.setProperty("align-items", "center", "important");
    title.style.setProperty("gap", "4px", "important");
    title.style.setProperty("font-weight", "700", "important");
    title.style.setProperty("font-size", "13px", "important");
    title.style.setProperty("margin", "0 0 8px 0", "important");
    title.style.setProperty("line-height", "1", "important");

    arrow.style.setProperty("display", "inline-block", "important");
    arrow.style.setProperty("margin-right", "2px", "important");
    arrow.style.setProperty("min-width", "8px", "important");
    arrow.style.setProperty("font-size", "10px", "important");
    arrow.style.setProperty("line-height", "1", "important");
    arrow.style.setProperty("transform", "translateY(-1px)", "important");
    arrow.style.setProperty("opacity", ".95", "important");
    arrow.style.setProperty("color", "#d8d8d8", "important");
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){
      setTimeout(styleIt, 250);
      setTimeout(styleIt, 900);
    }, {once:true});
  } else {
    setTimeout(styleIt, 250);
    setTimeout(styleIt, 900);
  }

  window.addEventListener("load", function(){ setTimeout(styleIt, 300); });
})();
 /* DNX_FX_COLLAPSE_STYLE_END */

/* DNX_MODES_SWEEP_SAFE_START */
(function(){
  if(window.__dnxModesSweepSafe) return;
  window.__dnxModesSweepSafe = true;

  var MODES = {
    "FM":1,"WFM":1,"AM":1,"LSB":1,"USB":1,"CW":1,"SAM":1,"DATA":1,
    "DMR":1,"D-STAR":1,"DSTAR":1,"NXDN":1,"YSF":1,"M17":1,
    "FREEDV":1,"FREE":1,"RADEL":1,"RADEU":1,"RADE":1,"DRM":1,"DAB":1,"HDR":1,"DIG":1
  };

  function addStyle(){
    if(document.getElementById("dnx-modes-sweep-safe-style")) return;
    var style = document.createElement("style");
    style.id = "dnx-modes-sweep-safe-style";
    style.textContent = `
      #openwebrx-panel-receiver button.dnx-mode-pill-safe{
        position: relative !important;
        overflow: hidden !important;
      }
      #openwebrx-panel-receiver button.dnx-mode-pill-safe::after{
        content:"";
        position:absolute;
        top:-15%;
        bottom:-15%;
        left:-45%;
        width:28%;
        pointer-events:none;
        opacity:0;
        transform:translateX(0) skewX(-20deg);
        background:linear-gradient(90deg,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,.10) 35%,
          rgba(255,255,255,.36) 50%,
          rgba(255,255,255,.10) 65%,
          rgba(255,255,255,0) 100%);
      }
      @keyframes dnxModeSweepSafe {
        0%   { opacity:0; transform:translateX(0) skewX(-20deg); }
        12%  { opacity:1; }
        40%  { opacity:1; }
        58%  { opacity:0; transform:translateX(360%) skewX(-20deg); }
        100% { opacity:0; transform:translateX(360%) skewX(-20deg); }
      }
      #openwebrx-panel-receiver button.dnx-mode-pill-safe:hover::after{
        animation: dnxModeSweepSafe 1.0s linear infinite;
      }
      #openwebrx-panel-receiver button.dnx-mode-pill-safe:hover{
        filter: brightness(1.08);
      }
    `;
    document.head.appendChild(style);
  }

  function markButtons(){
    var root = document.getElementById("openwebrx-panel-receiver");
    if(!root) return;
    root.querySelectorAll("button").forEach(function(btn){
      var t = String(btn.innerText || btn.textContent || "").replace(/\s+/g, " ").trim().toUpperCase();
      if(MODES[t]) btn.classList.add("dnx-mode-pill-safe");
    });
  }

  function boot(){
    addStyle();
    markButtons();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){ setTimeout(boot, 200); });
  setInterval(markButtons, 1200);
})();
/* DNX_MODES_SWEEP_SAFE_END */




/* DNX_MODES_HOVER_GLOW_START */
(function(){
  if(document.getElementById("dnx-modes-hover-glow-style")) return;
  var style = document.createElement("style");
  style.id = "dnx-modes-hover-glow-style";
  style.textContent = `
    #openwebrx-panel-receiver button:hover{
      filter: brightness(1.12) !important;
      box-shadow: 0 0 10px rgba(255,255,255,.18), inset 0 0 8px rgba(255,255,255,.10) !important;
      transform: translateY(-1px);
      transition: filter .12s linear, box-shadow .12s linear, transform .12s linear;
    }
  `;
  document.head.appendChild(style);
})();
/* DNX_MODES_HOVER_GLOW_END */

/* DNX_MODE_CURRENT_JS_START */
(function(){
  if(window.__dnxModeCurrent) return;
  window.__dnxModeCurrent = true;

  var KEY = "dnx.mode.current.label";
  var MODES = {
    "FM":1,"WFM":1,"AM":1,"LSB":1,"USB":1,"CW":1,"SAM":1,"DATA":1,
    "DMR":1,"D-STAR":1,"DSTAR":1,"NXDN":1,"YSF":1,"M17":1,
    "FREEDV":1,"FREE":1,"RADEL":1,"RADEU":1,"DRM":1,"DAB":1,"HDR":1,
    "DIG":1,"GRABEN":1
  };

  function txt(el){
    return String(el && (el.innerText || el.textContent || "") || "").replace(/\s+/g," ").trim().toUpperCase();
  }

  function save(v){
    try{ localStorage.setItem(KEY, v); }catch(e){}
  }

  function load(){
    try{ return localStorage.getItem(KEY) || ""; }catch(e){ return ""; }
  }

  function modeButtons(){
    var root = document.getElementById("openwebrx-panel-receiver");
    if(!root) return [];
    return Array.from(root.querySelectorAll("button, .openwebrx-button")).filter(function(el){
      return MODES[txt(el)];
    });
  }

  function applyCurrent(label){
    modeButtons().forEach(function(el){
      el.classList.toggle("dnx-mode-current", txt(el) === label);
    });
  }

  function boot(){
    var current = load();
    if(current) applyCurrent(current);

    modeButtons().forEach(function(el){
      if(el.dataset.dnxModeCurrentBound === "1") return;
      el.dataset.dnxModeCurrentBound = "1";
      el.addEventListener("click", function(){
        var label = txt(el);
        save(label);
        setTimeout(function(){ applyCurrent(label); }, 0);
        setTimeout(function(){ applyCurrent(label); }, 120);
      }, true);
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }

  window.addEventListener("load", function(){ setTimeout(boot, 250); });
  setInterval(boot, 1200);
})();
/* DNX_MODE_CURRENT_JS_END */

/* DNX_OVERLAY_ROUNDING_START */
(function(){
  if(window.__dnxOverlayRounding) return;
  window.__dnxOverlayRounding = true;

  function addStyle(){
    if(document.getElementById("dnx-overlay-rounding-style")) return;
    var style = document.createElement("style");
    style.id = "dnx-overlay-rounding-style";
    style.textContent = `
      #dnx-receiver-overlay{
        border-radius: 16px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      #dnx-receiver-overlay::before,
      #dnx-receiver-overlay::after{
        border-radius: 16px !important;
      }

      #dnx-receiver-overlay-bar{
        border-top-left-radius: 16px !important;
        border-top-right-radius: 16px !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
      }

      #dnx-receiver-overlay-body{
        border-bottom-left-radius: 16px !important;
        border-bottom-right-radius: 16px !important;
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
      }

      #dnx-receiver-overlay-body > *{
        border-bottom-left-radius: 16px !important;
        border-bottom-right-radius: 16px !important;
      }

      #openwebrx-panel-receiver{
        border-radius: 0 0 16px 16px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      #openwebrx-panel-receiver .openwebrx-panel,
      #openwebrx-panel-receiver .openwebrx-panel-body,
      #openwebrx-panel-receiver .openwebrx-panel-content{
        border-radius: 0 0 16px 16px !important;
        overflow: hidden !important;
      }

      #dnx-receiver-overlay .dnx-resize-handle{
        border-radius: 10px !important;
      }
    `;
    document.head.appendChild(style);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", addStyle, {once:true});
  } else {
    addStyle();
  }

  window.addEventListener("load", function(){ setTimeout(addStyle, 150); });
})();
 /* DNX_OVERLAY_ROUNDING_END */

/* DNX_DMR_TEXTMATCH_START */
(function(){
  if(window.__dnxDmrTextmatch) return;
  window.__dnxDmrTextmatch = true;

  function txt(el){
    return String(el && (el.innerText || el.textContent || "") || "").replace(/\s+/g," ").trim().toUpperCase();
  }

  function mark(){
    var root = document.getElementById("openwebrx-panel-receiver");
    if(!root) return;
    root.querySelectorAll("button, .openwebrx-button").forEach(function(el){
      var t = txt(el);
      if(t === "DMR") el.classList.add("dnx-pill-dmr");
      if(t === "D-STAR" || t === "DSTAR") el.classList.add("dnx-pill-dstar");
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", mark, {once:true});
  } else {
    mark();
  }
  window.addEventListener("load", function(){ setTimeout(mark, 250); });
  setInterval(mark, 1200);
})();
 /* DNX_DMR_TEXTMATCH_END */

/* DNX_DAB_TEXTMATCH_START */
(function(){
  if(window.__dnxDabTextmatch) return;
  window.__dnxDabTextmatch = true;

  function txt(el){
    return String(el && (el.innerText || el.textContent || "") || "").replace(/\s+/g," ").trim().toUpperCase();
  }

  function mark(){
    var root = document.getElementById("openwebrx-panel-receiver");
    if(!root) return;
    root.querySelectorAll("button, .openwebrx-button").forEach(function(el){
      if(txt(el) === "DAB") el.classList.add("dnx-pill-dab");
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", mark, {once:true});
  } else {
    mark();
  }
  window.addEventListener("load", function(){ setTimeout(mark, 250); });
  setInterval(mark, 1200);
})();
 /* DNX_DAB_TEXTMATCH_END */
/* OWRX_PHOTO_DESC_RESIZE_START */
(function () {
  "use strict";

  var HEADER_SELECTOR = ".webrx-top-container";
  var DESC_SELECTOR = ".openwebrx-description-container";
  var SCALE_SELECTOR = "#openwebrx-scale-container, .openwebrx-scale-container";
  var ARROW_SELECTOR = ".openwebrx-rx-details-arrow";
  var STORAGE_KEY = "owrx.photoDesc.height.v1";
  var STYLE_ID = "owrx-photo-desc-resize-style";
  var DESC_MARKER_ATTR = "data-owrx-photo-resize-ready";
  var HANDLE_MARKER_ATTR = "data-owrx-photo-resize-handle";
  var MIN_HEIGHT = 120;
  var DRAG_RATIO = 0.55;

  var state = {
    header: null,
    desc: null,
    handle: null,
    pointerId: null,
    dragging: false,
    startClientY: 0,
    startHeight: 0,
    height: null,
    raf: 0
  };

  function loadHeight() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var value = Number(raw);
      return Number.isFinite(value) ? value : null;
    } catch (err) {
      return null;
    }
  }

  function saveHeight(height) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Math.round(height)));
    } catch (err) {
      return;
    }
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      DESC_SELECTOR + "[" + DESC_MARKER_ATTR + "] {",
      "  overflow: hidden !important;",
      "}",
      DESC_SELECTOR + "[" + DESC_MARKER_ATTR + "].expanded {",
      "  transition: none !important;",
      "}",
      SCALE_SELECTOR + "[" + HANDLE_MARKER_ATTR + "] {",
      "  cursor: ns-resize !important;",
      "  touch-action: none !important;",
      "}",
      HEADER_SELECTOR + ".owrx-photo-desc-resizing,",
      HEADER_SELECTOR + ".owrx-photo-desc-resizing * {",
      "  user-select: none !important;",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function getHeaderApi() {
    if (!window.jQuery) return null;
    var $header = window.jQuery(HEADER_SELECTOR);
    if (!$header.length) return null;
    return $header.data("header") || null;
  }

  function ensureExpanded(desc) {
    var api = getHeaderApi();
    if (api && !api.rx_photo_state && typeof api.open_rx_photo === "function") {
      api.open_rx_photo();
      return;
    }
    if (!desc.classList.contains("expanded")) {
      desc.classList.add("expanded");
    }
  }

  function clampHeight(height) {
    var maxHeight = Math.max(MIN_HEIGHT, Math.floor(window.innerHeight * 0.75));
    return Math.max(MIN_HEIGHT, Math.min(maxHeight, height));
  }

  function naturalHeight(desc) {
    var prevHeight = desc.style.height;
    var prevMaxHeight = desc.style.maxHeight;
    desc.style.height = "auto";
    desc.style.maxHeight = "none";
    var h = Math.ceil(desc.scrollHeight);
    desc.style.height = prevHeight;
    desc.style.maxHeight = prevMaxHeight;
    return h;
  }

  function applyHeight(desc, height) {
    var clamped = clampHeight(height);
    state.height = clamped;
    desc.style.height = Math.round(clamped) + "px";
    desc.style.maxHeight = Math.round(clamped) + "px";
  }

  function enforceHeight() {
    state.raf = 0;
    var desc = state.desc || document.querySelector(DESC_SELECTOR);
    if (!desc) return;
    if (!desc.classList.contains("expanded")) return;
    if (state.height == null) return;
    applyHeight(desc, state.height);
  }

  function requestEnforce() {
    if (state.raf) return;
    state.raf = window.requestAnimationFrame(enforceHeight);
  }

  function resolveInitialHeight(desc) {
    var saved = loadHeight();
    if (saved != null) {
      state.height = saved;
      if (desc.classList.contains("expanded")) applyHeight(desc, saved);
      return;
    }
    var initial = desc.classList.contains("expanded")
      ? Math.ceil(desc.getBoundingClientRect().height)
      : naturalHeight(desc);
    state.height = clampHeight(initial);
    if (desc.classList.contains("expanded")) applyHeight(desc, state.height);
  }

  function stopDrag() {
    if (!state.dragging || !state.header) return;
    state.dragging = false;
    state.header.classList.remove("owrx-photo-desc-resizing");
    if (state.height != null) saveHeight(state.height);
  }

  function onPointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId || !state.desc) return;
    var delta = (event.clientY - state.startClientY) * DRAG_RATIO;
    applyHeight(state.desc, state.startHeight + delta);
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (event.pointerId !== state.pointerId) return;
    stopDrag();
    state.pointerId = null;
  }

  function onPointerDown(event) {
    if (event.button !== 0 || !state.desc || !state.header || !state.handle) return;
    ensureExpanded(state.desc);
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.startClientY = event.clientY;
    state.startHeight = state.height != null
      ? state.height
      : Math.ceil(state.desc.getBoundingClientRect().height);
    state.header.classList.add("owrx-photo-desc-resizing");

    if (state.handle.setPointerCapture) {
      try {
        state.handle.setPointerCapture(event.pointerId);
      } catch (err) {
        state.dragging = false;
        state.pointerId = null;
        return;
      }
    }

    event.preventDefault();
  }

  function bindHandle(handle) {
    if (!handle || handle.getAttribute(HANDLE_MARKER_ATTR) === "1") return;
    state.handle = handle;
    handle.setAttribute(HANDLE_MARKER_ATTR, "1");
    handle.addEventListener("pointerdown", onPointerDown, true);
    handle.addEventListener("pointermove", onPointerMove, true);
    handle.addEventListener("pointerup", onPointerUp, true);
    handle.addEventListener("pointercancel", onPointerUp, true);
    handle.addEventListener("lostpointercapture", stopDrag, true);
  }

  function bindDescription(desc) {
    if (!desc || desc.getAttribute(DESC_MARKER_ATTR) === "1") return;
    ensureStyle();
    state.desc = desc;
    desc.setAttribute(DESC_MARKER_ATTR, "1");
    resolveInitialHeight(desc);
  }

  function refresh() {
    state.header = document.querySelector(HEADER_SELECTOR);
    var desc = document.querySelector(DESC_SELECTOR);
    if (desc) bindDescription(desc);
    var handle = document.querySelector(SCALE_SELECTOR);
    if (handle) bindHandle(handle);
    if (state.desc && state.desc.classList.contains("expanded") && !state.dragging) {
      requestEnforce();
    }
  }

  function boot() {
    refresh();

    var observer = new MutationObserver(function () {
      refresh();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    });

    window.addEventListener("resize", function () {
      if (!state.desc || state.height == null) return;
      applyHeight(state.desc, state.height);
      saveHeight(state.height);
    });

    window.setInterval(function () {
      if (!state.dragging && state.desc && state.desc.classList.contains("expanded")) refresh();
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
/* OWRX_PHOTO_DESC_RESIZE_END */




/* OWRX_3D_WATERFALL_START */
/* OWRX 3D waterfall safe v5 slab cam
   Slab renderer with freer camera controls: yaw, pitch, roll, pan, zoom. */
(function () {
  "use strict";

  var STYLE_ID = "owrx-3d-waterfall-safe-v5-slab-cam-style";
  var WRAPPER_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-wrapper";
  var OVERLAY_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-overlay";
  var TOP_MASK_ATTR = "data-owrx-3d-top-mask";
  var TOGGLE_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-toggle";
  var SETTINGS_ATTR = "data-owrx-3d-waterfall-safe-v5-slab-cam-settings";
  var SETTINGS_KEY = "owrx.waterfall.safev5slabcam.settings";
  var MODE_KEY = "owrx.waterfall.safev5slabcam.mode";
  var VIEW_KEY = "owrx.waterfall.safev5slabcam.view_fix1";
  var DEFAULT_MODE = "old";
  var MIN_WIDTH = 260;
  var MIN_HEIGHT = 120;
  var MAX_BIND_TRIES = 60;
  var BIND_INTERVAL_MS = 1000;
  var SAMPLE_WIDTH = 1536;
  var SAMPLE_HEIGHT = 320;
  var FRAME_MS = 20;
  var LIVE_INTERVAL_MS = 20;

  var state = {
    tries: 0,
    bindTimer: 0,
    liveTimer: 0,
    sourceCanvas: null,
    sourceCanvases: [],
    wrapper: null,
    overlay: null,
    toggle: null,
    settings: null,
    overlayCtx: null,
    topMask: null,
    sampleCanvas: null,
    sampleCtx: null,
    bound: false,
    mode: loadMode(),
    splitFlip: loadSplitFlip(),
    yaw: 0.003,
    pitch: -2.693,
    roll: 0,
    zoom: 2.365,
    panX: -0.031,
    panY: -0.4,
    dragging: false,
    dragMode: "orbit",
    pointerId: null,
    startX: 0,
    startY: 0,
    startYaw: 0,
    startPitch: 0,
    startRoll: 0,
    startPanX: 0,
    startPanY: 0,
    lastSampleAt: 0,
    renderQueued: false,
    viewLoaded: false,
    sampleWidth: 1024,
    sampleHeight: 240,
    avgStrength: 0.32,
    renderStyle: "filled"
  };

  function loadMode() {
    try {
      var raw = window.localStorage.getItem(MODE_KEY);
      return raw === "3d" || raw === "old" || raw === "old3d" || raw === "legacy3d" ? raw : DEFAULT_MODE;
    } catch (err) {
      return DEFAULT_MODE;
    }
  }

  function loadSplitFlip() {
    try {
      return window.localStorage.getItem(SPLIT_FLIP_KEY) === "1";
    } catch (err) {
      return false;
    }
  }

  function saveSplitFlip(value) {
    try {
      window.localStorage.setItem(SPLIT_FLIP_KEY, value ? "1" : "0");
    } catch (err) {}
  }

  function saveMode(mode) {
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch (err) {}
  }

  function loadSettings() {
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (typeof data.sampleWidth === "number") state.sampleWidth = data.sampleWidth;
      if (typeof data.sampleHeight === "number") state.sampleHeight = data.sampleHeight;
      if (typeof data.avgStrength === "number") state.avgStrength = data.avgStrength;
      if (typeof data.speedFactor === "number") state.speedFactor = data.speedFactor;
      if (typeof data.liveIntervalMs === "number") LIVE_INTERVAL_MS = data.liveIntervalMs;
      if (typeof data.renderStyle === "string") state.renderStyle = data.renderStyle;
    } catch (err) {}
  }

  function saveSettings() {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        sampleWidth: state.sampleWidth,
        sampleHeight: state.sampleHeight,
        avgStrength: state.avgStrength,
        speedFactor: state.speedFactor,
        liveIntervalMs: LIVE_INTERVAL_MS,
        renderStyle: state.renderStyle
      }));
    } catch (err) {}
  }

  function applySettings() {
    SAMPLE_WIDTH = state.sampleWidth;
    SAMPLE_HEIGHT = state.sampleHeight;
    FRAME_MS = LIVE_INTERVAL_MS;
    state.sampleCanvas = null;
    state.sampleCtx = null;
    state.lastSampleAt = 0;
  }

  function loadView() {
    if (state.viewLoaded) return;
    state.viewLoaded = true;
    try {
      var raw = window.localStorage.getItem(VIEW_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (typeof data.yaw === "number") state.yaw = data.yaw;
      if (typeof data.pitch === "number") state.pitch = data.pitch;
      if (typeof data.roll === "number") state.roll = data.roll;
      if (typeof data.zoom === "number") state.zoom = Math.min(data.zoom, 0.42);
      if (typeof data.panX === "number") state.panX = data.panX;
      if (typeof data.panY === "number") state.panY = data.panY;
    } catch (err) {}
  }

  function saveView() {
    try {
      window.localStorage.setItem(VIEW_KEY, JSON.stringify({
        yaw: round3(state.yaw),
        pitch: round3(state.pitch),
        roll: round3(state.roll),
        zoom: round3(state.zoom),
        panX: round3(state.panX),
        panY: round3(state.panY)
      }));
    } catch (err) {}
  }

  function round3(value) {
    return Math.round(value * 1000) / 1000;
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "[" + WRAPPER_ATTR + "] { position: relative !important; isolation: isolate; }",
      "[" + TOGGLE_ATTR + "] { position:absolute; top:8px; right:14px; z-index:1000030; display:inline-flex; gap:6px; padding:4px; border-radius:999px; background:transparent; border:0; box-shadow:none; backdrop-filter:none; }",
      "[" + TOGGLE_ATTR + "] button { appearance:none; border:1px solid #ffffff; background:#1414b8; color:#ffffff; border-radius:999px; padding:7px 14px; min-width:96px; font:700 13px/1.1 'Segoe UI',sans-serif; cursor:pointer; }",
      "[" + TOGGLE_ATTR + "] button.is-active { background:#c40000; color:#ffffff; border:1px solid #ffffff; box-shadow:none; }",
      "[" + SETTINGS_ATTR + "] { position:absolute; top:8px; left:14px; z-index:1000030; display:flex; gap:8px; align-items:center; padding:6px 8px; border-radius:10px; background:rgba(18,42,68,.22); border:1px solid rgba(120,220,255,.52); backdrop-filter:blur(4px); color:#ffffff; }",
      "[" + SETTINGS_ATTR + "] label { display:flex; gap:4px; align-items:center; font:600 12px/1.1 'Segoe UI',sans-serif; color:#ffffff; }",
      "[" + SETTINGS_ATTR + "] select, [" + SETTINGS_ATTR + "] button { height:28px; border-radius:7px; border:1px solid #ffffff; background:#1414b8; color:#ffffff; font:700 12px/1 'Segoe UI',sans-serif; padding:0 8px; }",
      "[" + SETTINGS_ATTR + "] button { background:#1414b8; cursor:pointer; }",
      "[" + OVERLAY_ATTR + "] { position:absolute; inset:0; display:none; z-index:10; pointer-events:none; background:#000; }",
      "[" + OVERLAY_ATTR + "].is-active { display:block; pointer-events:auto; }",
      "[" + TOP_MASK_ATTR + "] { position:absolute; left:0; right:0; top:0; height:32px; background:#000; z-index:1000004; pointer-events:none; display:none; }",
      "[" + TOP_MASK_ATTR + "].is-active { display:block; }"
    ].join("\n");
    document.head.appendChild(style);
  }

  function isVisibleCanvas(canvas) {
    if (!canvas || typeof canvas.getContext !== "function") return false;
    var rect = canvas.getBoundingClientRect();
    return rect.width >= MIN_WIDTH && rect.height >= MIN_HEIGHT;
  }

  function isLikelyWaterfallCanvas(canvas) {
    if (!isVisibleCanvas(canvas)) return false;
    var rect = canvas.getBoundingClientRect();
    var name = ((canvas.id || "") + " " + (canvas.className || "")).toLowerCase();
    var inKnownContainer = !!(canvas.closest && canvas.closest(
      "#openwebrx-panel-receiver, #openwebrx-main, .openwebrx-waterfall-container, .webrx-top-container"
    ));
    var looksWide = rect.width >= rect.height * 1.8;
    var hasHelpfulName = name.indexOf("waterfall") !== -1 || name.indexOf("spectrum") !== -1;
    return looksWide && (inKnownContainer || hasHelpfulName);
  }

  function findWaterfallCanvas() {
    var canvases = Array.prototype.slice.call(document.querySelectorAll("canvas"));
    var best = null;
    var bestScore = -1;
    canvases.forEach(function (canvas) {
      if (!isLikelyWaterfallCanvas(canvas)) return;
      var rect = canvas.getBoundingClientRect();
      var name = ((canvas.id || "") + " " + (canvas.className || "")).toLowerCase();
      var score = rect.width * rect.height;
      if (name.indexOf("waterfall") !== -1) score += 500000;
      if (name.indexOf("spectrum") !== -1) score += 250000;
      if (canvas.closest && canvas.closest("#openwebrx-panel-receiver")) score += 150000;
      if (score > bestScore) {
        best = canvas;
        bestScore = score;
      }
    });
    return best;
  }

  function ensureWrapper(canvas) {
    var wrapper = canvas.parentElement;
    if (!wrapper) return null;
    wrapper.setAttribute(WRAPPER_ATTR, "1");
    if (!wrapper.style.position) wrapper.style.position = "relative";
    return wrapper;
  }

  function ensureOverlay(wrapper) {
    var overlay = wrapper.querySelector("canvas[" + OVERLAY_ATTR + "]");
    if (overlay) return overlay;
    overlay = document.createElement("canvas");
    overlay.setAttribute(OVERLAY_ATTR, "1");
    overlay.addEventListener("pointerdown", onPointerDown, true);
    overlay.addEventListener("pointermove", onPointerMove, true);
    overlay.addEventListener("pointerup", onPointerUp, true);
    overlay.addEventListener("pointercancel", onPointerUp, true);
    overlay.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    overlay.addEventListener("wheel", onWheel, { passive: false });
    wrapper.appendChild(overlay);
    return overlay;
  }

  function ensureTopMask(wrapper) {
    var mask = wrapper.querySelector("div[" + TOP_MASK_ATTR + "]");
    if (mask) return mask;
    mask = document.createElement("div");
    mask.setAttribute(TOP_MASK_ATTR, "1");
    wrapper.appendChild(mask);
    return mask;
  }

  function ensureSettings(wrapper) {
    var panel = wrapper.querySelector("div[" + SETTINGS_ATTR + "]");
    if (panel) return panel;

    panel = document.createElement("div");
    panel.setAttribute(SETTINGS_ATTR, "1");

    function makeSelect(labelText, options, selected, onChange) {
      var label = document.createElement("label");
      var span = document.createElement("span");
      span.textContent = labelText;
      var select = document.createElement("select");
      options.forEach(function(opt) {
        var option = document.createElement("option");
        option.value = String(opt.value);
        option.textContent = opt.label;
        if (String(opt.value) === String(selected)) option.selected = true;
        select.appendChild(option);
      });
      select.addEventListener("change", function() {
        onChange(select.value);
        saveSettings();
        applySettings();
        queueRender();
      });
      label.appendChild(span);
      label.appendChild(select);
      panel.appendChild(label);
    }

    makeSelect("Samples", [
      { value: 512, label: "500" },
      { value: 1024, label: "1k" },
      { value: 2048, label: "2k" }
    ], state.sampleWidth, function(value) {
      state.sampleWidth = Number(value) || 1024;
    });

    makeSelect("FPS", [
      { value: 100, label: "10" },
      { value: 50, label: "20" },
      { value: 20, label: "50" },
      { value: 10, label: "100" }
    ], LIVE_INTERVAL_MS, function(value) {
      LIVE_INTERVAL_MS = Number(value) || 50;
      if (state.mode === "3d" || state.mode === "old3d") startLiveUpdates();
    });

    makeSelect("AVG", [
      { value: 0, label: "0" },
      { value: 0.10, label: "10" },
      { value: 0.18, label: "20" },
      { value: 0.32, label: "50" },
      { value: 0.42, label: "100" }
    ], state.avgStrength, function(value) {
      state.avgStrength = Number(value) || 0;
    });

    makeSelect("Speed", [
      { value: 1, label: "Slow" },
      { value: 2, label: "Normal" },
      { value: 3, label: "Fast" },
      { value: 4, label: "Very Fast" }
    ], state.speedFactor, function(value) {
      state.speedFactor = Number(value) || 2;
    });

    makeSelect("Style", [
      { value: "filled", label: "Filled" },
      { value: "outline", label: "Outline" }
    ], state.renderStyle, function(value) {
      state.renderStyle = value === "outline" ? "outline" : "filled";
    });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset View";
    reset.addEventListener("click", function() {
      state.sampleWidth = 1024;
      LIVE_INTERVAL_MS = 20;
      FRAME_MS = 20;
      state.avgStrength = 0.32;
      state.speedFactor = 2;
      state.renderStyle = "filled";

      state.yaw = 0.003;
      state.pitch = -2.693;
      state.roll = 0;
      state.zoom = 2.365;
      state.panX = -0.031;
      state.panY = -0.4;

      saveSettings();
      applySettings();
      saveView();

      var panelRoot = state.settings;
      if (panelRoot) {
        var selects = panelRoot.querySelectorAll("select");
        Array.prototype.forEach.call(selects, function(select) {
          var label = "";
          if (select.parentElement) {
            var span = select.parentElement.querySelector("span");
            if (span) label = span.textContent;
          }
          if (label === "Samples") select.value = "1024";
          if (label === "FPS") select.value = "20";
          if (label === "AVG") select.value = "0.32";
          if (label === "Speed") select.value = "2";
          if (label === "Style") select.value = "filled";
        });
      }

      if (state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d") {
        startLiveUpdates();
      }
      queueRender();
    });
    panel.appendChild(reset);

    wrapper.appendChild(panel);
    return panel;
  }

  function ensureToggle(wrapper) {
    var toggle = wrapper.querySelector("div[" + TOGGLE_ATTR + "]");
    if (toggle) return toggle;

    toggle = document.createElement("div");
    toggle.setAttribute(TOGGLE_ATTR, "1");

    function makeButton(label, mode) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("data-mode", mode);
      button.addEventListener("click", function () {
        setMode(mode);
      });
      return button;
    }

    toggle.appendChild(makeButton("Standard", "old"));
    toggle.appendChild(makeButton("3D-Modern", "3d"));
    toggle.appendChild(makeButton("Std/3DM", "old3d"));
    toggle.appendChild(makeButton("3D-Old", "legacy3d"));

    var flipButton = document.createElement("button");
    flipButton.type = "button";
    flipButton.textContent = "Flip/Flop";
    flipButton.setAttribute("data-mode", "flipflop");
    flipButton.addEventListener("click", function () {
      state.splitFlip = !state.splitFlip;
      saveSplitFlip(state.splitFlip);
      updateOverlaySize();
      syncUi();
    });
    toggle.appendChild(flipButton);

    wrapper.appendChild(toggle);
    return toggle;
  }
  function updateToggleUi() {
    if (!state.toggle) return;
    var buttons = state.toggle.querySelectorAll("button");
    Array.prototype.forEach.call(buttons, function (button) {
      var mode = button.getAttribute("data-mode") || "";
      if (mode === "old") button.textContent = "Standard";
      if (mode === "3d") button.textContent = "3D-Modern";
      if (mode === "old3d") button.textContent = "Std/3DM";
      button.style.color = button.classList.contains("is-active") ? "#05121b" : "#f4fbff";
      button.style.opacity = "1";
      button.classList.toggle("is-active", mode === state.mode);
    });
  }
  function startLiveUpdates() {
    stopLiveUpdates();
    state.liveTimer = window.setInterval(function () {
      if ((state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") || !state.bound) return;
      queueRender();
    }, LIVE_INTERVAL_MS);
  }
  function stopLiveUpdates() {
    if (!state.liveTimer) return;
    window.clearInterval(state.liveTimer);
    state.liveTimer = 0;
  }

  function syncUi() {
    if (state.overlay) {
      state.overlay.classList.toggle("is-active", state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d");
    }
    if (state.topMask) {
      state.topMask.classList.toggle("is-active", state.mode === "old3d" && !state.splitFlip);
    }
    updateToggleUi();
    if (state.mode === "3d" || state.mode === "old3d" || state.mode === "legacy3d") {
      updateOverlaySize();
      stopLiveUpdates();
      state.lastSampleAt = 0;
      window.setTimeout(function () {
        if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
        startLiveUpdates();
        queueRender();
      }, 220);
    } else {
      stopLiveUpdates();
    }
  }
  function setMode(mode) {
    state.mode = (mode === "3d" || mode === "old3d" || mode === "legacy3d") ? mode : "old";

    if (state.mode === "legacy3d") {
      state.yaw = -0.015;
      state.pitch = -2.48;
      state.roll = 0;
      state.zoom = 2.18;
      state.panX = -0.02;
      state.panY = -0.34;
      saveView();
    }

    saveMode(state.mode);
    syncUi();
  }
  function clampView() {
    state.pitch = Math.max(-6.2, Math.min(6.2, state.pitch));
    state.yaw = Math.max(-2.3, Math.min(2.3, state.yaw));
    state.roll = Math.max(-1.2, Math.min(1.2, state.roll));
    state.zoom = Math.max(0.08, Math.min(12.0, state.zoom));
    state.panX = Math.max(-0.5, Math.min(0.5, state.panX));
    state.panY = Math.max(-0.4, Math.min(0.4, state.panY));
  }

  function onPointerDown(event) {
    if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
    if (event.button !== 0 && event.button !== 2) return;
    state.dragging = true;
    state.dragMode = event.altKey ? "roll" : ((event.button === 2 || event.shiftKey) ? "pan" : "orbit");
    state.pointerId = event.pointerId;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.startYaw = state.yaw;
    state.startPitch = state.pitch;
    state.startRoll = state.roll;
    state.startPanX = state.panX;
    state.startPanY = state.panY;
    if (state.overlay && state.overlay.setPointerCapture) {
      try { state.overlay.setPointerCapture(event.pointerId); } catch (err) {}
    }
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (!state.dragging || event.pointerId !== state.pointerId) return;
    var dx = event.clientX - state.startX;
    var dy = event.clientY - state.startY;

    if (state.dragMode === "pan") {
      state.panX = state.startPanX + dx / Math.max(260, window.innerWidth) * 0.9;
      state.panY = state.startPanY + dy / Math.max(220, window.innerHeight) * 0.7;
    } else if (state.dragMode === "roll") {
      state.roll = state.startRoll - dx / Math.max(260, window.innerWidth) * 1.6;
      state.pitch = state.startPitch + dy / Math.max(220, window.innerHeight) * 0.9;
    } else {
      state.yaw = state.startYaw + dx / Math.max(260, window.innerWidth) * 3.4;
      state.pitch = state.startPitch + dy / Math.max(220, window.innerHeight) * 2.4;
    }

    clampView();
    saveView();
    queueRender();
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (event.pointerId !== state.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    saveView();
  }

  function onWheel(event) {
    if (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") return;
    state.zoom *= event.deltaY > 0 ? 0.82 : 1.22;
    clampView();
    saveView();
    queueRender();
    event.preventDefault();
  }

  function ensureSampleCtx() {
    if (state.sampleCtx) return state.sampleCtx;
    state.sampleCanvas = document.createElement("canvas");
    state.sampleCanvas.width = SAMPLE_WIDTH;
    state.sampleCanvas.height = SAMPLE_HEIGHT;
    state.sampleCtx = state.sampleCanvas.getContext("2d", {
      willReadFrequently: true,
      alpha: false
    });
    return state.sampleCtx;
  }

  function updateOverlaySize() {
    if (!state.overlay || !state.wrapper) return false;
    var rect = state.wrapper.getBoundingClientRect();
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    var splitRatio = 0.58;
    var topInsetCss = state.mode === "old3d" ? 32 : 0;
    var width = Math.max(1, Math.round(rect.width * dpr));
    var cssHeight = state.mode === "old3d"
      ? Math.max(1, Math.round(rect.height * splitRatio) - topInsetCss)
      : Math.max(1, Math.round(rect.height) - topInsetCss);
    var pixelHeight = Math.max(1, Math.round(cssHeight * dpr));
    var overlayTopCss = topInsetCss;

    if (state.mode === "old3d" && state.splitFlip) {
      overlayTopCss = Math.max(0, rect.height - cssHeight);
    }

    state.overlay.style.left = "0";
    state.overlay.style.right = "0";
    state.overlay.style.top = overlayTopCss + "px";
    state.overlay.style.background = "#000";
    state.overlay.style.height = cssHeight + "px";

    if (state.overlay.width !== width || state.overlay.height !== pixelHeight) {
      state.overlay.width = width;
      state.overlay.height = pixelHeight;
      state.overlayCtx = null;
      return true;
    }
    return false;
  }
  function updateSourceCanvases() {
    if (!state.wrapper) return [];
    state.sourceCanvases = Array.prototype.filter.call(
      state.wrapper.querySelectorAll("canvas"),
      function (canvas) {
        if (canvas === state.overlay) return false;
        return isVisibleCanvas(canvas);
      }
    );
    return state.sourceCanvases;
  }

  function getCanvasSortScore(canvas) {
    var z = Number(getComputedStyle(canvas).zIndex);
    return Number.isFinite(z) ? z : 0;
  }

  function sampleCompositeSource() {
    var ctx = ensureSampleCtx();
    if (!ctx || !state.wrapper) return null;

    var now = Date.now();
    if (now - state.lastSampleAt < FRAME_MS) {
      return ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
    }

    var rect = state.wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;

    var canvases = updateSourceCanvases().slice().sort(function (a, b) {
      return getCanvasSortScore(a) - getCanvasSortScore(b);
    });

    if (!canvases.length) return null;

    try {
      ctx.clearRect(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
      canvases.forEach(function (canvas) {
        var cRect = canvas.getBoundingClientRect();
        if (!cRect.width || !cRect.height) return;
        var dx = ((cRect.left - rect.left) / rect.width) * SAMPLE_WIDTH;
        var dy = ((cRect.top - rect.top) / rect.height) * SAMPLE_HEIGHT;
        var dw = (cRect.width / rect.width) * SAMPLE_WIDTH;
        var dh = (cRect.height / rect.height) * SAMPLE_HEIGHT;
        ctx.drawImage(canvas, dx, dy, dw, dh);
      });
      state.lastSampleAt = now;
      return ctx.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
    } catch (err) {
      return null;
    }
  }

  function getOverlayCtx() {
    if (state.overlayCtx) return state.overlayCtx;
    if (!state.overlay) return null;
    state.overlayCtx = state.overlay.getContext("2d", { alpha: true });
    return state.overlayCtx;
  }

  function luminance(r, g, b) {
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }

  function colorForValue(v) {
    var t = Math.max(0, Math.min(1, v));
    var r;
    var g;
    var b;

    if (t < 0.20) {
      var p0 = t / 0.20;
      r = 0;
      g = Math.round(30 + p0 * 60);
      b = Math.round(150 + p0 * 95);
    } else if (t < 0.46) {
      var p1 = (t - 0.20) / 0.26;
      r = Math.round(p1 * 40);
      g = Math.round(90 + p1 * 150);
      b = Math.round(245 - p1 * 85);
    } else if (t < 0.70) {
      var p2 = (t - 0.46) / 0.24;
      r = Math.round(40 + p2 * 95);
      g = Math.round(240 + p2 * 10);
      b = Math.round(160 - p2 * 70);
    } else if (t < 0.86) {
      var p3 = (t - 0.70) / 0.16;
      r = Math.round(135 + p3 * 120);
      g = Math.round(250 - p3 * 70);
      b = Math.round(90 - p3 * 55);
    } else if (t < 0.95) {
      var p4 = (t - 0.86) / 0.09;
      r = 255;
      g = Math.round(180 - p4 * 70);
      b = Math.round(35 - p4 * 20);
    } else {
      var p5 = (t - 0.95) / 0.05;
      r = 255;
      g = Math.round(110 - p5 * 50);
      b = Math.round(15 - p5 * 10);
    }

    return "rgb(" + Math.max(0, Math.min(255, r)) + "," + Math.max(0, Math.min(255, g)) + "," + Math.max(0, Math.min(255, b)) + ")";
  }
  function colorForValueOld(v) {
    var t = Math.max(0, Math.min(1, v));
    var r;
    var g;
    var b;

    if (t < 0.24) {
      var p0 = t / 0.24;
      r = 0;
      g = Math.round(28 + p0 * 42);
      b = Math.round(138 + p0 * 82);
    } else if (t < 0.52) {
      var p1 = (t - 0.24) / 0.28;
      r = Math.round(10 + p1 * 42);
      g = Math.round(70 + p1 * 120);
      b = Math.round(220 - p1 * 70);
    } else if (t < 0.78) {
      var p2 = (t - 0.52) / 0.26;
      r = Math.round(52 + p2 * 58);
      g = Math.round(190 + p2 * 22);
      b = Math.round(150 - p2 * 55);
    } else if (t < 0.93) {
      var p3 = (t - 0.78) / 0.15;
      r = Math.round(110 + p3 * 95);
      g = Math.round(212 - p3 * 52);
      b = Math.round(95 - p3 * 35);
    } else {
      var p4 = (t - 0.93) / 0.07;
      r = 205;
      g = Math.round(160 - p4 * 28);
      b = Math.round(60 - p4 * 18);
    }

    return "rgb(" + Math.max(0, Math.min(255, r)) + "," + Math.max(0, Math.min(255, g)) + "," + Math.max(0, Math.min(255, b)) + ")";
  }
  function rotate3(point, yaw, pitch, roll) {
    var x = point.x;
    var y = point.y;
    var z = point.z;

    var cosy = Math.cos(yaw);
    var siny = Math.sin(yaw);
    var x1 = x * cosy - z * siny;
    var z1 = x * siny + z * cosy;

    var cosp = Math.cos(pitch);
    var sinp = Math.sin(pitch);
    var y2 = y * cosp - z1 * sinp;
    var z2 = y * sinp + z1 * cosp;

    var cosr = Math.cos(roll);
    var sinr = Math.sin(roll);
    var x3 = x1 * cosr - y2 * sinr;
    var y3 = x1 * sinr + y2 * cosr;

    return { x: x3, y: y3, z: z2 };
  }

  function projectPoint(x, age, amplitude, viewport) {
    var centeredX = (x - 0.5) * 2;
    var edge = Math.abs(centeredX);
    var depth = age;
    var slabHeight;
    var worldDepth = viewport.worldDepth;

    if (state.mode === "legacy3d") {
      var centerLift = Math.max(0, 1 - edge * 0.92);
      slabHeight = amplitude * (0.42 + centerLift * 0.24);
      worldDepth = viewport.worldDepth * 0.78;
    } else {
      slabHeight = amplitude * 1.18 * (0.72 + Math.pow(1 - edge, 0.32) * 0.26);
    }

    var point = {
      x: centeredX * viewport.worldWidth * 0.5,
      y: -slabHeight * viewport.worldHeight,
      z: -depth * worldDepth
    };

    var rotated = rotate3(point, state.yaw, state.pitch, state.roll);
    var persp = viewport.camera / (viewport.camera - rotated.z + viewport.depthOffset);
    return {
      x: viewport.cx + state.panX * viewport.screenWidth + rotated.x * persp,
      y: viewport.baseY + state.panY * viewport.screenHeight - rotated.y * persp
    };
  }

  function drawBackground(ctx, width, height) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  }

  function drawLabels(ctx, width, height) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = "600 " + Math.max(11, Math.round(height * 0.028)) + "px Segoe UI, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("", width - 18, 24);
    ctx.restore();
  }

  function buildHeightRow(imageData, row) {
    var heights = new Array(SAMPLE_WIDTH);
    var data = imageData.data;
    for (var col = 0; col < SAMPLE_WIDTH; col++) {
      var offset = (row * SAMPLE_WIDTH + col) * 4;
      var intensity = luminance(data[offset], data[offset + 1], data[offset + 2]);
      var edge = Math.abs(col / (SAMPLE_WIDTH - 1) - 0.5) * 2;
      var flatBoost = 0.72 + Math.pow(1 - edge, 0.18) * 0.16;
      heights[col] = Math.pow(Math.max(0.02, intensity), 0.82) * flatBoost;
    }
    if (state.avgStrength > 0) {
      var centerWeight = Math.max(0.2, 1 - state.avgStrength * 2);
      var sideWeight = (1 - centerWeight) / 2;
      for (var s = 1; s < SAMPLE_WIDTH - 1; s++) {
        heights[s] = heights[s - 1] * sideWeight + heights[s] * centerWeight + heights[s + 1] * sideWeight;
      }
    }
    return heights;
  }

  function drawSlab(ctx, imageData) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var viewport = {
      cx: width * 0.5,
      baseY: height * 0.74,
      camera: width * 1.15 / Math.pow(state.zoom, 1.35),
      depthOffset: width * 0.06,
      worldWidth: width * 0.9,
      worldHeight: height * 0.28,
      worldDepth: height * 1.05,
      screenWidth: width,
      screenHeight: height
    };

    drawBackground(ctx, width, height);
    ctx.save();

    var rowStep = Math.max(1, Math.round(state.speedFactor || 1)) * 2;
    var motionScale = 1;

    if (state.mode === "legacy3d") {
      rowStep = Math.max(2, Math.round(state.speedFactor || 2)) * 2;
      motionScale = 0.68;
    }

    for (var row = SAMPLE_HEIGHT - rowStep; row >= 1; row -= rowStep) {
      var nextRow = Math.max(0, row - rowStep);
      var age0 = (row / (SAMPLE_HEIGHT - 1)) * motionScale;
      var age1 = (nextRow / (SAMPLE_HEIGHT - 1)) * motionScale;
      if (age1 < 0) age1 = 0;

      var cur = buildHeightRow(imageData, row);
      var next = buildHeightRow(imageData, nextRow);

      for (var col = 1; col < SAMPLE_WIDTH; col += 1) {
        var x0 = (col - 1) / (SAMPLE_WIDTH - 1);
        var x1 = col / (SAMPLE_WIDTH - 1);

        var p00 = projectPoint(x0, age0, cur[col - 1], viewport);
        var p10 = projectPoint(x1, age0, cur[col], viewport);
        var p11 = projectPoint(x1, age1, next[col], viewport);
        var p01 = projectPoint(x0, age1, next[col - 1], viewport);

        var v = (cur[col - 1] + cur[col] + next[col] + next[col - 1]) * 0.25;
        if (v < 0.045) continue;

        ctx.beginPath();
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p10.x, p10.y);
        ctx.lineTo(p11.x, p11.y);
        ctx.lineTo(p01.x, p01.y);
        ctx.closePath();

        if (state.mode === "legacy3d") {
          ctx.fillStyle = colorForValueOld(v);
          ctx.fill();
          ctx.strokeStyle = "rgba(110,170,255,0.30)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        } else if (state.renderStyle === "outline") {
          ctx.strokeStyle = colorForValue(v);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = colorForValue(v);
          ctx.fill();
        }
      }
    }

    ctx.restore();
    drawLabels(ctx, width, height);
  }

  function render() {
    state.renderQueued = false;
    if ((state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d") || !state.bound || !state.overlay || !state.wrapper) return;
    updateOverlaySize();
    var imageData = sampleCompositeSource();
    if (!imageData) return;
    var ctx = getOverlayCtx();
    if (!ctx) return;
    drawSlab(ctx, imageData);
  }

  function queueRender() {
    if (state.renderQueued) return;
    state.renderQueued = true;
    window.requestAnimationFrame(render);
  }

  function bindOnce() {
    if (state.bound) return true;
    var canvas = findWaterfallCanvas();
    if (!canvas) return false;
    ensureStyle();
    loadSettings();
    applySettings();
    loadView();

    var wrapper = ensureWrapper(canvas);
    if (!wrapper) return false;

    state.sourceCanvas = canvas;
    state.wrapper = wrapper;
    state.overlay = ensureOverlay(wrapper);
    state.topMask = ensureTopMask(wrapper);
    state.settings = ensureSettings(wrapper);
    state.toggle = ensureToggle(wrapper);
    updateSourceCanvases();
    state.bound = true;
    updateOverlaySize();
    syncUi();
    return true;
  }

  function tickBind() {
    state.tries += 1;
    if (bindOnce()) {
      if (state.bindTimer) window.clearInterval(state.bindTimer);
      state.bindTimer = 0;
      return;
    }
    if (state.tries >= MAX_BIND_TRIES && state.bindTimer) {
      window.clearInterval(state.bindTimer);
      state.bindTimer = 0;
    }
  }

  function boot() {
    tickBind();
    if (!state.bound) {
      state.bindTimer = window.setInterval(tickBind, BIND_INTERVAL_MS);
    }
    window.addEventListener("resize", function () {
      if (!state.bound || (state.mode !== "3d" && state.mode !== "old3d" && state.mode !== "legacy3d")) return;
      updateOverlaySize();
      queueRender();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
/* OWRX_3D_WATERFALL_END */




/* DNX_FX_ARROW_LATE_FIX_START */
(function(){
  if(window.__dnxFxArrowLateFix) return;
  window.__dnxFxArrowLateFix = true;

  function applyFix(){
    var box = document.getElementById("dnx-fx-box-inline") || document.getElementById("dnx-fx-box");
    if(!box) return false;

    var title = box.querySelector(".dnx-fx-title");
    if(!title) return false;

    var arrow = box.querySelector(".dnx-fx-collapse-arrow");
    if(!arrow){
      arrow = document.createElement("span");
      arrow.className = "dnx-fx-collapse-arrow";
      arrow.textContent = box.getAttribute("data-dnx-collapsed") === "1" ? "▸" : "▾";
      arrow.style.cssText = "display:inline-block;margin-right:2px;min-width:8px;font-size:10px;line-height:1;transform:translateY(-1px);opacity:.95;color:#d8d8d8;";
      title.insertBefore(arrow, title.firstChild);
    }

    title.style.setProperty("display", "flex", "important");
    title.style.setProperty("align-items", "center", "important");
    title.style.setProperty("gap", "4px", "important");
    title.style.setProperty("cursor", "pointer", "important");
    return true;
  }

  var tries = 0;
  var t = setInterval(function(){
    tries++;
    if(applyFix() || tries > 40) clearInterval(t);
  }, 500);

  window.addEventListener("load", function(){ setTimeout(applyFix, 600); });
})();
/* DNX_FX_ARROW_LATE_FIX_END */


/* DNX_ARROW_TOGGLE_FIX_START */
(function(){})();
 /* DNX_ARROW_TOGGLE_FIX_END */

