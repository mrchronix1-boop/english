(function () {
  'use strict';
  const groups = {
    'Práca a kariéra': [
      ['colleague','kolega','My colleague checked the figures.'],['employer','zamestnávateľ','My employer offers training.'],['employee','zamestnanec','Each employee receives a laptop.'],['salary','plat','We discussed the salary before signing.'],['promotion','povýšenie','She applied for a promotion.'],['vacancy','voľné pracovné miesto','There is a vacancy in our team.'],['interview','pohovor','The interview starts at nine.'],['qualification','kvalifikácia','The role requires a technical qualification.'],['experience','skúsenosť','I have experience in customer service.'],['responsibility','zodpovednosť','Safety is everyone’s responsibility.'],['resign','dať výpoveď','He decided to resign in June.'],['recruit','prijať pracovníka','We plan to recruit two engineers.']
    ],
    'Meetingy a spolupráca': [
      ['agenda','program stretnutia','Please read the agenda before the meeting.'],['minutes','zápisnica','The minutes record our decisions.'],['deadline','termín dokončenia','The deadline is next Friday.'],['schedule','harmonogram','We need to adjust the schedule.'],['attend','zúčastniť sa','Can you attend the workshop?'],['postpone','odložiť','We must postpone the launch.'],['clarify','objasniť','Could you clarify the last point?'],['contribute','prispieť','Everyone can contribute an idea.'],['assign','prideliť','The manager will assign each task.'],['update','aktualizácia / aktuálne informácie','Please send a short update.'],['consensus','zhoda','We reached a consensus on the budget.'],['action item','úloha zo stretnutia','My action item is to contact the client.']
    ],
    'Emaily a komunikácia': [
      ['attachment','príloha','The invoice is in the attachment.'],['subject line','predmet emailu','Use a clear subject line.'],['recipient','príjemca','Check the recipient before sending.'],['forward','preposlať','Could you forward the message?'],['reply','odpovedať','Please reply by Tuesday.'],['confirm','potvrdiť','Please confirm your arrival time.'],['enquiry','dopyt','Thank you for your enquiry.'],['request','žiadosť','We received your request yesterday.'],['regards','pozdrav v závere emailu','Kind regards, Anna.'],['follow up','nadviazať / pripomenúť sa','I will follow up on Monday.'],['acknowledge','potvrdiť prijatie','Please acknowledge receipt of this email.'],['concise','stručný','Keep the message concise.']
    ],
    'Dodávatelia a logistika': [
      ['supplier','dodávateľ','Our supplier is based in Leeds.'],['shipment','zásielka','The shipment arrived this morning.'],['warehouse','sklad','The goods are in the warehouse.'],['stock','skladové zásoby','This model is currently in stock.'],['invoice','faktúra','Please send the invoice separately.'],['quotation','cenová ponuka','We requested a quotation for ten units.'],['lead time','čas od objednávky po dodanie','The lead time is three weeks.'],['dispatch','odoslať zásielku','We will dispatch the order tomorrow.'],['tracking number','číslo zásielky','Your tracking number is in the email.'],['quantity','množstvo','Please check the quantity on the form.'],['purchase order','nákupná objednávka','We have issued a purchase order.'],['expedite','urýchliť','Could you expedite the shipment?']
    ],
    'Reklamácie a riešenia': [
      ['refund','vrátenie peňazí','I would like a refund.'],['replacement','náhrada','We can offer a replacement.'],['faulty','chybný','The charger is faulty.'],['warranty','záruka','The device has a two-year warranty.'],['receipt','pokladničný doklad','Please keep your receipt.'],['damage','poškodenie','We found damage to the packaging.'],['complaint','sťažnosť / reklamácia','We are investigating your complaint.'],['resolve','vyriešiť','We hope to resolve this issue today.'],['apologise','ospravedlniť sa','We apologise for the inconvenience.'],['evidence','dôkaz','Please provide photographic evidence.'],['return label','štítok na vrátenie','Print the return label and attach it.'],['compensation','kompenzácia','The customer requested compensation.']
    ],
    'Cestovanie': [
      ['departure','odchod / odlet','The departure time has changed.'],['arrival','príchod / prílet','Your arrival is expected at noon.'],['boarding pass','palubný lístok','Show your boarding pass at the gate.'],['luggage','batožina','My luggage is missing.'],['reservation','rezervácia','I have a reservation for two nights.'],['platform','nástupište','The train leaves from platform six.'],['connection','prestupné spojenie','We missed our connection.'],['delay','meškanie','There is a thirty-minute delay.'],['destination','cieľ cesty','Our destination is Manchester.'],['itinerary','plán cesty','I have attached the itinerary.'],['fare','cestovné','The fare includes airport taxes.'],['check in','ubytovať sa / odbaviť sa','We can check in after three.']
    ],
    'Financie a domácnosť': [
      ['budget','rozpočet','We need to stay within our budget.'],['expense','výdavok','Rent is our largest expense.'],['savings','úspory','I put some money into savings.'],['interest rate','úroková sadzba','The interest rate is fixed.'],['rent','nájomné','The rent is due on the first.'],['deposit','záloha / kaucia','We paid a deposit for the flat.'],['bill','účet','The electricity bill arrived today.'],['subscription','predplatné','You can cancel the subscription online.'],['afford','môcť si dovoliť','We cannot afford a larger office.'],['instalment','splátka','The final instalment is due in July.'],['balance','zostatok','Check your account balance.'],['transfer','prevod','The bank transfer takes one day.']
    ],
    'Zdravie a každodenný život': [
      ['appointment','dohodnutý termín','I have an appointment at ten.'],['symptom','príznak','Describe your symptoms to the doctor.'],['prescription','lekársky predpis','You need a prescription for this medicine.'],['pharmacy','lekáreň','The pharmacy is next to the station.'],['allergy','alergia','Please tell us about any allergy.'],['recover','zotaviť sa','She needs time to recover.'],['routine','bežný režim','Walking is part of my daily routine.'],['available','dostupný / voľný','Are you available on Thursday?'],['assistance','pomoc','Please ask if you need assistance.'],['neighbour','sused','Our neighbour collects our post.'],['maintenance','údržba','The lift is closed for maintenance.'],['emergency','núdzová situácia','Use this exit in an emergency.']
    ],
    'Technológie a bezpečnosť': [
      ['password','heslo','Use a different password for each account.'],['backup','záložná kópia','We keep a backup of important files.'],['permission','oprávnenie','You need permission to edit this folder.'],['privacy','súkromie','Review your privacy settings.'],['upload','nahrať','Please upload the signed document.'],['download','stiahnuť','You can download the guide here.'],['outage','výpadok','The outage affected the whole building.'],['device','zariadenie','Restart your device and try again.'],['network','sieť','The network is unavailable.'],['encrypt','zašifrovať','We encrypt confidential documents.'],['breach','narušenie bezpečnosti','Report any suspected data breach.'],['troubleshoot','hľadať a riešiť poruchu','The technician will troubleshoot the connection.']
    ],
    'Akademický jazyk': [
      ['hypothesis','hypotéza','The experiment tested our hypothesis.'],['findings','zistenia','The findings support further investigation.'],['methodology','metodológia','The paper explains its methodology.'],['sample','výskumná vzorka','The sample included fifty participants.'],['limitation','obmedzenie','The small sample is a limitation.'],['cite','citovať','Remember to cite the original source.'],['paraphrase','parafrázovať','Paraphrase the idea in your own words.'],['evaluate','vyhodnotiť','We need to evaluate the evidence.'],['significant','významný','There was a significant difference.'],['reliable','spoľahlivý','Is the measurement reliable?'],['bias','skreslenie','Selection bias may affect the results.'],['implication','dôsledok','The policy implications require discussion.']
    ]
  };
  const levels = {
    A1:new Set('work|salary|email|reply|request|regards|quantity|receipt|departure|arrival|luggage|reservation|platform|destination|rent|bill|budget|appointment|pharmacy|routine|available|neighbour|password|device|download|upload'.split('|')),
    A2:new Set('colleague|employer|employee|interview|experience|deadline|schedule|attend|update|attachment|subject line|forward|confirm|supplier|shipment|warehouse|stock|invoice|refund|replacement|faulty|warranty|damage|complaint|return label|boarding pass|connection|delay|fare|check in|expense|savings|deposit|subscription|afford|balance|transfer|symptom|prescription|allergy|recover|assistance|emergency|backup|permission|privacy|network'.split('|')),
    B1:new Set('promotion|vacancy|qualification|responsibility|resign|recruit|agenda|minutes|postpone|clarify|contribute|assign|action item|recipient|enquiry|follow up|quotation|dispatch|tracking number|purchase order|resolve|apologise|evidence|compensation|itinerary|interest rate|instalment|maintenance|outage|sample|reliable'.split('|')),
    B2:new Set('consensus|acknowledge|concise|lead time|expedite|encrypt|breach|troubleshoot|hypothesis|findings|limitation|cite|paraphrase|evaluate|significant|bias|implication'.split('|'))
  };
  const vocabulary = Object.entries(groups).flatMap(([topic, entries], group) => entries.map(([word, translation, example], index) => ({id:`v-${group+1}-${index+1}`,topic,level:Object.keys(levels).find(level=>levels[level].has(word))||'C1',word,translation,example})));
  const q = (prompt, options, answer, explanation) => ({prompt,options,answer,explanation});
  const lesson = (id,section,level,title,summary,text,tips,questions,translation='') => ({id,section,level,title,summary,text,tips,questions,translation});
  const lessons = [
    lesson('g-be','grammar','A1','Be: predstavte seba a svoj tím','Použite am, is, are v profesionálnom predstavení.','I am a technician. Sara is our manager. We are ready. I am not late. Are you available?', ['I → am; he/she/it → is; you/we/they → are.','V otázke posuňte be pred podmet: Are you ready?','Po be nepoužívajte do: Is she here?'],[q('Our colleagues ___ in London.',['is','are','am'],1,'Colleagues je množné číslo, preto are.'),q('Vyberte správnu otázku.',['Do you are ready?','You is ready?','Are you ready?'],2,'Be tvorí otázku obrátením poradia.')]),
    lesson('g-present','grammar','A2','Present simple alebo continuous?','Rozlíšte pravidelnú prácu od dnešnej situácie.','I usually work in the office, but today I am working from home. Nina checks invoices every Monday. She is checking an urgent invoice now.', ['Simple označuje pravidlá a zvyky; continuous aktuálny dej.','He/she/it v simple dostáva -s.','Continuous: am/is/are + sloveso s -ing.'],[q('Every Friday he ___ the stock.',['check','is checking','checks'],2,'Every Friday označuje opakovaný zvyk.'),q('Please wait. I ___ a customer now.',['am helping','help','helps'],0,'Now a prebiehajúca situácia vyžadujú continuous.')]),
    lesson('g-past','grammar','A2','Past simple: čo sa stalo včera','Opíšte dokončenú udalosť s časovým údajom.','We received the order yesterday. The courier did not deliver the second box. Did you call the supplier? Yes, I called them at ten.', ['Yesterday, last week a in 2024 ukazujú ukončený čas.','Po did a did not použite základný tvar.','Nepravidelné tvary: go → went; send → sent; write → wrote.'],[q('Did you ___ the invoice yesterday?',['sent','send','sending'],1,'Did už vyjadruje minulý čas, sloveso zostáva send.'),q('We ___ the client last week.',['meet','meeting','met'],2,'Met je minulý tvar meet.')]),
    lesson('g-perfect','grammar','B1','Present perfect: výsledok platný teraz','Porovnajte súčasný výsledok a ukončený čas.','I have sent the report, so you can read it now. I sent it at nine. We have worked together for three years. She has not replied yet.', ['Have/has + príčastie: sent, written, completed.','S konkrétnym ukončeným časom použite past simple.','For = trvanie; since = počiatočný bod.'],[q('I ___ the email at 8 yesterday.',['have sent','sent','has sent'],1,'At 8 yesterday je ukončený čas.'),q('She has worked here ___ 2021.',['for','during','since'],2,'Since uvádza začiatok obdobia.')]),
    lesson('g-modals','grammar','B1','Zdvorilé žiadosti a povinnosti','Použite could, must a do not have to presne.','Could you send me the drawing? Staff must wear safety glasses. You do not have to attend the optional workshop. You must not share your password.', ['Could you + základný tvar je zdvorilá žiadosť.','Must not = zákaz; do not have to = nie je povinné.','Po modálnom slovese nepridávajte to.'],[q('Ktorá veta znamená, že účasť je voliteľná?',['You must not attend.','You do not have to attend.','You must attend.'],1,'Do not have to vyjadruje neprítomnosť povinnosti.'),q('Could you ___ the details?',['confirm','to confirm','confirmed'],0,'Po could nasleduje základný tvar confirm.')]),
    lesson('g-conditionals','grammar','B2','Podmienky: reálny plán a hypotéza','First a second conditional pri plánovaní.','If the supplier confirms today, we will start on Monday. If we had a larger budget, we would buy better equipment.', ['First: if + present, will + základný tvar.','Second: if + past, would + základný tvar.','Past v second conditional označuje hypotézu, nie minulú udalosť.'],[q('If we ___ more space, we would hire another person.',['have','will have','had'],2,'Hypotéza používa had.'),q('If she agrees, we ___ the contract.',['would signed','will sign','signed'],1,'Reálny budúci výsledok je will sign.')]),
    lesson('g-passive','grammar','B2','Passive voice v procesoch a reportoch','Zdôraznite výsledok alebo postup.','The goods are checked before dispatch. The report was written yesterday. The invoice has been approved. We use the passive when the action matters more than the actor.', ['Passive: správny tvar be + príčastie.','Are checked = bežný proces; were checked = minulosť.','By + osoba pridá pôvodcu, iba ak je podstatný.'],[q('The parcel ___ yesterday.',['was delivered','is deliver','has deliver'],0,'Yesterday: was + delivered.'),q('Every invoice ___ before payment.',['check','is checked','is checking'],1,'Pravidelný proces v pasíve: is checked.')]),
    lesson('g-hedging','grammar','C1','Hedging a presnosť tvrdení','Vyjadrite mieru istoty pri dôkazoch a návrhoch.','The findings suggest that shorter meetings may improve concentration. This effect appears to depend on team size. Further research is needed before drawing a general conclusion.', ['May, might a appears to zmierňujú istotu.','Suggest neznamená prove.','Použite opatrnosť podľa kvality dôkazov, nie automaticky pri každej vete.'],[q('Ktorá veta je opatrným tvrdením?',['This proves all teams work better.','This may improve team communication.','There is no possible alternative.'],1,'May pripúšťa neistotu.'),q('The results ___ that more research is needed.',['suggests','suggest','suggesting'],1,'Results je množné číslo, preto suggest.')]),
    lesson('r-notice','reading','A2','Oznam v kancelárii','Vyhľadajte čas, miesto a konkrétny pokyn.','The kitchen on the second floor will be closed on Tuesday from 8 a.m. to 1 p.m. while the sink is repaired. Please use the kitchen on the ground floor. You can still collect drinking water beside reception. The repair team will need access to the corridor, so please keep boxes away from the door.', ['Najprv nájdite kto, kde a kedy.','Closed neznamená, že je zatvorená celá budova.'],[q('Which kitchen can staff use?',['The second-floor kitchen','The ground-floor kitchen','Neither kitchen'],1,'Oznam výslovne odporúča ground floor.'),q('When does the closure end?',['8 a.m.','Tuesday evening','1 p.m.'],2,'Zatvorenie trvá od 8 do 13.')], 'Kuchyňa na druhom poschodí bude v utorok od 8:00 do 13:00 zatvorená pre opravu drezu. Použite kuchyňu na prízemí. Pitná voda je pri recepcii. Chodba musí zostať prístupná, bez krabíc pri dverách.'),
    lesson('r-delivery','reading','B1','Dodávka: čítanie medzi detailmi','Rozlíšte potvrdenú zmenu od navrhovaného riešenia.','Dear Ms Novak, we can deliver eight of the twelve monitors on Thursday. The remaining four will arrive next Monday because a component is out of stock. If you prefer one delivery, we can hold the first eight until Monday at no extra charge. Please let us know your preference by 3 p.m. tomorrow. We apologise for the change and will send tracking details once the goods leave our warehouse.', ['Sledujte množstvá a termíny.','If you prefer uvádza možnosť, nie už potvrdený plán.'],[q('How many monitors are available on Thursday?',['Four','Twelve','Eight'],2,'Prvá zásielka obsahuje osem monitorov.'),q('What does the supplier need next?',['The customer’s delivery preference','An additional payment','A new warehouse address'],0,'Žiada vybrať delenú alebo spoločnú dodávku.')]),
    lesson('r-hybrid','reading','B2','Hybridná práca: argument a obmedzenie','Identifikujte hlavný argument a podmienku záveru.','A small engineering company tested two remote days a week for three months. Staff reported fewer interruptions, but new employees found it harder to ask informal questions. Project completion times remained similar to the previous quarter. The company will continue the policy while introducing a daily mentoring slot for new starters. The trial does not show that remote work improves productivity in every organisation: it involved only one team, and workload varied during the period.', ['Oddeľte pozorovanie od všeobecného záveru.','But a while označujú dôležitý kontrast.'],[q('Why is a mentoring slot being introduced?',['To stop all remote work','To support informal questions from new employees','To reduce salaries'],1,'Noví pracovníci mali s neformálnymi otázkami problém.'),q('Which conclusion is supported?',['Remote work always increases productivity.','Completion times improved dramatically.','The findings are limited to a small trial.'],2,'Text výslovne uvádza obmedzenia jednej skupiny a meniacej sa záťaže.')]),
    lesson('r-policy','reading','C1','Posudzovanie firemného návrhu','Preskúmajte argument, kompromis a dôkaz.','The procurement team proposes consolidating orders with a single supplier to reduce administrative costs. Although this would simplify invoicing, it could increase exposure to disruption if that supplier experiences capacity problems. The proposal therefore recommends a primary supplier for standard items and a qualified backup for critical components. A six-month pilot should record both processing time and the frequency of urgent substitutions. Savings should be evaluated alongside resilience rather than treated as the sole criterion of success.', ['Exposure tu znamená vystavenie riziku.','Sole criterion = jediné kritérium.','Autor podporuje kompromis, nie bezpodmienečnú konsolidáciu.'],[q('What compromise does the proposal recommend?',['A primary supplier and a backup for critical parts','No standard supplier','The cheapest supplier without checks'],0,'Štandardné položky má hlavný dodávateľ, kritické aj záložného.'),q('What should be assessed alongside savings?',['Office size','Resilience to disruption','Staff holidays'],1,'Text žiada hodnotiť odolnosť voči narušeniu dodávok.')]),
    lesson('l-message','listening','A2','Hlasová správa: zmena termínu','Zachyťte čas a miesto zo syntetického hlasu.','Hello, this is Maya from reception. Your appointment with Daniel has moved from ten o’clock to eleven thirty tomorrow. Please come to the third floor and bring your visitor card. If the new time is difficult, call me before five today.', ['Najprv počúvajte bez textu.','Zapíšte nový čas, nie pôvodný čas.','Hlas vytvára prehliadač; nejde o autentickú nahrávku.'],[q('What is the new appointment time?',['10:00','11:30','17:00'],1,'New time je eleven thirty.'),q('What should the visitor bring?',['A visitor card','An invoice','A passport'],0,'Hovoriaca žiada visitor card.')]),
    lesson('l-handover','listening','B1','Odovzdanie práce kolegovi','Počúvajte zadanie a priority.','Before you leave today, please save the revised schedule in the shared folder. I have already contacted the client, so there is no need to call them again. Tomorrow morning, check whether the supplier has confirmed the quantities. If they have not replied by noon, send a reminder and copy me into the email.', ['Usporiadajte úlohy podľa času.','Already a no need vysvetľujú, čo už nemusíte robiť.'],[q('What should happen before leaving today?',['Call the client again','Order more supplies','Save the revised schedule'],2,'Prvá úloha je uložiť harmonogram.'),q('When should a reminder be sent?',['Immediately','If no reply has arrived by noon','Next week'],1,'Podmienkou je chýbajúca odpoveď do poludnia.')]),
    lesson('l-negotiation','listening','B2','Vyjednávanie dodávky','Zachyťte podmienenú ponuku a výhradu.','We can bring delivery forward to Wednesday, provided you approve the revised quotation by noon tomorrow. The faster service adds sixty euros to the total. I realise that is above your original estimate, but standard delivery would not reach you until Friday. If Wednesday is essential, I suggest we confirm the express option now and review packaging costs separately.', ['Provided znamená za predpokladu, že.','Rozlíšte príplatok od celkovej ceny.'],[q('What is required for Wednesday delivery?',['Approve the revised quotation by noon tomorrow','Pay sixty euros next month','Change the destination'],0,'Skoršie dodanie je podmienené schválením ponuky.'),q('What does sixty euros represent?',['The full order price','An additional charge','A refund'],1,'Adds sixty euros znamená príplatok.')]),
    lesson('l-research','listening','C1','Krátky výskumný briefing','Oddeľte výsledok od navrhovaného pokračovania.','Our preliminary analysis indicates a modest reduction in processing time, although the effect differs substantially between departments. Because teams volunteered for the pilot, the sample may favour staff who were already comfortable with the software. I would therefore avoid presenting the findings as conclusive. A second phase should include departments selected independently and should record training time as well as processing time.', ['Preliminary a may upozorňujú na neistotu.','Všímajte si dôvod autorovej opatrnosti.'],[q('What may bias the sample?',['Every department participated','Teams volunteered for the pilot','The software was unavailable'],1,'Dobrovoľníci môžu nástroj už dobre ovládať.'),q('What additional measure is proposed?',['Office rent','Training time','Annual leave'],1,'Druhá fáza má sledovať aj čas školenia.')]),
    lesson('rw-email','realworld','B1','Email: žiadosť s jasným termínom','Napíšte správu, na ktorú sa dá jednoducho reagovať.','Subject: Updated quotation needed by Thursday\nDear Mr Patel,\nCould you send an updated quotation for twenty office chairs by 2 p.m. on Thursday? Please include delivery costs and the estimated lead time. We need these details before approving the order.\nThank you for your help.\nKind regards,\nLucia', ['Uveďte predmet, požiadavku, termín a dôvod.','Vyhnite sa nejasnému as soon as possible, ak poznáte termín.','Úloha: napíšte podobný email o piatich monitoroch; porovnajte s modelom.'],[q('Which subject line is most useful?',['Hello!!!','Updated quotation needed by Thursday','Important thing'],1,'Konkrétny predmet pomáha príjemcovi určiť úlohu a termín.'),q('Which detail is requested besides the price?',['Delivery costs and lead time','The manager’s age','Staff holidays'],0,'Správa výslovne žiada náklady na dopravu a dodaciu lehotu.')]),
    lesson('rw-meeting','realworld','B2','Meeting: profesionálny nesúhlas','Nesúhlaste vecne a ponúknite alternatívu.','Alex: Can we finish the rollout by Friday?\nDana: I’m concerned that Friday may be too ambitious because testing is not complete. Could we release to one team first and review the results on Monday?\nAlex: That sounds reasonable. Please send a revised plan this afternoon.', ['Najprv pomenovanie rizika, potom dôvod a alternatíva.','Úloha: navrhnite posun termínu bez obviňovania kolegu.'],[q('Which reply offers a constructive alternative?',['That is stupid.','No.','Could we pilot it with one team first?'],2,'Návrh pilotu umožňuje pokračovať pri znížení rizika.'),q('What does Dana need to send?',['A revised plan this afternoon','A resignation letter','An invoice next month'],0,'Alex žiada aktualizovaný plán ešte dnes popoludní.')]),
    lesson('rw-supplier','realworld','B2','Dodávateľ: oneskorená zásielka','Požiadajte o konkrétne riešenie a záväzný čas.','Dear Sales Team,\nOur order PO-184 was due yesterday, but the tracking page still shows it at your warehouse. Could you confirm the dispatch status and provide a revised delivery date by noon today? If the full order is unavailable, please advise whether you can send the essential components separately.\nKind regards, Peter', ['Uveďte číslo objednávky, očakávaný stav a požadované riešenie.','Úloha: doplňte, prečo potrebujete zásielku do piatka.'],[q('What makes the request actionable?',['A specific order number and response deadline','Repeated capital letters','A vague complaint'],0,'Dodávateľ vie identifikovať objednávku aj termín odpovede.'),q('Which alternative is offered?',['Cancel all future orders','Ship essential components separately','Ignore the delivery date'],1,'Správa navrhuje samostatne poslať dôležité diely.')]),
    lesson('rw-complaint','realworld','B1','Reklamácia: chybný výrobok','Opíšte problém a požiadajte o nápravu.','Hello, I received order 742 yesterday. One of the two lamps does not switch on, even with a new bulb. I have attached a photo and a copy of the receipt. Could you arrange a replacement and tell me how to return the faulty lamp? Thank you.', ['Popíšte overiteľné fakty bez urážok.','Úloha: napíšte reklamáciu poškodeného stola vrátane želaného riešenia.'],[q('What remedy does the customer request?',['A replacement','A job interview','A new account'],0,'Customer žiada replacement a pokyny k vráteniu.'),q('Which evidence is attached?',['A CV','A photo and receipt','A delivery forecast'],1,'Správa uvádza fotografiu a doklad o kúpe.')]),
    lesson('rw-help','realworld','A2','Žiadosť o pomoc a zopakovanie','Získajte vysvetlenie bez predstierania porozumenia.','Sam: Please upload the form to the shared folder.\nEva: Sorry, could you show me which folder you mean?\nSam: The one called New Orders.\nEva: Thank you. Do I need to sign it first?\nSam: Yes, please sign the last page before uploading it.', ['Could you show me…? žiada ukážku.','Do I need to…? overuje povinnosť.','Úloha: požiadajte o pomalšie vysvetlenie novej úlohy.'],[q('What should Eva do before uploading?',['Delete the form','Sign the last page','Call the customer'],1,'Sam vysvetľuje, že treba podpísať poslednú stranu.'),q('Which phrase asks politely for repetition?',['Could you say that again, please?','Repeat me.','You speak wrong.'],0,'Could you say that again je prirodzená zdvorilá žiadosť.')]),
    lesson('a-paraphrase','academic','B2','Parafráza a označenie zdroja','Zachovajte význam vlastnými slovami.','Original: The survey found that employees valued flexible start times more than free lunches.\nParaphrase: In the survey, staff preferred flexibility in when they began work over complimentary meals.\nA paraphrase changes the wording and structure while preserving the claim. It still needs a reference to the original source. This example is an invented teaching sentence, not a published study.', ['Zmena niekoľkých synoným nemusí stačiť.','Nevytvárajte silnejší záver než pôvodný autor.','Úloha: parafrázujte prvú vetu bez použitia valued.'],[q('Which paraphrase preserves the claim?',['All employees hate lunch.','Staff preferred flexible starting times to free meals.','Flexible hours doubled productivity.'],1,'Zachováva porovnanie preferencií bez nového tvrdenia.'),q('Does a paraphrase need source attribution?',['No, because words changed','Only if it is very long','Yes, the idea still comes from a source'],2,'Vlastné formulovanie nemení pôvod myšlienky.')]),
    lesson('a-abstract','academic','C1','Štruktúra abstraktu','Rozpoznajte cieľ, metódu, výsledok a obmedzenie.','This teaching example examines whether a shorter onboarding guide improves task completion. Forty volunteers used either a brief guide or the existing manual to complete a simulated order. Participants using the brief guide finished faster on average, while error rates were similar. The small volunteer sample and simulated task limit generalisation. Further testing in operational settings is recommended. These are fictional study details for language practice.', ['Cieľ → metóda → výsledok → obmedzenie.','Priemerný výsledok nie je záruka pre každého jednotlivca.'],[q('Which sentence describes the method?',['Forty volunteers used either guide to complete a simulated order.','Further testing is recommended.','The sample limits generalisation.'],0,'Metóda opisuje účastníkov a postup.'),q('Which limitation is named?',['A huge representative sample','A small volunteer sample and simulated task','No guide was provided'],1,'Abstrakt uvádza oba limity.')]),
    lesson('a-evidence','academic','C1','Kritické čítanie dôkazov','Rozlíšte koreláciu, príčinu a obmedzenia.','A report finds that teams using a planning app finish projects earlier. However, those teams also have more experienced managers and smaller workloads. The association alone does not establish that the app caused the difference. A stronger evaluation would compare similar teams, track baseline performance and describe how participants were selected. The report should also disclose missing data and conflicts of interest.', ['Association = súvislosť; causation = príčinnosť.','Alternatívne vysvetlenia musia byť preskúmané.','Úloha: napíšte dve otázky, ktoré by ste položili autorovi reportu.'],[q('What prevents a simple causal conclusion?',['Other differences between the teams','The report uses English','The app has a name'],0,'Skúsenosť manažérov a záťaž sa tiež líšia.'),q('What would strengthen the evaluation?',['Ignoring missing data','Comparing similar teams and baseline performance','Selecting only successful users'],1,'Lepšie porovnanie znižuje riziko alternatívnych vysvetlení.')])
  ];
  lessons.push(
    lesson('g-questions','grammar','A1','Otázky s do a does','Získajte informácie o práci a zvykoch.','Do you work on Saturdays? Does Maria drive to work? Where does your colleague live? We use do or does with ordinary verbs in present simple questions. Be has its own pattern: Is Maria here?', ['Po does je základný tvar: Does she work?','Wh- otázka: Where + does + osoba + sloveso.'],[q('Where ___ your manager work?',['do','does','is'],1,'Manager je tretia osoba jednotného čísla.'),q('Choose the correct question.',['Does he speaks English?','Do he speak English?','Does he speak English?'],2,'Po does už speak nedostáva -s.')]),
    lesson('g-countable','grammar','A2','Počítateľné a nepočítateľné podstatné mená','Objednávajte materiál so správnym množstvom.','We need three chairs and some equipment. There is not much space in the office, but there are a few empty desks. Could you give me some advice? Equipment and advice are uncountable in these uses.', ['Many/a few s množným číslom; much/a little s nepočítateľným.','Advice a equipment bežne netvoria advices/equipments.'],[q('We need some new ___.',['equipments','equipment','an equipment'],1,'Equipment je nepočítateľné.'),q('How ___ chairs do we need?',['many','much','little'],0,'Chairs možno počítať, preto many.')]),
    lesson('g-future','grammar','B1','Budúcnosť: plán, dohoda a rozhodnutie','Vyberte vhodný spôsob rozprávania o budúcnosti.','I am meeting the client at ten tomorrow: the appointment is arranged. We are going to replace the old printer: it is our plan. The phone is ringing. I will answer it: this is a decision made now.', ['Continuous môže označiť dohodnutú udalosť.','Going to je vopred zamýšľaný plán.','Formy sa v praxi môžu prekrývať; učíme rozdiel pomocou kontextu.'],[q('The phone is ringing. You decide now:',['I will answer it.','I answered it yesterday.','I have answered it last week.'],0,'Will je prirodzené pre okamžité rozhodnutie.'),q('An arranged appointment can be expressed as…',['I met her yesterday.','I am meeting her tomorrow.','I meeted her tomorrow.'],1,'Present continuous môže vyjadriť dohodnutý budúci termín.')]),
    lesson('g-relative','grammar','B1','Vzťažné vety: identifikujte osobu a vec','Spojte informácie pomocou who, which a that.','The colleague who handles returns is on leave. The document that you need is in the shared folder. Our new printer, which arrived yesterday, is already working. Essential information identifies the person or thing; extra information is separated by commas.', ['Who pre osoby, which pre veci.','V defining vetách možno často použiť that.','Nevypúšťajte vzťažné zámeno, ak je podmetom vety.'],[q('The person ___ manages deliveries is Maya.',['which','who','where'],1,'Who zastupuje osobu a je podmetom manages.'),q('The file ___ you requested is attached.',['who','when','that'],2,'That uvádza určujúcu vetu o súbore.')]),
    lesson('g-reported','grammar','B2','Reported speech: odovzdajte informáciu','Zhrňte výrok kolegu bez priamej citácie.','Direct: “I can send the figures tomorrow,” said Nina on Monday. Reported on Wednesday: Nina said that she could send the figures the following day. Time expressions change when the reporting context changes. If a fact remains true, backshift is not always necessary.', ['Can → could a will → would pri bežnom posune do minulosti.','Tomorrow môže byť the following day podľa času reportovania.','Nevyžadujte mechanický posun, ak kontext zostáva rovnaký.'],[q('She said, “I will call.” Standard backshift:',['She said she would call.','She said she will called.','She said she calling.'],0,'Will sa v bežnom nepriamom podaní mení na would.'),q('Tomorrow in a later report may become…',['the previous day','the following day','every day'],1,'Ide o deň nasledujúci po pôvodnom výroku.')]),
    lesson('g-third','grammar','C1','Third conditional: zhodnotenie minulého rozhodnutia','Opíšte alternatívu, ktorá sa už nestala.','If we had checked the address, we would have avoided the failed delivery. Had the client replied earlier, we could have reserved the stock. These sentences imagine a different past and its possible result; they do not describe a future plan.', ['If + had + príčastie; would/could have + príčastie.','Had we checked… je formálna alternatíva If we had checked….'],[q('If we had ordered earlier, we ___ the deadline.',['will meet','would meet tomorrow','would have met'],2,'Nerealizovaný minulý výsledok: would have met.'),q('Had I known means…',['If I had known','When I will know','I know now'],0,'Inverzia nahrádza if v minulom hypotetickom tvrdení.')]),
    lesson('rw-introduction','realworld','A1','Prvý deň: predstavte sa kolegovi','Meno, pracovná rola a jednoduchá otázka.','Maya: Hello, I’m Maya. I work in purchasing.\nTom: Nice to meet you. I’m Tom, the new technician.\nMaya: Welcome to the team. Where are you from?\nTom: I’m from Slovakia. Is the workshop on this floor?\nMaya: Yes, it is next to the lift.', ['I’m + meno; I work in + oddelenie.','Úloha: predstavte svoju rolu a položte jednu otázku o pracovisku.'],[q('Where does Maya work?',['Purchasing','Reception','Accounting'],0,'Maya hovorí I work in purchasing.'),q('Which reply fits “Nice to meet you”?',['Yesterday only.','Nice to meet you too.','Give me now.'],1,'Too znamená tiež.')]),
    lesson('rw-hotel','realworld','A2','Hotel: rezervácia a požiadavka','Pri príchode overte služby a čas odchodu.','Guest: I have a reservation under the name Novak for two nights.\nReceptionist: Yes, a single room. Breakfast is from seven to ten.\nGuest: Thank you. Could I have a quiet room, please? I have an early meeting. What time is check-out?\nReceptionist: Eleven, but we can store your luggage afterwards.', ['Under the name… uvádza meno rezervácie.','Úloha: požiadajte o účet pre zamestnávateľa.'],[q('How long is the stay?',['One night','Three nights','Two nights'],2,'Rezervácia je for two nights.'),q('What can reception do after check-out?',['Store the luggage','Extend breakfast to noon','Guarantee a meeting room'],0,'Recepcia ponúka úschovu batožiny.')]),
    lesson('rw-airport','realworld','B1','Letisko: zmeškaný prestup','Požiadajte o nový plán a potrebné informácie.','Passenger: My first flight was delayed, and I missed my connection to Edinburgh. What are my options?\nAgent: The next available flight is at six this evening.\nPassenger: Could you rebook me on that flight? Will my checked luggage be transferred automatically? I also need to know where to collect the new boarding pass.', ['Popíšte príčinu a položte konkrétne otázky.','Úloha: vysvetlite, že potrebujete kontaktovať hotel; právne nároky táto lekcia neposudzuje.'],[q('Why was the connection missed?',['The first flight was delayed','The passenger forgot a ticket','The airport was closed'],0,'Prvá veta jasne uvádza meškanie.'),q('Which question checks what happens to baggage?',['Where is the coffee?','Will my checked luggage be transferred automatically?','Do you work here?'],1,'Otázka sa týka automatického preloženia batožiny.')]),
    lesson('rw-phone','realworld','B1','Telefonát: odkaz pre neprítomného kolegu','Overte meno, číslo a dôvod volania.','Caller: Could I speak to Ms Green, please?\nAssistant: She is in a meeting. May I take a message?\nCaller: This is Adrian Lee from North Tools. Please ask her to call me about quotation Q-62. My number is 020 7946 0812.\nAssistant: Let me read that back to check I have it correctly.', ['May I take a message? = môžem prijať odkaz?','Opakujte čísla a identifikátory; nepovažujte ich za jasné po prvom počutí.','Úloha: pripravte vlastný odkaz s dôvodom a termínom.'],[q('What is the call about?',['An interview','A quotation','A hotel booking'],1,'Volajúci uvádza quotation Q-62.'),q('Why does the assistant read the number back?',['To check accuracy','To refuse the call','To change the price'],0,'Opakovanie overuje správnosť zápisu.')]),
    lesson('rw-interview','realworld','B2','Pohovor: konkrétny príklad skúsenosti','Použite situáciu, činnosť a výsledok.','Interviewer: Tell me about a time you improved a process.\nCandidate: Our team was entering order details twice. I mapped the workflow and suggested a shared form. After a small trial, we adopted it across the team. It reduced duplicate entry and made missing information easier to spot. I learned to involve the people who use the process before proposing a change.', ['Uveďte vlastný prínos, nie iba we did everything.','Používajte pravdivé príklady; nevymýšľajte merania.','Úloha: opíšte jednu vlastnú skúsenosť v štyroch vetách.'],[q('What problem did the candidate address?',['Duplicate data entry','Staff transport','Office rent'],0,'Dáta sa zadávali dvakrát.'),q('What lesson did the candidate learn?',['Never test a change','Involve users before proposing a change','Avoid shared documents'],1,'Záver pomenúva zapojenie používateľov procesu.')]),
    lesson('rw-customer','realworld','B2','Zákazník: realistické očakávania','Ponúknite riešenie bez neovereného sľubu.','Customer: Can you guarantee delivery tomorrow?\nAdvisor: I cannot confirm that until the courier accepts the collection. What I can do is book the earliest available service and send you confirmation by three today. If tomorrow is not possible, I will explain the alternatives before we charge for delivery.', ['Oddeľte to, čo viete, od toho, čo ešte čaká na potvrdenie.','Úloha: navrhnite dve možnosti riešenia bez sľubu, ktorý neviete splniť.'],[q('What can the advisor promise now?',['Guaranteed arrival tomorrow','Confirmation by three today','Free shipping for life'],1,'Garantuje informáciu do 15:00, nie príchod zásielky.'),q('Which phrase avoids an unsupported promise?',['It will definitely arrive, whatever happens.','I cannot confirm that until the courier accepts the collection.','Do not ask questions.'],1,'Podmienka transparentne vyjadruje neistotu.')]),
    lesson('rw-it','realworld','B1','IT podpora: opíšte technický problém','Uveďte príznak, začiatok a vykonané kroky.','Hello IT Team, I cannot access the shared drive on my office laptop. The problem started after this morning’s restart. My internet connection works, and I can open email. I have tried reconnecting to the company network, but the same error appears: “Access denied.” Could you check my permissions? I need the production schedule before two.', ['Opíšte pozorované správanie bez hádania príčiny.','Neuvádzajte svoje heslo v správe.','Úloha: pripravte podobný ticket pre tlačiareň, ktorá nereaguje.'],[q('What still works?',['The shared drive','Internet and email','Every permission'],1,'Používateľ výslovne uvádza internet a email.'),q('What should IT check?',['Hotel availability','The user’s permissions','The lunch menu'],1,'Access denied a záver žiadajú overiť oprávnenia.')]),
    lesson('rw-presentation','realworld','B2','Prezentácia: prechod od dát k návrhu','Organizujte krátke vysvetlenie pre dospelé publikum.','Today I will outline our delivery performance, discuss possible causes of delays and propose two changes. First, most late orders involved items from the same warehouse. This suggests that dispatch capacity deserves closer attention. My first recommendation is to review the collection schedule. The second is to keep a backup supplier for urgent items. I welcome questions before we agree on next steps.', ['Ohláste štruktúru a jasne oddeľte dáta od interpretácie.','Úloha: pripravte 60-sekundový úvod vlastnej prezentácie.'],[q('What does the speaker propose reviewing?',['Staff birthdays','The collection schedule','Every product name'],1,'Prvé odporúčanie sa týka harmonogramu vyzdvihnutia.'),q('Which phrase signals interpretation rather than a proven cause?',['This suggests that…','Today I will outline…','First…'],0,'Suggests vyjadruje interpretáciu pozorovania.')]),
    lesson('rw-negotiation','realworld','C1','Vyjednávanie: podmienka a kompromis','Navrhnite ústupok spojený s jasnou podmienkou.','Buyer: The annual volume justifies a better unit price.\nSupplier: We could offer a three per cent reduction, provided orders are placed in batches of at least fifty units.\nBuyer: That may be workable, although storage capacity is limited. Could we agree the annual quantity now and schedule monthly call-offs?\nSupplier: We can consider that if you confirm the forecast quarterly.', ['Provided a if viažu ponuku na podmienku.','Call-off tu znamená postupné čerpanie dohodnutej objednávky.','Úloha: formulujte kompromis ceny a dodacej lehoty.'],[q('What is the initial condition for the discount?',['Batches of at least fifty units','Payment in cash only','A warehouse purchase'],0,'Dodávateľ viaže zľavu na veľkosť dávky.'),q('Why does the buyer suggest monthly call-offs?',['To avoid all forecasts','Because storage is limited','To increase paperwork'],1,'Menšie pravidelné dodávky riešia obmedzený sklad.')]),
    lesson('rw-boundaries','realworld','B2','Pracovné hranice: odmietnite ďalšiu úlohu','Vyjadrite kapacitu a ponúknite prioritizáciu.','Manager: Could you also finish the stock review today?\nEmployee: I can do that, but it would delay the customer report we agreed for four. Which task should take priority? Alternatively, I can complete the review tomorrow morning.\nManager: Please send the report first and do the review tomorrow.', ['Ukážte dôsledok a nechajte zodpovednú osobu určiť prioritu.','Úloha: odmietnite termín vecne, s realistickou alternatívou.'],[q('What conflict does the employee identify?',['The review would delay the report','The manager is away','There are no customers'],0,'Nová úloha ohrozuje dohodnutý report.'),q('What is the final priority?',['Both tasks before noon','The report first','Neither task'],1,'Manažér žiada report ako prvý.')]),
    lesson('r-contract','reading','B2','Servisná ponuka: rozsah a výnimky','Vyhľadajte, čo je zahrnuté a čo sa účtuje osobitne.','The maintenance package includes two scheduled inspections each year and remote support during office hours. Replacement parts are charged separately. Emergency visits outside office hours require prior approval and attract an additional fee. The package renews annually unless either party gives thirty days’ written notice before the renewal date. This is a fictional language exercise, not a legal assessment of a contract.', ['Includes a charged separately odlišujú rozsah od príplatkov.','Úloha precvičuje čítanie, nie posúdenie právnej platnosti.'],[q('What is included?',['Unlimited replacement parts','Two scheduled inspections a year','All emergency visits'],1,'Text uvádza dve plánované kontroly.'),q('What is needed to prevent renewal?',['A phone call after renewal','No action','Written notice thirty days before renewal'],2,'Fiktívne znenie vyžaduje včasné písomné oznámenie.')]),
    lesson('r-community','reading','A2','Komunitný kurz pre dospelých','Prečítajte podmienky registrácie a vybavenia.','The community centre offers a beginner photography course on Wednesday evenings from 6 to 8. The course lasts four weeks and costs forty euros. Bring any camera or a smartphone. Places are limited to twelve participants. Register at reception before Monday. If fewer than six people register, the centre will contact participants with a new start date.', ['Rozlíšte maximálny počet účastníkov od minima na otvorenie kurzu.','Sledujte termín registrácie oddelene od termínu kurzu.'],[q('When should you register?',['Before Monday','After the last class','On Friday evening'],0,'Registrácia má prebehnúť pred pondelkom.'),q('What equipment is acceptable?',['Only a professional camera','A camera or smartphone','No device'],1,'Text akceptuje aj smartphone.')]),
    lesson('l-changes','listening','A2','Zmena miestnosti na školenie','Zachyťte opravu pôvodného pokynu.','A quick update about tomorrow’s training: we will use room twelve, not room twenty as shown in the first email. Please arrive at quarter to nine so we can begin at nine. You do not need a laptop, but bring a pen. Coffee will be available after the first session.', ['Pozor na not a nový údaj po oprave.','Quarter to nine je 8:45.'],[q('Which room will be used?',['Room twenty','Room two','Room twelve'],2,'Aktuálny pokyn je room twelve.'),q('What should participants bring?',['A laptop','A pen','A camera'],1,'Laptop netreba, pero áno.')]),
    lesson('l-feedback','listening','B2','Spätná väzba po prezentácii','Rozlíšte ocenenie od konkrétneho návrhu.','Your explanation of the process was clear, and the example helped the audience follow it. Where I think you could improve is the transition to the figures. You moved quite quickly, so people had little time to understand the chart. Next time, introduce what the axes represent before discussing the trend. I would keep the example, though; it was effective.', ['Where you could improve uvádza oblasť zmeny.','Though v závere pripomína pozitívny prvok, ktorý netreba odstrániť.'],[q('What should be improved?',['The transition to the figures','The presenter’s job title','The example itself'],0,'Hlavný návrh sa týka prechodu k dátam.'),q('What should be kept?',['The fast pace','The effective example','An unexplained chart'],1,'Hovoriaci odporúča zachovať príklad.')]),
    lesson('a-cohesion','academic','B2','Súdržnosť odseku a logické spojky','Prepojte tvrdenie, dôkaz a dôsledok.','Training improved completion rates in the pilot group. However, the comparison group also improved during the same period. The difference between the groups was therefore smaller than the initial result suggested. Moreover, the pilot group received additional supervision. These factors should be considered before attributing the change to training alone.', ['However = kontrast; therefore = dôsledok; moreover = ďalší argument.','Spojka musí zodpovedať vzťahu medzi tvrdeniami.'],[q('Which connector introduces a contrast?',['Moreover','However','Therefore'],1,'However upozorňuje na odlišné alebo obmedzujúce tvrdenie.'),q('Why should attribution be cautious?',['There were additional factors','No participants improved','The report contains no comparison'],0,'Zlepšila sa aj kontrolná skupina a pilot mal dohľad navyše.')]),
    lesson('a-register','academic','C1','Register: presnosť bez zbytočne zložitého jazyka','Zvoľte formuláciu primeranú odbornému čitateľovi.','Informal: The new system is a lot better, and everyone likes it.\nMore precise: In the pilot, participants reported fewer duplicate entries and generally preferred the revised interface.\nThe second version names the context and observed outcomes. It does not imply universal approval or claim improvement in every measure. Academic style requires precision, not the longest possible words.', ['Nahraďte všeobecné better konkrétnou metrikou.','Neodstraňujte neistotu len kvôli autoritatívnemu tónu.','Úloha: spresnite tvrdenie “The project was a huge success.”'],[q('Why is the second version more precise?',['It makes a universal claim','It names context and outcomes','It uses more exclamation marks'],1,'Uvádza pilot, duplicity a preferenciu rozhrania.'),q('What does generally preferred allow for?',['Some participants may not have preferred it','Everyone certainly preferred it','Nobody used the system'],0,'Generally nepripisuje rovnakú preferenciu každému.')])
  );
  const tests = {
    A1:[q('I ___ an engineer.',['am','is','are'],0,'S I používame am.'),q('She ___ in Bratislava.',['live','lives','living'],1,'Tretia osoba má -s.'),q('We start ___ nine o’clock.',['in','on','at'],2,'Čas na hodinách: at.'),q('___ you ready?',['Do','Are','Is'],1,'Otázka s be: Are you ready?'),q('Which is a polite greeting?',['Good morning.','Go away.','Yesterday morning.'],0,'Good morning je ranný pozdrav.'),q('I need two ___.',['chair','chairs','chairing'],1,'Po two je množné číslo chairs.')],
    A2:[q('Yesterday we ___ the supplier.',['called','call','calling'],0,'Yesterday vyžaduje minulý čas.'),q('Did you ___ the file?',['sent','sending','send'],2,'Po did je základný tvar.'),q('There isn’t ___ milk left.',['many','any','a'],1,'V zápore s nepočítateľným milk: any.'),q('This box is ___ than that one.',['heavier','heavy','heaviest'],0,'Porovnanie s than: heavier.'),q('Could you ___ that again?',['says','saying','say'],2,'Po could použite say.'),q('The train leaves at 14:30. When does it leave?',['Half past four','Half past two','Two minutes past four'],1,'14:30 je half past two popoludní.')],
    B1:[q('We have worked here ___ five years.',['since','for','from'],1,'For označuje trvanie.'),q('If it rains, we ___ indoors.',['would stay','stayed','will stay'],2,'Reálna budúca podmienka: will stay.'),q('The invoice ___ yesterday.',['was approved','is approve','approved by'],0,'Past passive: was approved.'),q('You do not have to attend. This means…',['Attendance is forbidden.','Attendance is optional.','Attendance is required.'],1,'Neprítomnosť povinnosti znamená voliteľnosť.'),q('I have already ___ the report.',['write','wrote','written'],2,'Present perfect potrebuje príčastie written.'),q('Choose a clear follow-up.',['I’m following up on our quotation request.','You forgot everything.','Thing yesterday?'],0,'Prvá veta pomenúva kontext a účel správy.')],
    B2:[q('If we had more funding, we ___ the trial.',['will expand','would expand','expand'],1,'Second conditional: would + základný tvar.'),q('The launch was put off. It was…',['accelerated','completed','postponed'],2,'Put off znamená odložiť.'),q('Although demand grew, profit fell. The sentence expresses…',['a contrast','a cause','a sequence only'],0,'Although uvádza kontrast.'),q('The shipment will arrive provided the form is approved. Provided means…',['unless','on condition that','despite'],1,'Provided uvádza podmienku.'),q('By the time we arrived, the meeting ___.',['has started','starts','had started'],2,'Skorší minulý dej: past perfect.'),q('Which email phrase asks diplomatically for a revision?',['Could we review the proposed deadline?','Your deadline is stupid.','Change it now!'],0,'Otázka navrhuje diskusiu a zachováva profesionálny tón.')],
    C1:[q('The findings appear to support the hypothesis. This claim is…',['qualified rather than absolute','a guarantee','a denial'],0,'Appear to zmierňuje mieru istoty.'),q('Had we known, we ___ differently.',['will act','would have acted','would act tomorrow'],1,'Inverzná third conditional: would have + príčastie.'),q('Not only ___ costs, but it also improved reliability.',['it reduced','it reducing','did it reduce'],2,'Po Not only na začiatku používame inverziu.'),q('A self-selected sample may introduce…',['selection bias','a guaranteed causal effect','universal validity'],0,'Dobrovoľný výber môže skresliť zloženie vzorky.'),q('The plan is feasible, albeit costly. Albeit means…',['because it is','although it is','as soon as it is'],1,'Albeit vyjadruje kontrast: hoci.'),q('Which conclusion is warranted by a small pilot?',['The result applies to everyone.','The policy can never fail.','The result warrants further investigation.'],2,'Obmedzené údaje podporujú ďalšie skúmanie, nie univerzálny záver.')],
    C2:[q('His praise was somewhat grudging. It was…',['enthusiastic without reservation','reluctantly given','entirely absent'],1,'Grudging označuje neochotné uznanie.'),q('The proposal is not without merit. The speaker…',['rejects every aspect','guarantees success','acknowledges some value cautiously'],2,'Litotes opatrne priznáva určitú hodnotu.'),q('Were it not for the backup, production would stop. This means…',['The backup prevents production from stopping.','Production has already stopped.','There is no backup.'],0,'Inverzia vyjadruje hypotetickú situáciu bez zálohy.'),q('The results should be interpreted with due circumspection. This calls for…',['careful judgement','immediate celebration','complete dismissal'],0,'Circumspection znamená obozretné posúdenie.'),q('The recommendation is contingent upon approval. It is…',['independent of approval','dependent on approval','opposed to approval'],1,'Contingent upon znamená podmienené.'),q('Which revision preserves a nuanced claim? Original: The intervention may have contributed to improvement.',['The intervention certainly caused improvement.','Improvement was impossible without it.','The intervention could have played a part in the improvement.'],2,'Tretia verzia zachováva možnosť aj čiastočný príspevok.')]
  };
  // Lexical support explains incidental words; it never translates an answer key.
  const testHelp = {
  "A1": [
    [
      [
        "engineer",
        "inžinier"
      ]
    ],
    [
      [
        "live",
        "bývať / žiť"
      ]
    ],
    [
      [
        "start",
        "začať"
      ]
    ],
    [
      [
        "ready",
        "pripravený"
      ]
    ],
    [
      [
        "greeting",
        "pozdrav"
      ]
    ],
    [
      [
        "chair",
        "stolička"
      ]
    ]
  ],
  "A2": [
    [
      [
        "supplier",
        "dodávateľ"
      ]
    ],
    [
      [
        "file",
        "súbor"
      ]
    ],
    [
      [
        "milk",
        "mlieko"
      ]
    ],
    [
      [
        "box",
        "krabica"
      ]
    ],
    [
      [
        "again",
        "znova"
      ]
    ],
    [
      [
        "train",
        "vlak"
      ],
      [
        "leave",
        "odísť / odchádzať"
      ]
    ]
  ],
  "B1": [
    [
      [
        "work",
        "pracovať"
      ]
    ],
    [
      [
        "indoors",
        "vo vnútri"
      ]
    ],
    [
      [
        "invoice",
        "faktúra"
      ]
    ],
    [
      [
        "attend",
        "zúčastniť sa"
      ]
    ],
    [
      [
        "report",
        "správa / report"
      ]
    ],
    [
      [
        "quotation request",
        "žiadosť o cenovú ponuku"
      ],
      [
        "follow-up",
        "nadväzujúca správa / pripomenutie sa"
      ]
    ]
  ],
  "B2": [
    [
      [
        "funding",
        "financovanie / finančné prostriedky"
      ]
    ],
    [
      [
        "launch",
        "spustenie / uvedenie na trh"
      ]
    ],
    [
      [
        "demand",
        "dopyt"
      ],
      [
        "profit",
        "zisk"
      ]
    ],
    [
      [
        "shipment",
        "zásielka"
      ],
      [
        "approve",
        "schváliť"
      ]
    ],
    [
      [
        "arrive",
        "prísť"
      ]
    ],
    [
      [
        "deadline",
        "termín dokončenia"
      ],
      [
        "revision",
        "úprava / revízia"
      ]
    ]
  ],
  "C1": [
    [
      [
        "findings",
        "zistenia"
      ],
      [
        "hypothesis",
        "hypotéza"
      ]
    ],
    [
      [
        "differently",
        "inak"
      ]
    ],
    [
      [
        "reliability",
        "spoľahlivosť"
      ]
    ],
    [
      [
        "sample",
        "výskumná vzorka"
      ]
    ],
    [
      [
        "costly",
        "nákladný"
      ]
    ],
    [
      [
        "pilot",
        "pilotný projekt / skúšobná prevádzka"
      ],
      [
        "warranted",
        "opodstatnený"
      ]
    ]
  ],
  "C2": [
    [
      [
        "praise",
        "pochvala"
      ]
    ],
    [
      [
        "proposal",
        "návrh"
      ]
    ],
    [
      [
        "backup",
        "záloha / záložné riešenie"
      ],
      [
        "production",
        "výroba"
      ]
    ],
    [
      [
        "results",
        "výsledky"
      ]
    ],
    [
      [
        "approval",
        "schválenie"
      ]
    ],
    [
      [
        "intervention",
        "zásah / opatrenie"
      ],
      [
        "improvement",
        "zlepšenie"
      ]
    ]
  ]
};
  for (const [level, questions] of Object.entries(tests)) {
    questions.forEach((question, index) => { question.help = testHelp[level][index].map(([word, translation]) => ({word, translation})); });
  }
  document.dispatchEvent(new CustomEvent('english-content', {detail:{vocabulary,lessons,tests}}));
})();
