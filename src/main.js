const products = [
  {id:1,type:'Video',subject:'MATEMÁTICA',title:'Cálculo diferencial desde cero',author:'Lucía Fernández',price:24.90,rating:'4.9',students:'1.2k',theme:'math',symbol:'∫',badge:'MÁS VENDIDO'},
  {id:2,type:'Apuntes',subject:'BIOLOGÍA',title:'Biología celular — Guía visual',author:'Mateo Ruiz',price:12.50,rating:'4.8',students:'860',theme:'bio',symbol:'⌬',badge:'NUEVO'},
  {id:3,type:'Solucionarios',subject:'FÍSICA',title:'100 problemas de mecánica',author:'Ana Torres',price:18.00,rating:'4.9',students:'2.1k',theme:'physics',symbol:'↗',badge:''},
  {id:4,type:'Simulaciones',subject:'QUÍMICA',title:'Laboratorio virtual de química',author:'Diego Castro',price:29.90,rating:'4.7',students:'740',theme:'chem',symbol:'⚗',badge:'INTERACTIVO'},
  {id:5,type:'Video',subject:'PROGRAMACIÓN',title:'Python para principiantes',author:'Sofía Molina',price:27.50,rating:'4.9',students:'3.4k',theme:'code',symbol:'</>',badge:'POPULAR'},
  {id:6,type:'Apuntes',subject:'HISTORIA',title:'Historia universal resumida',author:'Carlos Vega',price:10.90,rating:'4.8',students:'920',theme:'history',symbol:'◷',badge:''}
];
let cart=[]; let activeFilter='Todos';
const grid=document.querySelector('#productGrid');
function render(items=products){
  grid.innerHTML=items.map(p=>`<article class="product-card" data-type="${p.type}">
    <div class="product-art ${p.theme}">${p.badge?`<span class="badge">${p.badge}</span>`:''}<span class="art-symbol">${p.symbol}</span><button class="wishlist" aria-label="Guardar ${p.title}">♡</button><span class="type-pill">${p.type}</span></div>
    <div class="product-info"><span class="subject">${p.subject}</span><h3>${p.title}</h3><p>Por ${p.author}</p><div class="meta"><span><b>★ ${p.rating}</b> (${p.students})</span></div><div class="product-bottom"><strong>$${p.price.toFixed(2).replace('.',',')}</strong><button class="add-btn" data-id="${p.id}" aria-label="Añadir ${p.title}">+</button></div></div>
  </article>`).join('') || '<p class="no-results">No encontramos recursos. Prueba con otra búsqueda.</p>';
  document.querySelectorAll('.add-btn').forEach(btn=>btn.addEventListener('click',()=>addToCart(+btn.dataset.id)));
  document.querySelectorAll('.wishlist').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('saved');btn.textContent=btn.classList.contains('saved')?'♥':'♡'}));
}
function addToCart(id){const p=products.find(x=>x.id===id);if(!cart.some(x=>x.id===id))cart.push(p);updateCart();showToast();}
function updateCart(){
  document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#drawerCount').textContent=`(${cart.length})`;
  const items=document.querySelector('#cartItems');
  items.innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><div class="cart-thumb ${p.theme}">${p.symbol}</div><div><small>${p.type}</small><b>${p.title}</b><span>$${p.price.toFixed(2).replace('.',',')}</span></div><button data-remove="${p.id}" aria-label="Quitar">×</button></div>`).join(''):`<div class="empty"><span>◇</span><b>Tu bolsa está vacía</b><p>Explora nuestros recursos y comienza a aprender.</p></div>`;
  document.querySelector('#cartTotal').textContent='$'+cart.reduce((s,p)=>s+p.price,0).toFixed(2).replace('.',',');document.querySelector('#cartFooter').classList.toggle('visible',!!cart.length);
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==+b.dataset.remove);updateCart()});
}
function showToast(){const t=document.querySelector('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
render();updateCart();
const drawer=document.querySelector('#cartDrawer'),overlay=document.querySelector('#drawerOverlay');
function toggleCart(show){drawer.classList.toggle('open',show);overlay.classList.toggle('show',show);document.body.classList.toggle('no-scroll',show)}
document.querySelector('#cartBtn').onclick=()=>toggleCart(true);document.querySelector('#closeCart').onclick=()=>toggleCart(false);overlay.onclick=()=>toggleCart(false);
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeFilter=b.dataset.filter;render(activeFilter==='Todos'?products:products.filter(p=>p.type===activeFilter));});
document.querySelectorAll('.category').forEach(b=>b.onclick=()=>{const f=b.dataset.category==='Todos'?'Video':b.dataset.category;document.querySelector(`[data-filter="${f}"]`)?.click();document.querySelector('#explorar').scrollIntoView({behavior:'smooth'});});
const search=document.querySelector('#searchPanel'),input=document.querySelector('#searchInput');
document.querySelector('#searchToggle').onclick=()=>{search.classList.add('open');setTimeout(()=>input.focus(),100)};document.querySelector('#closeSearch').onclick=()=>search.classList.remove('open');
input.oninput=()=>{const q=input.value.toLowerCase();render(products.filter(p=>(p.title+p.subject+p.type+p.author).toLowerCase().includes(q)));};
document.querySelector('#menuBtn').onclick=()=>document.querySelector('#nav').classList.toggle('open');
