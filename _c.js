
/* ================= data ================= */
const KEY = 'teamily.v3';
const GRADS = [
  'linear-gradient(135deg,#7c5cff,#5b8bff)',
  'linear-gradient(135deg,#ff7ab8,#ff9d5c)',
  'linear-gradient(135deg,#2ec4a0,#22d3ee)',
  'linear-gradient(135deg,#4f8cff,#22d3ee)',
  'linear-gradient(135deg,#ffb020,#ff7a59)',
  'linear-gradient(135deg,#8b5cf6,#ec4899)',
  'linear-gradient(135deg,#0ea5e9,#2dd4bf)',
  'linear-gradient(135deg,#f472b6,#a78bfa)'
];

function seedData(){
  const agents = [
    {id:'a9', name:'Grok', icon:'✦', role:'Grok assistant · default brain', g:2, pinned:true,
      desc:'Powered by xAI Grok. Answers anything, plans work, and hands it to the right specialist.',
      skills:['Grok','Chat','Planning']},
    {id:'a1', name:'Content Creator', icon:'✍️', role:'Content strategist', g:0, pinned:true,
      desc:'Multi-platform content strategy, captions, carousels and launch copy.',
      skills:['Social','Captions','Launch copy']},
    {id:'a2', name:'Image Prompt Engineer', icon:'📷', role:'Visual prompt designer', g:1, pinned:false,
      desc:'Crafts detailed photography and art prompts with lighting and style control.',
      skills:['Prompts','Lighting','Style']},
    {id:'a3', name:'Visual Storyteller', icon:'🎞️', role:'Narrative designer', g:5, pinned:false,
      desc:'Turns raw material into a three act story with strong visual beats.',
      skills:['Storyboards','Narrative']},
    {id:'a4', name:'Short-Video Editing Coach', icon:'▶️', role:'Post-production coach', g:4, pinned:false,
      desc:'Hooks, pacing, cuts and retention tactics for short form video.',
      skills:['Hooks','Pacing','Retention']},
    {id:'a5', name:'Frontend Developer', icon:'🧑‍💻', role:'UI engineer', g:3, pinned:true,
      desc:'Builds modern web interfaces, glass layouts and responsive components.',
      skills:['HTML/CSS','React','Motion']},
    {id:'a6', name:'Pitch Deck Builder', icon:'📊', role:'Fundraising designer', g:2, pinned:false,
      desc:'Investor decks with narrative drive, traction charts and a clear ask.',
      skills:['Decks','Traction','Story']},
    {id:'a7', name:'Visa & Immigration Guide', icon:'🛂', role:'Visa specialist', g:6, pinned:true,
      desc:'Visa routes, document checklists, appointments and interview preparation.',
      skills:['Checklists','Embassy','Documents']},
    {id:'a8', name:'Learning Designer', icon:'🎓', role:'Curriculum designer', g:7, pinned:false,
      desc:'Course outlines, module sequencing and practice tasks that stick.',
      skills:['Curriculum','Modules','Assessments']}
  ];

  const teams = [
    {id:'t1', name:'Visa Launch Squad', icon:'🚀', g:0, members:['a7','a1','a5','a6'],
      desc:'Runs the full visa service launch: checklist content, landing page, deck.'},
    {id:'t2', name:'Content Engine', icon:'🎨', g:5, members:['a1','a3','a4'],
      desc:'Weekly content: strategy, visuals and short video edits.'},
    {id:'t3', name:'Product Studio', icon:'🧩', g:2, members:['a5','a2','a8'],
      desc:'Ships product surfaces, image sets and course material.'}
  ];

  const automations = [
    {id:'au1', name:'Daily visa task digest', when:'Every day · 09:00', agentId:'a7', on:true, last:'Today 09:00',
      prompt:'List today open visa tasks and missing documents.'},
    {id:'au2', name:'Weekly content calendar', when:'Every Monday · 08:00', agentId:'a1', on:true, last:'Mon 08:00',
      prompt:'Draft next week content calendar with 5 posts.'},
    {id:'au3', name:'New lead follow-up', when:'When a record is created', agentId:'a7', on:false, last:'Never',
      prompt:'Send a follow-up message with the document checklist.'}
  ];

  const chats = [
    {id:'c0', kind:'agent', ref:'a9', unread:1, updated: Date.now()-1000*60*1, messages:[
      {from:'them', text:'Grok is connected. Ask for anything: a plan, a draft, a fix, or a decision.', ts:Date.now()-1000*60*2},
      {from:'me', text:'What can you do first?', ts:Date.now()-1000*60*1},
      {from:'them', text:'Pick a section and I will run it: Chats for talk, Teams for group work, Automations for scheduled jobs, Artifacts for saved output.', ts:Date.now()-1000*60}
    ]},
    {id:'c1', kind:'agent', ref:'a7', unread:2, updated: Date.now()-1000*60*3, messages:[
      {from:'them', text:'Saudi Arabia visit visa checklist is ready. Want the file?', ts:Date.now()-1000*60*9},
      {from:'me', text:'Yes, send it.', ts:Date.now()-1000*60*6},
      {from:'them', text:'Passport valid 6+ months, white background photos, return ticket, hotel booking, 3 to 6 months bank statements, and a short cover letter. I saved it to Artifacts.', ts:Date.now()-1000*60*3}
    ]},
    {id:'c2', kind:'agent', ref:'a5', unread:1, updated: Date.now()-1000*60*42, messages:[
      {from:'them', text:'Light glass nav is pushed to the preview build. Shadow and press states are in.', ts:Date.now()-1000*60*44},
      {from:'me', text:'Looks good. Keep the gradient buttons.', ts:Date.now()-1000*60*42}
    ]},
    {id:'c3', kind:'agent', ref:'a1', unread:0, updated: Date.now()-1000*60*60*20, messages:[
      {from:'them', text:'Drafted 3 posts for launch week: teaser, proof story, requirement carousel.', ts:Date.now()-1000*60*60*20}
    ]},
    {id:'c4', kind:'Team', ref:'t1', unread:0, updated: Date.now()-1000*60*60*30, messages:[
      {from:'them', text:'Visa Launch Squad: checklist copy done, landing page in review, deck at 9 slides.', ts:Date.now()-1000*60*60*30}
    ]}
  ];

  const memories = [
    {id:'m1', k:'Business', v:'Runs visa and immigration services under the VisaMOTion 365 brand.'},
    {id:'m2', k:'Preference', v:'Prefers replies in Bengali written in romanised Bangla.'},
    {id:'m3', k:'Project', v:'Building Teamily, an AI agent team workspace with an iOS liquid glass UI.'},
    {id:'m4', k:'Working style', v:'Wants work finished end to end with a shareable live link.'}
  ];

  const artifacts = [
    {id:'ar1', icon:'🗂️', name:'Saudi visa checklist', meta:'Updated 3m ago',
      body:'Passport valid 6+ months\nWhite background photos 4x6\nReturn ticket\nHotel booking\n3 to 6 months bank statements\nCover letter\n\nStatus: ready to send to client.'},
    {id:'ar2', icon:'📈', name:'Launch metrics', meta:'Updated today',
      body:'Visitors 1,284\nChecklist downloads 312\nConsultation bookings 46\nConversion 3.6%'},
    {id:'ar3', icon:'🎬', name:'Storyboard v3', meta:'Updated Mon',
      body:'Act 1: the visa maze\nAct 2: the guided path\nAct 3: arrival\n\nSix scenes, 42 seconds total.'},
    {id:'ar4', icon:'🧾', name:'Pitch deck', meta:'9 slides',
      body:'1 Cover\n2 Problem\n3 Solution\n4 Product\n5 Traction\n6 Market\n7 Model\n8 Competition\n9 Ask'}
  ];

  return {agents, teams, automations, chats, memories, artifacts,
    ui:{view:'chats', theme:'light', atab:'agents'}};
}

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function uid(p){ return p + Math.random().toString(36).slice(2,8); }

let db;
try{
  const raw = localStorage.getItem(KEY);
  db = raw ? JSON.parse(raw) : clone(seedData());
  if(!db || !db.agents) db = clone(seedData());
}catch(e){ db = clone(seedData()); }
if(!db.ui) db.ui = {view:'chats', theme:'light', atab:'agents'};

function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(db)); }catch(e){}
  try{ bc && bc.postMessage({type:'sync'}); }catch(e){}
}

let bc = null;
try{ bc = new BroadcastChannel('teamily-sync'); }catch(e){ bc = null; }
if(bc){
  bc.onmessage = e => {
    if(!e.data || e.data.type !== 'sync') return;
    const raw = localStorage.getItem(KEY);
    if(!raw) return;
    try{ db = JSON.parse(raw); }catch(err){ return; }
    render();
    if(chatOpen && document.getElementById('chatSheet').classList.contains('open')) renderMsgs();
  };
}
window.addEventListener('storage', e => {
  if(e.key !== KEY || !e.newValue) return;
  try{ db = JSON.parse(e.newValue); }catch(err){ return; }
  render();
  if(chatOpen) renderMsgs();
});

/* ================= helpers ================= */
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function grad(i){ return GRADS[(i == null ? 0 : i) % GRADS.length]; }
function byId(list, id){ return list.find(x => x.id === id) || null; }

function timeShort(ts){
  const d = new Date(ts);
  return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
function relTime(ts){
  const diff = Date.now() - ts;
  if(diff < 60000) return 'now';
  if(diff < 3600000) return Math.floor(diff/60000) + 'm';
  if(diff < 86400000) return Math.floor(diff/3600000) + 'h';
  if(diff < 604800000) return Math.floor(diff/86400000) + 'd';
  return new Date(ts).toLocaleDateString([], {month:'short', day:'numeric'});
}

let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
}

/* ================= real AI (bring your own key) ================= */
const AI_PRESETS = {
  xai:{label:'xAI Grok', url:'https://api.x.ai/v1/chat/completions', model:'grok-4'},
  openai:{label:'OpenAI', url:'https://api.openai.com/v1/chat/completions', model:'gpt-4o-mini'},
  anthropic:{label:'Anthropic', url:'https://api.anthropic.com/v1/messages', model:'claude-sonnet-4-5'},
  openrouter:{label:'OpenRouter', url:'https://openrouter.ai/api/v1/chat/completions', model:'x-ai/grok-4'},
  groq:{label:'Groq', url:'https://api.groq.com/openai/v1/chat/completions', model:'llama-3.3-70b-versatile'}
};
function aiCfg(){
  if(!db.ai) db.ai = {provider:'xai', key:'', model:''};
  return db.ai;
}
function aiReady(){
  const a = aiCfg();
  return !!(a.key && a.key.replace(/\s/g,'').length > 15);
}
function aiSystem(agent){
  const who = agent ? (agent.name + ' — ' + (agent.role || 'specialist') + '. ' + (agent.desc || '')) : 'the Teamily agent team';
  return 'You are ' + who + ' inside Teamily, a premium AI agent team app. Reply in the user language. Be concrete and practical, max 120 words. Use short lines, no markdown headings.';
}
async function aiReply(system, msgs){
  const a = aiCfg();
  const preset = AI_PRESETS[a.provider] || AI_PRESETS.xai;
  const model = (a.model || preset.model).trim();
  const history = msgs.slice(-12).map(m => ({role: m.from === 'me' ? 'user' : 'assistant', content: m.text}));
  let res;
  if(a.provider === 'anthropic'){
    res = await fetch(preset.url, {
      method:'POST',
      headers:{'content-type':'application/json','x-api-key':a.key.trim(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body: JSON.stringify({model:model, max_tokens:900, system:system, messages:history})
    });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const j = await res.json();
    return (j.content || []).map(x => x.text || '').join('\n').trim();
  }
  res = await fetch(preset.url, {
    method:'POST',
    headers:{'content-type':'application/json','authorization':'Bearer ' + a.key.trim()},
    body: JSON.stringify({model:model, temperature:0.7, messages:[{role:'system', content:system}].concat(history)})
  });
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const j = await res.json();
  return ((j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '').trim();
}

/* ================= replies ================= */
const RULES = [
  {re:/visa|passport|immigration|embassy|schengen|saudi|canada|australia|bangladesh/i, reply:
    'Here is the working checklist: passport valid 6+ months, white background photos, return ticket, hotel booking, 3 to 6 months bank statements, and a cover letter. I have saved it to Artifacts so you can share it. Want me to draft the cover letter next?'},
  {re:/content|post|caption|carousel|instagram|facebook|social/i, reply:
    'I would run three pieces: a teaser reel, a proof story from a real client, and a requirement carousel. That covers reach, trust and intent in one week. Say the word and I will write all three captions.'},
  {re:/video|edit|reel|short|hook/i, reply:
    'Open with a 3 second hook, cut on motion, and keep every shot under 1.8 seconds for retention. Add captions at 42px so it reads on mute. Want a shot list?'},
  {re:/image|photo|prompt|design|visual|logo/i, reply:
    'Try this prompt: "editorial portrait, soft window light, 85mm, shallow depth of field, muted teal palette, subtle film grain". Change only one variable at a time so you can compare results.'},
  {re:/deck|pitch|investor|fund/i, reply:
    'Nine slides works best: cover, problem, solution, product, traction, market, model, competition, ask. Put the ask last and make it one number. I can restructure your current deck into that shape.'},
  {re:/code|bug|build|app|website|frontend|deploy|github/i, reply:
    'I checked the build: all screens render, state saves to storage, and the gradient buttons keep their press glow. Push is on the feature branch. Tell me the next screen you want and I will wire it up.'},
  {re:/automation|reminder|schedule|daily|weekly/i, reply:
    'Automations are live. Open the Automations tab to switch one on, run it now, or add a new schedule with a prompt. Each run appends its result to the chat so you have a history.'},
  {re:/course|learn|module|teach|curriculum/i, reply:
    'Six modules with one practice task after each keeps completion high. Module 1 should deliver a small win in under 10 minutes. Want the full outline?'},
  {re:/hi|hello|hey|salam|assalam|kemon|ki obostha/i, reply:
    'Hey, I am here and ready. Tell me the task and I will take it end to end, then save the output to Artifacts.'},
  {re:/thanks|thank|ধন্যবাদ|dhonnobad/i, reply:
    'Anytime. Anything else you want finished today?'}
];

function replyFor(agentId, text){
  const a = byId(db.agents, agentId);
  for(const r of RULES){ if(r.re.test(text)) return r.reply; }
  const name = a ? a.name : 'your team';
  return 'Got it. As ' + name + ' I would start by breaking that into three concrete steps and doing the first one now. Shall I go ahead and save the result to Artifacts?';
}

/* ================= chrome ================= */
const TITLES = {
  chats:{t:'Chats', s:'Live agent conversations'},
  agents:{t:'Agents', s:'Your AI team'},
  teams:{t:'Agent Teams', s:'Agents working together'},
  automations:{t:'Automations', s:'Running on your behalf'},
  discover:{t:'Discover', s:'Add new specialists'},
  memory:{t:'Memory', s:'What your team knows'},
  artifacts:{t:'Artifacts', s:'Saved outputs'}
};

function applyTheme(){
  document.documentElement.setAttribute('data-theme', db.ui.theme === 'dark' ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = db.ui.theme === 'dark' ? '☀' : '☾';
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content', db.ui.theme === 'dark' ? '#080b14' : '#eef2fb');
}

function updateChrome(){
  const info = TITLES[uiView()] || TITLES.chats;
  document.getElementById('pageTitle').textContent = info.t;
  const unread = db.chats.reduce((n,c) => n + (c.unread || 0), 0);
  document.getElementById('pageSub').textContent = uiView() === 'chats' && unread
    ? unread + ' unread message' + (unread > 1 ? 's' : '')
    : info.s;
  const v = uiView();
  document.querySelectorAll('.dock button').forEach(b => b.classList.toggle('on', b.dataset.view === v));
  const navOn = document.querySelector('.segnav button[data-view="' + v + '"]');
  document.querySelectorAll('.segnav button').forEach(b => b.classList.toggle('on', b === navOn));
  if(navOn){
    navOn.classList.toggle('live', v === 'automations' && db.automations.some(a => a.on));
    const bar = document.getElementById('segNav');
    if(bar){
      const target = navOn.offsetLeft - (bar.clientWidth - navOn.offsetWidth) / 2;
      bar.scrollTo({left:Math.max(0, target), behavior:'smooth'});
    }
  }
  const dockChats = document.querySelector('.dock button[data-view="chats"]');
  let dot = dockChats.querySelector('.dot');
  if(unread && !dot){
    dot = document.createElement('span'); dot.className = 'dot'; dockChats.appendChild(dot);
  } else if(!unread && dot){ dot.remove(); }
}

function uiView(){ return db.ui.view || 'chats'; }

/* ================= views ================= */
function agentFace(a, cls){
  return '<div class="face ' + (cls||'') + '" style="background:' + grad(a.g) + '">' + a.icon + '</div>';
}
function chatTitle(c){
  if(c.kind === 'Team'){
    const t = byId(db.teams, c.ref);
    return t ? {name:t.name, icon:t.icon, g:t.g} : {name:'Team', icon:'👥', g:0};
  }
  const a = byId(db.agents, c.ref);
  return a ? {name:a.name, icon:a.icon, g:a.g} : {name:'Agent', icon:'✦', g:0};
}

function chatsList(){
  const q = (db.ui.q || '').toLowerCase();
  const list = db.chats.slice().sort((x,y) => y.updated - x.updated).filter(c => {
    if(!q) return true;
    const t = chatTitle(c);
    const last = c.messages.length ? c.messages[c.messages.length-1].text : '';
    return (t.name + ' ' + last).toLowerCase().indexOf(q) >= 0;
  });
  if(!list.length) return '<div class="empty">No conversations yet.<br>Pick an agent and say hello.</div>';
  return list.map(c => {
    const t = chatTitle(c);
    const last = c.messages.length ? c.messages[c.messages.length-1].text : 'Start the conversation';
    return '<div class="chatrow card" data-act="openChat" data-id="' + c.id + '">' +
      '<div class="face" style="background:' + grad(t.g) + '">' + t.icon + '</div>' +
      '<div class="grow"><h4>' + esc(t.name) + (c.kind === 'Team' ? ' <span class="chip mint" style="font-size:9.6px;padding:2px 7px">TEAM</span>' : '') + '</h4>' +
      '<p>' + esc(last) + '</p></div>' +
      '<div style="text-align:right"><div class="time">' + relTime(c.updated) + '</div>' +
      (c.unread ? '<div class="unread" style="margin:6px 0 0 auto;width:9px;height:9px;border-radius:50%;background:var(--pink);box-shadow:0 0 8px rgba(255,122,184,.8)"></div>' : '') +
      '</div></div>';
  }).join('');
}

function renderChats(){
  const running = db.automations.filter(a => a.on).length;
  return '' +
    '<div class="hero"><span class="glow"></span>' +
      '<h3>Your team is live</h3>' +
      '<p>' + db.agents.length + ' agents · ' + db.teams.length + ' teams · ' + running + ' automations running</p>' +
      '<div class="row">' +
        '<button class="btn soft" data-act="newChat">＋ New chat</button>' +
        '<button class="btn soft" data-act="nav" data-view="agents">Agents</button>' +
        '<button class="btn soft" data-act="nav" data-view="artifacts">Artifacts</button>' +
      '</div></div>' +
    '<div class="search card"><span class="mag">⌕</span>' +
      '<input data-search="q" placeholder="Search conversations" value="' + esc(db.ui.q || '') + '">' +
    '</div>' +
    '<div id="list-chats">' + chatsList() + '</div>';
}

function agentCard(a){
  return '<div class="agent card">' +
    '<div class="row">' + agentFace(a) +
      '<div class="grow"><h4>' + esc(a.name) + '</h4><p>' + esc(a.desc) + '</p></div>' +
      '<div class="row-actions">' +
        '<button class="tapicon" data-act="agentMenu" data-id="' + a.id + '" title="More">⋯</button>' +
      '</div></div>' +
    '<div class="chips">' + a.skills.map(s => '<span class="chip">' + esc(s) + '</span>').join('') + '</div>' +
    '<div class="row" style="margin-top:12px;gap:8px">' +
      '<button class="btn sm" data-act="chatAgent" data-id="' + a.id + '">Chat now</button>' +
      '<button class="btn sm soft" data-act="agentInfo" data-id="' + a.id + '">Details</button>' +
    '</div></div>';
}

function teamsList(){
  if(!db.teams.length) return '<div class="empty">No teams yet. Create one to group agents.</div>';
  return db.teams.map(t => {
    const members = t.members.map(id => byId(db.agents, id)).filter(Boolean);
    return '<div class="card" style="padding:15px;margin-bottom:11px">' +
      '<div class="row"><div class="face" style="background:' + grad(t.g) + '">' + t.icon + '</div>' +
      '<div class="grow"><h4 style="margin:0 0 3px;font-size:15px">' + esc(t.name) + '</h4>' +
      '<p style="margin:0;font-size:12.4px;color:var(--dim);line-height:1.5">' + esc(t.desc) + '</p></div></div>' +
      '<div class="row" style="margin-top:11px">' +
        members.slice(0,5).map(m => '<div class="face xs" style="background:' + grad(m.g) + '" title="' + esc(m.name) + '">' + m.icon + '</div>').join('') +
        '<span class="mini" style="margin-left:6px">' + members.length + ' agents</span>' +
        '<button class="tapicon" style="margin-left:auto" data-act="teamMenu" data-id="' + t.id + '">⋯</button>' +
      '</div>' +
      '<button class="btn sm block" style="margin-top:11px" data-act="openTeam" data-id="' + t.id + '">Open team chat</button>' +
    '</div>';
  }).join('');
}

function autosList(){
  if(!db.automations.length) return '<div class="empty">No automations yet.</div>';
  return db.automations.map(a => {
    const ag = byId(db.agents, a.agentId);
    return '<div class="card" style="padding:14px;margin-bottom:10px">' +
      '<div class="row">' +
        '<div class="grow"><b style="font-size:14px">' + esc(a.name) + '</b>' +
        '<div style="font-size:12.3px;color:var(--dim);margin-top:3px">' + esc(a.when) + '</div>' +
        '<div class="mini" style="margin-top:6px">' + (ag ? ag.icon + ' ' + esc(ag.name) : 'No agent') + ' · last run ' + esc(a.last || 'never') + '</div>' +
        '</div>' +
        '<button class="sw ' + (a.on ? 'on' : '') + '" data-act="toggleAuto" data-id="' + a.id + '" aria-label="Toggle"><i></i></button>' +
      '</div>' +
      '<div class="row" style="margin-top:11px;gap:7px">' +
        '<button class="btn sm mint" data-act="runAuto" data-id="' + a.id + '">▶ Run now</button>' +
        '<button class="btn sm soft" data-act="autoMenu" data-id="' + a.id + '">⋯</button>' +
      '</div></div>';
  }).join('');
}

function renderAgents(){
  const q = (db.ui.q || '').toLowerCase();
  const list = db.agents.filter(a => !q || (a.name + ' ' + a.desc).toLowerCase().indexOf(q) >= 0);
  const body =
      '<div class="stats">' +
        '<div class="stat card"><b>' + db.agents.length + '</b><span>Agents</span></div>' +
        '<div class="stat card"><b>' + db.teams.length + '</b><span>Teams</span></div>' +
        '<div class="stat card"><b>' + db.automations.filter(x => x.on).length + '</b><span>Live</span></div>' +
      '</div>' +
      '<div class="search card"><span class="mag">⌕</span><input data-search="q" placeholder="Search agents" value="' + esc(db.ui.q || '') + '"></div>' +
      '<div class="row" style="margin-bottom:12px"><span class="sec" style="margin:0;flex:1">Your agents</span>' +
        '<button class="btn sm" data-act="newAgent">＋ New agent</button></div>' +
      '<div id="list-agents">' + (list.length ? list.map(agentCard).join('') : '<div class="empty">No agents match that search.</div>') + '</div>';
  return body;
}

function renderTeams(){
  return '<div class="row" style="margin-bottom:12px"><span class="sec" style="margin:0;flex:1">Agent teams</span>' +
    '<button class="btn sm pink" data-act="newTeam">＋ New team</button></div>' +
    '<div id="list-teams">' + teamsList() + '</div>' +
    '<div class="card" style="padding:15px;margin-top:6px;border-radius:20px">' +
      '<b style="font-size:13.6px">How teams work</b>' +
      '<p style="margin:6px 0 0;font-size:12.6px;color:var(--dim);line-height:1.6">A team is a group of agents that answer one message together. The lead agent splits the work, members reply with their part, and the result lands in Artifacts.</p>' +
    '</div>';
}

function renderAutomations(){
  const live = db.automations.filter(a => a.on).length;
  return '<div class="stats">' +
      '<div class="stat card"><b>' + db.automations.length + '</b><span>Total</span></div>' +
      '<div class="stat card"><b>' + live + '</b><span>Running</span></div>' +
      '<div class="stat card"><b>' + (db.automations.length - live) + '</b><span>Paused</span></div>' +
    '</div>' +
    '<div class="row" style="margin-bottom:12px"><span class="sec" style="margin:0;flex:1">Scheduled work</span>' +
    '<button class="btn sm mint" data-act="newAuto">＋ New</button></div>' +
    '<div id="list-autos">' + autosList() + '</div>';
}

function renderDiscover(){
  const cats = ['All','Content','Design','Code','Business','Education','Travel'];
  const cat = db.ui.cat || 'All';
  const pool = [
    {id:'d1', name:'SEO Writer', icon:'🔎', role:'Search content', g:3, desc:'Rank focused articles, briefs and internal linking plans.', skills:['SEO','Briefs'], cat:'Content'},
    {id:'d2', name:'Brand Designer', icon:'🎯', role:'Identity design', g:5, desc:'Logo systems, palettes and brand guidelines.', skills:['Identity','Palette'], cat:'Design'},
    {id:'d3', name:'API Builder', icon:'🔌', role:'Backend', g:2, desc:'REST endpoints, schemas and integration wiring.', skills:['API','Schema'], cat:'Code'},
    {id:'d4', name:'Sales Closer', icon:'💼', role:'Deal support', g:4, desc:'Objection handling, follow-up sequences and scripts.', skills:['Scripts','Follow-up'], cat:'Business'},
    {id:'d5', name:'Exam Coach', icon:'📘', role:'Test prep', g:6, desc:'Study plans, mock tests and weak spot drills.', skills:['IELTS','Plan'], cat:'Education'},
    {id:'d6', name:'Travel Planner', icon:'🧭', role:'Trip design', g:7, desc:'Routes, budgets and day by day itineraries.', skills:['Itinerary','Budget'], cat:'Travel'}
  ];
  const list = pool.filter(p => cat === 'All' || p.cat === cat);
  return '<div class="sec" style="margin-top:2px">Categories</div>' +
    '<div class="chips" style="margin-bottom:6px">' + cats.map(c =>
      '<span class="chip ' + (c === cat ? 'mint' : '') + '" data-act="cat" data-cat="' + c + '" style="cursor:pointer;padding:6px 12px;font-size:12px">' + c + '</span>').join('') + '</div>' +
    '<div class="sec">Trending specialists</div>' +
    list.map(p => '<div class="agent card">' +
        '<div class="row">' + agentFace(p) +
          '<div class="grow"><h4>' + esc(p.name) + '</h4><p>' + esc(p.desc) + '</p></div></div>' +
        '<div class="chips">' + p.skills.map(s => '<span class="chip">' + esc(s) + '</span>').join('') + '</div>' +
        '<div class="row" style="margin-top:12px;gap:8px">' +
          '<button class="btn sm" data-act="adopt" data-id="' + p.id + '">＋ Add to my agents</button>' +
          '<button class="btn sm soft" data-act="tryAgent" data-id="' + p.id + '">Try chat</button>' +
        '</div></div>').join('');
}

function renderMemory(){
  return '<div class="row" style="margin-bottom:10px"><span class="sec" style="margin:0;flex:1">Long term memory</span>' +
    '<button class="btn sm" data-act="newMemory">＋ Add</button></div>' +
    (db.memories.length ? db.memories.map(m =>
      '<div class="card" style="padding:14px 15px;margin-bottom:10px">' +
        '<div class="row"><b style="font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--dimmer);flex:1">' + esc(m.k) + '</b>' +
        '<button class="tapicon" data-act="memMenu" data-id="' + m.id + '">⋯</button></div>' +
        '<div style="font-size:14px;line-height:1.55;margin-top:6px">' + esc(m.v) + '</div></div>').join('')
      : '<div class="empty">No memory yet. Add the first fact your team should remember.</div>');
}

function renderArtifacts(){
  return '<div class="row" style="margin-bottom:10px"><span class="sec" style="margin:0;flex:1">Saved outputs</span>' +
    '<button class="btn sm pink" data-act="newArtifact">＋ New</button></div>' +
    (db.artifacts.length ? '<div class="artgrid">' + db.artifacts.map(a =>
      '<div class="artcard card" data-act="openArtifact" data-id="' + a.id + '">' +
        '<div class="ico">' + a.icon + '</div>' +
        '<div><b>' + esc(a.name) + '</b><div style="margin-top:4px"><span>' + esc(a.meta) + '</span></div></div>' +
      '</div>').join('') + '</div>'
      : '<div class="empty">Nothing saved yet. Artifacts appear here when an agent finishes work.</div>');
}

const RENDERERS = {chats:renderChats, agents:renderAgents, teams:renderTeams, automations:renderAutomations, discover:renderDiscover, memory:renderMemory, artifacts:renderArtifacts};

function render(){
  applyTheme();
  const v = uiView();
  document.getElementById('screen').innerHTML = (RENDERERS[v] || renderChats)();
  updateChrome();
}

function refreshList(){
  const v = uiView();
  if(v === 'chats'){
    const box = document.getElementById('list-chats');
    if(box) box.innerHTML = chatsList();
  }
  if(v === 'teams'){
    const box = document.getElementById('list-teams');
    if(box) box.innerHTML = teamsList();
  }
  if(v === 'automations'){
    const box = document.getElementById('list-autos');
    if(box) box.innerHTML = autosList();
  }
  if(v === 'agents'){
    const box = document.getElementById('list-agents');
    if(box){
      const q = (db.ui.q || '').toLowerCase();
      const list = db.agents.filter(a => !q || (a.name + ' ' + a.desc).toLowerCase().indexOf(q) >= 0);
      box.innerHTML = list.length ? list.map(agentCard).join('') : '<div class="empty">No agents match that search.</div>';
    }
  }
}

/* ================= navigation ================= */
function go(view){
  db.ui.view = view;
  db.ui.q = '';
  save();
  document.getElementById('screen').scrollTop = 0;
  render();
}

/* ================= chat ================= */
let chatOpen = null;
let typingId = null;

function openChat(chatId){
  const c = byId(db.chats, chatId);
  if(!c) return;
  chatOpen = chatId;
  c.unread = 0;
  save();
  const t = chatTitle(c);
  document.getElementById('sheetFace').textContent = t.icon;
  document.getElementById('sheetFace').style.background = grad(t.g);
  document.getElementById('sheetName').textContent = t.name;
  document.getElementById('sheetRole').textContent = c.kind === 'Team'
    ? (byId(db.teams, c.ref) ? byId(db.teams, c.ref).members.length + ' agents · team chat' : 'team chat')
    : 'online · replies instantly';
  document.getElementById('chatSheet').classList.add('open');
  renderMsgs();
  renderQuick(c);
  updateChrome();
}

function closeChat(){
  document.getElementById('chatSheet').classList.remove('open');
  chatOpen = null;
  typingId = null;
  document.getElementById('screen').scrollTop = 0;
  render();
}

function currentChat(){ return chatOpen ? byId(db.chats, chatOpen) : null; }

function renderMsgs(){
  const c = currentChat();
  const box = document.getElementById('msgs');
  if(!c){ box.innerHTML = ''; return; }
  let html = '<div class="day">' + new Date(c.updated).toLocaleDateString([], {weekday:'short', month:'short', day:'numeric'}) + '</div>';
  html += c.messages.map(m =>
    '<div class="msg ' + (m.from === 'me' ? 'me' : 'them') + '">' + esc(m.text) +
    '<span class="t">' + timeShort(m.ts) + '</span></div>').join('');
  if(typingId === c.id) html += '<div class="typing"><i></i><i></i><i></i></div>';
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}

function renderQuick(c){
  const ax = document.querySelector('.quick');
  const agentId = c.kind === 'Team' ? null : c.ref;
  const isVisa = agentId === 'a7';
  const picks = isVisa
    ? ['Checklist', 'Cover letter', 'Book appointment']
    : ['Give me a plan', 'Draft it now', 'Summarise'];
  ax.innerHTML = picks.map(p => '<button data-act="quick" data-text="' + esc(p) + '">' + esc(p) + '</button>').join('');
}

function sendMsg(textArg){
  const c = currentChat();
  if(!c) return;
  const inp = document.getElementById('msgInput');
  const text = (textArg != null ? textArg : inp.value).trim();
  if(!text) return;
  if(textArg == null) inp.value = '';
  c.messages.push({from:'me', text:text, ts:Date.now()});
  c.updated = Date.now();
  c.unread = 0;
  save();
  renderMsgs();
  const id = c.id;
  const isTeam = c.kind === 'Team';
  let responder = c.ref;
  if(isTeam){
    const team = byId(db.teams, c.ref);
    if(team && team.members.length){
      const mine = c.messages.filter(m => m.from === 'me').length;
      responder = team.members[mine % team.members.length];
    }
  }
  typingId = id;
  setTimeout(() => { if(chatOpen === id) renderMsgs(); }, 60);
  const delay = 700 + Math.random() * 700;
  setTimeout(async () => {
    const chat = byId(db.chats, id);
    if(!chat) return;
    let reply = '';
    if(aiReady()){
      try{
        reply = await aiReply(aiSystem(byId(db.agents, responder)), chat.messages);
      }catch(err){
        toast('AI ' + err.message + ' · offline reply used');
      }
    }
    if(!reply) reply = isTeam ? teamReply(responder, text) : replyFor(responder, text);
    chat.messages.push({from:'them', text:reply, ts:Date.now()});
    chat.updated = Date.now();
    if(chatOpen !== id) chat.unread = (chat.unread || 0) + 1;
    typingId = null;
    save();
    if(chatOpen === id) renderMsgs();
    if(chat.messages.length % 3 === 0) autoArtifact(responder, text);
  }, delay);
}

function teamReply(memberId, text){
  const m = byId(db.agents, memberId);
  const who = m ? m.name : 'The team';
  return who + ': ' + replyFor(memberId, text);
}

function autoArtifact(agentId, text){
  const a = byId(db.agents, agentId);
  db.artifacts.unshift({
    id: uid('ar'),
    icon: a ? a.icon : '✦',
    name: (a ? a.name : 'Agent') + ' output',
    meta: 'Just now',
    body: 'Request: ' + text + '\n\nSaved automatically from the conversation. Open to review, copy or share with the team.'
  });
  save();
  toast('Saved to Artifacts');
}

function newChat(){
  const opts = db.agents.map(a => ({v:a.id, l:a.name})).concat(db.teams.map(t => ({v:'team:' + t.id, l:t.name + ' (team)'})));
  openForm({
    title:'New chat',
    fields:[{name:'who', label:'Chat with', type:'select', options:opts}],
    submit:'Start chat',
    onSave:v => {
      let chat;
      if(String(v.who).indexOf('team:') === 0){
        const tid = String(v.who).slice(5);
        chat = db.chats.find(c => c.kind === 'Team' && c.ref === tid);
        if(!chat){
          chat = {id:uid('c'), kind:'Team', ref:tid, unread:0, updated:Date.now(), messages:[]};
          db.chats.push(chat);
        }
      } else {
        chat = db.chats.find(c => c.kind === 'agent' && c.ref === v.who);
        if(!chat){
          chat = {id:uid('c'), kind:'agent', ref:v.who, unread:0, updated:Date.now(), messages:[]};
          db.chats.push(chat);
        }
      }
      save(); render();
      setTimeout(() => openChat(chat.id), 60);
    }
  });
}

function chatWithAgent(agentId){
  let chat = db.chats.find(c => c.kind === 'agent' && c.ref === agentId);
  if(!chat){
    chat = {id:uid('c'), kind:'agent', ref:agentId, unread:0, updated:Date.now(), messages:[]};
    db.chats.push(chat); save();
  }
  openChat(chat.id);
}

/* ================= modal + forms ================= */
function closeModal(){
  document.getElementById('modal').classList.remove('open');
}
function openModal(html){
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modal').classList.add('open');
}

let formHandler = null;
function openForm(cfg){
  formHandler = cfg.onSave || null;
  const fields = (cfg.fields || []).map((f,i) => {
    const id = 'f_' + i;
    let input;
    if(f.type === 'textarea'){
      input = '<textarea id="' + id + '" placeholder="' + esc(f.ph || '') + '">' + esc(f.value || '') + '</textarea>';
    } else if(f.type === 'select'){
      input = '<select id="' + id + '">' + (f.options || []).map(o =>
        '<option value="' + esc(o.v) + '"' + (o.v === f.value ? ' selected' : '') + '>' + esc(o.l) + '</option>').join('') + '</select>';
    } else {
      input = '<input id="' + id + '" type="' + (f.type || 'text') + '" value="' + esc(f.value || '') + '" placeholder="' + esc(f.ph || '') + '">';
    }
    return '<div class="field"><label>' + esc(f.label) + '</label>' + input + '</div>';
  }).join('');
  openModal('<h3>' + esc(cfg.title) + '</h3>' + fields +
    '<div class="mf-row"><button class="btn soft" data-act="closeModal">Cancel</button>' +
    '<button class="btn" data-act="formSave">' + esc(cfg.submit || 'Save') + '</button></div>');
  formHandler = {cfg:cfg, fields:(cfg.fields || [])};
}

function readForm(){
  const pack = formHandler;
  if(!pack || !pack.fields) return null;
  const out = {};
  pack.fields.forEach((f,i) => { out[f.name] = (document.getElementById('f_' + i).value || '').trim(); });
  return out;
}

function saveForm(){
  const pack = formHandler;
  const vals = readForm();
  if(!vals) return;
  const required = pack.fields.filter(f => !f.optional);
  for(const f of required){
    if(!vals[f.name]){ toast('Please fill in ' + f.label); return; }
  }
  const cb = pack.cfg.onSave;
  closeModal();
  formHandler = null;
  if(cb) cb(vals);
}

/* ---- specific flows ---- */
function newAgentForm(){
  openForm({
    title:'New agent',
    fields:[
      {name:'name', label:'Name', ph:'e.g. Copy Editor'},
      {name:'icon', label:'Icon', ph:'✂️'},
      {name:'desc', label:'What does it do', type:'textarea', ph:'Specialist that edits and tightens copy.'},
      {name:'skills', label:'Skills (comma separated)', ph:'Editing, Tone, Proof'}
    ],
    submit:'Create agent',
    onSave:v => {
      db.agents.push({
        id:uid('a'), name:v.name, icon:v.icon || '✦', role:'Custom agent',
        g:Math.floor(Math.random() * GRADS.length), pinned:false,
        desc:v.desc, skills:(v.skills || '').split(',').map(s => s.trim()).filter(Boolean)
      });
      save(); render(); toast('Agent created');
    }
  });
}

function editAgentForm(id){
  const a = byId(db.agents, id);
  if(!a) return;
  openForm({
    title:'Edit agent',
    fields:[
      {name:'name', label:'Name', value:a.name},
      {name:'icon', label:'Icon', value:a.icon},
      {name:'desc', label:'Description', type:'textarea', value:a.desc},
      {name:'skills', label:'Skills (comma separated)', value:a.skills.join(', ')}
    ],
    submit:'Save changes',
    onSave:v => {
      a.name = v.name; a.icon = v.icon || '✦'; a.desc = v.desc;
      a.skills = (v.skills || '').split(',').map(s => s.trim()).filter(Boolean);
      save(); render(); toast('Agent updated');
    }
  });
}

function newTeamForm(){
  const opts = db.agents.map(a => ({v:a.id, l:a.name}));
  openForm({
    title:'New team',
    fields:[
      {name:'name', label:'Team name', ph:'e.g. Visa Launch Squad'},
      {name:'icon', label:'Icon', ph:'🚀'},
      {name:'desc', label:'What the team owns', type:'textarea'},
      {name:'lead', label:'Lead agent', type:'select', options:opts}
    ],
    submit:'Create team',
    onSave:v => {
      db.teams.push({
        id:uid('t'), name:v.name, icon:v.icon || '👥',
        g:Math.floor(Math.random() * GRADS.length),
        members:[v.lead].concat(db.agents.filter(a => a.id !== v.lead).slice(0,2).map(a => a.id)),
        desc:v.desc
      });
      save(); render(); toast('Team created');
    }
  });
}

function newAutoForm(){
  const opts = db.agents.map(a => ({v:a.id, l:a.name}));
  openForm({
    title:'New automation',
    fields:[
      {name:'name', label:'Name', ph:'Daily visa digest'},
      {name:'when', label:'Schedule', ph:'Every day · 09:00'},
      {name:'agentId', label:'Run with', type:'select', options:opts},
      {name:'prompt', label:'What should it do', type:'textarea', ph:'List today open tasks and missing documents.'}
    ],
    submit:'Create automation',
    onSave:v => {
      db.automations.push({id:uid('au'), name:v.name, when:v.when || 'Manual', agentId:v.agentId, on:true, last:'never', prompt:v.prompt});
      save(); render(); toast('Automation created');
    }
  });
}

function runAuto(id){
  const a = byId(db.automations, id);
  if(!a) return;
  a.last = 'just now';
  save();
  let chat = db.chats.find(c => c.kind === 'agent' && c.ref === a.agentId);
  if(!chat){
    chat = {id:uid('c'), kind:'agent', ref:a.agentId, unread:0, updated:Date.now(), messages:[]};
    db.chats.push(chat);
  }
  chat.messages.push({from:'them', text:'Automation "' + a.name + '" ran: ' + (a.prompt || 'done'), ts:Date.now()});
  chat.updated = Date.now();
  chat.unread = (chat.unread || 0) + 1;
  save(); render();
  toast('Automation ran, result in chat');
}

function newMemoryForm(){
  openForm({
    title:'Add memory',
    fields:[
      {name:'k', label:'Category', ph:'Business'},
      {name:'v', label:'What should the team remember', type:'textarea'}
    ],
    submit:'Save memory',
    onSave:v => {
      db.memories.push({id:uid('m'), k:v.k, v:v.v});
      save(); render(); toast('Memory saved');
    }
  });
}

function newArtifactForm(){
  openForm({
    title:'New artifact',
    fields:[
      {name:'name', label:'Title', ph:'Visa checklist'},
      {name:'icon', label:'Icon', ph:'🗂️'},
      {name:'body', label:'Content', type:'textarea'}
    ],
    submit:'Save artifact',
    onSave:v => {
      db.artifacts.unshift({id:uid('ar'), icon:v.icon || '📄', name:v.name, meta:'Just now', body:v.body});
      save(); render(); toast('Artifact saved');
    }
  });
}

function openArtifact(id){
  const a = byId(db.artifacts, id);
  if(!a) return;
  openModal('<h3>' + a.icon + ' ' + esc(a.name) + '</h3>' +
    '<div class="card" style="padding:14px;white-space:pre-wrap;font-size:13.6px;line-height:1.65;background:var(--card)">' + esc(a.body) + '</div>' +
    '<div class="mf-row"><button class="btn soft" data-act="delArtifact" data-id="' + a.id + '">Delete</button>' +
    '<button class="btn" data-act="closeModal">Done</button></div>');
}

function aiSettingsCard(){
  const a = aiCfg();
  const on = aiReady();
  const opts = Object.keys(AI_PRESETS).map(k =>
    '<option value="' + k + '"' + (a.provider === k ? ' selected' : '') + '>' + AI_PRESETS[k].label + '</option>').join('');
  return '<div class="card" style="padding:14px;margin-bottom:12px">' +
    '<div class="row" style="margin-bottom:10px"><div class="grow"><b style="font-size:14px">Live AI brain</b>' +
      '<div class="mini" style="margin-top:3px">' + (on ? 'Connected · ' + (AI_PRESETS[a.provider]||AI_PRESETS.xai).label + ' · real replies' : 'Off · offline replies until you add a Grok key') + '</div></div>' +
      '<span class="chip ' + (on ? 'mint' : '') + '">' + (on ? 'LIVE' : 'OFFLINE') + '</span></div>' +
    '<label class="mini">Provider</label>' +
    '<select id="aiProvider" class="input" style="width:100%;margin:5px 0 10px;padding:11px 13px;border-radius:13px;border:1px solid var(--line-2);background:var(--card-2);color:var(--ink);font:inherit">' + opts + '</select>' +
    '<label class="mini">API key (stored only on this device)</label>' +
    '<input id="aiKey" class="input" type="password" placeholder="xai-… (Grok API key)" value="' + esc(a.key || '') + '" style="width:100%;margin:5px 0 10px;padding:11px 13px;border-radius:13px;border:1px solid var(--line-2);background:var(--card-2);color:var(--ink);font:inherit">' +
    '<label class="mini">Model (optional)</label>' +
    '<input id="aiModel" class="input" placeholder="' + (AI_PRESETS[a.provider]||AI_PRESETS.xai).model + '" value="' + esc(a.model || '') + '" style="width:100%;margin:5px 0 10px;padding:11px 13px;border-radius:13px;border:1px solid var(--line-2);background:var(--card-2);color:var(--ink);font:inherit">' +
    '<div class="row" style="gap:8px">' +
      '<button class="btn sm" style="flex:1;justify-content:center" data-act="saveAi">Save key</button>' +
      '<button class="btn sm soft" style="flex:1;justify-content:center" data-act="clearAi">Remove</button>' +
    '</div></div>';
}

function openSettings(){
  const dark = db.ui.theme === 'dark';
  openModal('<h3>Settings</h3>' +
    '<div class="card" style="padding:14px;margin-bottom:12px"><div class="row">' +
      '<div class="grow"><b style="font-size:14px">Dark theme</b><div class="mini" style="margin-top:3px">Switch between light and dark glass</div></div>' +
      '<button class="sw ' + (dark ? 'on' : '') + '" data-act="toggleDark"><i></i></button></div></div>' +
    '<div class="card" style="padding:14px;margin-bottom:12px"><div class="row">' +
      '<div class="grow"><b style="font-size:14px">Add to Home Screen</b><div class="mini" style="margin-top:3px">iOS Safari: Share, then Add to Home Screen</div></div>' +
      '<span style="font-size:18px">📲</span></div></div>' +
    aiSettingsCard() +
    '<div class="row" style="gap:8px;margin-bottom:10px">' +
      '<button class="btn soft" style="flex:1;justify-content:center" data-act="exportJson">Export data</button>' +
      '<button class="btn soft" style="flex:1;justify-content:center" data-act="resetAll">Reset app</button>' +
    '</div>' +
    '<div class="mini" style="text-align:center;margin:10px 0 4px">Teamily · build v4 · Grok ready</div>' +
    '<button class="btn block" data-act="closeModal">Close</button>');
}

/* ================= events ================= */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if(!el) return;
  const act = el.dataset.act;
  const id = el.dataset.id;

  if(act === 'send' || act === 'nav' || act === 'atab' || act === 'quick'){
    el.classList.remove('tapped');
    void el.offsetWidth;
    el.classList.add('tapped');
  }

  switch(act){
    case 'nav': go(el.dataset.view); break;
    case 'theme':
      db.ui.theme = db.ui.theme === 'dark' ? 'light' : 'dark';
      save(); applyTheme(); toast(db.ui.theme === 'dark' ? 'Dark glass' : 'Light glass');
      break;
    case 'settings': openSettings(); break;
    case 'closeModal': closeModal(); break;
    case 'formSave': saveForm(); break;
    case 'openChat': openChat(id); break;
    case 'closeChat': closeChat(); break;
    case 'send': sendMsg(null); break;
    case 'quick': sendMsg(el.dataset.text); break;
    case 'chatAgent': chatWithAgent(id); break;
    case 'openTeam': {
      const t = byId(db.teams, id);
      if(!t) return;
      let chat = db.chats.find(c => c.kind === 'Team' && c.ref === id);
      if(!chat){
        chat = {id:uid('c'), kind:'Team', ref:id, unread:0, updated:Date.now(), messages:[]};
        db.chats.push(chat); save();
      }
      openChat(chat.id);
      break;
    }
    case 'atab': db.ui.atab = el.dataset.tab; save(); render(); break;
    case 'agentMenu': agentMenu(id); break;
    case 'teamMenu': teamMenu(id); break;
    case 'autoMenu': autoMenu(id); break;
    case 'memMenu': memMenu(id); break;
    case 'agentInfo': agentInfo(id); break;
    case 'newAgent': newAgentForm(); break;
    case 'newTeam': newTeamForm(); break;
    case 'newAuto': newAutoForm(); break;
    case 'newChat': newChat(); break;
    case 'newMemory': newMemoryForm(); break;
    case 'newArtifact': newArtifactForm(); break;
    case 'toggleAuto': {
      const a = byId(db.automations, id);
      if(!a) return;
      a.on = !a.on;
      save(); render();
      toast(a.on ? 'Automation on' : 'Automation paused');
      break;
    }
    case 'runAuto': runAuto(id); break;
    case 'cat': db.ui.cat = el.dataset.cat; save(); render(); break;
    case 'adopt': adoptAgent(id); break;
    case 'tryAgent': chatWithAgent('tmp_' + id); break;
    case 'openArtifact': openArtifact(id); break;
    case 'delArtifact': {
      db.artifacts = db.artifacts.filter(a => a.id !== id);
      save(); closeModal(); render(); toast('Artifact deleted');
      break;
    }
    case 'toggleDark':
      db.ui.theme = db.ui.theme === 'dark' ? 'light' : 'dark';
      save(); applyTheme(); openSettings();
      break;
    case 'saveAi': {
      const a = aiCfg();
      a.provider = document.getElementById('aiProvider').value;
      a.key = document.getElementById('aiKey').value.trim();
      a.model = document.getElementById('aiModel').value.trim();
      save();
      toast(aiReady() ? 'Live AI connected' : 'Key saved (looks short)');
      openSettings();
      break;
    }
    case 'clearAi': {
      db.ai = {provider:'xai', key:'', model:''};
      save(); toast('Reverted to offline replies'); openSettings(); break;
    }
    case 'exportJson': exportJson(); break;
    case 'resetAll':
      db = clone(seedData());
      save(); applyTheme(); closeModal(); render(); toast('App reset');
      break;
    default: break;
  }
});

document.addEventListener('input', e => {
  const el = e.target.closest('[data-search]');
  if(!el) return;
  db.ui.q = el.value;
  refreshList();
});

/* ================= menus ================= */
function agentMenu(id){
  const a = byId(db.agents, id);
  if(!a) return;
  openModal('<h3>' + a.icon + ' ' + esc(a.name) + '</h3>' +
    '<div class="row" style="gap:8px;margin-bottom:12px">' +
      '<button class="btn" style="flex:1;justify-content:center" data-act="chatAgent" data-id="' + a.id + '">Chat</button>' +
      '<button class="btn soft" style="flex:1;justify-content:center" data-act="agentInfo" data-id="' + a.id + '">Details</button>' +
    '</div>' +
    '<div class="row" style="gap:8px">' +
      '<button class="btn soft" style="flex:1;justify-content:center" data-act="editAgent" data-id="' + a.id + '">Edit</button>' +
      '<button class="btn soft danger" style="flex:1;justify-content:center" data-act="delAgent" data-id="' + a.id + '">Delete</button>' +
    '</div>' +
    '<button class="btn block soft" style="margin-top:12px" data-act="closeModal">Close</button>');
}

function agentInfo(id){
  const a = byId(db.agents, id);
  if(!a) return;
  const chats = db.chats.filter(c => c.kind === 'agent' && c.ref === id);
  const msgs = chats.reduce((n,c) => n + c.messages.length, 0);
  openModal('<h3>' + a.icon + ' ' + esc(a.name) + '</h3>' +
    '<div class="card" style="padding:14px;margin-bottom:12px">' +
      '<p style="margin:0 0 10px;font-size:13.6px;line-height:1.6">' + esc(a.desc) + '</p>' +
      '<div class="chips">' + a.skills.map(s => '<span class="chip">' + esc(s) + '</span>').join('') + '</div>' +
    '</div>' +
    '<div class="stats" style="margin-bottom:12px">' +
      '<div class="stat card"><b>' + msgs + '</b><span>Messages</span></div>' +
      '<div class="stat card"><b>' + chats.length + '</b><span>Chats</span></div>' +
      '<div class="stat card"><b>' + db.artifacts.length + '</b><span>Artifacts</span></div>' +
    '</div>' +
    '<button class="btn block" data-act="chatAgent" data-id="' + a.id + '">Start chatting</button>');
}

function teamMenu(id){
  const t = byId(db.teams, id);
  if(!t) return;
  openModal('<h3>' + t.icon + ' ' + esc(t.name) + '</h3>' +
    '<p style="font-size:13.6px;line-height:1.6;color:var(--dim);margin:0 0 14px">' + esc(t.desc) + '</p>' +
    '<div class="row" style="gap:8px"><button class="btn" style="flex:1;justify-content:center" data-act="openTeam" data-id="' + t.id + '">Open chat</button>' +
    '<button class="btn soft danger" style="flex:1;justify-content:center" data-act="delTeam" data-id="' + t.id + '">Delete</button></div>');
}

function autoMenu(id){
  const a = byId(db.automations, id);
  if(!a) return;
  openModal('<h3>' + esc(a.name) + '</h3>' +
    '<div class="card" style="padding:14px;margin-bottom:12px;font-size:13.4px;line-height:1.6">' +
      '<b>Schedule:</b> ' + esc(a.when) + '<br><b>Prompt:</b> ' + esc(a.prompt || 'none') + '</div>' +
    '<div class="row" style="gap:8px"><button class="btn mint" style="flex:1;justify-content:center" data-act="runAuto" data-id="' + a.id + '">Run now</button>' +
    '<button class="btn soft danger" style="flex:1;justify-content:center" data-act="delAuto" data-id="' + a.id + '">Delete</button></div>');
}

function memMenu(id){
  const m = byId(db.memories, id);
  if(!m) return;
  openModal('<h3>' + esc(m.k) + '</h3>' +
    '<div class="card" style="padding:14px;margin-bottom:12px;font-size:13.8px;line-height:1.6">' + esc(m.v) + '</div>' +
    '<div class="row" style="gap:8px"><button class="btn soft" style="flex:1;justify-content:center" data-act="editMemory" data-id="' + m.id + '">Edit</button>' +
    '<button class="btn soft danger" style="flex:1;justify-content:center" data-act="delMemory" data-id="' + m.id + '">Delete</button></div>');
}

/* extra actions that need their own switch entry */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if(!el) return;
  const act = el.dataset.act;
  const id = el.dataset.id;
  if(act === 'editAgent'){
    closeModal();
    setTimeout(() => editAgentForm(id), 40);
  }
  if(act === 'delAgent'){
    db.agents = db.agents.filter(a => a.id !== id);
    db.teams.forEach(t => { t.members = t.members.filter(m => m !== id); });
    db.chats = db.chats.filter(c => !(c.kind === 'agent' && c.ref === id));
    save(); closeModal(); render(); toast('Agent deleted');
  }
  if(act === 'delTeam'){
    db.teams = db.teams.filter(t => t.id !== id);
    db.chats = db.chats.filter(c => !(c.kind === 'Team' && c.ref === id));
    save(); closeModal(); render(); toast('Team deleted');
  }
  if(act === 'delAuto'){
    db.automations = db.automations.filter(a => a.id !== id);
    save(); closeModal(); render(); toast('Automation deleted');
  }
  if(act === 'delMemory'){
    db.memories = db.memories.filter(m => m.id !== id);
    save(); closeModal(); render(); toast('Memory removed');
  }
  if(act === 'editMemory'){
    const m = byId(db.memories, id);
    if(!m) return;
    closeModal();
    setTimeout(() => openForm({
      title:'Edit memory',
      fields:[{name:'k', label:'Category', value:m.k}, {name:'v', label:'Value', type:'textarea', value:m.v}],
      submit:'Save',
      onSave:v => { m.k = v.k; m.v = v.v; save(); render(); toast('Memory updated'); }
    }), 40);
  }
});

function adoptAgent(id){
  const pool = {
    d1:{name:'SEO Writer', icon:'🔎', desc:'Rank focused articles, briefs and internal linking plans.', skills:['SEO','Briefs']},
    d2:{name:'Brand Designer', icon:'🎯', desc:'Logo systems, palettes and brand guidelines.', skills:['Identity','Palette']},
    d3:{name:'API Builder', icon:'🔌', desc:'REST endpoints, schemas and integration wiring.', skills:['API','Schema']},
    d4:{name:'Sales Closer', icon:'💼', desc:'Objection handling, follow-up sequences and scripts.', skills:['Scripts','Follow-up']},
    d5:{name:'Exam Coach', icon:'📘', desc:'Study plans, mock tests and weak spot drills.', skills:['IELTS','Plan']},
    d6:{name:'Travel Planner', icon:'🧭', desc:'Routes, budgets and day by day itineraries.', skills:['Itinerary','Budget']}
  };
  const p = pool[id];
  if(!p) return;
  if(db.agents.some(a => a.name === p.name)){ toast('Already in your agents'); return; }
  db.agents.push({id:uid('a'), name:p.name, icon:p.icon, role:'Specialist', g:Math.floor(Math.random() * GRADS.length), pinned:false, desc:p.desc, skills:p.skills});
  save(); render(); toast(p.name + ' added');
}

function exportJson(){
  const data = JSON.stringify(db, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'teamily-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  toast('Backup downloaded');
}

/* template agents referenced by tryAgent */
function ensureTryAgent(id){
  const pool = {
    'tmp_d1':{name:'SEO Writer', icon:'🔎', desc:'Rank focused articles and briefs.', skills:['SEO','Briefs']},
    'tmp_d2':{name:'Brand Designer', icon:'🎯', desc:'Logo systems and palettes.', skills:['Identity','Palette']},
    'tmp_d3':{name:'API Builder', icon:'🔌', desc:'REST endpoints and schemas.', skills:['API','Schema']},
    'tmp_d4':{name:'Sales Closer', icon:'💼', desc:'Scripts and follow-up sequences.', skills:['Scripts']},
    'tmp_d5':{name:'Exam Coach', icon:'📘', desc:'Study plans and mock tests.', skills:['IELTS']},
    'tmp_d6':{name:'Travel Planner', icon:'🧭', desc:'Routes, budgets and itineraries.', skills:['Itinerary']}
  };
  if(pool[id] && !byId(db.agents, id)){
    const p = pool[id];
    db.agents.push({id:id, name:p.name, icon:p.icon, role:'Preview', g:Math.floor(Math.random() * GRADS.length), pinned:false, desc:p.desc, skills:p.skills});
    save();
  }
}
const origChatWithAgent = chatWithAgent;
chatWithAgent = function(agentId){
  ensureTryAgent(agentId);
  origChatWithAgent(agentId);
};

/* modal backdrop close */
document.getElementById('modal').addEventListener('click', e => {
  if(e.target.id === 'modal') closeModal();
});

/* ================= clock + live times ================= */
function tickClock(){
  const d = new Date();
  document.getElementById('clock').textContent = d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
tickClock();
setInterval(tickClock, 1000 * 20);
setInterval(() => {
  if(uiView() === 'chats' && !chatOpen) refreshList();
  updateChrome();
}, 30000);

/* ================= top nav behaviour ================= */
const screenEl = document.getElementById('screen');
const topHeader = document.querySelector('header.top');
const topNav = document.getElementById('topnav');
function onScreenScroll(){
  const y = screenEl.scrollTop;
  topHeader.classList.toggle('compact', y > 26);
  topNav.classList.toggle('stuck', y > 26);
}
screenEl.addEventListener('scroll', onScreenScroll, {passive:true});
onScreenScroll();

/* service worker (offline shell, installable app) */
if('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')){
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* boot ================= */
applyTheme();
render();
if(db.ui.theme === 'dark') document.getElementById('themeBtn').textContent = '☀';
