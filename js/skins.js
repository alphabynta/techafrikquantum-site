(function(){
  // ── Mobile nav toggle ────────────────────────────────────────
  const toggle=document.querySelector('.nav-toggle');
  const menu=document.getElementById('nav-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{
      const e=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!e));
      menu.classList.toggle('is-open');
    });
  }

  // ── Dropdown nav (mobile click, desktop hover via CSS) ───────
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const item=btn.closest('.nav-item--dropdown');
      const isOpen=item.classList.contains('is-open');
      // Close all other dropdowns
      document.querySelectorAll('.nav-item--dropdown.is-open').forEach(el=>{
        if(el!==item){
          el.classList.remove('is-open');
          el.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded','false');
        }
      });
      item.classList.toggle('is-open',!isOpen);
      btn.setAttribute('aria-expanded',String(!isOpen));
    });
  });
  // Close dropdowns on outside click
  document.addEventListener('click',e=>{
    if(!e.target.closest('.nav-item--dropdown')){
      document.querySelectorAll('.nav-item--dropdown.is-open').forEach(el=>{
        el.classList.remove('is-open');
        el.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded','false');
      });
    }
  });
  // Close on Escape
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      document.querySelectorAll('.nav-item--dropdown.is-open').forEach(el=>{
        el.classList.remove('is-open');
        el.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded','false');
      });
    }
  });

  // ── Reveal on scroll ─────────────────────────────────────────
  if('IntersectionObserver'in window){
    const ro=new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');ro.unobserve(e.target)}});
    },{threshold:.15});
    document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
  }

  // ── Parallax tilt ────────────────────────────────────────────
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  document.addEventListener('pointermove',e=>{
    document.querySelectorAll('.parallax[data-tilt="on"]').forEach(el=>{
      const r=el.getBoundingClientRect();
      const rx=clamp(((e.clientY-r.top)/r.height-.5)*-6,-6,6);
      const ry=clamp(((e.clientX-r.left)/r.width-.5)*6,-6,6);
      el.style.setProperty('--rx',rx+'deg');
      el.style.setProperty('--ry',ry+'deg');
    });
  });

  // ── Request a demo modal ─────────────────────────────────────
  const modal=document.getElementById('demo-modal');
  const modalTitle=document.getElementById('demo-modal-title');
  const hiddenSolution=document.getElementById('demo-solution');
  const openButtons=[...document.querySelectorAll('[data-demo]')];
  const closeBtn=document.getElementById('demo-modal-close');
  const form=document.getElementById('demo-form');
  function openModal(sol){if(!modal)return;modal.classList.add('is-open');modalTitle.textContent='Request a Demo — '+sol;hiddenSolution.value=sol;}
  function closeModal(){if(!modal)return;modal.classList.remove('is-open');}
  openButtons.forEach(btn=>btn.addEventListener('click',()=>openModal(btn.getAttribute('data-demo'))));
  if(closeBtn)closeBtn.addEventListener('click',closeModal);
  if(modal)modal.addEventListener('click',(e)=>{if(e.target===modal)closeModal();});
  if(form)form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const sol=hiddenSolution.value||'Solution';
    const name=document.getElementById('demo-name').value.trim();
    const email=document.getElementById('demo-email').value.trim();
    const company=document.getElementById('demo-company').value.trim();
    const note=document.getElementById('demo-note').value.trim();
    const subject='Demo Request: '+sol;
    const body=`Solution: ${sol}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${note}`;
    const mailto=`mailto:info@techafrik.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href=mailto;
    closeModal();
  });
})();
