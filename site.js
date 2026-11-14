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
