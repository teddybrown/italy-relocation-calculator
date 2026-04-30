import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CITIES = {
  Milan:    { rent1br:1400,rent2br:1900,rent3br:2600,buy1br:280000,buy2br:420000,buy3br:650000,groceries:{single:300,couple:500,family:750},dining:{single:250,couple:450,family:600},transport:39,healthPublic:150,healthPrivate:180,childcare:700,school:600,visaFee:116,residencyFee:200,carInsurance:1200,carFuel:180,carMaintenance:100,taxRate:0.38,zone:"North" },
  Rome:     { rent1br:1100,rent2br:1500,rent3br:2100,buy1br:220000,buy2br:350000,buy3br:550000,groceries:{single:280,couple:470,family:700},dining:{single:220,couple:400,family:550},transport:35,healthPublic:150,healthPrivate:160,childcare:600,school:550,visaFee:116,residencyFee:200,carInsurance:1400,carFuel:170,carMaintenance:100,taxRate:0.36,zone:"Centre" },
  Florence: { rent1br:1000,rent2br:1400,rent3br:1900,buy1br:200000,buy2br:320000,buy3br:490000,groceries:{single:270,couple:450,family:680},dining:{single:210,couple:380,family:520},transport:32,healthPublic:150,healthPrivate:155,childcare:550,school:500,visaFee:116,residencyFee:200,carInsurance:1000,carFuel:160,carMaintenance:90,taxRate:0.35,zone:"Centre" },
  Bologna:  { rent1br:850,rent2br:1200,rent3br:1600,buy1br:170000,buy2br:270000,buy3br:400000,groceries:{single:260,couple:430,family:650},dining:{single:200,couple:360,family:490},transport:30,healthPublic:150,healthPrivate:150,childcare:500,school:480,visaFee:116,residencyFee:200,carInsurance:950,carFuel:155,carMaintenance:90,taxRate:0.34,zone:"North" },
  Turin:    { rent1br:800,rent2br:1100,rent3br:1500,buy1br:150000,buy2br:240000,buy3br:360000,groceries:{single:250,couple:420,family:630},dining:{single:190,couple:340,family:460},transport:28,healthPublic:150,healthPrivate:145,childcare:480,school:460,visaFee:116,residencyFee:200,carInsurance:900,carFuel:150,carMaintenance:85,taxRate:0.33,zone:"North" },
  Naples:   { rent1br:650,rent2br:900,rent3br:1200,buy1br:120000,buy2br:190000,buy3br:290000,groceries:{single:230,couple:390,family:580},dining:{single:160,couple:290,family:400},transport:22,healthPublic:150,healthPrivate:130,childcare:400,school:400,visaFee:116,residencyFee:200,carInsurance:1600,carFuel:145,carMaintenance:80,taxRate:0.32,zone:"South" },
  Venice:   { rent1br:1200,rent2br:1700,rent3br:2300,buy1br:250000,buy2br:390000,buy3br:600000,groceries:{single:310,couple:510,family:770},dining:{single:260,couple:470,family:630},transport:45,healthPublic:150,healthPrivate:170,childcare:620,school:570,visaFee:116,residencyFee:200,carInsurance:0,carFuel:0,carMaintenance:0,taxRate:0.36,zone:"North" },
  Palermo:  { rent1br:550,rent2br:750,rent3br:1000,buy1br:90000,buy2br:150000,buy3br:230000,groceries:{single:210,couple:360,family:540},dining:{single:140,couple:260,family:360},transport:20,healthPublic:150,healthPrivate:120,childcare:350,school:350,visaFee:116,residencyFee:200,carInsurance:1800,carFuel:140,carMaintenance:75,taxRate:0.30,zone:"South" },
};

const CITY_ZONES = { center: { rent1br:2200,rent2br:3200,rent3br:4500 }, outskirts: { rent1br:900,rent2br:1300,rent3br:1800 } };
const ZONE_MULTIPLIER = { Milan:{ center:1.6,outskirts:0.65 }, Rome:{ center:1.5,outskirts:0.7 }, Florence:{ center:1.45,outskirts:0.72 }, Bologna:{ center:1.35,outskirts:0.75 }, Turin:{ center:1.3,outskirts:0.78 }, Naples:{ center:1.4,outskirts:0.72 }, Venice:{ center:1.5,outskirts:0.8 }, Palermo:{ center:1.3,outskirts:0.8 } };

const VISA_TYPES = ["EU Citizen (free)","Elective Residency Visa","Digital Nomad Visa","Employment Visa"];
const VISA_COSTS = { "EU Citizen (free)":0,"Elective Residency Visa":400,"Digital Nomad Visa":700,"Employment Visa":600 };

const HIDDEN_COSTS = [
  { id:"registro", label:"Imposta di Registro", desc:"Lease registration tax — 2% of annual rent, paid once when signing a standard contract. Mandatory for contracts > 30 days.", amount: null, amountFn:(rent)=>Math.round(rent*12*0.02), tag:"Lease" },
  { id:"condominio", label:"Condominium Fees (Spese Condominiali)", desc:"Monthly building maintenance fees for shared spaces. Typically €50–€200/month depending on building size and amenities.", amount:"€50–200/mo", amountFn:null, tag:"Ongoing" },
  { id:"utility_setup", label:"Utility Connection Fees", desc:"Activating electricity (Enel), gas (ENI/Italgas), and internet typically costs €100–€300 in setup fees.", amount:"€100–300", amountFn:null, tag:"One-time" },
  { id:"codice_fiscale", label:"Codice Fiscale", desc:"Italy's tax code — needed for everything. Free to get at the local Agenzia delle Entrate or Italian consulate abroad.", amount:"Free", amountFn:null, tag:"Admin" },
  { id:"residenza", label:"Residenza Registration", desc:"You must register at your comune within 20 days of moving in. Required to access public services, healthcare, and tax residency.", amount:"Free", amountFn:null, tag:"Admin" },
  { id:"agenzia", label:"Agency Fee (Provvigione)", desc:"Standard real estate agency commission is 1 month's rent from both tenant and landlord. Some private landlords (privato) skip this.", amount:"1 month rent", amountFn:(rent)=>rent, tag:"Lease" },
  { id:"cedolare", label:"Cedolare Secca vs Standard Contract", desc:"Cedolare Secca is a flat 21% tax regime landlords can choose — it often means lower rent but less flexibility. Ask your landlord upfront which regime applies.", amount:"Info only", amountFn:null, tag:"Lease" },
  { id:"deposito", label:"Security Deposit (Deposito Cauzionale)", desc:"Typically 2–3 months' rent, held by the landlord. Legally capped at 3 months for standard contracts. Returned at end of tenancy if no damage.", amount:"2–3 months rent", amountFn:(rent)=>rent*3, tag:"Lease" },
  { id:"trasloco", label:"Moving Company (Trasloco)", desc:"Local Italian moves cost €500–€1,500. International shipping containers run €3,000–€8,000+ depending on origin.", amount:"€500–8,000+", amountFn:null, tag:"One-time" },
  { id:"permesso", label:"Permesso di Soggiorno", desc:"Non-EU citizens must apply within 8 days of arrival. Costs €70–€200 depending on type. Processed through the Post Office (Sportello Amico).", amount:"€70–200", amountFn:null, tag:"Admin" },
];

const PIE_COLORS = ["#C1440E","#E07B54","#F4A57A","#D4845A","#8B2500","#F0C4A8","#A03010","#FDDCC4"];
const CITY_COLORS = ["#C1440E","#E07B54","#8B2500","#D4845A","#F4A57A","#A03010"];
const fmt = (n) => `€${Math.round(n).toLocaleString("en-IT")}`;
const fmtMonths = (m) => m >= 12 ? `${(m/12).toFixed(1)} yrs` : `${Math.round(m)} mo`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function calcCity(cityName, profKey, brKey, housing, hasCar, privateHealth, hasChildren, numChildren, cityZone="standard") {
  const d = CITIES[cityName];
  let baseRent = housing === "Rent" ? d[`rent${brKey}`] : Math.round((d[`buy${brKey}`] * 0.035) / 12);
  if (cityZone !== "standard") {
    const mult = ZONE_MULTIPLIER[cityName]?.[cityZone] ?? 1;
    baseRent = Math.round(baseRent * mult);
  }
  const rentCost = baseRent;
  const groceryCost = d.groceries[profKey];
  const diningCost = d.dining[profKey];
  const transportCost = (hasCar && cityName !== "Venice") ? (d.carInsurance/12 + d.carFuel + d.carMaintenance) : d.transport;
  const healthCost = privateHealth ? d.healthPrivate * (profKey==="family"?3:profKey==="couple"?2:1) : d.healthPublic;
  const childrenMonthly = hasChildren ? d.childcare * numChildren : 0;
  const utilitiesCost = brKey==="1br"?120:brKey==="2br"?160:220;
  const miscCost = profKey==="single"?150:profKey==="couple"?250:350;
  const monthlyTotal = rentCost+groceryCost+diningCost+transportCost+healthCost+childrenMonthly+utilitiesCost+30+miscCost;
  return { monthlyTotal,rentCost,groceryCost,diningCost,transportCost,healthCost,childrenMonthly,utilitiesCost,miscCost };
}

// ─── UI COMPONENTS ───────────────────────────────────────────────────────────
function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width:46,height:26,borderRadius:13,background:on?"#C1440E":"#E8DDD5",position:"relative",cursor:"pointer",transition:"background 0.25s",flexShrink:0,boxShadow:on?"0 0 0 3px #F4CDB8":"none" }}>
      <div style={{ width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?23:3,transition:"left 0.25s",boxShadow:"0 1px 4px rgba(0,0,0,0.18)" }} />
    </div>
  );
}

function Chip({ label, active, onClick, small, color }) {
  const ac = color || "#C1440E";
  return (
    <button onClick={onClick} style={{
      padding:small?"6px 14px":"8px 18px", borderRadius:100,
      border:active?`2px solid ${ac}`:"2px solid #E8DDD5",
      background:active?ac:"#fff", color:active?"#fff":"#7A5A4A",
      fontFamily:"'Lora',Georgia,serif", fontSize:small?13:14, cursor:"pointer",
      transition:"all 0.18s", fontWeight:active?600:400, whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) return (
    <div style={{ background:"#fff",border:"1px solid #E8DDD5",padding:"8px 14px",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
      <p style={{ color:"#C1440E",fontFamily:"Lora,Georgia,serif",fontSize:13,marginBottom:2 }}>{payload[0].payload?.name||payload[0].name}</p>
      <p style={{ color:"#3A2010",fontSize:14,fontWeight:600 }}>{fmt(payload[0].value)}</p>
    </div>
  );
  return null;
};

function AffordabilityVerdict({ disposable, monthlyTotal, profile, city, savings, monthlyNet }) {
  const ratio = disposable / monthlyNet;
  const runwayMonths = savings > 0 ? savings / monthlyTotal : 0;
  let verdict, color, bg, icon, message;
  if (ratio > 0.3) { verdict="Comfortably Affordable"; color="#1A6B2A"; bg="#F0FBF2"; icon="✅"; message=`On your salary, living in ${city} as a ${profile.toLowerCase()} leaves you ${fmt(disposable)}/month — a healthy cushion of ${Math.round(ratio*100)}% of your net income.`; }
  else if (ratio > 0.1) { verdict="Tight but Manageable"; color="#B87000"; bg="#FFFBF0"; icon="⚠️"; message=`You'll get by in ${city}, but it'll be snug. ${fmt(disposable)}/month left over is ${Math.round(ratio*100)}% of your net — any unexpected expense will hurt.`; }
  else if (ratio > 0) { verdict="Very Tight — Caution"; color="#C15000"; bg="#FFF8F4"; icon="🔶"; message=`Only ${fmt(disposable)}/month disposable (${Math.round(ratio*100)}% of net). ${city} on this salary leaves almost no room for savings or emergencies.`; }
  else { verdict="Not Affordable on This Salary"; color="#C1440E"; bg="#FFF4F0"; icon="❌"; message=`Your living costs in ${city} exceed your net income by ${fmt(Math.abs(disposable))}/month. Consider a higher salary, lower costs, or a cheaper city.`; }
  return (
    <div style={{ background:bg,border:`2px solid ${color}22`,borderRadius:16,padding:28,marginBottom:24 }}>
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
        <span style={{ fontSize:28 }}>{icon}</span>
        <div>
          <p style={{ fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color,fontWeight:600,fontFamily:"Lora,Georgia,serif",marginBottom:3 }}>Affordability Verdict</p>
          <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.35rem",fontWeight:900,color }}>{verdict}</p>
        </div>
      </div>
      <p style={{ color:"#5A3A2A",fontSize:15,lineHeight:1.7,marginBottom:savings>0?16:0 }}>{message}</p>
      {savings > 0 && (
        <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginTop:8 }}>
          <div style={{ background:"#fff",borderRadius:10,padding:"12px 16px",border:`1px solid ${color}22`,flex:1,minWidth:130 }}>
            <p style={{ fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600,marginBottom:4 }}>Savings Runway</p>
            <p style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:900,color }}>{fmtMonths(runwayMonths)}</p>
            <p style={{ fontSize:12,color:"#9A6A54",marginTop:2 }}>before savings run out</p>
          </div>
          <div style={{ background:"#fff",borderRadius:10,padding:"12px 16px",border:`1px solid ${color}22`,flex:1,minWidth:130 }}>
            <p style={{ fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600,marginBottom:4 }}>Monthly Surplus</p>
            <p style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:900,color:disposable>0?"#1A6B2A":"#C1440E" }}>{fmt(disposable)}</p>
            <p style={{ fontSize:12,color:"#9A6A54",marginTop:2 }}>after all monthly costs</p>
          </div>
        </div>
      )}
    </div>
  );
}

function CityRanker({ profKey, brKey, housing, hasCar, privateHealth, hasChildren, numChildren, grossSalary, targetSavingsRate }) {
  const ranked = Object.entries(CITIES).map(([c, d]) => {
    const calc = calcCity(c,profKey,brKey,housing,hasCar,privateHealth,hasChildren,numChildren);
    const net = grossSalary*(1-d.taxRate)/12;
    const disp = net - calc.monthlyTotal;
    const ratio = disp / net;
    let status, color;
    if (ratio > 0.3) { status="Comfortable"; color="#1A6B2A"; }
    else if (ratio > 0.1) { status="Manageable"; color="#B87000"; }
    else if (ratio > 0) { status="Tight"; color="#C15000"; }
    else { status="Not affordable"; color="#C1440E"; }
    return { city:c, monthlyTotal:calc.monthlyTotal, net, disp, ratio, status, color, taxRate:d.taxRate };
  }).sort((a,b) => b.ratio - a.ratio);

  return (
    <div>
      <p style={{ fontSize:14,color:"#9A6A54",marginBottom:20,lineHeight:1.6,fontStyle:"italic" }}>
        All 8 cities ranked by how much of your net income remains after costs, from most to least affordable.
      </p>
      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
        {ranked.map((r, i) => (
          <div key={r.city} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:i===0?"#F0FBF2":"#fff",borderRadius:12,border:`1px solid ${i===0?"#A8D8B0":"#F0E6DE"}` }}>
            <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:900,color:"#D4B090",width:28,textAlign:"center",flexShrink:0 }}>#{i+1}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:"#3A2010" }}>{r.city}</span>
                <span style={{ fontSize:11,padding:"2px 10px",borderRadius:100,background:`${r.color}18`,color:r.color,fontWeight:600,fontFamily:"Lora" }}>{r.status}</span>
              </div>
              <div style={{ height:6,background:"#F0E6DE",borderRadius:3,overflow:"hidden" }}>
                <div style={{ height:"100%",background:r.color,borderRadius:3,width:`${Math.max(0,Math.min(100,r.ratio*200))}%`,transition:"width 0.5s" }} />
              </div>
            </div>
            <div style={{ textAlign:"right",flexShrink:0 }}>
              <p style={{ fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:r.disp>0?"#1A6B2A":"#C1440E" }}>{fmt(r.disp)}/mo</p>
              <p style={{ fontSize:11,color:"#B07858" }}>disposable</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MinSalaryCalc({ profKey, brKey, housing, hasCar, privateHealth, hasChildren, numChildren, city, cityZone }) {
  const [targetRate, setTargetRate] = useState(20);
  const d = CITIES[city];
  const calc = calcCity(city,profKey,brKey,housing,hasCar,privateHealth,hasChildren,numChildren,cityZone);
  // net = gross * (1 - taxRate); need net = monthly * (1 + targetRate/100) * 12
  const neededNet = calc.monthlyTotal * 12 * (1 + targetRate/100);
  const neededGross = neededNet / (1 - d.taxRate);
  const comfortable = neededGross * 1.3;

  return (
    <div>
      <p style={{ fontSize:14,color:"#9A6A54",marginBottom:20,lineHeight:1.6 }}>
        Based on your selections in <strong>{city}</strong>, here's the gross salary you need to hit your savings target.
      </p>
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <p style={{ fontSize:15,color:"#3A2010" }}>Target monthly savings rate</p>
          <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:900,color:"#C1440E" }}>{targetRate}%</span>
        </div>
        <input type="range" min="0" max="50" step="5" value={targetRate} onChange={e=>setTargetRate(+e.target.value)} style={{ width:"100%" }} />
        <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
          <span style={{ fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600 }}>Just break even</span>
          <span style={{ fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600 }}>50% savings</span>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20 }}>
        {[
          { label:`Minimum Salary (${targetRate}% savings)`, value:fmt(neededGross), sub:"Gross annual needed", color:"#C1440E", big:true },
          { label:"Monthly Living Costs", value:fmt(calc.monthlyTotal), sub:"Your current selections", color:"#3A2010" },
          { label:"Net Monthly Needed", value:fmt(neededNet/12), sub:`To cover costs + ${targetRate}% saved`, color:"#5A7A5A" },
          { label:"Effective Tax Rate", value:`${Math.round(d.taxRate*100)}%`, sub:`In ${city}`, color:"#3A2010" },
        ].map(s => (
          <div key={s.label} style={{ background:"#FFF8F4",borderRadius:12,padding:"16px",border:"1px solid #F4CDB8",textAlign:"center" }}>
            <p style={{ fontFamily:"'Playfair Display',serif",fontSize:s.big?"1.6rem":"1.2rem",fontWeight:900,color:s.color,marginBottom:4 }}>{s.value}</p>
            <p style={{ fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600,marginBottom:3 }}>{s.label}</p>
            <p style={{ fontSize:12,color:"#9A6A54" }}>{s.sub}</p>
          </div>
        ))}
      </div>
      <div style={{ background:"#F0FBF2",borderRadius:12,padding:"14px 18px",border:"1px solid #A8D8B0" }}>
        <p style={{ fontSize:14,color:"#1A6B2A",lineHeight:1.7 }}>
          💡 <strong>Rule of thumb:</strong> For a comfortable life in {city} with 20% savings, aim for at least <strong>{fmt(comfortable)}/year</strong> gross.
        </p>
      </div>
    </div>
  );
}

function HiddenCostsChecklist({ rentCost }) {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const tagColors = { Lease:"#C1440E", Ongoing:"#B87000", "One-time":"#1A6B2A", Admin:"#4A5A9A" };
  const totalKnown = HIDDEN_COSTS.filter(c => c.amountFn && checked[c.id]).reduce((s,c) => s + c.amountFn(rentCost), 0);

  return (
    <div>
      <p style={{ fontSize:14,color:"#9A6A54",marginBottom:8,lineHeight:1.6,fontStyle:"italic" }}>
        Costs that catch first-time renters in Italy by surprise. Check the ones that apply to you.
      </p>
      {totalKnown > 0 && (
        <div style={{ background:"#FFF4F0",borderRadius:10,padding:"12px 16px",border:"1px solid #F4CDB8",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <span style={{ fontSize:14,color:"#C1440E",fontWeight:600 }}>Checked items total (calculable)</span>
          <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:900,color:"#C1440E" }}>{fmt(totalKnown)}</span>
        </div>
      )}
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {HIDDEN_COSTS.map(cost => (
          <div key={cost.id} onClick={() => toggle(cost.id)} style={{ display:"flex",gap:14,padding:"14px 16px",background:checked[cost.id]?"#FFF4F0":"#fff",borderRadius:12,border:`1px solid ${checked[cost.id]?"#F4CDB8":"#F0E6DE"}`,cursor:"pointer",transition:"all 0.15s" }}>
            <div style={{ width:22,height:22,borderRadius:6,border:`2px solid ${checked[cost.id]?"#C1440E":"#E8DDD5"}`,background:checked[cost.id]?"#C1440E":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,transition:"all 0.15s" }}>
              {checked[cost.id] && <span style={{ color:"#fff",fontSize:13,fontWeight:700 }}>✓</span>}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"0.95rem",fontWeight:700,color:"#3A2010" }}>{cost.label}</span>
                <span style={{ fontSize:10,padding:"2px 8px",borderRadius:100,background:`${tagColors[cost.tag]}18`,color:tagColors[cost.tag],fontWeight:600,fontFamily:"Lora" }}>{cost.tag}</span>
              </div>
              <p style={{ fontSize:13,color:"#7A5A4A",lineHeight:1.6 }}>{cost.desc}</p>
            </div>
            <div style={{ flexShrink:0,textAlign:"right" }}>
              <span style={{ fontSize:13,fontWeight:700,color:"#C1440E",fontFamily:"'Playfair Display',serif" }}>
                {cost.amountFn ? fmt(cost.amountFn(rentCost)) : cost.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CityComparisonTable({ profKey, brKey, housing, hasCar, privateHealth, hasChildren, numChildren, grossSalary, selectedCities }) {
  const rows = selectedCities.map(c => {
    const d = CITIES[c];
    const calc = calcCity(c,profKey,brKey,housing,hasCar,privateHealth,hasChildren,numChildren);
    const net = grossSalary*(1-d.taxRate)/12;
    const disp = net - calc.monthlyTotal;
    return { city:c,...calc,net,disp,taxRate:d.taxRate };
  });
  const cols = [
    { key:"city",label:"City" },
    { key:"rentCost",label:"Housing" },
    { key:"groceryCost",label:"Groceries" },
    { key:"diningCost",label:"Dining" },
    { key:"transportCost",label:"Transport" },
    { key:"monthlyTotal",label:"Total/mo",bold:true },
    { key:"net",label:"Net Income" },
    { key:"disp",label:"Disposable",color:true },
  ];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%",borderCollapse:"collapse",fontFamily:"Lora,Georgia,serif",fontSize:14 }}>
        <thead>
          <tr>{cols.map(col => <th key={col.key} style={{ padding:"10px 12px",textAlign:col.key==="city"?"left":"right",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"#B07858",fontWeight:600,borderBottom:"2px solid #F0E6DE",whiteSpace:"nowrap" }}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,i) => (
            <tr key={row.city} style={{ background:i%2===0?"#fff":"#FFF8F4" }}>
              {cols.map(col => {
                const val = row[col.key];
                let color = "#3A2010";
                if (col.color) color = val>0?"#1A6B2A":"#C1440E";
                if (col.bold) color = "#C1440E";
                return <td key={col.key} style={{ padding:"12px",textAlign:col.key==="city"?"left":"right",color,fontWeight:col.bold||col.color?700:400,borderBottom:"1px solid #F8F0EC",whiteSpace:"nowrap" }}>
                  {col.key==="city"?<span style={{ fontFamily:"'Playfair Display',serif",fontWeight:700 }}>{val}</span>:fmt(val)}
                </td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [city, setCity] = useState("Rome");
  const [profile, setProfile] = useState("Single");
  const [housing, setHousing] = useState("Rent");
  const [bedrooms, setBedrooms] = useState("1 Bedroom");
  const [cityZone, setCityZone] = useState("standard");
  const [hasChildren, setHasChildren] = useState(false);
  const [numChildren, setNumChildren] = useState(1);
  const [hasCar, setHasCar] = useState(false);
  const [visaType, setVisaType] = useState("EU Citizen (free)");
  const [privateHealth, setPrivateHealth] = useState(false);
  const [grossSalary, setGrossSalary] = useState(60000);
  const [partnerWorks, setPartnerWorks] = useState(false);
  const [partnerSalary, setPartnerSalary] = useState(40000);
  const [savings, setSavings] = useState(20000);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [compareCities, setCompareCities] = useState(["Milan","Rome","Bologna"]);
  const [shareMsg, setShareMsg] = useState("");
  const resultsRef = useRef(null);

  // URL share / restore
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get("city")) setCity(p.get("city"));
      if (p.get("profile")) setProfile(p.get("profile"));
      if (p.get("housing")) setHousing(p.get("housing"));
      if (p.get("bedrooms")) setBedrooms(p.get("bedrooms"));
      if (p.get("zone")) setCityZone(p.get("zone"));
      if (p.get("salary")) setGrossSalary(+p.get("salary"));
      if (p.get("partnerworks")) setPartnerWorks(p.get("partnerworks")==="1");
      if (p.get("partnersalary")) setPartnerSalary(+p.get("partnersalary"));
      if (p.get("savings")) setSavings(+p.get("savings"));
      if (p.get("visa")) setVisaType(p.get("visa"));
      if (p.get("car")) setHasCar(p.get("car")==="1");
      if (p.get("health")) setPrivateHealth(p.get("health")==="1");
      if (p.get("children")) setHasChildren(p.get("children")==="1");
      if (p.get("nchildren")) setNumChildren(+p.get("nchildren"));
      if (p.get("show")==="1") { setShowResults(true); }
    } catch(e) {}
  }, []);

  const shareURL = () => {
    const p = new URLSearchParams({ city,profile,housing,bedrooms,zone:cityZone,salary:grossSalary,partnerworks:partnerWorks?1:0,partnersalary:partnerSalary,savings,visa:visaType,car:hasCar?1:0,health:privateHealth?1:0,children:hasChildren?1:0,nchildren:numChildren,show:1 });
    const url = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
    navigator.clipboard.writeText(url).then(() => { setShareMsg("Link copied! ✓"); setTimeout(()=>setShareMsg(""),3000); });
  };

  const d = CITIES[city];
  const profKey = profile==="Single"?"single":profile==="Couple"?"couple":"family";
  const brKey = bedrooms==="1 Bedroom"?"1br":bedrooms==="2 Bedrooms"?"2br":"3br";

  const calc = calcCity(city,profKey,brKey,housing,hasCar,privateHealth,hasChildren,numChildren,cityZone);
  const { monthlyTotal,rentCost,groceryCost,diningCost,transportCost,healthCost,childrenMonthly,utilitiesCost,miscCost } = calc;
  const annualTotal = monthlyTotal*12;

  const depositCost = rentCost*3;
  const agencyFee = housing==="Rent"?rentCost:0;
  const movingCost = 3500;
  const visaCost = VISA_COSTS[visaType];
  const furnishings = brKey==="1br"?3000:brKey==="2br"?5000:8000;
  const buyingCosts = housing==="Buy"?Math.round(d[`buy${brKey}`]*0.09):0;
  const oneTimeTotal = depositCost+agencyFee+movingCost+visaCost+d.residencyFee+furnishings+buyingCosts;

  const isMultiPerson = profile === "Couple" || profile === "Family";
  const partnerNetSalary = (isMultiPerson && partnerWorks) ? partnerSalary * (1 - d.taxRate) : 0;
  const netSalary = grossSalary*(1-d.taxRate) + partnerNetSalary;
  const monthlyNet = netSalary/12;
  const disposable = monthlyNet-monthlyTotal;

  const monthlyBreakdown = [
    { name:"Housing",value:rentCost },
    { name:"Groceries",value:groceryCost },
    { name:"Dining Out",value:diningCost },
    { name:"Transport",value:transportCost },
    { name:"Healthcare",value:healthCost },
    { name:"Children",value:childrenMonthly },
    { name:"Utilities & Internet",value:utilitiesCost+30 },
    { name:"Misc & Personal",value:miscCost },
  ].filter(i=>i.value>0);

  const oneTimeBreakdown = [
    { name:"Deposit",value:depositCost },
    { name:"Agency Fee",value:agencyFee },
    { name:"Moving & Shipping",value:movingCost },
    { name:"Visa & Admin",value:visaCost+d.residencyFee },
    { name:"Furnishings",value:furnishings },
    { name:"Property Costs",value:buyingCosts },
  ].filter(i=>i.value>0);

  const projectionData = Array.from({length:61},(_,mo) => {
    const salaryGrowth = Math.pow(1.03,mo/12);
    const costGrowth = Math.pow(1.025,mo/12);
    const monthlySaved = (netSalary/12)*salaryGrowth - monthlyTotal*costGrowth;
    return { month:mo,savings:Math.round(savings+monthlySaved*mo),label:mo%12===0?`Yr ${mo/12}`:null };
  }).filter(p=>p.month%6===0);

  const toggleCompareCity = (c) => setCompareCities(prev=>prev.includes(c)?(prev.length>1?prev.filter(x=>x!==c):prev):[...prev,c]);

  const calculate = () => { setShowResults(true); setActiveTab("overview"); setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100); };

  const S = {
    page:{ minHeight:"100vh",background:"#FBF7F4",fontFamily:"'Lora',Georgia,serif",color:"#3A2010" },
    container:{ maxWidth:900,margin:"0 auto",padding:"0 20px" },
    label:{ fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:"#B07858",fontFamily:"'Lora',Georgia,serif",fontWeight:600 },
    card:{ background:"#fff",borderRadius:16,border:"1px solid #F0E6DE",padding:28,boxShadow:"0 2px 16px rgba(193,68,14,0.04)" },
    sectionTitle:{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.05rem",fontWeight:700,color:"#3A2010",marginBottom:16 },
  };

  const tabs = [
    { id:"overview",label:"Overview" },
    { id:"breakdown",label:"Cost Breakdown" },
    { id:"compare",label:"City Comparison" },
    { id:"ranker",label:"What Can I Afford?" },
    { id:"minsalary",label:"Min. Salary" },
    { id:"hidden",label:"Hidden Costs" },
    { id:"projection",label:"5-Year Projection" },
  ];

  return (
    <div style={S.page}>
      <Helmet>
        <title>{showResults
          ? `Cost of Living in ${city} 2025 — ${profile} · ${bedrooms} | Italy Relocation Calculator`
          : "Italy Relocation Cost Calculator 2025 — Expat Living Costs, Taxes & Visa Guide"
        }</title>
        <meta name="description" content={showResults
          ? `Monthly living cost in ${city} for a ${profile.toLowerCase()}: ${fmt(monthlyTotal)}/month. One-time relocation cost: ${fmt(oneTimeTotal)}. Calculate your full Italy relocation budget.`
          : "Calculate the real cost of moving to Italy in 2025. Monthly expenses, taxes, savings runway and affordability for Milan, Rome, Florence, Bologna, Turin, Naples, Venice and Palermo."
        } />
        <meta property="og:title" content={showResults
          ? `Cost of Living in ${city} 2025 — ${profile} | Italy Relocation Calculator`
          : "Italy Relocation Cost Calculator 2025 — What Does It Really Cost to Move to Italy?"
        } />
        <meta property="og:description" content={showResults
          ? `${profile} living in ${city}: ${fmt(monthlyTotal)}/month, ${fmt(oneTimeTotal)} to relocate. See the full breakdown.`
          : "The most complete free tool for expats planning a move to Italy. 8 cities, all costs covered."
        } />
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        input[type=range] { -webkit-appearance:none; width:100%; height:4px; background:#F0E6DE; border-radius:2px; outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; background:#C1440E; border-radius:50%; cursor:pointer; box-shadow:0 0 0 4px #F4CDB8; }
        .result-row:last-child { border-bottom:none !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation:fadeUp 0.5s ease forwards; }
        .tab-btn { background:transparent; border:none; cursor:pointer; font-family:'Lora',Georgia,serif; font-size:13px; padding:10px 16px; color:#9A6A54; border-bottom:2px solid transparent; transition:all 0.18s; white-space:nowrap; }
        .tab-btn.active { color:#C1440E; border-bottom-color:#C1440E; font-weight:600; }
        .tab-btn:hover { color:#C1440E; }
      `}</style>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#FFF8F4 0%,#FEF0E6 50%,#FDDCCC 100%)",borderBottom:"1px solid #F0E0D4",paddingBottom:56 }}>
        <div style={{ ...S.container,paddingTop:64,textAlign:"center" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:28,flexWrap:"wrap" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid #F4CDB8",borderRadius:100,padding:"6px 18px" }}>
              <span style={{ fontSize:16 }}>🇮🇹</span>
              <span style={{ ...S.label,fontSize:10 }}>Expat Relocation Guide · Italy 2025</span>
            </div>
            <Link to="/cities" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"#C1440E",color:"white",borderRadius:100,padding:"6px 18px",fontSize:11,fontWeight:600,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase" }}>
              🗺️ City Guides
            </Link>
            <Link to="/salary" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"white",color:"#C1440E",border:"1px solid #F4CDB8",borderRadius:100,padding:"6px 18px",fontSize:11,fontWeight:600,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase" }}>
              💶 Salary Calculator
            </Link>
            <Link to="/visa" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"white",color:"#C1440E",border:"1px solid #F4CDB8",borderRadius:100,padding:"6px 18px",fontSize:11,fontWeight:600,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase" }}>
              🛂 Visa Guide
            </Link>
            <Link to="/guide" style={{ display:"inline-flex",alignItems:"center",gap:6,background:"white",color:"#C1440E",border:"1px solid #F4CDB8",borderRadius:100,padding:"6px 18px",fontSize:11,fontWeight:600,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase" }}>
              📚 Expat Guides
            </Link>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2.2rem,6vw,4rem)",fontWeight:900,lineHeight:1.08,color:"#2A1008",marginBottom:18 }}>
            What Does It <em style={{ color:"#C1440E" }}>Really</em> Cost<br />to Move to Italy?
          </h1>
          <p style={{ color:"#9A6A54",fontSize:"1.1rem",maxWidth:520,margin:"0 auto",lineHeight:1.7,fontStyle:"italic" }}>
            Monthly costs, one-time expenses, taxes, savings runway, impatriate tax breaks, hidden costs, and your real affordability verdict.
          </p>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:36 }}>
            <div style={{ width:48,height:1,background:"#F4CDB8" }} />
            <span style={{ color:"#C1440E",fontSize:18 }}>✦</span>
            <div style={{ width:48,height:1,background:"#F4CDB8" }} />
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ ...S.container,paddingTop:52,paddingBottom:60 }}>

        {/* City */}
        <div style={{ marginBottom:32 }}>
          <p style={{ ...S.label,marginBottom:16,textAlign:"center" }}>Choose Your City</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center" }}>
            {Object.keys(CITIES).map(c=><Chip key={c} label={c} active={city===c} onClick={()=>setCity(c)} />)}
          </div>
        </div>

        {/* Zone */}
        <div style={{ marginBottom:36,textAlign:"center" }}>
          <p style={{ ...S.label,marginBottom:12 }}>Neighbourhood Zone</p>
          <div style={{ display:"inline-flex",gap:8,background:"#fff",border:"1px solid #F0E6DE",borderRadius:100,padding:4 }}>
            {[["outskirts","🏘️ Outskirts"],["standard","🏙️ Standard"],["center","🏛️ City Centre"]].map(([val,lbl])=>(
              <button key={val} onClick={()=>setCityZone(val)} style={{ padding:"8px 18px",borderRadius:100,border:"none",background:cityZone===val?"#C1440E":"transparent",color:cityZone===val?"#fff":"#7A5A4A",fontFamily:"Lora,Georgia,serif",fontSize:13,cursor:"pointer",transition:"all 0.18s",fontWeight:cityZone===val?600:400 }}>{lbl}</button>
            ))}
          </div>
          <p style={{ fontSize:12,color:"#B07858",marginTop:8,fontStyle:"italic" }}>Affects housing costs — city centre can be 50% more expensive than outskirts</p>
        </div>

        {/* Profile + Situation */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
          <div style={S.card}>
            <p style={S.sectionTitle}>Household</p>
            <p style={{ ...S.label,marginBottom:12 }}>Profile</p>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:20 }}>
              {["Single","Couple","Family"].map(p=><Chip key={p} label={p} active={profile===p} onClick={()=>setProfile(p)} />)}
            </div>
            <p style={{ ...S.label,marginBottom:12 }}>Housing</p>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:20 }}>
              {["Rent","Buy"].map(h=><Chip key={h} label={h} active={housing===h} onClick={()=>setHousing(h)} />)}
            </div>
            <p style={{ ...S.label,marginBottom:12 }}>Bedrooms</p>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {["1 Bedroom","2 Bedrooms","3 Bedrooms"].map(b=><Chip key={b} label={b} active={bedrooms===b} onClick={()=>setBedrooms(b)} />)}
            </div>
          </div>
          <div style={S.card}>
            <p style={S.sectionTitle}>Your Situation</p>
            {[
              { label:"Own a Car",sub:city==="Venice"?"Not applicable in Venice":"Insurance, fuel & maintenance",val:hasCar&&city!=="Venice",fn:()=>city!=="Venice"&&setHasCar(!hasCar) },
              { label:"Private Health Insurance",sub:"Top-up coverage beyond SSN",val:privateHealth,fn:()=>setPrivateHealth(!privateHealth) },
              { label:"Children",sub:"Childcare & schooling costs",val:hasChildren,fn:()=>setHasChildren(!hasChildren) },
            ].map(row=>(
              <div key={row.label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #F8F0EC" }}>
                <div>
                  <p style={{ fontSize:15,color:"#3A2010",marginBottom:2 }}>{row.label}</p>
                  <p style={{ fontSize:12,color:"#B07858" }}>{row.sub}</p>
                </div>
                <Toggle on={row.val} onClick={row.fn} />
              </div>
            ))}
            {hasChildren && (
              <div style={{ paddingTop:16 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                  <p style={S.label}>Number of children</p>
                  <span style={{ fontSize:18,fontWeight:700,color:"#C1440E",fontFamily:"'Playfair Display',serif" }}>{numChildren}</span>
                </div>
                <input type="range" min="1" max="4" value={numChildren} onChange={e=>setNumChildren(+e.target.value)} />
              </div>
            )}
          </div>
        </div>

        {/* Visa + Salary + Savings */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
          <div style={S.card}>
            <p style={S.sectionTitle}>Visa Type</p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {VISA_TYPES.map(v=>(
                <button key={v} onClick={()=>setVisaType(v)} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:10,border:visaType===v?"2px solid #C1440E":"2px solid #F0E6DE",background:visaType===v?"#FFF4F0":"#fff",cursor:"pointer",transition:"all 0.15s" }}>
                  <span style={{ fontFamily:"Lora,Georgia,serif",fontSize:14,color:visaType===v?"#C1440E":"#5A3A2A",fontWeight:visaType===v?600:400 }}>{v}</span>
                  {VISA_COSTS[v]>0?<span style={{ fontSize:13,color:"#B07858" }}>€{VISA_COSTS[v]}</span>:<span style={{ fontSize:12,color:"#5A9A50",fontWeight:600 }}>FREE</span>}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div style={S.card}>
              <p style={S.sectionTitle}>Annual Gross Salary</p>
              <div style={{ textAlign:"center",margin:"10px 0 18px" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"2.2rem",fontWeight:900,color:"#C1440E" }}>{fmt(grossSalary)}</span>
              </div>
              <input type="range" min="20000" max="200000" step="2000" value={grossSalary} onChange={e=>setGrossSalary(+e.target.value)} />
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
                <span style={{ ...S.label,fontSize:10 }}>€20k</span><span style={{ ...S.label,fontSize:10 }}>€200k</span>
              </div>
            </div>

            {/* Partner salary — only for Couple / Family */}
            {isMultiPerson && (
              <div style={S.card}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom: partnerWorks ? 16 : 0 }}>
                  <div>
                    <p style={S.sectionTitle} >Partner's Income</p>
                    <p style={{ fontSize:12,color:"#B07858",marginTop:-10,marginBottom: partnerWorks ? 0 : 4 }}>Does your partner also work?</p>
                  </div>
                  <Toggle on={partnerWorks} onClick={()=>setPartnerWorks(!partnerWorks)} />
                </div>
                {partnerWorks && (
                  <>
                    <div style={{ textAlign:"center",margin:"4px 0 16px" }}>
                      <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"2rem",fontWeight:900,color:"#7A5A9A" }}>{fmt(partnerSalary)}</span>
                      <p style={{ ...S.label,fontSize:10,marginTop:4 }}>partner gross / year</p>
                    </div>
                    <input type="range" min="10000" max="200000" step="2000" value={partnerSalary} onChange={e=>setPartnerSalary(+e.target.value)} />
                    <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
                      <span style={{ ...S.label,fontSize:10 }}>€10k</span>
                      <span style={{ ...S.label,fontSize:10 }}>€200k</span>
                    </div>
                    <div style={{ marginTop:14,padding:"10px 14px",background:"#F8F4FF",borderRadius:10,border:"1px solid #D8C8F0" }}>
                      <div style={{ display:"flex",justifyContent:"space-between" }}>
                        <span style={{ fontSize:13,color:"#7A5A9A" }}>Combined household net</span>
                        <span style={{ fontSize:14,fontWeight:700,color:"#5A3A8A" }}>{fmt(netSalary)}/yr</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div style={S.card}>
              <p style={S.sectionTitle}>Current Savings</p>
              <div style={{ textAlign:"center",margin:"6px 0 14px" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.9rem",fontWeight:900,color:"#5A7A5A" }}>{fmt(savings)}</span>
              </div>
              <input type="range" min="0" max="200000" step="1000" value={savings} onChange={e=>setSavings(+e.target.value)} />
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
                <span style={{ ...S.label,fontSize:10 }}>€0</span><span style={{ ...S.label,fontSize:10 }}>€200k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compare cities */}
        <div style={{ ...S.card,marginBottom:40 }}>
          <p style={S.sectionTitle}>Cities to Compare <span style={{ fontSize:12,color:"#B07858",fontWeight:400 }}>(used in the comparison tab)</span></p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {Object.keys(CITIES).map(c=><Chip key={c} label={c} small active={compareCities.includes(c)} onClick={()=>toggleCompareCity(c)} />)}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center" }}>
          <button onClick={calculate} style={{ background:"#C1440E",color:"#fff",border:"none",padding:"18px 64px",borderRadius:100,fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.1rem",fontWeight:700,cursor:"pointer",boxShadow:"0 8px 32px rgba(193,68,14,0.28)",letterSpacing:"0.04em",transition:"all 0.2s" }}
            onMouseEnter={e=>{e.target.style.background="#A83308";e.target.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.target.style.background="#C1440E";e.target.style.transform="translateY(0)";}}>
            Calculate My Costs →
          </button>
        </div>
      </div>

      {/* ── RESULTS ─────────────────────────────────────────────────────────── */}
      {showResults && (
        <div ref={resultsRef} style={{ background:"#FFF8F4",borderTop:"2px solid #F4CDB8",paddingTop:52,paddingBottom:80 }}>
          <div style={S.container}>

            {/* Header + Share */}
            <div style={{ textAlign:"center",marginBottom:28 }} className="fade-up">
              <p style={{ ...S.label,marginBottom:8 }}>Your Results for</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.6rem,4vw,2.6rem)",fontWeight:900,color:"#2A1008" }}>
                {city} · {profile} · {bedrooms}{cityZone!=="standard"?` · ${cityZone==="center"?"City Centre":"Outskirts"}`:""}
              </h2>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:14,marginBottom:20 }}>
                <div style={{ width:40,height:1,background:"#F4CDB8" }} />
                <span style={{ color:"#C1440E" }}>✦</span>
                <div style={{ width:40,height:1,background:"#F4CDB8" }} />
              </div>
              <button onClick={shareURL} style={{ background:"#fff",border:"1px solid #F4CDB8",color:"#C1440E",padding:"8px 22px",borderRadius:100,fontFamily:"Lora,Georgia,serif",fontSize:13,cursor:"pointer",fontWeight:600,transition:"all 0.15s" }}>
                {shareMsg || "🔗 Copy Share Link"}
              </button>
            </div>

            {/* Affordability Verdict */}
            <AffordabilityVerdict disposable={disposable} monthlyTotal={monthlyTotal} profile={profile} city={city} savings={savings} monthlyNet={monthlyNet} />

            {/* Key stats */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:32 }}>
              {[
                { label:"Monthly Living Cost",value:fmt(monthlyTotal),icon:"📅" },
                { label:"Annual Living Cost",value:fmt(annualTotal),icon:"📆" },
                { label:"One-Time Move Cost",value:fmt(oneTimeTotal),icon:"✈️" },
                { label:"Monthly Net Salary",value:fmt(monthlyNet),icon:"💶" },
                { label:"Monthly Disposable",value:fmt(disposable),icon:disposable>0?"✅":"⚠️",hl:disposable>0?"green":"red" },
                { label:"Savings Runway",value:savings>0?fmtMonths(savings/monthlyTotal):"—",icon:"⏳" },
              ].map(s=>(
                <div key={s.label} style={{ ...S.card,textAlign:"center",padding:"18px 12px" }}>
                  <div style={{ fontSize:20,marginBottom:6 }}>{s.icon}</div>
                  <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.5rem",fontWeight:900,color:s.hl==="green"?"#1A6B2A":s.hl==="red"?"#C1440E":"#C1440E",marginBottom:3 }}>{s.value}</div>
                  <div style={{ ...S.label,fontSize:10 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom:"2px solid #F0E6DE",marginBottom:28,display:"flex",gap:0,overflowX:"auto" }}>
              {tabs.map(t=><button key={t.id} className={`tab-btn ${activeTab===t.id?"active":""}`} onClick={()=>setActiveTab(t.id)}>{t.label}</button>)}
            </div>

            {/* ── TAB: OVERVIEW ── */}
            {activeTab==="overview" && (
              <div className="fade-up">
                <div style={S.card}>
                  <p style={S.sectionTitle}>Income & Affordability</p>
                  {[
                    { label:"Your Gross Salary", value:fmt(grossSalary), sub:"Before Italian taxes", color:"#3A2010" },
                    ...(isMultiPerson && partnerWorks ? [
                      { label:"Partner's Gross Salary", value:fmt(partnerSalary), sub:"Before Italian taxes", color:"#3A2010" },
                      { label:`Combined Tax (~${Math.round(d.taxRate*100)}%)`, value:`−${fmt((grossSalary+partnerSalary)*d.taxRate)}`, sub:`Effective rate for ${city}`, color:"#C1440E" },
                      { label:"Combined Net Income", value:fmt(netSalary), sub:"Household take-home", color:"#3A2010" },
                    ] : [
                      { label:`Tax + Social Security (~${Math.round(d.taxRate*100)}%)`, value:`−${fmt(grossSalary*d.taxRate)}`, sub:`Rate for ${city}`, color:"#C1440E" },
                      { label:"Net Annual Income", value:fmt(netSalary), sub:"Take-home pay", color:"#3A2010" },
                    ]),
                    { label:"Annual Living Costs", value:`−${fmt(annualTotal)}`, sub:"Based on your selections", color:"#C1440E" },
                    { label:"Annual Disposable Income", value:fmt(netSalary-annualTotal), sub:"After all expenses", color:netSalary-annualTotal>0?"#1A6B2A":"#C1440E", big:true },
                  ].map((row,i)=>(
                    <div key={i} className="result-row" style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 0",borderBottom:"1px solid #F8F0EC" }}>
                      <div>
                        <p style={{ fontSize:row.big?16:15,fontWeight:row.big?700:400,color:"#3A2010" }}>{row.label}</p>
                        <p style={{ fontSize:12,color:"#B07858",marginTop:2 }}>{row.sub}</p>
                      </div>
                      <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:row.big?"1.4rem":"1.05rem",fontWeight:700,color:row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB: BREAKDOWN ── */}
            {activeTab==="breakdown" && (
              <div className="fade-up">
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
                  <div style={S.card}>
                    <p style={S.sectionTitle}>Monthly Costs</p>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={monthlyBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={40}>
                          {monthlyBreakdown.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display:"flex",flexDirection:"column",gap:7,marginTop:8 }}>
                      {monthlyBreakdown.map((item,i)=>(
                        <div key={item.name} style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ width:10,height:10,borderRadius:3,background:PIE_COLORS[i%PIE_COLORS.length],flexShrink:0 }} />
                            <span style={{ fontSize:13,color:"#7A5A4A" }}>{item.name}</span>
                          </div>
                          <span style={{ fontSize:13,fontWeight:600,color:"#3A2010" }}>{fmt(item.value)}</span>
                        </div>
                      ))}
                      <div style={{ borderTop:"1px solid #F0E6DE",marginTop:6,paddingTop:8,display:"flex",justifyContent:"space-between" }}>
                        <span style={{ fontSize:14,fontWeight:700 }}>Total / month</span>
                        <span style={{ fontSize:14,fontWeight:700,color:"#C1440E" }}>{fmt(monthlyTotal)}</span>
                      </div>
                    </div>
                  </div>
                  <div style={S.card}>
                    <p style={S.sectionTitle}>One-Time Costs</p>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={oneTimeBreakdown} margin={{ left:0,right:0,top:4 }}>
                        <XAxis dataKey="name" tick={{ fill:"#B07858",fontSize:10,fontFamily:"Lora,Georgia,serif" }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#C1440E" radius={[6,6,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div style={{ display:"flex",flexDirection:"column",gap:6,marginTop:8 }}>
                      {oneTimeBreakdown.map(item=>(
                        <div key={item.name} style={{ display:"flex",justifyContent:"space-between",borderBottom:"1px solid #F8F0EC",paddingBottom:5 }}>
                          <span style={{ fontSize:13,color:"#7A5A4A" }}>{item.name}</span>
                          <span style={{ fontSize:13,fontWeight:600,color:"#3A2010" }}>{fmt(item.value)}</span>
                        </div>
                      ))}
                      <div style={{ display:"flex",justifyContent:"space-between",paddingTop:4 }}>
                        <span style={{ fontSize:14,fontWeight:700 }}>Total to move</span>
                        <span style={{ fontSize:14,fontWeight:700,color:"#C1440E" }}>{fmt(oneTimeTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: COMPARE ── */}
            {activeTab==="compare" && (
              <div className="fade-up">
                <div style={{ ...S.card,marginBottom:16 }}>
                  <p style={S.sectionTitle}>Side-by-Side Comparison <span style={{ fontSize:12,color:"#B07858",fontWeight:400 }}>· {profile} · {bedrooms} · {housing}</span></p>
                  <CityComparisonTable profKey={profKey} brKey={brKey} housing={housing} hasCar={hasCar} privateHealth={privateHealth} hasChildren={hasChildren} numChildren={numChildren} grossSalary={grossSalary} selectedCities={compareCities} />
                </div>
                <div style={S.card}>
                  <p style={S.sectionTitle}>Visual Comparison</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={compareCities.map(c=>({ city:c,monthly:calcCity(c,profKey,brKey,housing,hasCar,privateHealth,hasChildren,numChildren).monthlyTotal }))} margin={{ left:0,right:0 }}>
                      <XAxis dataKey="city" tick={{ fill:"#B07858",fontSize:13,fontFamily:"Lora,Georgia,serif" }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip content={({ active,payload })=>active&&payload?.length?(<div style={{ background:"#fff",border:"1px solid #F4CDB8",padding:"8px 14px",borderRadius:8 }}><p style={{ color:"#C1440E",fontSize:13 }}>{payload[0].payload.city}</p><p style={{ fontSize:14,fontWeight:600 }}>{fmt(payload[0].value)}/mo</p></div>):null} />
                      <Bar dataKey="monthly" radius={[6,6,0,0]}>
                        {compareCities.map((c,i)=><Cell key={c} fill={c===city?"#C1440E":CITY_COLORS[i%CITY_COLORS.length]+"99"} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ── TAB: RANKER ── */}
            {activeTab==="ranker" && (
              <div className="fade-up">
                <div style={S.card}>
                  <p style={S.sectionTitle}>What City Can I Afford? <span style={{ fontSize:12,color:"#B07858",fontWeight:400 }}>· {fmt(grossSalary)}/yr gross · {profile} · {bedrooms}</span></p>
                  <CityRanker profKey={profKey} brKey={brKey} housing={housing} hasCar={hasCar} privateHealth={privateHealth} hasChildren={hasChildren} numChildren={numChildren} grossSalary={grossSalary} />
                </div>
              </div>
            )}

            {/* ── TAB: MIN SALARY ── */}
            {activeTab==="minsalary" && (
              <div className="fade-up">
                <div style={S.card}>
                  <p style={S.sectionTitle}>Minimum Salary Calculator</p>
                  <MinSalaryCalc profKey={profKey} brKey={brKey} housing={housing} hasCar={hasCar} privateHealth={privateHealth} hasChildren={hasChildren} numChildren={numChildren} city={city} cityZone={cityZone} />
                </div>
              </div>
            )}

            {/* ── TAB: HIDDEN COSTS ── */}
            {activeTab==="hidden" && (
              <div className="fade-up">
                <div style={S.card}>
                  <p style={S.sectionTitle}>Hidden Costs Checklist</p>
                  <HiddenCostsChecklist rentCost={rentCost} />
                </div>
              </div>
            )}

            {/* ── TAB: PROJECTION ── */}
            {activeTab==="projection" && (
              <div className="fade-up">
                <div style={S.card}>
                  <p style={S.sectionTitle}>5-Year Savings Projection</p>
                  <p style={{ fontSize:14,color:"#9A6A54",marginBottom:20,lineHeight:1.6 }}>Assumes 3% annual salary growth, 2.5% cost inflation. Starting savings: {fmt(savings)}.</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={projectionData} margin={{ left:10,right:10 }}>
                      <CartesianGrid stroke="#F0E6DE" strokeDasharray="4 4" />
                      <XAxis dataKey="label" tick={{ fill:"#B07858",fontSize:12,fontFamily:"Lora" }} axisLine={false} tickLine={false} interval={0} />
                      <YAxis tick={{ fill:"#B07858",fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`€${(v/1000).toFixed(0)}k`} />
                      <Tooltip content={({ active,payload })=>active&&payload?.length?(<div style={{ background:"#fff",border:"1px solid #F4CDB8",padding:"8px 14px",borderRadius:8 }}><p style={{ fontSize:14,fontWeight:600,color:"#C1440E" }}>{fmt(payload[0].value)}</p><p style={{ fontSize:12,color:"#9A6A54" }}>accumulated savings</p></div>):null} />
                      <Line type="monotone" dataKey="savings" stroke="#C1440E" strokeWidth={2.5} dot={{ fill:"#C1440E",r:4 }} activeDot={{ r:6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20 }}>
                    {[1,3,5].map(yr=>{ const pt=projectionData.find(p=>p.label===`Yr ${yr}`); return pt?(<div key={yr} style={{ background:"#FFF8F4",borderRadius:10,padding:"14px 16px",border:"1px solid #F4CDB8",textAlign:"center" }}><p style={{ fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:"#B07858",fontFamily:"Lora",fontWeight:600,marginBottom:6 }}>Year {yr}</p><p style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.3rem",fontWeight:900,color:pt.savings>0?"#1A6B2A":"#C1440E" }}>{fmt(pt.savings)}</p></div>):null; })}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{ textAlign:"center",marginTop:48,paddingTop:32,borderTop:"1px solid #F0E6DE" }}>
              <p style={{ fontSize:13,color:"#C8A090",lineHeight:1.7,maxWidth:560,margin:"0 auto",fontStyle:"italic" }}>
                Estimates based on 2024–2025 market data. Actual costs vary by neighbourhood and lifestyle. The Impatriate Regime information is indicative — consult a qualified <em>commercialista</em> before making financial decisions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── FAQ SECTION ─────────────────────────────────────────────────────── */}
      <FAQSection />
    </div>
  );
}

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    category: "Moving & Bureaucracy", icon: "🏛️",
    items: [
      { q: "Do I need a visa to move to Italy?", a: "EU/EEA citizens can move freely and just need to register with the local comune within 90 days. Non-EU citizens need a visa — the most popular options are the Elective Residency Visa (for those with passive income), the Digital Nomad Visa (launched 2024, requires ~€28,000/year income), and the Employment Visa (requires a job offer). All non-EU arrivals must also apply for a Permesso di Soggiorno within 8 days of arriving." },
      { q: "What is a Codice Fiscale and do I need one?", a: "The Codice Fiscale is Italy's tax identification number — a 16-character alphanumeric code. You need it for absolutely everything: opening a bank account, signing a lease, registering with a doctor, buying a SIM card, or starting a job. It's free to get at the local Agenzia delle Entrate or at an Italian consulate before you move. Get it on day one." },
      { q: "How long does it take to get residency (residenza)?", a: "Once you've signed a lease and have a permanent address, you can register for residency (anagrafe) at your local comune. The application is straightforward and the comune is legally required to verify your address within 45 days. Residency unlocks public healthcare, driving licence conversion, and other services." },
      { q: "Can I use my foreign driving licence in Italy?", a: "EU driving licences are valid in Italy indefinitely. Non-EU licences are valid for 12 months after establishing residency, after which you must convert to an Italian licence. Some countries have reciprocity agreements with Italy (the UK post-Brexit does not), meaning you may need to retake the Italian driving test. Start the process early as it can take months." },
    ]
  },
  {
    category: "Housing & Renting", icon: "🏠",
    items: [
      { q: "What is the difference between Cedolare Secca and a standard rental contract?", a: "Italy has two main rental tax regimes. A standard contract means the landlord pays income tax on rent at their marginal rate and can raise rent annually by ISTAT inflation. Cedolare Secca is a flat 21% substitute tax that landlords can opt into — rent is often slightly cheaper, but increases are frozen. Ask your landlord which regime applies before signing, as it affects both price and your contract rights." },
      { q: "What does Imposta di Registro mean and who pays it?", a: "The Imposta di Registro is a lease registration tax — all rental contracts over 30 days must be registered with the Agenzia delle Entrate. For standard contracts, the tax is 2% of annual rent, split equally between landlord and tenant. For Cedolare Secca contracts, registration is free. Some landlords informally skip registration (affitto in nero) — this is illegal and leaves you with no legal protection as a tenant." },
      { q: "How much deposit can a landlord ask for?", a: "By law, the security deposit (deposito cauzionale) on a standard residential lease cannot exceed 3 months' rent. In practice, 2–3 months is typical. The deposit must be returned within a reasonable time after the lease ends (usually 30 days), minus legitimate deductions for damage. Always do a detailed move-in inventory with photos — Italian courts take these disputes seriously." },
      { q: "What are condominium fees (spese condominiali)?", a: "If you live in an apartment building, you'll pay monthly condominium fees covering shared expenses: cleaning, lift maintenance, building insurance, communal electricity, and the building administrator. Fees range from €50–€300/month depending on the building. Always ask for the most recent annual condominium budget (piano di spese) before signing — some buildings have large extraordinary expenses coming up." },
      { q: "Is it better to rent through an agency or a private landlord?", a: "Private landlords (affitti da privato) save you the agency fee — typically one month's rent from the tenant. However, agencies provide more legal protection, vetted contracts, and often handle maintenance. For a first move without local contacts, an agency gives peace of mind. Idealista.it, Immobiliare.it, and Subito.it list both options." },
    ]
  },
  {
    category: "Taxes & Finance", icon: "💶",
    items: [
      { q: "How does Italian income tax (IRPEF) work?", a: "Italy uses a progressive income tax system. 2025 rates: 23% up to €28,000; 35% from €28,001–€50,000; 43% above €50,000. On top of IRPEF, you pay regional and municipal surtaxes (typically 1–3% combined) plus social security contributions (around 9.19% for employees). The effective total rate for a €60,000 salary is roughly 36–40% depending on the city." },
      { q: "Do I need to declare foreign assets and income in Italy?", a: "Yes. Italian tax residents must declare all worldwide income and disclose foreign assets above €15,000 via the RW form (Monitoraggio Fiscale). This includes foreign bank accounts, investments, crypto, and real estate. Italy has information exchange agreements with most countries. A commercialista is strongly recommended for your first year — costs €500–€2,000 but can save far more." },
      { q: "How do I open an Italian bank account?", a: "You'll need: Codice Fiscale, passport or EU ID, proof of address (a lease agreement works), and for some banks, proof of income. Traditional banks (Unicredit, Intesa Sanpaolo) can be bureaucratic. Many expats use N26, Bunq, or Revolut as a bridge while setting up, then open a local account for rent and utilities. Note that Revolut is not considered a 'real' bank account for most lease contracts." },
    ]
  },
  {
    category: "Healthcare", icon: "🏥",
    items: [
      { q: "How does the Italian public healthcare system (SSN) work for expats?", a: "Italy's Servizio Sanitario Nazionale (SSN) provides universal healthcare. EU citizens and legal non-EU residents with a Permesso di Soggiorno are entitled to register after establishing residency. You choose a local GP (medico di base) as your primary care gatekeeper. GP visits are free; specialist referrals have a small co-pay (ticket) of €10–€50. Quality varies by region — Northern Italy generally has better facilities than the South." },
      { q: "Do I need private health insurance in Italy?", a: "Not mandatory once you have SSN access, but many expats carry supplemental private insurance for faster specialist access, private room hospitalisations, dental, and optical. Cost is €100–€250/month for an individual. For the Digital Nomad Visa and Elective Residency Visa, comprehensive private health coverage is a visa requirement until SSN registration is complete." },
    ]
  },
  {
    category: "Daily Life", icon: "☕",
    items: [
      { q: "Is Italy expensive compared to other Western European countries?", a: "Italy is mid-range. Milan is comparable to Barcelona or Amsterdam. Rome is slightly cheaper. Southern cities like Naples, Palermo, and Bari are among the most affordable in Western Europe for their quality of life. Food is excellent value — a sit-down trattoria lunch (menù del giorno) costs €10–€15. The main cost drivers are housing in major cities and private schooling if you have children." },
      { q: "How do Italian utility costs work?", a: "Italian electricity prices are among the highest in Europe due to reliance on imported energy. Expect €80–€150/month for a 1-bedroom flat depending on season. Gas heating in winter adds €100–€200/month. Internet is surprisingly cheap — fibre broadband runs €25–€35/month. Always check whether utilities are included in your rent (affitto con spese incluse) — common in furnished apartments." },
      { q: "What are the best apps and resources for expats moving to Italy?", a: "Housing: Idealista.it, Immobiliare.it, Subito.it. Bureaucracy help: CAF centres (free paperwork assistance). Community: Facebook groups 'Expats in [City]', Internations Italy chapters. Italian lessons: invest in a real tutor — A2 Italian makes daily life dramatically easier. Tax: find a bilingual commercialista through your embassy's list or expat forums. Transport: Trenitalia app and Google Maps work well in major cities." },
    ]
  },
];

// ─── FAQ COMPONENT ───────────────────────────────────────────────────────────
function FAQSection() {
  const [openItem, setOpenItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);
  const filteredFaqs = activeCategory ? FAQS.filter(f => f.category === activeCategory) : FAQS;

  return (
    <div style={{ background:"#fff", borderTop:"1px solid #F0E6DE", paddingTop:72, paddingBottom:80 }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 20px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#FFF8F4", border:"1px solid #F4CDB8", borderRadius:100, padding:"6px 18px", marginBottom:20 }}>
            <span style={{ fontSize:14 }}>❓</span>
            <span style={{ fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", color:"#B07858", fontFamily:"'Lora',Georgia,serif", fontWeight:600 }}>Frequently Asked Questions</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, color:"#2A1008", marginBottom:14, lineHeight:1.1 }}>
            Everything You Need to Know<br /><em style={{ color:"#C1440E" }}>Before You Move</em>
          </h2>
          <p style={{ color:"#9A6A54", fontSize:"1rem", maxWidth:480, margin:"0 auto", lineHeight:1.7, fontStyle:"italic" }}>
            Practical answers to the questions every expat asks when relocating to Italy.
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:28 }}>
            <div style={{ width:48, height:1, background:"#F4CDB8" }} />
            <span style={{ color:"#C1440E", fontSize:18 }}>✦</span>
            <div style={{ width:48, height:1, background:"#F4CDB8" }} />
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:44 }}>
          {[{ label:"All Topics", val:null }, ...FAQS.map(f=>({ label:`${f.icon} ${f.category}`, val:f.category }))].map(btn => (
            <button key={btn.label} onClick={()=>setActiveCategory(btn.val)} style={{
              padding:"8px 18px", borderRadius:100,
              border: activeCategory===btn.val?"2px solid #C1440E":"2px solid #E8DDD5",
              background: activeCategory===btn.val?"#C1440E":"#fff",
              color: activeCategory===btn.val?"#fff":"#7A5A4A",
              fontFamily:"'Lora',Georgia,serif", fontSize:13, cursor:"pointer",
              fontWeight: activeCategory===btn.val?600:400, transition:"all 0.18s", whiteSpace:"nowrap",
            }}>{btn.label}</button>
          ))}
        </div>

        {/* FAQ groups */}
        {filteredFaqs.map(group => (
          <div key={group.category} style={{ marginBottom:40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <span style={{ fontSize:20 }}>{group.icon}</span>
              <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", fontWeight:700, color:"#3A2010" }}>{group.category}</h3>
              <div style={{ flex:1, height:1, background:"#F0E6DE", marginLeft:8 }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                const isOpen = openItem === key;
                return (
                  <div key={key} style={{ border:`1px solid ${isOpen?"#F4CDB8":"#F0E6DE"}`, borderRadius:12, background:isOpen?"#FFF8F4":"#fff", overflow:"hidden", transition:"all 0.2s", boxShadow:isOpen?"0 4px 20px rgba(193,68,14,0.06)":"none" }}>
                    <button onClick={()=>toggle(key)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 22px", background:"transparent", border:"none", cursor:"pointer", textAlign:"left", gap:16 }}>
                      <span style={{ fontFamily:"'Lora',Georgia,serif", fontSize:15, fontWeight:600, color:isOpen?"#C1440E":"#3A2010", lineHeight:1.4, flex:1 }}>{item.q}</span>
                      <span style={{ color:"#C1440E", fontSize:22, flexShrink:0, transition:"transform 0.25s", transform:isOpen?"rotate(45deg)":"rotate(0deg)", fontWeight:300, lineHeight:1 }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding:"0 22px 20px", borderTop:"1px solid #F4CDB8" }}>
                        <p style={{ fontSize:14, color:"#5A3A2A", lineHeight:1.9, paddingTop:16, fontFamily:"'Lora',Georgia,serif" }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={{ textAlign:"center", marginTop:56, padding:"32px 28px", background:"linear-gradient(135deg,#FFF8F4,#FEF0E6)", borderRadius:20, border:"1px solid #F4CDB8" }}>
          <p style={{ fontSize:24, marginBottom:12 }}>☕</p>
          <p style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"1.15rem", fontWeight:700, color:"#3A2010", marginBottom:10 }}>Still have questions?</p>
          <p style={{ fontSize:14, color:"#9A6A54", lineHeight:1.8, maxWidth:500, margin:"0 auto" }}>
            The best resources are expat Facebook groups, your country's embassy in Italy, and a good bilingual <em>commercialista</em>. The Italian bureaucracy is very real — but so is the espresso at the bar downstairs. <strong>In bocca al lupo.</strong>
          </p>
        </div>

      </div>
    </div>
  );
}
