// The Financial Guru · website behaviour: English / Arabic, sticky header, mobile menu, live download links.
(function(){
const html=document.documentElement;
const KEY='fgSiteLang';
function setLang(l){
  html.lang=l;html.dir=l==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(el=>{
    if(!el.hasAttribute('data-en'))el.setAttribute('data-en',el.innerHTML);
    el.innerHTML=l==='ar'?el.getAttribute('data-ar'):el.getAttribute('data-en');
  });
  document.querySelectorAll('img[data-ar-src]').forEach(el=>{if(!el.dataset.enSrc)el.dataset.enSrc=el.getAttribute('src');el.src=l==='ar'?el.dataset.arSrc:el.dataset.enSrc});
  document.querySelectorAll('[data-ar-label]').forEach(el=>{
    if(!el.hasAttribute('data-en-label'))el.setAttribute('data-en-label',el.getAttribute('aria-label')||'');
    el.setAttribute('aria-label',l==='ar'?el.getAttribute('data-ar-label'):el.getAttribute('data-en-label'));
  });
  const t=document.querySelector('meta[name=fg-title-ar]');
  if(t){if(!html.dataset.enTitle)html.dataset.enTitle=document.title;document.title=l==='ar'?t.content:html.dataset.enTitle}
  const b=document.querySelector('.lang');if(b)b.textContent=l==='ar'?'English':'العربية';
  try{localStorage.setItem(KEY,l)}catch(e){}
}
let saved='en';try{saved=localStorage.getItem(KEY)||((navigator.language||'').startsWith('ar')?'ar':'en')}catch(e){}
if(saved==='ar')setLang('ar');
document.addEventListener('click',e=>{
  if(e.target.closest('.lang'))setLang(html.lang==='ar'?'en':'ar');
  if(e.target.closest('.menu'))document.querySelector('.top').classList.toggle('open');
});
// header turns solid after the hero starts scrolling away
const top=document.querySelector('.top');
const onScroll=()=>top&&top.classList.toggle('solid',scrollY>30);
addEventListener('scroll',onScroll,{passive:true});onScroll();
// the thread: measure each path so it can draw itself
document.querySelectorAll('.thread path').forEach(p=>{try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()))}catch(e){}});

// download page: always point at the newest release
const REPO='AlZaabiXIV/financial-guru-releases';
const page='https://github.com/'+REPO+'/releases/latest';
const win=document.getElementById('dlWin'),apk=document.getElementById('dlApk');
if(win||apk){
  fetch('https://api.github.com/repos/'+REPO+'/releases/latest',{headers:{Accept:'application/vnd.github+json'}})
  .then(r=>r.ok?r.json():Promise.reject())
  .then(j=>{
    const v=String(j.tag_name||'').replace(/^v/,'');
    const find=re=>(j.assets||[]).find(a=>re.test(a.name));
    const mb=a=>(a.size/1048576).toFixed(a.size>20971520?0:1)+' MB';
    const set=(btn,a,metaId)=>{if(!btn||!a)return;btn.href=a.browser_download_url;const m=document.getElementById(metaId);
      if(m){m.setAttribute('data-en','Version '+v+' · '+mb(a));m.setAttribute('data-ar','الإصدار '+v+' · '+mb(a).replace('MB','ميغابايت'));m.innerHTML=html.lang==='ar'?m.getAttribute('data-ar'):m.getAttribute('data-en')}};
    set(win,find(/Setup.*\.exe$/i),'metaWin');set(apk,find(/\.apk$/i),'metaApk');
  }).catch(()=>{[win,apk].forEach(b=>b&&(b.href=page))});
}
})();

// ---------- announcements showcase ----------
(function(){
const box=document.getElementById('reel');if(!box||!window.FG_NEWS)return;
const screen=box.querySelector('.screen'),dots=document.querySelector('.dots'),snd=box.querySelector('.sound');
const html=document.documentElement,ar=()=>html.lang==='ar';
const TEXT_MS=5000;let slides=[],cur=-1,timer=null,muted=true;
FG_NEWS.forEach((n,i)=>{
  const el=document.createElement('div');el.className='slide';
  if(n.type==='video'){el.classList.add('vid');
    const v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';v.setAttribute('playsinline','');v.setAttribute('muted','');v.disablePictureInPicture=true;v.setAttribute('disableRemotePlayback','');
    const small=matchMedia('(max-width:760px)').matches;if(n.poster)v.poster=(small&&n.posterMobile)||n.poster;v.src=(small&&n.srcMobile)||n.src;el.appendChild(v);
    v.addEventListener('error',()=>{el.dataset.broken='1';if(slides[cur]===el)next()});
  }else{el.classList.add('txt');
    el.innerHTML='<div><span class="tag"></span><h3></h3><p></p></div>'+(n.img?'<div class="pic"><img alt="" loading="lazy" src="'+n.img+'"></div>':'<div></div>');
    const fill=()=>{const t=ar()?n.ar:n.en;el.querySelector('.tag').textContent=t.tag||'';el.querySelector('h3').textContent=t.title||'';el.querySelector('p').textContent=t.text||''};
    fill();el._fill=fill;
    const im=el.querySelector('img');if(im)im.onload=()=>{if(im.naturalHeight>im.naturalWidth)im.classList.add('tall')};
  }
  screen.insertBefore(el,snd);slides.push(el);
  const d=document.createElement('button');d.type='button';d.setAttribute('aria-label','Announcement '+(i+1));d.innerHTML='<i></i>';d.onclick=()=>show(i);dots.appendChild(d);
});
const dotEls=[...dots.children];
function bar(i,ms){dotEls.forEach((d,k)=>{const b=d.firstChild;b.style.transition='none';b.style.width=k<i?'100%':'0';});
  const b=dotEls[i].firstChild;void b.offsetWidth;if(ms){b.style.transition='width '+ms+'ms linear';b.style.width='100%'}}
function show(i){
  clearTimeout(timer);
  const prev=slides[cur];
  if(prev&&prev!==slides[i]){prev.classList.remove('on');prev.classList.add('out');const v=prev.querySelector('video');if(v)v.pause();
    setTimeout(()=>{prev.style.transition='none';prev.classList.remove('out');void prev.offsetWidth;prev.style.transition=''},950)}
  cur=i;const el=slides[i];
  if(el.dataset.broken)return next();
  el.classList.add('on');
  const v=el.querySelector('video');
  snd.classList.toggle('vis',!!v);
  if(v){v.currentTime=0;v.muted=muted;
    const p=v.play();if(p&&p.catch)p.catch(()=>{v.muted=true;muted=true;setIcon();v.play().catch(()=>next())});
    v.onended=()=>next();
    const go=()=>bar(i,Math.max(0,(v.duration-v.currentTime)*1000));if(v.readyState>=1)go();else v.onloadedmetadata=go;
    timer=setTimeout(()=>{if(v.paused&&v.readyState<2)next()},12000); // never stuck on a video that will not load
  }else{bar(i,TEXT_MS);timer=setTimeout(next,TEXT_MS)}
}
function next(){let n=cur;for(let k=0;k<slides.length;k++){n=(n+1)%slides.length;if(!slides[n].dataset.broken)return show(n)}}
function setIcon(){snd.textContent=muted?'🔇':'🔊';snd.setAttribute('aria-label',muted?(ar()?'تشغيل الصوت':'Turn sound on'):(ar()?'كتم الصوت':'Mute'))}
snd.onclick=()=>{muted=!muted;setIcon();const v=slides[cur]&&slides[cur].querySelector('video');if(v){v.muted=muted;if(v.paused)v.play().catch(()=>{})}};
setIcon();
// language switch refreshes the text slides
new MutationObserver(()=>{slides.forEach(s=>s._fill&&s._fill());setIcon()}).observe(html,{attributes:true,attributeFilter:['lang']});
// play only while it is on screen
let started=false;new IntersectionObserver(es=>es.forEach(e=>{
  const v=slides[cur]&&slides[cur].querySelector('video');
  if(e.isIntersecting){if(!started){started=true;show(0)}else if(v&&v.paused)v.play().catch(()=>{})}
  else if(v)v.pause();
}),{threshold:.35}).observe(box);
})();
