/* English Restart — local, dependency-free application. All state is private. */
(() => {
  'use strict';
  const key = 'english-restart-v2';
  const testKey = 'english-restart-test-v21';
  const sections = {
    home: ['Môj priestor', '⌂'], vocabulary: ['Slovná zásoba', 'Aa'],
    grammar: ['Gramatika', '◫'], reading: ['Reading', '▤'], listening: ['Listening', '◉'],
    realworld: ['Real-World English', '↗'], academic: ['Academic English', '◇'],
    tests: ['Testy CEFR', '✓'], progress: ['Môj progres', '◷']
  };
  const fresh = () => ({version: 2, theme: 'light', level: 'all', completed: {}, words: {}, history: [], drafts: {}, reviews: {}, lastLesson: null});
  let state = fresh();
  let storageOK = true;
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    if (value?.version === 2) {
      for (const field of ['completed','words','drafts','reviews']) if (value[field] && typeof value[field] === 'object' && !Array.isArray(value[field])) state[field] = value[field];
      if (Array.isArray(value.history)) state.history = value.history.filter(x => x && typeof x.level === 'string' && Number.isFinite(x.score)).slice(-100);
      if (['light','dark'].includes(value.theme)) state.theme = value.theme;
      if (['all','A1','A2','B1','B2','C1','C2'].includes(value.level)) state.level = value.level;
      if(typeof value.lastLesson==='string')state.lastLesson=value.lastLesson;
    }
  } catch { storageOK = false; }
  let content;
  let route = 'home';
  let topic = 'all';
  let query = '';
  let dueOnly = false;
  let wordIndex = 0;
  let quiz = null;
  let testMode = 'journey';
  let noticeTimer;
  const main = document.querySelector('#main');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const notice = (message, persistent = false) => {
    clearTimeout(noticeTimer);
    document.querySelector('#notice').textContent = message;
    if(!persistent)noticeTimer=setTimeout(()=>{document.querySelector('#notice').textContent='';},6000);
  };
  function save() {
    try { localStorage.setItem(key, JSON.stringify(state)); storageOK = true; }
    catch { storageOK = false; notice('Prehliadač nepovolil uloženie. Progres je dostupný iba počas tejto návštevy.',true); }
  }
  function normalizeBackup(data) {
    const isMap = value => value && typeof value === 'object' && !Array.isArray(value);
    if(data?.version!==2 || !['completed','words','drafts','reviews'].every(field=>isMap(data[field])) || !Array.isArray(data.history)) throw new Error('Invalid backup');
    const clean=fresh();
    for(const item of content.lessons){
      const c=data.completed[item.id];
      if(c&&Number.isFinite(c.score)&&c.score>=70&&c.score<=100&&typeof c.date==='string'&&Number.isFinite(Date.parse(c.date))) clean.completed[item.id]={score:c.score,date:c.date};
      if(typeof data.drafts[item.id]==='string')clean.drafts[item.id]=data.drafts[item.id].slice(0,50000);
    }
    for(const w of content.vocabulary){
      if(data.words[w.id]===true)clean.words[w.id]=true;
      const review=data.reviews[w.id];if(review&&Number.isFinite(review.due))clean.reviews[w.id]={due:review.due};
    }
    clean.history=data.history.filter(x=>{
      const levels=Array.isArray(x?.levels)?x.levels:[x?.level];
      return x&&levels.length>0&&levels.length<=6&&levels.every(level=>Object.hasOwn(content.tests,level))&&typeof x.level==='string'&&x.level===(levels.length===1?levels[0]:`${levels[0]}–${levels.at(-1)}`)&&Number.isFinite(x.score)&&x.score>=0&&x.score<=100&&typeof x.date==='string'&&Number.isFinite(Date.parse(x.date));
    }).slice(-100).map(x=>({level:x.level,score:x.score,date:x.date,levels:x.levels||[x.level],assisted:Number.isInteger(x.assisted)&&x.assisted>=0?x.assisted:0,...(typeof x.attemptId==='string'?{attemptId:x.attemptId}:{})}));
    if(content.lessons.some(x=>x.id===data.lastLesson))clean.lastLesson=data.lastLesson;
    clean.theme=state.theme;clean.level=state.level;
    return clean;
  }
  const button = (label, action, extra = '', secondary = false) => `<button type="button" class="btn${secondary ? ' secondary' : ''}" data-action="${action}" ${extra}>${label}</button>`;
  const link = (label, target, secondary = false) => `<a class="btn${secondary ? ' secondary' : ''}" href="#${target}">${label}</a>`;
  const eligible = item => state.level === 'all' || item.level === state.level;
  function header(title, description, eyebrow = 'VÁŠ ĎALŠÍ KROK') {
    return `<div class="heading-row"><div><span class="eyebrow muted">${eyebrow}</span><h1>${escape(title)}</h1><p class="intro">${escape(description)}</p></div><span class="pill">Vlastné tempo. Skutočný progres.</span></div>`;
  }
  function lessonCard(item) {
    return `<article class="card"><div class="card-meta"><span>${escape(item.level)} · ${escape(sections[item.section][0])}</span><span>${state.completed[item.id] ? '✓ Dokončené' : `${item.questions.length} otázky`}</span></div><h3>${escape(item.title)}</h3><p>${escape(item.summary)}</p><a class="btn text" href="#lesson/${item.id}">Otvoriť lekciu →</a></article>`;
  }
  function home() {
    const last = state.history.at(-1);
    const recent=content.lessons.find(x=>x.id===state.lastLesson&&eligible(x)&&!state.completed[x.id]);
    const recommended = recent || content.lessons.find(x => eligible(x) && !state.completed[x.id]) || content.lessons.find(eligible) || content.lessons[0];
    const due=content.vocabulary.filter(x=>state.reviews[x.id]?.due<=Date.now()).length;
    return `${header('Vitajte späť v angličtine.', 'Nie od nuly. Tam, kde ste prestali. Vyberte si jeden malý krok na dnes.', 'LEARNING, AT YOUR PACE')}
      ${quiz&&quiz.status!=='finished'?`<section class="resume-panel"><div><strong>Máte rozpracovaný test ${escape(testRange(quiz.levels))}.</strong><p>${submittedQuestionCount()} odpovedí je uzamknutých. Môžete pokračovať vlastným tempom.</p></div>${link('Pokračovať v teste →','tests')}</section>`:''}
      ${due?`<div class="review-reminder"><span>${due} ${due===1?'slovo čaká':'slov čaká'} na opakovanie. Krátke zopakovanie pomáha uchovať význam.</span>${button('Zopakovať slová →','open-reviews','',true)}</div>`:''}
      <div class="hero-grid"><section class="feature"><span class="eyebrow">ODPORÚČANÁ LEKCIA · ${escape(recommended.level)}</span><h2>${escape(recommended.title)}</h2><p>${escape(recommended.summary)}</p>${link('Pokračovať v učení →', `lesson/${recommended.id}`)}</section><section class="daily"><span class="eyebrow">VÁŠ 15-MINÚTOVÝ PLÁN</span><h2>Trochu každý deň.</h2><ol><li>5 min · zopakujte si nové slová</li><li>7 min · čítajte alebo počúvajte</li><li>3 min · overte si porozumenie</li></ol>${link('Precvičiť slovíčka →','vocabulary',true)}</section></div>
      <div class="stats"><div class="stat"><strong>${Object.keys(state.completed).length}</strong><span>Dokončené lekcie / ${content.lessons.length}</span></div><div class="stat"><strong>${Object.keys(state.words).length}</strong><span>Overené slovíčka / ${content.vocabulary.length}</span></div><div class="stat"><strong>${state.history.length}</strong><span>Dokončené testy</span></div><div class="stat"><strong>${last ? `${last.score}%` : '—'}</strong><span>${last ? `Posledný test ${escape(last.level)}` : 'Zistite, kde začať'}</span></div></div>
      <div class="section-heading"><h2>Kam sa dnes posuniete?</h2><span class="muted">Praktické učenie bez tlaku</span></div><div class="grid">${[['vocabulary','Slová, ktoré využijete','Tematické kartičky, príklady a aktívne vybavovanie.'],['realworld','Angličtina v živote','Emaily, meetingy, dodávatelia a riešenie problémov.'],['academic','Jasné myšlienky. Presný jazyk.','Argumentácia, akademické písanie a kritické čítanie.']].map(([id,title,desc])=>`<article class="card"><div class="card-icon">${sections[id][1]}</div><h3>${title}</h3><p>${desc}</p><a class="btn text" href="#${id}">Preskúmať →</a></article>`).join('')}</div>`;
  }
  function library(section) {
    const descriptions = {grammar:'Pochopte pravidlo, pozrite si použitie a overte si ho na cvičení.',reading:'Čítajte pracovné aj každodenné texty. Hľadajte zmysel, detaily a zámer autora.',listening:'Počúvajte anglický syntetický hlas prehliadača. Trénujte hlavný význam aj detaily.',realworld:'Precvičte si užitočné odpovede a píšte vlastné texty podľa vzoru.',academic:'Rozvíjajte argumentáciu, presnosť a prácu s dôkazmi.'};
    const items = content.lessons.filter(x => x.section === section && eligible(x));
    return `${header(sections[section][0], descriptions[section])}<p class="muted">${items.length} lekcií${state.level !== 'all' ? ` · filter ${state.level}` : ' · všetky úrovne'}</p><div class="grid">${items.map(lessonCard).join('') || `<div class="empty"><p>Pre túto úroveň tu zatiaľ nie je lekcia. Skúste širší výber.</p>${button('Zobraziť všetky úrovne','show-all','',true)}</div>`}</div>`;
  }
  function questionFields(questions, previous = {}, helpEnabled = false, helped = []) {
    return questions.map((q,i) => `<fieldset class="question"><legend><span class="muted">${i+1}. </span><span lang="${/[áäčďéíĺľňóôŕšťúýž]/i.test(q.prompt) ? 'sk' : 'en'}">${escape(q.prompt)}</span></legend>${helpEnabled&&q.help?.length?`<details class="word-help" data-help-index="${i}"><summary>Help · slovíčka <span class="help-used">${helped[i]?'· použitá pomoc':''}</span></summary><dl>${q.help.map(h=>`<div><dt lang="en">${escape(h.word)}</dt><dd>${escape(h.translation)}</dd></div>`).join('')}</dl><p>Pomoc vysvetľuje slová. Odpoveď vyberte podľa významu celej vety.</p></details>`:''}${q.options.map((opt,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}" ${previous[i]===j?'checked':''} required><span lang="en">${escape(opt)}</span></label>`).join('')}</fieldset>`).join('');
  }
  function lesson(item) {
    const listening = item.section === 'listening';
    const writing = ['academic','realworld'].includes(item.section);
    const speech = `<div class="actions">${button('▶ Prehrať', 'speak', `data-id="${item.id}"`)}${button('Pomalšie', 'speak', `data-id="${item.id}" data-rate="0.75"`,true)}${button('■ Zastaviť', 'stop','',true)}</div><p class="muted">Syntetické audio · dostupnosť a hlas závisia od prehliadača. Prepis je dostupný nižšie.</p>`;
    return `<div class="lesson"><div class="breadcrumb"><a href="#${item.section}">${escape(sections[item.section][0])}</a> / ${escape(item.title)}</div><span class="eyebrow muted">${escape(item.level)} · ${escape(sections[item.section][0])}</span><h1>${escape(item.title)}</h1><p class="intro">${escape(item.summary)}</p>
      <article class="card">${listening ? speech + `<details><summary>Zobraziť anglický prepis</summary><p class="prose" lang="en">${escape(item.text)}</p></details>` : `<div class="prose reading-text" lang="en">${escape(item.text)}</div>`}${item.translation?`<details><summary>Slovenská podpora</summary><p class="prose">${escape(item.translation)}</p></details>`:''}${item.tips?.length?`<h2>Na čo sa zamerať</h2><ul class="tips">${item.tips.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>`:''}</article>
      <section class="card"><h2>Overte si porozumenie</h2><p class="muted">${item.questions.length===2?'Na dokončenie tejto krátkej lekcie potrebujete obe odpovede správne.':'Na dokončenie lekcie potrebujete aspoň 70 % správnych odpovedí.'} Môžete skúsiť znova.</p><form id="lesson-form" data-id="${item.id}">${questionFields(item.questions)}<button class="btn" type="submit">Vyhodnotiť cvičenie</button></form><div id="exercise-result" role="status" aria-live="polite"></div></section>
      ${writing?`<section class="card"><h2>Použite to vlastnými slovami</h2><label class="writing" for="draft">Napíšte vlastný text v angličtine podľa lekcie.</label><textarea id="draft" data-id="${item.id}" placeholder="Your message or paragraph…" lang="en">${escape(state.drafts[item.id]||'')}</textarea><p class="muted">Koncept sa ukladá priebežne na tomto zariadení. Voľné písanie sa automaticky neznámkuje.</p><details><summary>Kontrolný zoznam pre vlastné hodnotenie</summary><ul class="tips"><li>Vyjadril/a som jasný účel a adresáta?</li><li>Použil/a som konkrétne detaily a vhodný register?</li><li>Skontroloval/a som slovesné časy a členy?</li><li>Porovnal/a som svoj text so vzorom a opravil/a nejasnosti?</li></ul></details></section>`:''}
      <div class="actions">${link('← Zoznam lekcií',item.section,true)}${link('Späť na hlavnú obrazovku','home',true)}${link('Môj progres →','progress',true)}</div></div>`;
  }
  function filteredWords() {
    const needle = query.trim().toLocaleLowerCase('sk');
    return content.vocabulary.filter(x => eligible(x) && (!dueOnly || (state.reviews[x.id] && state.reviews[x.id].due <= Date.now())) && (topic==='all'||x.topic===topic) && (!needle||`${x.word} ${x.translation} ${x.example}`.toLocaleLowerCase('sk').includes(needle)));
  }
  function vocabulary() {
    const words = filteredWords();
    wordIndex = Math.min(wordIndex, Math.max(0,words.length-1));
    const w = words[wordIndex];
    const topics = [...new Set(content.vocabulary.map(x=>x.topic))];
    const review = w && state.reviews[w.id];
    return `${header('Slová pre váš skutočný život.', 'Učte sa slová v kontexte. Význam najprv skúste vybaviť bez pomoci.', 'VOCABULARY LAB')}
      <div class="toolbar"><label for="search">Hľadať slovíčko</label><input type="search" id="search" value="${escape(query)}" placeholder="Slovo, preklad alebo príklad…"><label for="topic">Téma</label><select id="topic"><option value="all">Všetky témy</option>${topics.map(t=>`<option ${t===topic?'selected':''}>${escape(t)}</option>`).join('')}</select><label><input id="due-only" type="checkbox" ${dueOnly?'checked':''}> Iba slová na opakovanie</label></div><p class="muted">${words.length} slov · ${content.vocabulary.length} v celej knižnici</p>
      ${w?`<div class="vocab-layout"><section class="card word-card"><span class="eyebrow muted">${escape(w.topic)} · ${w.level} · ${wordIndex+1}/${words.length}</span><h2 class="word" lang="en">${escape(w.word)}</h2><p class="example" lang="en">${escape(w.example)}</p><p id="word-meaning" hidden>${escape(w.translation)}</p><div class="actions">${button('Odkryť význam','reveal')}${button('🔊 Výslovnosť','speak-word',`data-id="${w.id}"`,true)}</div><p class="muted">${state.words[w.id]?'✓ Overené cvičením':'Precvičte si význam v otázke vedľa.'}${review?` · Ďalšie opakovanie: ${escape(new Date(review.due).toLocaleDateString('sk'))}`:''}</p><div class="actions">${button('← Predošlé','word-prev',wordIndex===0?'disabled':'',true)}${button('Ďalšie →','word-next',wordIndex===words.length-1?'disabled':'',true)}</div>${button('Zopakovať zajtra','review-word',`data-id="${w.id}"`,true)}</section><section class="card"><h2>Aktívne vybavenie</h2><p>Aký je slovenský význam slova <strong lang="en">${escape(w.word)}</strong>?</p><form id="word-form" data-id="${w.id}"><label for="meaning">Váš preklad</label><input type="text" id="meaning" required autocomplete="off"><p class="muted">Napíšte význam vlastnými slovami; pri odlišnej formulácii ho porovnajte so vzorom.</p><button class="btn" type="submit">Skontrolovať význam</button></form><div id="word-result" role="status" aria-live="polite"></div></section></div><div class="word-list">${words.map((x,i)=>`<button type="button" data-action="word-select" data-index="${i}" class="${i===wordIndex?'selected':''}"><strong lang="en">${escape(x.word)}</strong><span>${escape(x.topic)} · ${x.level} ${state.words[x.id]?'· ✓':''}</span></button>`).join('')}</div>`:`<div class="empty"><p>${dueOnly?'Na tento výber práve nečakajú žiadne slová na opakovanie.':'Nenašli sa žiadne slová. Zmeňte tému, vyhľadávanie alebo úroveň.'}</p>${button('Zobraziť všetky slovíčka','reset-vocabulary','',true)}</div>`}`;
  }
  const testRange = levels => levels.length===1?levels[0]:`${levels[0]}–${levels.at(-1)}`;
  const submittedQuestionCount = () => quiz.stages.filter(s=>s.submitted).reduce((sum,s)=>sum+s.answers.length,0);
  function testSignature() {
    const text=JSON.stringify(Object.entries(content.tests).map(([level,qs])=>[level,qs.map(q=>[q.prompt,q.options,q.answer])]));
    let hash=2166136261;
    for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
    return (hash>>>0).toString(16);
  }
  function shuffledOrder(length) {
    const order=Array.from({length},(_,index)=>index);
    for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
    return order;
  }
  function stageQuestions(stage) {
    return content.tests[stage.level].map((q,i)=>({...q,options:stage.order[i].map(index=>q.options[index]),answer:stage.order[i].indexOf(q.answer)}));
  }
  function saveTest() {
    try{if(quiz)localStorage.setItem(testKey,JSON.stringify(quiz));else localStorage.removeItem(testKey);}
    catch{notice('Rozpracovaný test sa nepodarilo uložiť. Počas tejto návštevy môžete pokračovať; obnovenie po zatvorení nie je dostupné.',true);}
  }
  function restoreTest() {
    try{
      const data=JSON.parse(localStorage.getItem(testKey)||'null');if(!data)return;
      const levels=Object.keys(content.tests);
      if(data.version!==1||data.contentVersion!==testSignature()||!['journey','single'].includes(data.mode)||!['answering','between','finished'].includes(data.status)||typeof data.id!=='string'||!Number.isInteger(data.index)||!Array.isArray(data.levels)||!Array.isArray(data.stages))throw Error();
      const start=levels.indexOf(data.levels[0]);
      const expected=data.mode==='single'?[levels[start]]:levels.slice(start);
      if(start<0||JSON.stringify(expected)!==JSON.stringify(data.levels)||data.stages.length!==expected.length||data.index<0||data.index>=expected.length)throw Error();
      data.stages.forEach((stage,i)=>{
        const questions=content.tests[expected[i]];
        if(stage.level!==expected[i]||typeof stage.submitted!=='boolean'||!Array.isArray(stage.order)||stage.order.length!==questions.length||!Array.isArray(stage.answers)||stage.answers.length!==questions.length||!Array.isArray(stage.helped)||stage.helped.length!==questions.length)throw Error();
        questions.forEach((q,j)=>{
          const order=stage.order[j];const answer=stage.answers[j];
          if(!Array.isArray(order)||order.length!==q.options.length||new Set(order).size!==q.options.length||order.some(x=>!Number.isInteger(x)||x<0||x>=q.options.length)||!(answer===null||Number.isInteger(answer)&&answer>=0&&answer<q.options.length)||typeof stage.helped[j]!=='boolean'||stage.submitted&&answer===null)throw Error();
        });
        const shouldBeSubmitted=i<data.index||(i===data.index&&data.status!=='answering');
        if(stage.submitted!==shouldBeSubmitted)throw Error();
      });
      if(data.status==='finished'&&data.index!==expected.length-1||data.status==='between'&&data.index===expected.length-1)throw Error();
      quiz=data;
    }catch{
      try{localStorage.removeItem(testKey);}catch{/* Storage may be unavailable. */}
      notice('Starší alebo poškodený rozpracovaný test sa nedal obnoviť. Uložený študijný progres zostal zachovaný.');
    }
  }
  function startTest(level) {
    const levels=Object.keys(content.tests);if(!levels.includes(level))return;
    const selected=testMode==='single'?[level]:levels.slice(levels.indexOf(level));
    quiz={version:1,contentVersion:testSignature(),id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,mode:testMode,levels:selected,index:0,status:'answering',stages:selected.map(name=>({level:name,order:content.tests[name].map(q=>shuffledOrder(q.options.length)),answers:content.tests[name].map(()=>null),helped:content.tests[name].map(()=>false),submitted:false}))};
    saveTest();render(true);
  }
  function testResults() {
    const summaries=quiz.stages.map(stage=>{
      const questions=stageQuestions(stage);
      const correct=questions.reduce((n,q,i)=>n+(stage.answers[i]===q.answer?1:0),0);
      return {level:stage.level,correct,total:questions.length,score:Math.round(correct/questions.length*100),assisted:stage.helped.filter(Boolean).length};
    });
    const total=summaries.reduce((n,x)=>n+x.total,0);
    const correct=summaries.reduce((n,x)=>n+x.correct,0);
    const assisted=summaries.reduce((n,x)=>n+x.assisted,0);
    return {summaries,total,correct,assisted,score:Math.round(correct/total*100)};
  }
  function recordFinishedTest() {
    const result=testResults();
    if(!state.history.some(x=>x.attemptId===quiz.id)){
      state.history.push({attemptId:quiz.id,date:new Date().toISOString(),level:testRange(quiz.levels),levels:quiz.levels,score:result.score,assisted:result.assisted});
      state.history=state.history.slice(-100);save();
    }
  }
  function finishTest() {
    if(!quiz||!quiz.stages.every(s=>s.submitted))return;
    quiz.status='finished';saveTest();recordFinishedTest();render(true);
  }
  function finalTestView() {
    const result=testResults();
    const weakest=result.summaries.find(x=>x.score<70);
    const targetLevel=weakest?.level||quiz.levels.at(-1);
    const availableLevel=content.lessons.some(x=>x.level===targetLevel)?targetLevel:'C1';
    const next=content.lessons.find(x=>x.level===availableLevel&&!state.completed[x.id])||content.lessons.find(x=>x.level===availableLevel)||content.lessons[0];
    return `<div class="lesson">${header('Váš test je dokončený.', 'Teraz uvidíte výsledky všetkých odovzdaných úrovní. Odpovede sú uzamknuté; nový pokus začína samostatne.', 'CEFR · ZÁVEREČNÝ PREHĽAD')}
      <section id="test-result" class="card"><span class="eyebrow muted">${escape(testRange(quiz.levels))} · ${quiz.mode==='journey'?'POSTUPNÝ TEST':'JEDNA ÚROVEŇ'}</span><h2>${result.score}% · ${result.correct}/${result.total} správne</h2><p>${result.assisted?`Pri ${result.assisted} otázkach ste použili slovnú pomoc. Skóre zahŕňa odpovede s podporou; pomoc nemá bodovú penalizáciu.`:'Odpovedali ste bez slovnej pomoci.'}</p><p class="muted">Výsledok ukazuje úspešnosť v tejto autorskej sade, neurčuje celkovú CEFR úroveň. Nie je to certifikácia.</p><div class="table-wrap"><table><caption class="sr-only">Výsledky jednotlivých úrovní</caption><thead><tr><th>Úroveň</th><th>Správne</th><th>Úspešnosť</th><th>S pomocou</th></tr></thead><tbody>${result.summaries.map(x=>`<tr><td>${x.level}</td><td>${x.correct}/${x.total}</td><td>${x.score}%</td><td>${x.assisted}</td></tr>`).join('')}</tbody></table></div></section>
      <section class="card"><h2>Jeden užitočný krok na teraz</h2><p>${weakest?'Začnite krátkou lekciou z oblasti, kde si potrebujete doplniť istotu.':'Dobrá práca. Preneste si vedomosti z možností do skutočnej vety alebo situácie.'}</p>${targetLevel!==availableLevel?'<p class="muted">Pre C2 zatiaľ nemáme samostatné lekcie. Ponúkame najbližší dostupný pokročilý obsah C1.</p>':''}${link(escape(next.title)+' →','lesson/'+next.id)}<p class="muted">Pozrite si vysvetlenia nižšie. Chyba je informácia o tom, čo ďalej precvičiť.</p></section>
      <section class="card"><h2>Kontrola odpovedí</h2>${quiz.stages.map(stage=>{const qs=stageQuestions(stage);return `<details class="answer-review"><summary>${stage.level} · odpovede a vysvetlenia</summary><ol>${qs.map((q,i)=>`<li><p lang="en">${escape(q.prompt)}</p><p><strong>${stage.answers[i]===q.answer?'✓ Správne':'✗ Nesprávne'}</strong>${stage.helped[i]?' · použitá slovná pomoc':''}</p><p>Vaša odpoveď: <span lang="en">${escape(q.options[stage.answers[i]])}</span><br>Správna odpoveď: <span lang="en">${escape(q.options[q.answer])}</span></p><p>${escape(q.explanation)}</p></li>`).join('')}</ol></details>`;}).join('')}</section><div class="actions">${button('Vybrať nový test','new-test','',true)}${link('Späť na hlavnú obrazovku','home',true)}</div></div>`;
  }
  function tests() {
    if (!quiz) return `${header('Zistite, čo už viete.', 'Krátke vedomostné testy podľa CEFR. Výsledok meria úspešnosť v tejto sade, nie certifikovanú jazykovú úroveň.', 'CEFR PRACTICE')}
      <section class="card"><h2>Ako chcete postupovať?</h2><fieldset class="test-mode"><legend class="sr-only">Rozsah testu</legend><label class="option"><input type="radio" name="test-mode" value="journey" ${testMode==='journey'?'checked':''}><span><strong>Postupne cez úrovne</strong><br>Od zvolenej úrovne po C2. Zo začiatku A1 je to 36 otázok. Výsledky až na konci.</span></label><label class="option"><input type="radio" name="test-mode" value="single" ${testMode==='single'?'checked':''}><span><strong>Precvičiť jednu úroveň</strong><br>Krátka sada 6 otázok, vyhodnotená po jej dokončení.</span></label></fieldset><h3>Začnite na úrovni</h3><div class="test-levels">${Object.keys(content.tests).map(level=>button(level,'start-test',`data-level="${level}"`)).join('')}</div><p class="muted">Môžete si dať prestávku: rozpracované odpovede sa ukladajú. Help pri otázke vysvetlí slovíčka a použitie pomoci sa uvedie v záverečnom prehľade.</p></section>
      <section class="card"><h2>Čo znamenajú štítky úrovní?</h2><p>A1–A2: základné situácie a jednoduché texty. B1–B2: samostatná komunikácia a zložitejšie argumenty. C1–C2: presný, flexibilný a nuansovaný jazyk.</p><p>Štítky označujú náročnosť autorských otázok. Sady nepokrývajú hovorenie ani všetky jazykové zručnosti. Neistota pri otázke je užitočný tip, čo ďalej precvičiť.</p></section>`;
    if(quiz.status==='finished')return finalTestView();
    const stage=quiz.stages[quiz.index];
    const total=quiz.stages.reduce((n,s)=>n+s.answers.length,0);
    const submitted=submittedQuestionCount();
    const progressView=`<ol class="level-steps" aria-label="Postup testom">${quiz.levels.map((level,i)=>`<li class="${i<quiz.index||i===quiz.index&&quiz.status==='between'?'done':i===quiz.index?'current':''}" ${i===quiz.index?'aria-current="step"':''}>${quiz.stages[i].submitted?'✓ ':''}${level}</li>`).join('')}</ol><label for="test-progress">${submitted}/${total} odovzdaných odpovedí · výsledky po dokončení</label><progress id="test-progress" max="${total}" value="${submitted}">${submitted}/${total}</progress>`;
    if(quiz.status==='between')return `<div class="lesson">${header(`Úroveň ${stage.level} je odovzdaná.`, 'Odpovede sú uložené a uzamknuté. Ich správnosť sa zobrazí až po dokončení celého zvoleného testu.')}${progressView}<section class="card stage-saved" role="status"><h2>Ďalší krok: ${quiz.levels[quiz.index+1]}</h2><p>Pokračujte, keď budete pripravený/á. Návrat na hlavnú obrazovku test zachová.</p><div class="actions">${button('Ďalšia úroveň '+quiz.levels[quiz.index+1]+' →','next-level')}${link('Dať si prestávku · hlavná obrazovka','home',true)}</div></section></div>`;
    const answered=stage.answers.filter(x=>x!==null).length;
    const last=quiz.index===quiz.levels.length-1;
    return `<div class="lesson">${header(`Vedomostný test ${stage.level}`, `Časť ${quiz.index+1} z ${quiz.levels.length}. Po odovzdaní sa táto úroveň uzamkne. Slovnú pomoc môžete použiť podľa potreby.`)}${progressView}<form id="test-form" class="card">${questionFields(stageQuestions(stage),stage.answers,true,stage.helped)}<div class="test-submit"><p id="answered-count" aria-live="polite">${answered}/${stage.answers.length} zvolených odpovedí</p><button class="btn" type="submit">${last?'Dokončiť celý test a zobraziť výsledky':'Odovzdať a uzamknúť '+stage.level}</button></div></form><div class="actions">${link('Uložiť prestávku · hlavná obrazovka','home',true)}<span class="muted">Rozpracovaný test sa pri dostupnom úložisku ukladá automaticky.</span></div></div>`;
  }
  function progress() {
    const completed = content.lessons.filter(x=>state.completed[x.id]);
    const due = content.vocabulary.filter(x => state.reviews[x.id] && state.reviews[x.id].due <= Date.now());
    return `${header('Každý krok sa počíta.', 'Dokončenie znamená úspešné cvičenie. Otvorenie stránky sa do progresu nezapočítava.')}
      <div class="stats"><div class="stat"><strong>${completed.length}</strong><span>Overené lekcie</span></div><div class="stat"><strong>${Object.keys(state.words).length}</strong><span>Overené slovíčka</span></div><div class="stat"><strong>${state.history.length}</strong><span>Dokončené testy</span></div><div class="stat"><strong>${due.length}</strong><span>Slová na opakovanie</span></div></div>
      <section class="card"><h2>Vaše študijné oblasti</h2>${['grammar','reading','listening','realworld','academic'].map(s=>{const total=content.lessons.filter(x=>x.section===s).length;const count=completed.filter(x=>x.section===s).length;return `<label for="progress-${s}">${sections[s][0]} · ${count}/${total}</label><progress id="progress-${s}" max="${total}" value="${count}">${count}/${total}</progress>`;}).join('')}</section>
      <div class="section-heading"><h2>Dokončené lekcie</h2></div><div class="grid">${completed.map(lessonCard).join('')||'<p class="empty">Váš prvý úspešný krok čaká. Otvorte lekciu a dokončite jej cvičenie.</p>'}</div>
      <section class="card"><h2>História testov</h2><div class="table-wrap"><table><thead><tr><th>Dátum</th><th>Sada</th><th>Úspešnosť</th></tr></thead><tbody>${state.history.slice().reverse().map(x=>`<tr><td>${escape(new Date(x.date).toLocaleDateString('sk'))}</td><td>${escape(x.level)}</td><td>${x.score}%</td></tr>`).join('')||'<tr><td colspan="3">Zatiaľ bez výsledkov.</td></tr>'}</tbody></table></div></section><section class="card"><h2>Záloha štúdia</h2><p>${storageOK?'Údaje sú uložené v tomto prehliadači.':'Uloženie nie je dostupné; údaje zostávajú iba v pamäti.'} Export obsahuje progres a vaše koncepty. Zálohu môžete obnoviť na inom zariadení.</p><div class="actions">${button('Exportovať zálohu','export','',true)}${button('Importovať zálohu','import-backup','',true)}<input id="import" type="file" aria-label="Vybrať zálohu JSON" accept="application/json,.json" hidden></div></section>`;
  }
  function render(moveFocus=false) {
    if (!content) return;
    document.body.classList.toggle('dark',state.theme==='dark');
    document.querySelector('#theme').setAttribute('aria-pressed',String(state.theme==='dark'));
    document.querySelector('#level').value=state.level;
    document.querySelector('#level').disabled=route==='tests'&&Boolean(quiz)&&quiz.status!=='finished';
    const [section,id] = route.split('/');
    const item = section==='lesson' && content.lessons.find(x=>x.id===id);
    const active = item?item.section:section;
    document.querySelector('#navigation').innerHTML=Object.entries(sections).map(([name,[label,icon]])=>`<a href="#${name}" ${active===name?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${icon}</span>${label}</a>`).join('');
    if (section==='home') main.innerHTML=home();
    else if (section==='vocabulary') main.innerHTML=vocabulary();
    else if (section==='tests') main.innerHTML=tests();
    else if (section==='progress') main.innerHTML=progress();
    else if (item) main.innerHTML=lesson(item);
    else if (['grammar','reading','listening','realworld','academic'].includes(section)) main.innerHTML=library(section);
    else main.innerHTML=`${header('Táto stránka neexistuje.', 'Odkaz nezodpovedá lekcii v tejto verzii knižnice.')}${link('Otvoriť môj priestor','home')}`;
    if(section!=='home')main.insertAdjacentHTML('afterbegin',`<nav class="content-nav" aria-label="Navigácia v obsahu"><a href="#home">← Späť na hlavnú obrazovku</a><span>${escape(item?sections[item.section][0]:sections[section]?.[0]||'Stránka nenájdená')}</span></nav>`);
    if(section==='tests'&&quiz&&quiz.status!=='finished')main.insertAdjacentHTML('beforeend',`<div class="new-attempt">${button('Začať nový pokus','request-new-test','',true)}<span class="muted">Aktuálny pokus zostane uložený, kým nepotvrdíte jeho nahradenie.</span></div>`);
    document.title=`${item?.title||sections[section]?.[0]||'Stránka nenájdená'} · English Restart`;
    if(moveFocus){main.focus();window.scrollTo({top:0,behavior:'instant'});}
  }
  function speak(text,rate=1) {
    if (!('speechSynthesis' in window)) {notice('Tento prehliadač nepodporuje syntetické audio. Použite anglický prepis.');return;}
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = window.speechSynthesis.getVoices().find(x=>x.lang==='en-GB')||window.speechSynthesis.getVoices().find(x=>x.lang.startsWith('en'));
    if(voice) utterance.voice=voice;
    utterance.lang='en-GB';utterance.rate=rate;
    utterance.onerror=event=>{if(!['interrupted','canceled'].includes(event.error))notice('Audio sa nepodarilo prehrať. Skúste iný prehliadač alebo použite prepis.');};
    window.speechSynthesis.speak(utterance);
  }
  function evaluate(form,questions) {
    const values = new FormData(form);
    const answers=questions.map((_,i)=>values.has(`q${i}`)?Number(values.get(`q${i}`)):null);
    const correct=questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);
    return {correct,score:Math.round(correct/questions.length*100),answers};
  }
  function resultMarkup(result,questions) {
    return `<div class="feedback ${result.score>=70?'success':'error'}"><h3>${result.score}% · ${result.correct}/${questions.length} správne</h3><p>${result.score>=70?'Dobrá práca. Zopakujte si vysvetlenia a použite jazyk vo vlastnej situácii.':'Pozrite si vysvetlenia a skúste cvičenie znovu.'}</p><ul>${questions.map((q,i)=>`<li><strong>${result.answers[i]===q.answer?'✓ Správne':'✗ Nesprávne'}:</strong> <span lang="en">${escape(q.options[q.answer])}</span> — ${escape(q.explanation)}</li>`).join('')}</ul></div>`;
  }
  function refreshReviewQueue() {
    if(!dueOnly)return;
    const words=filteredWords();
    const list=document.querySelector('.word-list');
    if(list)list.innerHTML=words.map((w,i)=>`<button type="button" data-action="word-select" data-index="${i}"><strong lang="en">${escape(w.word)}</strong><span>${escape(w.topic)} · ${w.level}</span></button>`).join('');
    const next=document.querySelector('[data-action="word-next"]');
    if(next){next.disabled=false;next.dataset.action='next-review';next.textContent=words.length?'Ďalšie na opakovanie →':'Opakovanie hotové →';}
    const previous=document.querySelector('[data-action="word-prev"]');if(previous)previous.disabled=true;
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-action]');if(!target||target.disabled)return;
    const action=target.dataset.action;
    if(action==='reveal'){const meaning=document.querySelector('#word-meaning');meaning.hidden=!meaning.hidden;target.textContent=meaning.hidden?'Odkryť význam':'Skryť význam';}
    else if(action==='word-prev'){wordIndex--;render();document.querySelector('[data-action="word-prev"]:not(:disabled),[data-action="word-next"]')?.focus();}
    else if(action==='word-next'){wordIndex++;render();document.querySelector('[data-action="word-next"]:not(:disabled),[data-action="word-prev"]')?.focus();}
    else if(action==='next-review'){wordIndex=0;render(true);}
    else if(action==='word-select'){wordIndex=Number(target.dataset.index);render();main.focus();}
    else if(action==='speak'){const item=content.lessons.find(x=>x.id===target.dataset.id);if(item)speak(item.text,Number(target.dataset.rate)||1);}
    else if(action==='speak-word'){const word=content.vocabulary.find(x=>x.id===target.dataset.id);if(word)speak(word.word);}
    else if(action==='stop')window.speechSynthesis?.cancel();
    else if(action==='import-backup')document.querySelector('#import').click();
    else if(action==='start-test')startTest(target.dataset.level);
    else if(action==='next-level'&&quiz?.status==='between'){quiz.index++;quiz.status='answering';saveTest();render(true);}
    else if(action==='new-test'){quiz=null;saveTest();render(true);}
    else if(action==='request-new-test')document.querySelector('#new-test-dialog').showModal();
    else if(action==='keep-test')document.querySelector('#new-test-dialog').close();
    else if(action==='replace-test'){document.querySelector('#new-test-dialog').close();quiz=null;saveTest();render(true);}
    else if(action==='show-all'){state.level='all';save();render();}
    else if(action==='reset-vocabulary'){state.level='all';query='';topic='all';dueOnly=false;wordIndex=0;save();render();}
    else if(action==='open-reviews'){state.level='all';query='';topic='all';dueOnly=true;wordIndex=0;save();if(route==='vocabulary')render(true);else location.hash='vocabulary';}
    else if(action==='review-word'){state.reviews[target.dataset.id]={due:Date.now()+86400000};save();notice('Slovo je naplánované na opakovanie zajtra.');if(dueOnly)render(true);}
    else if(action==='confirm-word'){state.words[target.dataset.id]=true;state.reviews[target.dataset.id]={due:Date.now()+3*86400000};save();notice('Význam ste overili. Slovo je uložené do progresu.');target.disabled=true;refreshReviewQueue();}
    else if(action==='export'){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='english-restart-zaloha.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(!['lesson-form','word-form','test-form'].includes(form.id))return;
    event.preventDefault();
    if(!form.reportValidity())return;
    if(form.id==='word-form'){
      const w=content.vocabulary.find(x=>x.id===form.dataset.id);
      const normalize=s=>s.trim().toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.!?]$/,'');
      const userMeaning=normalize(document.querySelector('#meaning').value);
      const correct=w.translation.split(/\s*\/\s*/).some(meaning=>normalize(meaning)===userMeaning)||normalize(w.translation)===userMeaning;
      if(correct){state.words[w.id]=true;state.reviews[w.id]={due:Date.now()+3*86400000};save();}
      document.querySelector('#word-result').innerHTML=`<div class="feedback ${correct?'success':'error'}"><strong>${correct?'✓ Správne. Význam je overený.':'Porovnajte svoj význam so vzorom.'}</strong><p>${escape(w.translation)}</p>${correct?'':`<p>Iná formulácia môže byť správna. Ak význam zodpovedá vzoru, potvrďte vlastné hodnotenie.</p>${button('Môj preklad významovo sedí','confirm-word',`data-id="${w.id}"`,true)}`}</div>`;
      if(correct)refreshReviewQueue();
    }else if(form.id==='lesson-form'){
      const item=content.lessons.find(x=>x.id===form.dataset.id);const result=evaluate(form,item.questions);
      if(result.score>=70){state.completed[item.id]={score:result.score,date:new Date().toISOString()};save();}
      const next=content.lessons.find(x=>x.section===item.section&&x.id!==item.id&&!state.completed[x.id]&&x.level===item.level)||content.lessons.find(x=>x.section===item.section&&x.id!==item.id&&!state.completed[x.id]);
      document.querySelector('#exercise-result').innerHTML=resultMarkup(result,item.questions)+(result.score>=70?`<div class="actions">${next?link('Ďalšia lekcia →','lesson/'+next.id):link('Môj progres →','progress')}${link('Späť na hlavnú obrazovku','home',true)}</div>`:'');
    }else if(quiz?.status==='answering'){
      const stage=quiz.stages[quiz.index];
      const result=evaluate(form,stageQuestions(stage));
      if(result.answers.some(answer=>answer===null))return;
      stage.answers=result.answers;stage.submitted=true;
      if(quiz.index===quiz.levels.length-1)finishTest();
      else{quiz.status='between';saveTest();render(true);}
    }
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='draft'){state.drafts[event.target.dataset.id]=event.target.value;save();}
    if(event.target.id==='search'){query=event.target.value;wordIndex=0;const start=event.target.selectionStart;render();const search=document.querySelector('#search');search.focus();search.setSelectionRange(start,start);}
  });
  document.addEventListener('change',async event=>{
    if(event.target.name==='test-mode'){testMode=event.target.value;return;}
    if(event.target.closest('#test-form')&&event.target.matches('input[type="radio"]')&&quiz?.status==='answering'){
      const index=Number(event.target.name.slice(1));const stage=quiz.stages[quiz.index];
      stage.answers[index]=Number(event.target.value);saveTest();
      document.querySelector('#answered-count').textContent=`${stage.answers.filter(x=>x!==null).length}/${stage.answers.length} zvolených odpovedí`;
      return;
    }
    if(event.target.id==='level'){state.level=event.target.value;wordIndex=0;save();if(!route.startsWith('lesson/'))render();}
    if(event.target.id==='topic'){topic=event.target.value;wordIndex=0;render();document.querySelector('#topic').focus();}
    if(event.target.id==='due-only'){dueOnly=event.target.checked;wordIndex=0;render();document.querySelector('#due-only').focus();}
    if(event.target.id==='import'){
      try{
        const file=event.target.files[0];if(!file)return;if(file.size>2000000)throw Error();
        const data=JSON.parse(await file.text());
        state=normalizeBackup(data);save();render();notice('Záloha bola obnovená.');
      }catch{notice('Neplatná záloha. Vyberte JSON exportovaný z English Restart v2.');}
    }
  });
  document.addEventListener('toggle',event=>{
    const details=event.target;
    if(details.matches?.('details[data-help-index]')&&details.open&&details.closest('#test-form')&&quiz?.status==='answering'){
      const index=Number(details.dataset.helpIndex);quiz.stages[quiz.index].helped[index]=true;saveTest();
      details.querySelector('.help-used').textContent='· použitá pomoc';
    }
  },true);
  document.querySelector('#theme').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';save();document.body.classList.toggle('dark',state.theme==='dark');document.querySelector('#theme').setAttribute('aria-pressed',String(state.theme==='dark'));});
  document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
  window.addEventListener('hashchange',()=>{
    window.speechSynthesis?.cancel();route=location.hash.slice(1)||'home';
    const item=route.startsWith('lesson/')&&content?.lessons.find(x=>x.id===route.split('/')[1]);
    if(item){state.lastLesson=item.id;save();}
    render(true);
  });
  document.addEventListener('english-content',event=>{
    content=event.detail;route=location.hash.slice(1)||'home';
    // Keep persisted progress restricted to records in this content version.
    state=normalizeBackup(state);
    restoreTest();
    if(quiz?.status==='finished')recordFinishedTest();
    render();if(!storageOK)notice('Ukladanie nie je dostupné. Na konci návštevy exportujte zálohu.',true);
  },{once:true});
})();
