import React, { useState, useRef, useEffect } from 'react';
import { Page, PageHeader, SectionGroup, FooterNote, Button, Choices, InputField, PhotoCredit, ExternalLink } from './ui';
import gym from './photos/gym.jpg';
import training from './photos/training.jpg';
import './style.css';

const programs = [
 { n:'01', name:'Build strength', kind:'Strength', detail:'A focused mix of free weights, compound lifts and progressive training.', tags:'Barbells / Dumbbells / Technique', icon:'↗' },
 { n:'02', name:'Find your pace', kind:'Conditioning', detail:'Intervals and circuit sessions for the days you want to turn up the energy.', tags:'HIIT / Circuits / Endurance', icon:'≈' },
 { n:'03', name:'Move better', kind:'Mobility', detail:'Slow it down with controlled movement, balance and guided recovery.', tags:'Mobility / Stretch / Recovery', icon:'◎' },
];
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const sessions = [
 {day:'Mon',time:'07:00',name:'Strength foundations',type:'Strength',duration:50,level:'All levels'},
 {day:'Mon',time:'18:00',name:'Engine room',type:'Conditioning',duration:45,level:'Intermediate'},
 {day:'Mon',time:'19:00',name:'Reset & restore',type:'Mobility',duration:40,level:'All levels'},
 {day:'Tue',time:'08:00',name:'Move with control',type:'Mobility',duration:40,level:'All levels'},
 {day:'Tue',time:'18:30',name:'Full-body strength',type:'Strength',duration:50,level:'All levels'},
 {day:'Wed',time:'07:00',name:'Engine room',type:'Conditioning',duration:45,level:'Intermediate'},
 {day:'Wed',time:'18:00',name:'Strength foundations',type:'Strength',duration:50,level:'All levels'},
 {day:'Thu',time:'08:00',name:'Reset & restore',type:'Mobility',duration:40,level:'All levels'},
 {day:'Thu',time:'19:00',name:'Full-body strength',type:'Strength',duration:50,level:'All levels'},
 {day:'Fri',time:'09:00',name:'Weekend circuit',type:'Conditioning',duration:45,level:'All levels'},
 {day:'Fri',time:'17:00',name:'Move with control',type:'Mobility',duration:40,level:'All levels'},
 {day:'Sat',time:'10:00',name:'Strength foundations',type:'Strength',duration:50,level:'All levels'},
 {day:'Sat',time:'12:00',name:'Weekend circuit',type:'Conditioning',duration:45,level:'All levels'},
 {day:'Sun',time:'10:00',name:'Reset & restore',type:'Mobility',duration:40,level:'All levels'},
];
const plans = [
 {name:'Essential',monthly:650,annual:6500,desc:'Your space. Your routine.',features:['Open gym access','Strength & cardio areas','Starter orientation']},
 {name:'Plus',monthly:950,annual:9500,desc:'A little structure goes a long way.',features:['Everything in Essential','Group training classes','Monthly progress check-in']},
 {name:'Coached',monthly:1600,annual:16000,desc:'More guidance. A clearer plan.',features:['Everything in Plus','4 coaching sessions per month','Personal training plan']},
];
const faqs = [
 ['Is this a real gym?','FORM is a fictional gym website built as a frontend project. The classes, memberships and policies are sample content. You cannot buy a membership or make a real booking here.'],
 ['Can a beginner join the classes?','In this sample club, classes marked “All levels” are designed to offer a beginner-friendly starting point. The Strength foundations program introduces the main movements.'],
 ['What should I bring?','For the sample first-visit experience: comfortable training clothes, clean trainers, a towel and a water bottle.'],
 ['How do the sample annual plans work?','The annual selector shows one illustrative upfront payment for a year. The monthly option shows a recurring monthly price. No checkout, renewal or payment is connected.'],
 ['Will the enquiry form send my information?','No. It validates your input and shows a demo confirmation only. Your details are not sent to a gym or stored after you reload the page. Use made-up details to try it.'],
];
export function App() {
 const [day,setDay] = useState('Mon'); const [type,setType] = useState('All');
 const [billing,setBilling] = useState('monthly'); const [selected,setSelected] = useState('Plus');
 const [name,setName] = useState(''); const [email,setEmail] = useState(''); const [goal,setGoal] = useState('Build strength');
 const [error,setError] = useState(''); const [done,setDone] = useState(false); const [open,setOpen] = useState<number|null>(null);
 const enquiry = useRef<HTMLElement>(null);
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add('gym-in-view'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.gym-program, .gym-plan, .gym-about, .gym-class-list, .gym-enquiry, .gym-faq').forEach(el => { el.classList.add('gym-reveal'); observer.observe(el); });
  return () => observer.disconnect();
 }, []);
 const shown = sessions.filter(s=>s.day===day && (type==='All'||s.type===type));
 function go(id:string) { document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}); }
 function choose(plan:string) { setSelected(plan); setDone(false); enquiry.current?.scrollIntoView({behavior:'smooth',block:'start'}); }
 function submit() { if(name.trim().length<2){setError('Enter a name with at least 2 characters.');return;} if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){setError('Enter a valid email address, for example alex@example.com.');return;} setError('');setDone(true); }
 return <div className="gym-page"><Page lang="en" dir="ltr">
  <PageHeader title="FORM Training Club" fact="Fictional gym / Frontend demo" intro="Build a routine you want to come back to." />
  <nav className="gym-nav" aria-label="Main navigation">{[['programs','Programs'],['schedule','Timetable'],['membership','Memberships'],['questions','FAQs']].map(([id,label])=><button type="button" key={id} onClick={()=>go(id)} className="gym-navlink gym-hover-underline">{label}</button>)}<Button compact onClick={()=>go('visit')}>Try the demo</Button></nav>
  <section className="gym-hero" aria-label="Welcome to FORM"><img src={gym} alt="Black dumbbells arranged on racks in a training space"/><div className="gym-hero-copy"><span className="gym-kicker">YOUR SPACE. YOUR PACE. YOUR PROGRESS.</span><h2>SHOW UP.<br/>GET <em>STRONGER.</em></h2><p>Make room for the version of you that keeps going.<br/>Purposeful training. A fresh start, every session.</p><div className="gym-hero-actions"><Button onClick={()=>go('membership')}>Find your membership ↗</Button><button type="button" className="gym-textbutton" onClick={()=>go('programs')}>Discover the training ↓</button></div></div><span className="gym-hero-index" aria-hidden="true">FORM / TRAINING CLUB / 01</span><span className="gym-photo-label">FICTIONAL CLUB · ILLUSTRATIVE PHOTOGRAPHY</span></section>
  <div className="gym-values"><div><strong>Train your way</strong><span>Independent or coached</span></div><div><strong>Start where you are</strong><span>Room for every starting point</span></div><div><strong>Keep showing up</strong><span>Build a lasting routine</span></div></div>
  <section id="programs" className="gym-section"><SectionGroup label="01 / THE TRAINING" heading="Different goals. Your kind of training."><p className="gym-lead">Lift, move, recover. Choose the sessions that fit the way you want to feel.</p><div className="gym-grid">{programs.map(p=><article className="gym-program" key={p.n}><div className="gym-program-top"><span>{p.n} / {p.kind}</span><span className="gym-icon" aria-hidden="true">{p.icon}</span></div><h3>{p.name}</h3><p>{p.detail}</p><small>{p.tags}</small><button type="button" className="gym-textbutton gym-hover-underline" onClick={()=>{setType(p.kind);go('schedule');}}>See {p.kind.toLowerCase()} classes ↗</button></article>)}</div></SectionGroup></section>
  <section className="gym-section gym-about"><div><span className="gym-kicker">THE FORM APPROACH</span><h2>Less pressure.<br/>More progress.</h2></div><div><p>You do not need a perfect starting point. A good training space gives you room to learn, a reason to return and a routine that works around your life.</p><p>That is the idea behind FORM: purposeful training, a welcoming atmosphere and support when you want it.</p><span className="gym-note">A fictional club, designed around a real idea.</span></div></section>
  <section className="gym-gallery" aria-label="Explore the FORM experience"><article><img src={training} alt="An athlete training with a barbell in a gym" loading="lazy"/><div><span className="gym-kicker">01 / TRAIN WITH INTENTION</span><h2>STRONGER<br/>STARTS HERE.</h2><button type="button" className="gym-textbutton" onClick={()=>{setType('Strength');go('schedule');}}>Explore strength classes ↗</button></div></article><article><img src={gym} alt="A rack of dumbbells ready for a training session" loading="lazy"/><div><span className="gym-kicker">02 / YOUR OWN RHYTHM</span><h2>FIND YOUR FOCUS.<br/>MAKE IT A HABIT.</h2><button type="button" className="gym-textbutton" onClick={()=>go('membership')}>Find your fit ↗</button></div></article></section>
  <section id="schedule" className="gym-section"><SectionGroup label="02 / THE WEEKLY RHYTHM" heading="Make time for your next session."><p className="gym-lead">Explore the sample weekly timetable. All times shown are illustrative local club times.</p><div className="gym-days" role="group" aria-label="Day of the week">{days.map(d=><button type="button" key={d} className={'gym-day '+(day===d?'gym-active':'')} aria-pressed={day===d} onClick={()=>setDay(d)}>{d}</button>)}</div><Choices label="Training type" value={type} onChange={setType} options={['All','Strength','Conditioning','Mobility'].map(t=>({value:t,label:t}))}/><div className="gym-class-list" aria-live="polite"><p className="gym-result">{shown.length} {shown.length===1?'class':'classes'} / {day} / {type==='All'?'All training':type}</p>{shown.length ? shown.map(s=><article className="gym-class" key={s.time}><div className="gym-time">{s.time}<small>{s.duration} min</small></div><div><span className="gym-tag">{s.type}</span><h3>{s.name}</h3><span className="gym-note">{s.level}</span></div><Button variant="secondary" compact onClick={()=>{setGoal(s.type==='Strength'?'Build strength':s.type==='Mobility'?'Move better':'Improve fitness');choose(selected);}}>Try enquiry</Button></article>):<div className="gym-empty"><h3>No matching classes</h3><p>Try another day or see every training type.</p><Button variant="secondary" compact onClick={()=>setType('All')}>Reset filter</Button></div>}</div></SectionGroup></section>
  <section id="membership" className="gym-section"><SectionGroup label="03 / FIND YOUR FIT" heading="A plan for the way you train."><p className="gym-lead">Sample memberships in Egyptian pounds. No payment or real membership is available.</p><Choices label="Billing example" value={billing} onChange={setBilling} options={[{value:'monthly',label:'Monthly'},{value:'annual',label:'Annual'}]}/><div className="gym-grid gym-plans">{plans.map(p=><article key={p.name} className={'gym-plan '+(p.name==='Plus'?'gym-featured':'')}><div className="gym-plan-label">{p.name==='Plus'?'GROUP TRAINING':'YOUR ROUTINE'}</div><h3>{p.name}</h3><p>{p.desc}</p><div className="gym-price">{(billing==='monthly'?p.monthly:p.annual).toLocaleString('en-US')} <span>EGP</span></div><small>{billing==='monthly'?'per month, sample price':'per year, paid upfront, sample price'}</small><ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul><Button variant={p.name==='Plus'?'primary':'secondary'} onClick={()=>choose(p.name)}>Explore {p.name}</Button></article>)}</div></SectionGroup></section>
  <section id="visit" ref={enquiry} className="gym-section gym-enquiry"><SectionGroup label="04 / TAKE THE FIRST STEP" heading="Picture your first session."><p className="gym-lead">Try the enquiry experience with made-up details. Nothing is sent, booked or saved.</p>{done?<div className="gym-success" role="status"><span className="gym-icon" aria-hidden="true">✓</span><h3>Demo complete, {name.trim()}.</h3><p>You explored the {selected} plan with a goal to {goal.toLowerCase()}. In a connected site, this is where an enquiry would be sent.</p><p><strong>No enquiry has been sent. No membership has been created.</strong></p><Button variant="secondary" onClick={()=>setDone(false)}>Edit demo enquiry</Button></div>:<div className="gym-form" onKeyDown={e=>{if(e.key==='Enter')submit();}}><div className="gym-form-fields"><InputField label="Your name (demo)" value={name} onChange={setName}/><InputField label="Email address (demo)" value={email} onChange={setEmail}/></div><Choices label="Plan to explore" value={selected} onChange={setSelected} options={plans.map(p=>({value:p.name,label:p.name}))}/><Choices label="Your goal" value={goal} onChange={setGoal} options={['Build strength','Improve fitness','Move better'].map(g=>({value:g,label:g}))}/>{error&&<p className="gym-error" role="alert">{error}</p>}<Button onClick={submit}>Preview enquiry</Button><p className="gym-note">Frontend demo only. This button does not contact a gym.</p></div>}</SectionGroup></section>
  <section id="questions" className="gym-section"><SectionGroup label="GOOD TO KNOW" heading="Before you get started."><div className="gym-faq">{faqs.map(([q,a],i)=><div key={q}><h3><button type="button" aria-expanded={open===i} aria-controls={'answer-'+i} className="gym-faq-button gym-hover-underline" onClick={()=>setOpen(open===i?null:i)}>{q}<span aria-hidden="true">{open===i?'−':'+'}</span></button></h3>{open===i&&<p id={'answer-'+i}>{a}</p>}</div>)}</div></SectionGroup></section>
  <div className="gym-footer"><p>Train with purpose.<br/><span>FORM is a fictional gym concept.</span></p><button type="button" onClick={()=>document.querySelector('h1')?.scrollIntoView({behavior:'smooth',block:'start'})} className="gym-textbutton gym-hover-underline">Back to top ↑</button></div>
  <PhotoCredit>Illustrative athlete photo by Nate Johnston on <ExternalLink href="https://unsplash.com/photos/a-woman-squats-on-a-barbell-in-a-gym-Jx81mPHWnts">Unsplash</ExternalLink>. Illustrative equipment photo by Jakub Żerdzicki on <ExternalLink href="https://unsplash.com/photos/weights-and-equipment-are-ready-for-a-workout-Il9YbhIBiOA">Unsplash</ExternalLink>. Not a photograph of a FORM location.</PhotoCredit>
  <FooterNote>Frontend demonstration. All plans, classes and club policies are examples. No real bookings, payments or messages.</FooterNote>
 </Page></div>;
}
