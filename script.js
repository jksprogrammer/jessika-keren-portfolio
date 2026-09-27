document.addEventListener('DOMContentLoaded',()=>{
  if('scrollRestoration' in history) history.scrollRestoration='manual';
  if(!location.hash) window.scrollTo(0,0);
  document.getElementById('year').textContent=new Date().getFullYear();
  const body=document.body, theme=document.getElementById('themeToggle');
  if(localStorage.getItem('jessika-theme')==='dark') body.classList.add('dark');
  theme.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('jessika-theme',body.classList.contains('dark')?'dark':'light')});

  const menu=document.getElementById('menuBtn'), nav=document.getElementById('navLinks');
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  const reveals=document.querySelectorAll('.reveal');
  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');ro.unobserve(e.target)}}),{threshold:.1});
  reveals.forEach(e=>ro.observe(e));

  const progress=document.querySelector('.progress');
  window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/Math.max(h,1)*100)+'%'});

  const glow=document.querySelector('.cursor-glow');
  window.addEventListener('mousemove',e=>{if(innerWidth>700){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
  if(matchMedia('(pointer:coarse)').matches) glow.style.display='none';

  document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`}));
  document.querySelectorAll('.magnetic').forEach(el=>el.addEventListener('mouseleave',()=>el.style.transform=''));

  const data={
    skysage:{k:'AI · SATELLITE INTELLIGENCE',t:'SkySage',s:'An AI-powered satellite intelligence system designed to turn satellite, climate and environmental signals into explainable disaster-risk insights.',idea:'SkySage explores how historical satellite and environmental patterns can be learned and compared with current conditions to identify emerging disaster risk.',does:'It combines computer vision, machine learning, geospatial analysis and environmental data to estimate risk, severity and potentially affected regions.',features:'Multi-hazard analysis · historical pattern comparison · explainable AI · RAG knowledge layer · agentic coordination · community feedback · post-disaster lessons · offline/edge direction.',tech:'Satellite imagery · climate/environmental data · Computer Vision · ML · geospatial analysis · RAG · Generative AI · Agentic AI.',why:'The goal is to move from difficult-to-interpret data toward understandable intelligence that can support earlier awareness and clearer action.',next:'Prototype the data pipeline, train baseline models, build the geospatial interface and validate the approach on historical disaster cases.'},
    monastery:{k:'WEB · TRAVEL & HERITAGE',t:'Monastery360',s:'A digital tourism and preservation platform concept for exploring Sikkim monasteries beyond static listings.',idea:'The project imagines a single digital experience that combines virtual exploration, heritage information, routes and intelligent discovery.',does:'Users can explore monasteries through 360° experiences, maps, multilingual information, transport guidance, archives and location-aware features.',features:'360° tours · multilingual narration · maps/routes · transport information · AI search · GPS/Bluetooth audio guide · offline access · calendar.',tech:'HTML · CSS · JavaScript · Node.js · Express · MongoDB · mapping/location concepts.',why:'It connects cultural preservation with accessible digital tourism and gives visitors richer context before and during a visit.',next:'Expand the backend, add real monastery data, connect maps and build the guided-tour experience.'},
    bugtrack:{k:'REACT · EXPRESS · MONGODB',t:'BugTrack',s:'A role-based full-stack bug tracking application designed around practical software-team workflows.',idea:'BugTrack focuses on making issue reporting and progress visible across Admin, Developer and Tester roles.',does:'Users can create and manage bugs, add comments, view activities and move issues through a Kanban-style workflow.',features:'Role-based access · bug CRUD · comments · activity feed · Kanban board · status workflows · API backend · AI-assistance direction.',tech:'React · Vite · Node.js · Express · MongoDB · REST API · JavaScript.',why:'It turns a common development problem into a complete application that demonstrates frontend, backend, database and workflow concepts together.',next:'Polish authentication, permissions, AI assistance and deployment-ready testing.'},
    aimers:{k:'AI · CYBERSECURITY · TRAINING',t:'AIMERS & Indian Servers',s:'An internship cum industrial training experience focused on Artificial Intelligence and Cyber Security.',idea:'A practical learning track connecting classroom concepts with industry-oriented AI and cybersecurity topics.',does:'The experience supports hands-on exposure to tools, concepts, exercises and project-oriented learning.',features:'AI concepts · cybersecurity fundamentals · practical exercises · industrial training · project exposure.',tech:'AI concepts · cybersecurity tools and workflows · programming fundamentals.',why:'It broadens the portfolio beyond projects by showing structured learning and exposure to two growing technical areas.',next:'Apply the learned concepts in portfolio projects and document concrete outcomes.'},
    cognifyz:{k:'DATA VISUALIZATION · EXCEL',t:'Cognifyz',s:'A data visualization internship project focused on turning spreadsheet data into interactive dashboards.',idea:'The work explored how structured Excel analysis can become easier to understand through visual summaries and interactive controls.',does:'Built dashboards using PivotTables, charts, slicers, lookups and conditional analysis.',features:'PivotTables · charts · slicers · COUNTIFS/SUMIFS · lookups · dashboard design.',tech:'Microsoft Excel 365.',why:'It developed practical data-handling and visualization skills that support later AI and analytics work.',next:'Move the same analytical thinking into Python, SQL and interactive web dashboards.'},
    codsoft:{k:'PYTHON · MINI PROJECTS',t:'CodSoft',s:'A collection of beginner-friendly Python applications built to strengthen programming fundamentals.',idea:'Small applications were used as focused exercises for logic, UI events and basic Python programming.',does:'Built a To-Do List, Calculator and Rock-Paper-Scissors applications using Python and Tkinter.',features:'Task management · calculator operations · game logic · desktop GUI interactions.',tech:'Python · Tkinter.',why:'These projects helped translate basic programming concepts into working applications.',next:'Continue toward larger Python applications and stronger code architecture.'}
  };
  const modal=document.getElementById('projectModal');
  const ids=['modalKicker','modalTitle','modalSummary','modalIdea','modalDoes','modalFeatures','modalTech','modalWhy','modalNext'];
  function openProject(key){const d=data[key];if(!d)return;const map={modalKicker:d.k,modalTitle:d.t,modalSummary:d.s,modalIdea:d.idea,modalDoes:d.does,modalFeatures:d.features,modalTech:d.tech,modalWhy:d.why,modalNext:d.next};ids.forEach(id=>document.getElementById(id).textContent=map[id]);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
  document.querySelectorAll('.project-card').forEach(c=>c.addEventListener('click',()=>openProject(c.dataset.project)));
  document.getElementById('modalClose').addEventListener('click',closeProject);document.querySelector('.modal-backdrop').addEventListener('click',closeProject);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject()});

  const counters=document.querySelectorAll('[data-count]');
  const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,target=+el.dataset.count,duration=900,start=performance.now();function tick(now){const p=Math.min((now-start)/duration,1);el.textContent=Math.floor(target*p).toLocaleString();if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);co.unobserve(el)}}),{threshold:.8});
  counters.forEach(c=>co.observe(c));
});
