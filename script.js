/* -------------------------------  Helper  ------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------------------------  Pipeline Loader  -------------------------- */
const loader     = $('#loader');
const stages     = $$('.stage rect');
let   stageIndex = 0;
const animateLoader = () => {
  stages.forEach(r => r.classList.remove('stage-lit'));
  stages[stageIndex].classList.add('stage-lit');
  stageIndex = (stageIndex + 1) % stages.length;
};
const loaderTimer = setInterval(animateLoader, 350);

/* ---------------------------  Canvas Fabric BG  ------------------------- */
const canvas = $('#fabric-bg');
const ctx    = canvas.getContext('2d');
const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
resize(); addEventListener('resize', resize);

class Node {
  constructor(x, y) { this.x = this.baseX = x; this.y = this.baseY = y; this.ph = Math.random()*2*Math.PI; }
  update(t){
    this.x = this.baseX + Math.sin(t + this.ph)*6;
    this.y = this.baseY + Math.cos(t + this.ph)*6;
    ctx.fillStyle = 'rgba(211,138,92,.7)';
    ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, 2*Math.PI); ctx.fill();
  }
}
let nodes = [];
const grid = 90;
for(let y = grid/2; y < innerHeight; y+=grid){
  for(let x = grid/2; x < innerWidth; x+=grid){ nodes.push(new Node(x,y)); }
}
const animateBG = t => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  nodes.forEach(n => n.update(t/800));
  requestAnimationFrame(animateBG);
};
requestAnimationFrame(animateBG);

/* ---------------------------  After Load Fade In ------------------------ */
setTimeout(() => {
  loader.classList.add('hidden');
  clearInterval(loaderTimer);
  $('.main-header').classList.add('show');
}, 2000);

/* -----------------------  Intersection Observers  ----------------------- */
const sections = $$('.section');
const navLinks = $$('.nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    const id = entry.target.id;
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.sec === id));
  });
}, { threshold: .55, rootMargin: '0px 0px -10% 0px' });
sections.forEach(sec => observer.observe(sec));

/* -----------------------------  Smooth Links  --------------------------- */
navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  $('#'+a.dataset.sec).scrollIntoView({ behavior:'smooth' });
}));

/* --------------------------  Flip-Card Keyboard  ------------------------ */
$$('.flip-card').forEach(card=>{
  const inner = $('.flip-inner', card);
  card.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      inner.style.transform = inner.style.transform ? '' : 'rotateY(180deg)';
    }
  });
});
