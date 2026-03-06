(function(){
  const launch=document.createElement('button');
  launch.className='chatbot-launch';
  launch.textContent='Chat';
  document.body.appendChild(launch);

  const panel=document.createElement('div');
  panel.className='chatbot-panel';
  panel.innerHTML=`<div class="chatbot-header"><strong>Info Desk</strong><button id="cb-close" class="modal__close">×</button></div>
  <div class="chatbot-body" id="cb-body"></div>
  <div class="chatbot-input"><input id="cb-input" class="input" placeholder="Ask about solutions, pricing, support..."/><button id="cb-send" class="btn btn--primary">Send</button></div>`;
  document.body.appendChild(panel);

  const body=panel.querySelector('#cb-body');
  const input=panel.querySelector('#cb-input');
  const send=panel.querySelector('#cb-send');
  const close=panel.querySelector('#cb-close');

  const KB=[
    {k:['safety','surveillance','drone','video','camera'], a:'We deploy Safety & Surveillance including IP video, analytics, ISR drones, and body‑worn cameras. Need a demo? Use the “Request a demo” buttons on the Solutions page.'},
    {k:['connectivity','satellite','scpc','teleport','link','bandwidth'], a:'For Critical Connectivity we design SCPC links and teleports with HA architectures. We can review your link budget via a demo request.'},
    {k:['asset','assets','fleet','fuel','tracking','gps'], a:'Assets Management covers fleet tracking, driver analytics, and fuel anti‑fraud systems.'},
    {k:['network','ip network','observability','telemetry','orchestration'], a:'IP Networks cover orchestration, config management, and observability (metrics, logs, traces).'},
    {k:['cyber','security','soc','pentest','iam','governance'], a:'Cybersecurity services include PenTesting, SOC onboarding, Governance & Compliance, and IAM.'},
    {k:['price','pricing','cost','quote','rfp'], a:'We scope by environment and SLAs. Please use Contact Us to share details, and we’ll respond with a quote.'},
    {k:['support','help','issue','incident'], a:'For support, share your environment and priority via Contact Us. Our team will route the request.'}
  ];

  function addMsg(t, who='bot'){
    const div=document.createElement('div');
    div.className='chatbot-msg ' + (who==='bot'?'chatbot-msg--bot':'chatbot-msg--user');
    div.textContent=t; body.appendChild(div); body.scrollTop=body.scrollHeight;
  }
  function reply(q){
    const s=q.toLowerCase();
    const hit=KB.find(x=> x.k.some(k=> s.includes(k)) );
    if(hit) addMsg(hit.a,'bot');
    else addMsg('I can help with Safety, Connectivity, Assets Management, IP Networks, and Cybersecurity. For anything else, see Contact Us.', 'bot');
  }

  launch.addEventListener('click', ()=>{ panel.classList.toggle('is-open'); if(panel.classList.contains('is-open')){ body.innerHTML=''; addMsg('Hello! Ask me about our solutions or use Contact Us for a tailored response.'); input.focus(); }});
  close.addEventListener('click', ()=> panel.classList.remove('is-open'));
  send.addEventListener('click', ()=>{ const v=input.value.trim(); if(!v) return; addMsg(v,'user'); input.value=''; reply(v); });
  input.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ send.click(); }});
})();