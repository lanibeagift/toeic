import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   TOPIC DATA REGISTRY
   ───────────────────────────────────────────────────────────
   Mỗi file topic (vd: topic-contracts.js) sẽ đăng ký dữ liệu
   vào object này theo key = sub-topic id.

   Cách dùng trong file topic:
     TOPIC_DATA["contracts"] = [ ...12 words... ];

   App sẽ tự động nhận diện và hiển thị.
   ═══════════════════════════════════════════════════════════ */
const TOPIC_DATA = window.__TOEIC_DATA__ || (window.__TOEIC_DATA__ = {});

/* ═══════════════════════════════════════════════════════════
   10 MAIN TOEIC CATEGORIES + SUB-TOPICS (KHUNG)
   ═══════════════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    id:"corp", num:"I", title:"Corporate Development", vi:"Phát triển doanh nghiệp", icon:"📊",
    subs:[
      { id:"contracts", title:"Contracts", vi:"Hợp đồng", icon:"📝" },
      { id:"marketing", title:"Marketing", vi:"Tiếp thị", icon:"📢" },
      { id:"warranties", title:"Warranties", vi:"Bảo hành", icon:"🛡️" },
      { id:"business_planning", title:"Business Planning", vi:"Lập kế hoạch KD", icon:"📈" },
      { id:"conferences", title:"Conferences", vi:"Hội nghị", icon:"🎤" },
    ]
  },
  {
    id:"office", num:"II", title:"Office Issues", vi:"Vấn đề văn phòng", icon:"🏢",
    subs:[
      { id:"computers", title:"Computers", vi:"Máy tính", icon:"💻" },
      { id:"office_tech", title:"Office Technology", vi:"Công nghệ VP", icon:"🖨️" },
      { id:"office_procedures", title:"Office Procedures", vi:"Thủ tục VP", icon:"📋" },
      { id:"electronics", title:"Electronics", vi:"Điện tử", icon:"🔌" },
      { id:"correspondence", title:"Correspondence", vi:"Thư từ", icon:"✉️" },
    ]
  },
  {
    id:"personnel", num:"III", title:"Personnel", vi:"Nhân sự", icon:"👥",
    subs:[
      { id:"recruiting", title:"Recruiting", vi:"Tuyển dụng", icon:"🔍" },
      { id:"applying", title:"Applying & Interviewing", vi:"Ứng tuyển & PV", icon:"📄" },
      { id:"hiring", title:"Hiring", vi:"Tuyển chọn", icon:"✅" },
      { id:"salaries", title:"Salaries & Benefits", vi:"Lương & Phúc lợi", icon:"💰" },
      { id:"promotions", title:"Promotions", vi:"Thăng tiến", icon:"⭐" },
    ]
  },
  {
    id:"purchasing", num:"IV", title:"Purchasing", vi:"Mua sắm & Đấu thầu", icon:"🛒",
    subs:[
      { id:"shopping", title:"Shopping", vi:"Mua sắm", icon:"🛍️" },
      { id:"ordering", title:"Ordering Supplies", vi:"Đặt hàng", icon:"📦" },
      { id:"shipping", title:"Shipping", vi:"Vận chuyển", icon:"🚚" },
      { id:"invoices", title:"Invoices", vi:"Hóa đơn", icon:"🧾" },
      { id:"inventory", title:"Inventory", vi:"Kiểm kê hàng tồn", icon:"📋" },
    ]
  },
  {
    id:"finance", num:"V", title:"Financing & Budgeting", vi:"Tài chính & Ngân sách", icon:"💳",
    subs:[
      { id:"banking", title:"Banking", vi:"Ngân hàng", icon:"🏦" },
      { id:"accounting", title:"Accounting", vi:"Kế toán", icon:"📒" },
      { id:"investments", title:"Investments", vi:"Đầu tư", icon:"📊" },
      { id:"taxes", title:"Taxes", vi:"Thuế", icon:"🧮" },
      { id:"financial_statements", title:"Financial Statements", vi:"Báo cáo tài chính", icon:"📑" },
    ]
  },
  {
    id:"management", num:"VI", title:"Management Issues", vi:"Vấn đề quản trị", icon:"👔",
    subs:[
      { id:"property", title:"Property & Housing", vi:"Bất động sản", icon:"🏠" },
      { id:"board", title:"Board Meetings", vi:"Họp ban giám đốc", icon:"🪑" },
      { id:"quality", title:"Quality Control", vi:"Kiểm soát chất lượng", icon:"🔬" },
      { id:"product_dev", title:"Product Development", vi:"Phát triển SP", icon:"💡" },
      { id:"renting_leasing", title:"Renting & Leasing", vi:"Thuê & Cho thuê", icon:"🔑" },
    ]
  },
  {
    id:"health", num:"VII", title:"Health", vi:"Sức khỏe", icon:"🏥",
    subs:[
      { id:"doctor", title:"Doctor's Office", vi:"Phòng khám", icon:"🩺" },
      { id:"dentist", title:"Dentist's Office", vi:"Nha khoa", icon:"🦷" },
      { id:"health_insurance", title:"Health Insurance", vi:"Bảo hiểm y tế", icon:"🛡️" },
      { id:"hospitals", title:"Hospitals", vi:"Bệnh viện", icon:"🏥" },
      { id:"pharmacy", title:"Pharmacy", vi:"Nhà thuốc", icon:"💊" },
    ]
  },
  {
    id:"entertainment", num:"VIII", title:"Entertainment", vi:"Giải trí", icon:"🎭",
    subs:[
      { id:"movies", title:"Movies", vi:"Phim ảnh", icon:"🎬" },
      { id:"theater", title:"Theater", vi:"Nhà hát", icon:"🎭" },
      { id:"music", title:"Music", vi:"Âm nhạc", icon:"🎵" },
      { id:"museums", title:"Museums", vi:"Bảo tàng", icon:"🖼️" },
      { id:"media", title:"Media", vi:"Truyền thông", icon:"📺" },
    ]
  },
  {
    id:"travel", num:"IX", title:"Travel", vi:"Du lịch", icon:"✈️",
    subs:[
      { id:"airlines", title:"Airlines", vi:"Hàng không", icon:"✈️" },
      { id:"trains", title:"Trains", vi:"Tàu hỏa", icon:"🚆" },
      { id:"hotels", title:"Hotels", vi:"Khách sạn", icon:"🏨" },
      { id:"car_rentals", title:"Car Rentals", vi:"Thuê xe", icon:"🚗" },
      { id:"tourism", title:"Tourism", vi:"Du lịch", icon:"🗺️" },
    ]
  },
  {
    id:"dining", num:"X", title:"Dining Out", vi:"Ăn uống", icon:"🍽️",
    subs:[
      { id:"restaurants", title:"Restaurants", vi:"Nhà hàng", icon:"🍽️" },
      { id:"cooking", title:"Cooking", vi:"Nấu ăn", icon:"👨‍🍳" },
      { id:"nutrition", title:"Nutrition", vi:"Dinh dưỡng", icon:"🥗" },
      { id:"catering", title:"Catering", vi:"Dịch vụ ăn uống", icon:"🍱" },
      { id:"event", title:"Event", vi:"Sự kiện", icon:"🎉" },
    ]
  },
];

/* ═══════════════  HELPERS  ═══════════════ */
const SR_LEVELS=[{label:"Học lại",sub:"1m",color:"#EF4444"},{label:"Khó",sub:"6h",color:"#F59E0B"},{label:"Tốt",sub:"1d",color:"#22C55E"},{label:"Dễ",sub:"3d",color:"#3B82F6"}];
const ACCENT=["#6366F1","#EC4899","#F97316","#0EA5E9","#10B981","#8B5CF6","#EF4444","#D946EF","#0891B2","#F59E0B"];
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function speak(t){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=0.85;window.speechSynthesis.speak(u);}

/** Lấy words cho 1 sub-topic: ưu tiên từ TOPIC_DATA registry */
function getWords(subId){ return TOPIC_DATA[subId] || []; }

/* ═══════════════  MAIN APP  ═══════════════ */
export default function App(){
  const [screen,setScreen]=useState("main");
  const [catId,setCatId]=useState(null);
  const [subId,setSubId]=useState(null);
  const [tab,setTab]=useState("words");

  const cat=CATEGORIES.find(c=>c.id===catId);
  const sub=cat?.subs.find(s=>s.id===subId);

  function openCat(id){setCatId(id);setScreen("category");}
  function openSub(id){setSubId(id);setTab("words");setScreen("topic");}
  function goMain(){setScreen("main");setCatId(null);setSubId(null);}
  function goCat(){setScreen("category");setSubId(null);}

  return (
    <div style={{fontFamily:"'Nunito',sans-serif",maxWidth:560,margin:"0 auto",minHeight:"100vh",background:"#0B0F1A"}}>
      {screen==="main"&&<MainDash onOpen={openCat}/>}
      {screen==="category"&&cat&&<CategoryView cat={cat} onBack={goMain} onOpen={openSub}/>}
      {screen==="topic"&&sub&&<TopicView sub={sub} cat={cat} tab={tab} setTab={setTab} onBack={goCat}/>}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wrong{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
        @keyframes listening{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)}50%{box-shadow:0 0 0 16px rgba(99,102,241,0)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#333;border-radius:4px}
      `}</style>
    </div>
  );
}

/* ═══════════════  MAIN DASHBOARD  ═══════════════ */
function MainDash({onOpen}){
  return (
    <div style={{padding:"28px 16px 36px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h1 style={{fontSize:26,fontWeight:900,color:"#F8FAFC",letterSpacing:-0.3}}>📚 TOEIC Vocabulary</h1>
        <p style={{fontSize:13,color:"#64748B",fontWeight:600,marginTop:4}}>600 Essential Words — 10 Chủ đề chính</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {CATEGORIES.map((c,i)=>{
          const subCount=c.subs.length;
          const filledCount=c.subs.filter(s=>getWords(s.id).length>0).length;
          return (
          <button key={c.id} onClick={()=>onOpen(c.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 18px",background:"#151A2D",border:"1px solid #1E2640",borderRadius:16,cursor:"pointer",textAlign:"left",animation:`fadeUp 0.35s ease ${i*0.04}s both`,transition:"background 0.15s"}}>
            <div style={{width:42,height:42,borderRadius:13,background:`${ACCENT[i]}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{c.icon}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                <span style={{fontSize:13,fontWeight:800,color:ACCENT[i],fontFamily:"'Courier New',monospace"}}>{c.num}.</span>
                <span style={{fontSize:15,fontWeight:800,color:"#F1F5F9"}}>{c.title}</span>
              </div>
              <div style={{fontSize:12,color:"#4B5563",marginTop:1}}>{c.vi}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
              <span style={{fontSize:11,color:"#334155",fontWeight:600}}>{filledCount}/{subCount}</span>
              <span style={{color:"#334155",fontSize:18}}>›</span>
            </div>
          </button>
        );})}
      </div>
    </div>
  );
}

/* ═══════════════  CATEGORY VIEW  ═══════════════ */
function CategoryView({cat,onBack,onOpen}){
  const ci=CATEGORIES.indexOf(cat);
  const accent=ACCENT[ci]||"#6366F1";
  return (
    <div style={{padding:"0 0 32px"}}>
      <div style={{padding:"16px 16px 14px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#64748B",fontSize:20,cursor:"pointer",fontWeight:700}}>←</button>
        <div>
          <div style={{display:"flex",alignItems:"baseline",gap:6}}>
            <span style={{fontSize:13,fontWeight:800,color:accent,fontFamily:"'Courier New',monospace"}}>{cat.num}.</span>
            <span style={{fontSize:18,fontWeight:800,color:"#F1F5F9"}}>{cat.title}</span>
          </div>
          <div style={{fontSize:12,color:"#4B5563",marginTop:1}}>{cat.vi}</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:"0 16px"}}>
        {cat.subs.map((s,i)=>{
          const words=getWords(s.id);
          const hasWords=words.length>0;
          return (
            <button key={s.id} onClick={()=>onOpen(s.id)} style={{
              padding:"18px 14px 14px",background:"#151A2D",border:"1px solid #1E2640",borderRadius:16,
              textAlign:"left",cursor:"pointer",
              animation:`fadeUp 0.3s ease ${i*0.06}s both`,transition:"background 0.15s",position:"relative"
            }}>
              {!hasWords&&<span style={{position:"absolute",top:10,right:10,fontSize:10,fontWeight:700,color:"#475569",background:"#1E293B",padding:"2px 8px",borderRadius:8}}>SOON</span>}
              <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:14,fontWeight:800,color:"#E2E8F0"}}>{s.title}</div>
              <div style={{fontSize:11,color:"#4B5563",marginTop:2}}>{s.vi}</div>
              <div style={{fontSize:11,color:hasWords?accent:"#334155",marginTop:6,fontWeight:600}}>0/{hasWords?words.length:12}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════  TOPIC VIEW  ═══════════════ */
function TopicView({sub,cat,tab,setTab,onBack}){
  const ci=CATEGORIES.indexOf(cat);
  const accent=ACCENT[ci]||"#6366F1";
  const tabs=[{key:"words",icon:"👁",label:"Xem từ"},{key:"learn",icon:"📖",label:"Học"},{key:"play",icon:"🎮",label:"Chơi"}];
  const words=getWords(sub.id);
  const hasWords=words.length>0;

  const EmptyState=()=>(
    <div style={{padding:"50px 20px",textAlign:"center"}}>
      <div style={{fontSize:44,marginBottom:12,opacity:0.6}}>📝</div>
      <p style={{color:"#475569",fontWeight:700,fontSize:15,marginBottom:4}}>Nội dung đang được cập nhật</p>
      <p style={{color:"#334155",fontSize:13}}>12 từ vựng sẽ sớm được bổ sung cho chủ đề này</p>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"#0F1322",borderBottom:"1px solid #1E2640"}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#64748B",fontWeight:700}}>←</button>
        <span style={{fontSize:15,fontWeight:800,color:"#F1F5F9"}}>{sub.icon} {sub.title}</span>
        <div style={{width:28}}/>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:8,padding:"12px 16px",background:"#0F1322",borderBottom:"1px solid #1E2640"}}>
        {tabs.map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)} style={{padding:"8px 18px",borderRadius:20,fontSize:13,fontWeight:700,border:"2px solid",cursor:"pointer",transition:"all 0.15s",background:tab===t.key?accent:"transparent",color:tab===t.key?"#fff":"#64748B",borderColor:tab===t.key?accent:"#1E2640"}}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {tab==="words"&&(hasWords?<WordListTab words={words} accent={accent}/>:<EmptyState/>)}
      {tab==="learn"&&(hasWords?<LearnTab words={words} accent={accent} title={sub.title}/>:<EmptyState/>)}
      {tab==="play"&&(hasWords?<PlayTab words={words} accent={accent}/>:<EmptyState/>)}
    </div>
  );
}

/* ═══════════════  XEM TỪ  ═══════════════ */
function WordListTab({words,accent}){
  return (
    <div style={{padding:"14px 14px 28px"}}>
      <h3 style={{fontSize:14,fontWeight:800,color:"#94A3B8",margin:"0 0 12px"}}>Thuật ngữ trong học phần này ({words.length})</h3>
      {words.map((w,i)=>(
        <div key={w.id} style={{background:"#151A2D",borderRadius:16,padding:"18px 18px 16px",marginBottom:12,border:"1px solid #1E2640",animation:`fadeUp 0.3s ease ${i*0.03}s both`}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{fontSize:20,fontWeight:900,color:"#F1F5F9"}}>{w.word}</span>
                <button onClick={()=>speak(w.word)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:"#64748B"}}>🔊</button>
                <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:8,background:`${accent}20`,color:accent}}>{w.pos}</span>
              </div>
              <div style={{fontSize:12,color:"#4B5563",marginTop:3}}>UK: {w.ipa_uk} | US: {w.ipa_us}</div>
            </div>
            <span style={{fontSize:16,fontWeight:800,color:accent,whiteSpace:"nowrap",marginTop:3}}>{w.vi}</span>
          </div>
          <div style={{height:1,background:"#1E2640",margin:"12px 0"}}/>
          <div style={{marginBottom:12}}>
            <p style={{fontSize:13,color:"#CBD5E1",margin:0,lineHeight:1.55}}><span style={{fontWeight:700,color:"#64748B",fontSize:12}}>VD: </span>{w.example}</p>
            <p style={{fontSize:12,color:"#4B5563",margin:"3px 0 0"}}>({w.exampleVi})</p>
          </div>
          <div style={{marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:700,color:"#64748B",marginBottom:5,display:"block"}}>📖 Cụm từ</span>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{w.collocations.map((c,j)=><span key={j} style={{fontSize:11,padding:"4px 10px",borderRadius:14,background:`${accent}15`,color:accent,fontWeight:600}}>{c}</span>)}</div>
          </div>
          <div>
            <span style={{fontSize:12,color:"#4B5563",marginBottom:5,display:"block"}}>≈ Đồng nghĩa</span>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{w.synonyms.map((s,j)=><span key={j} style={{fontSize:11,padding:"4px 10px",borderRadius:14,background:"#064E3B33",color:"#34D399",fontWeight:600}}>{s}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════  HỌC  ═══════════════ */
function LearnTab({words,accent,title}){
  const total=words.length;
  const [idx,setIdx]=useState(0);
  const [order]=useState(()=>shuffle(words.map((_,i)=>i)));
  const [mode,setMode]=useState("flashcard");
  const [flipped,setFlipped]=useState(false);
  const [qAns,setQAns]=useState(null);
  const [qOpts,setQOpts]=useState([]);
  const [typV,setTypV]=useState("");
  const [typR,setTypR]=useState(null);
  const [hint,setHint]=useState(false);
  const [pronR,setPronR]=useState(null);
  const [lis,setLis]=useState(false);
  const [learned,setLearned]=useState({});
  const [done,setDone]=useState(false);
  const inRef=useRef(null);
  const w=words[order[idx]];

  useEffect(()=>{if(mode==="quiz"&&w){setQOpts(shuffle([w.vi,...(w.distractors||[])]));setQAns(null);}},[mode,idx]);
  useEffect(()=>{if(mode==="typing"&&inRef.current)inRef.current.focus();},[mode]);

  function rst(){setFlipped(false);setQAns(null);setTypV("");setTypR(null);setHint(false);setPronR(null);}
  function nxt(){if(idx<total-1){setIdx(idx+1);setMode("flashcard");rst();}else setDone(true);}
  function adv(){if(mode==="flashcard")setMode("quiz");else if(mode==="quiz"){setMode("typing");setTypV("");setTypR(null);setHint(false);}else if(mode==="typing"){setMode("pronunciation");setPronR(null);}else if(mode==="pronunciation")setMode("sr");}
  function chk(){setTypR(typV.toLowerCase().trim()===w.word.toLowerCase().trim()?"correct":"wrong");}
  function sr(l){setLearned(p=>({...p,[w.id]:l}));setTimeout(nxt,400);}
  function mic(){
    const S=window.SpeechRecognition||window.webkitSpeechRecognition;if(!S){setPronR({text:"Không hỗ trợ",score:0});return;}
    const r=new S();r.lang="en-US";r.continuous=false;r.interimResults=false;
    r.onstart=()=>setLis(true);r.onend=()=>setLis(false);
    r.onresult=e=>{const t=e.results[0][0].transcript.toLowerCase().trim();const tgt=w.word.toLowerCase();const cf=e.results[0][0].confidence;let s=0;if(t===tgt)s=100;else if(t.includes(tgt)||tgt.includes(t))s=70;else{const l=Math.max(t.length,tgt.length);let m=0;for(let i=0;i<Math.min(t.length,tgt.length);i++)if(t[i]===tgt[i])m++;s=Math.round((m/l)*100);}s=Math.min(100,Math.round(s*(0.5+cf*0.5)));setPronR({text:t,score:s});};
    r.onerror=()=>{setLis(false);setPronR({text:"Không nhận diện được",score:0});};r.start();
  }

  if(done)return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:56,marginBottom:10}}>🎉</div><h2 style={{fontSize:22,fontWeight:800,color:"#F1F5F9",marginBottom:6}}>Hoàn thành!</h2><p style={{color:"#64748B",marginBottom:20}}>Đã học xong {total} từ</p><button style={{...PB,background:accent}} onClick={()=>{setIdx(0);setDone(false);setMode("flashcard");rst();setLearned({});}}>Học lại</button></div>);

  const mi=["flashcard","quiz","typing","pronunciation","sr"].indexOf(mode);const lc=Object.keys(learned).length;
  return (
    <div style={{padding:"0 0 16px"}}>
      <div style={{height:4,background:"#1E2640",margin:"0 14px 10px"}}><div style={{height:"100%",background:accent,borderRadius:2,width:`${(idx/total)*100}%`,transition:"width 0.4s"}}/></div>
      <div style={{display:"flex",justifyContent:"center",gap:5,padding:"0 8px 10px",flexWrap:"wrap"}}>
        {[{k:"flashcard",l:"📇 Flashcard"},{k:"quiz",l:"📝 Trắc nghiệm"},{k:"typing",l:"⌨️ Gõ từ"},{k:"pronunciation",l:"🎙️ Phát âm"}].map((m,i)=>(
          <span key={m.k} style={{fontSize:11,padding:"4px 10px",borderRadius:14,fontWeight:700,border:"1.5px solid",background:mode===m.k||(mode==="sr"&&m.k==="pronunciation")?accent:"transparent",color:mode===m.k||(mode==="sr"&&m.k==="pronunciation")?"#fff":"#475569",borderColor:mode===m.k||(mode==="sr"&&m.k==="pronunciation")?accent:"#1E2640",opacity:i<=mi?1:0.3}}>{m.l}</span>
        ))}
      </div>
      <div style={{padding:"0 14px"}}>
        {mode==="flashcard"&&(<><div style={CD} onClick={()=>setFlipped(!flipped)}>{!flipped?(<><span style={{...CH,background:`${accent}20`,color:accent}}>{w.pos}</span><h2 style={{fontSize:32,fontWeight:900,color:"#F1F5F9",margin:"8px 0"}}>{w.word}</h2><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}><button onClick={e=>{e.stopPropagation();speak(w.word)}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>🔊</button><span style={{fontSize:14,color:"#4B5563"}}>{w.ipa_us}</span></div><p style={{color:"#334155",fontStyle:"italic",fontSize:13}}>Nhấn để xem nghĩa</p></>):(<><h2 style={{fontSize:28,fontWeight:900,color:"#F1F5F9",margin:"0 0 12px"}}>{w.vi}</h2><div style={EB}><p style={{fontSize:13,color:"#CBD5E1",fontStyle:"italic",margin:0,lineHeight:1.5}}>"{w.example}"</p><p style={{fontSize:12,color:"#4B5563",margin:"3px 0 0"}}>({w.exampleVi})</p></div><div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:8}}>{w.collocations.map((x,i)=><span key={i} style={{fontSize:11,padding:"3px 9px",borderRadius:12,background:`${accent}15`,color:accent,fontWeight:600}}>{x}</span>)}</div><div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:5}}><span style={{fontSize:11,color:"#4B5563"}}>≈</span>{w.synonyms.map((x,i)=><span key={i} style={{fontSize:11,padding:"3px 9px",borderRadius:12,background:"#064E3B33",color:"#34D399",fontWeight:500}}>{x}</span>)}</div></>)}</div>{flipped&&<div style={{display:"flex",gap:10,marginTop:12}}><button style={{...PB,background:"#064E3B",border:"2px solid #065F46",boxShadow:"none"}} onClick={()=>setFlipped(false)}>☑ Đã thuộc</button><button style={{...PB,background:accent}} onClick={adv}>Học tiếp →</button></div>}</>)}
        {mode==="quiz"&&(<><div style={CD}><span style={{...CH,background:`${accent}20`,color:accent}}>{w.pos}</span><h2 style={{fontSize:30,fontWeight:900,color:"#F1F5F9",margin:"8px 0"}}>{w.word}</h2><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}><button onClick={()=>speak(w.word)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}}>🔊</button><span style={{fontSize:14,color:"#4B5563"}}>{w.ipa_us}</span></div><div style={{display:"flex",flexDirection:"column",gap:7}}>{qOpts.map((o,i)=>{let s={display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"#0B0F1A",border:"2px solid #1E2640",borderRadius:14,cursor:"pointer",fontSize:14,fontWeight:600,color:"#CBD5E1",textAlign:"left",transition:"all 0.12s"};if(qAns!==null){if(o===w.vi)s={...s,background:"#064E3B44",borderColor:"#22C55E",color:"#4ADE80"};else if(o===qAns)s={...s,background:"#7F1D1D44",borderColor:"#EF4444",color:"#FCA5A5",animation:"wrong 0.3s"};}return<button key={i} style={s} onClick={()=>{if(!qAns)setQAns(o)}}><span style={{width:24,height:24,borderRadius:"50%",background:`${accent}20`,color:accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</span>{o}</button>})}</div></div>{qAns&&<button style={{...PB,background:accent,marginTop:12}} onClick={adv}>Tiếp tục →</button>}</>)}
        {mode==="typing"&&(<><div style={CD}><span style={{...CH,background:`${accent}20`,color:accent}}>{w.pos}</span><h2 style={{fontSize:26,fontWeight:900,color:"#F1F5F9",margin:"8px 0 14px"}}>{w.vi}</h2><input ref={inRef} style={{width:"100%",padding:"13px 14px",fontSize:17,fontWeight:600,border:`2.5px solid ${typR==="correct"?"#22C55E":typR==="wrong"?"#EF4444":accent}`,borderRadius:14,outline:"none",textAlign:"center",background:typR==="correct"?"#064E3B33":typR==="wrong"?"#7F1D1D33":"#0B0F1A",color:"#F1F5F9",boxSizing:"border-box"}} placeholder="Gõ từ tiếng Anh..." value={typV} onChange={e=>setTypV(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!typR)chk()}} disabled={!!typR}/><div style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}><button onClick={()=>setHint(true)} style={{width:42,height:42,borderRadius:"50%",border:"2px solid #1E2640",background:"#0B0F1A",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>💡</button><button style={{...PB,background:accent,flex:1}} onClick={chk} disabled={!!typR}>Kiểm tra</button></div>{hint&&!typR&&<p style={{color:"#F59E0B",fontSize:13,marginTop:8,fontWeight:600}}>Gợi ý: {w.word.slice(0,Math.ceil(w.word.length/3))}...</p>}{typR==="wrong"&&<p style={{color:"#FCA5A5",marginTop:8,fontSize:14}}>Đáp án: <strong>{w.word}</strong></p>}</div>{typR&&<button style={{...PB,background:accent,marginTop:12}} onClick={adv}>Tiếp tục →</button>}</>)}
        {mode==="pronunciation"&&(<><div style={CD}><p style={{fontSize:11,fontWeight:700,color:"#475569",letterSpacing:1.5,textTransform:"uppercase"}}>PHÁT ÂM TỪ NÀY</p><h2 style={{fontSize:26,fontWeight:900,color:"#F1F5F9",margin:"4px 0"}}>{w.vi}</h2><p style={{fontSize:17,color:"#64748B",marginBottom:18}}>{w.word}</p><button onClick={mic} style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${accent},#06B6D4)`,border:"none",fontSize:28,cursor:"pointer",color:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${accent}40`,animation:lis?"listening 1.2s infinite":"none"}}>🎙️</button><p style={{color:"#475569",fontSize:13,marginTop:8}}>{lis?"Đang nghe...":"Nhấn để nói"}</p>{pronR&&(<div style={{marginTop:16,padding:12,background:"#0B0F1A",borderRadius:12}}><p style={{fontSize:13,color:"#CBD5E1",margin:"0 0 8px"}}>Bạn nói: "{pronR.text}"</p><div style={{height:8,background:"#1E2640",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,width:`${pronR.score}%`,background:pronR.score>=70?"#22C55E":pronR.score>=40?"#F59E0B":"#EF4444",transition:"width 0.5s"}}/></div><p style={{fontSize:20,fontWeight:800,color:"#F1F5F9",marginTop:8}}>{pronR.score}%</p></div>)}</div><div style={{display:"flex",gap:10,marginTop:12}}><button style={{flex:0.6,padding:"11px",fontSize:13,fontWeight:600,color:"#475569",background:"#151A2D",border:"1.5px solid #1E2640",borderRadius:14,cursor:"pointer",textAlign:"center"}} onClick={adv}>⏭ Bỏ qua</button>{pronR&&<button style={{...PB,background:accent,flex:1}} onClick={adv}>Tiếp tục →</button>}</div></>)}
        {mode==="sr"&&(<><div style={CD}><h2 style={{fontSize:26,fontWeight:900,color:"#F1F5F9",margin:"0 0 12px"}}>{w.vi}</h2><div style={EB}><p style={{fontSize:13,color:"#CBD5E1",fontStyle:"italic",margin:0,lineHeight:1.5}}>"{w.example}"</p><p style={{fontSize:12,color:"#4B5563",margin:"3px 0 0"}}>({w.exampleVi})</p></div><div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginBottom:8}}>{w.collocations.map((x,i)=><span key={i} style={{fontSize:11,padding:"3px 9px",borderRadius:12,background:`${accent}15`,color:accent,fontWeight:600}}>{x}</span>)}</div><p style={{color:"#475569",fontSize:12,marginTop:10,fontStyle:"italic"}}>Bạn nhớ từ này ở mức nào?</p></div><div style={{display:"flex",gap:7,marginTop:12}}>{SR_LEVELS.map((l,i)=>(<button key={i} onClick={()=>sr(i)} style={{flex:1,padding:"13px 4px",border:"none",borderRadius:14,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:l.color,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}><span style={{fontWeight:700,color:"#fff",fontSize:12}}>{l.label}</span><span style={{color:"rgba(255,255,255,0.75)",fontSize:11}}>{l.sub}</span></button>))}</div></>)}
      </div>
      <div style={{textAlign:"center",padding:"12px 0",fontSize:13}}><span style={{color:accent,fontWeight:700}}>{total-lc}</span><span style={{color:"#475569"}}> Từ mới  </span><span style={{color:"#4ADE80",fontWeight:700,marginLeft:10}}>{lc}</span><span style={{color:"#475569"}}> Đã học  </span><span style={{color:"#475569",marginLeft:10}}>{idx+1}/{total}</span></div>
    </div>
  );
}

/* ═══════════════  CHƠI — Word Match  ═══════════════ */
function PlayTab({words,accent}){
  const [st,setSt]=useState("idle");
  const [cards,setCards]=useState([]);
  const [sel,setSel]=useState(null);
  const [matched,setMatched]=useState(new Set());
  const [wp,setWp]=useState(null);
  const [score,setScore]=useState(0);
  const [timer,setTimer]=useState(0);
  const [pairs,setPairs]=useState(0);
  const ref=useRef(null);

  function go(){
    const sub=shuffle(words).slice(0,6);setPairs(sub.length);
    setCards(shuffle([...sub.map(w=>({id:`en-${w.id}`,wid:w.id,text:w.word,lang:"en"})),...sub.map(w=>({id:`vi-${w.id}`,wid:w.id,text:w.vi,lang:"vi"}))]));
    setSel(null);setMatched(new Set());setWp(null);setScore(0);setTimer(0);setSt("playing");
    ref.current=setInterval(()=>setTimer(t=>t+1),1000);
  }
  function end(){clearInterval(ref.current);setSt("finished");}
  useEffect(()=>{if(matched.size>0&&matched.size===pairs)end();},[matched,pairs]);
  useEffect(()=>()=>clearInterval(ref.current),[]);

  function pick(c){
    if(matched.has(c.wid)||wp)return;
    if(!sel){setSel(c);return;}if(sel.id===c.id){setSel(null);return;}
    if(sel.wid===c.wid&&sel.lang!==c.lang){setMatched(p=>{const s=new Set(p);s.add(c.wid);return s;});setScore(s=>s+10);setSel(null);}
    else{setWp([sel.id,c.id]);setTimeout(()=>{setWp(null);setSel(null);},600);}
  }
  const fmt=s=>`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

  if(st==="idle")return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:56,marginBottom:12}}>🎯</div><h3 style={{fontSize:20,fontWeight:800,color:"#F1F5F9",marginBottom:6}}>Word Match</h3><p style={{color:"#64748B",marginBottom:22,lineHeight:1.6}}>Nối từ tiếng Anh với nghĩa tiếng Việt.<br/>Nhanh và chính xác!</p><button style={{...PB,background:accent}} onClick={go}>Bắt đầu chơi</button></div>);
  if(st==="finished")return(<div style={{padding:40,textAlign:"center"}}><div style={{fontSize:56,marginBottom:10}}>🏆</div><h3 style={{fontSize:22,fontWeight:800,color:"#F1F5F9",marginBottom:6}}>Xuất sắc!</h3><p style={{color:"#64748B",marginBottom:4}}>Hoàn thành trong <strong style={{color:"#F1F5F9"}}>{fmt(timer)}</strong></p><p style={{color:accent,fontSize:26,fontWeight:800,marginBottom:22}}>⚡ {score} pts</p><button style={{...PB,background:accent}} onClick={go}>Chơi lại</button></div>);

  return (
    <div style={{padding:"14px 14px 24px"}}>
      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:14}}>
        <span style={{padding:"5px 12px",borderRadius:16,fontSize:12,fontWeight:700,background:"#F59E0B22",color:"#FBBF24"}}>✨ {matched.size}/{pairs}</span>
        <span style={{padding:"5px 12px",borderRadius:16,fontSize:12,fontWeight:700,background:`${accent}22`,color:accent}}>⚡ {score} pts</span>
        <span style={{padding:"5px 12px",borderRadius:16,fontSize:12,fontWeight:700,background:"#1E293B",color:"#64748B"}}>⏱ {fmt(timer)}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:9}}>
        {cards.map(cd=>{
          const m=matched.has(cd.wid);const s=sel&&sel.id===cd.id;const wr=wp&&wp.includes(cd.id);const en=cd.lang==="en";
          let bg=en?accent:`${accent}20`;let cl=en?"#fff":accent;let bd="2.5px solid transparent";
          if(m){bg="#1E2640";cl="#334155";bd="2.5px solid #1E2640";}
          else if(s){bd=`2.5px solid ${accent}`;bg=en?accent:`${accent}10`;}
          else if(wr){bg="#7F1D1D44";cl="#FCA5A5";bd="2.5px solid #EF4444";}
          return(<button key={cd.id} disabled={m} onClick={()=>!m&&pick(cd)} style={{padding:"15px 8px",borderRadius:14,border:bd,background:bg,color:cl,fontSize:en?13:12,fontWeight:en?700:600,cursor:m?"default":"pointer",opacity:m?0.35:1,transform:m?"scale(0.95)":"scale(1)",transition:"all 0.15s",textAlign:"center",minHeight:52,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1.3,animation:wr?"wrong 0.3s":"none",boxShadow:m?"none":"0 1px 4px rgba(0,0,0,0.15)"}}>{cd.text}</button>);
        })}
      </div>
    </div>
  );
}

/* Shared styles */
const PB={padding:"13px 22px",fontSize:14,fontWeight:700,color:"#fff",border:"none",borderRadius:14,cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.2)",flex:1,textAlign:"center"};
const CD={background:"#151A2D",borderRadius:20,padding:"26px 20px",boxShadow:"0 2px 16px rgba(0,0,0,0.15)",textAlign:"center",position:"relative",cursor:"pointer",minHeight:180,border:"1px solid #1E2640"};
const CH={fontSize:11,padding:"3px 9px",borderRadius:10,fontWeight:700,display:"inline-block",marginBottom:6};
const EB={background:"#0B0F1A",borderRadius:12,padding:12,marginBottom:12,textAlign:"left"};
