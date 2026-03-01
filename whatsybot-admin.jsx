import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS  — warm clay × ink aesthetic
═══════════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0d0d0d;--ink2:#3a3a3a;--ink3:#7a7878;--ink4:#b0adad;
  --clay:#f5f0ea;--clay2:#ede8e1;--clay3:#e2dbd1;--clay4:#d4ccc0;
  --paper:#faf8f5;
  --green:#1a7a4a;--green-bg:rgba(26,122,74,.08);--green-b:rgba(26,122,74,.2);
  --red:#c0392b;--red-bg:rgba(192,57,43,.08);--red-b:rgba(192,57,43,.2);
  --amber:#b45309;--amber-bg:rgba(180,83,9,.08);--amber-b:rgba(180,83,9,.2);
  --blue:#1d4ed8;--blue-bg:rgba(29,78,216,.08);--blue-b:rgba(29,78,216,.2);
  --purple:#6d28d9;--purple-bg:rgba(109,40,217,.08);--purple-b:rgba(109,40,217,.2);
  --r:10px;--r2:16px;--r3:22px;
  --sh:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.06);
  --sh2:0 2px 8px rgba(0,0,0,.1),0 12px 40px rgba(0,0,0,.08);
  --font:'Geist',sans-serif;
  --serif:'Instrument Serif',serif;
  --ease:cubic-bezier(.4,0,.2,1);
}
body{font-family:var(--font);background:var(--clay);color:var(--ink);min-height:100vh}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--clay4);border-radius:4px}

/* ── Layout ── */
.shell{display:flex;min-height:100vh}
.rail{
  width:220px;min-width:220px;background:var(--ink);color:#fff;
  display:flex;flex-direction:column;position:sticky;top:0;height:100vh;
  overflow-y:auto;
}
.rail-brand{
  padding:22px 18px 18px;border-bottom:1px solid rgba(255,255,255,.06);
  display:flex;align-items:center;gap:10px;
}
.brand-mark{
  width:32px;height:32px;border-radius:9px;
  background:linear-gradient(135deg,#25d366,#128c7e);
  display:flex;align-items:center;justify-content:center;font-size:16px;
  box-shadow:0 0 16px rgba(37,211,102,.3);flex-shrink:0;
}
.brand-label{font-family:var(--serif);font-size:17px;color:#fff}
.brand-sub{font-size:10px;color:rgba(255,255,255,.35);letter-spacing:.08em;text-transform:uppercase;margin-top:1px}
.rail-section{padding:16px 10px 6px}
.rail-section-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.25);padding:0 8px;margin-bottom:6px}
.rail-item{
  display:flex;align-items:center;gap:9px;padding:8px 10px;
  border-radius:9px;cursor:pointer;transition:all .15s var(--ease);
  color:rgba(255,255,255,.5);font-size:13.5px;font-weight:400;
  border:1px solid transparent;position:relative;
}
.rail-item:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.05)}
.rail-item.active{color:#fff;background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.08)}
.rail-item .ri{font-size:15px;width:18px;text-align:center}
.rail-item .cnt{
  margin-left:auto;font-size:11px;font-weight:600;padding:1px 7px;
  border-radius:20px;background:rgba(37,211,102,.15);color:#25d366;
}
.rail-footer{margin-top:auto;padding:14px;border-top:1px solid rgba(255,255,255,.06)}
.admin-chip{
  display:flex;align-items:center;gap:9px;padding:8px 10px;
  background:rgba(255,255,255,.05);border-radius:10px;border:1px solid rgba(255,255,255,.07);
}
.admin-av{
  width:30px;height:30px;border-radius:50%;
  background:linear-gradient(135deg,#f59e0b,#ef4444);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:#fff;flex-shrink:0;
}
.admin-name{font-size:12.5px;color:#fff;font-weight:500}
.admin-role{font-size:11px;color:rgba(255,255,255,.3)}

.body{flex:1;overflow-y:auto;background:var(--clay)}
.topbar{
  background:var(--paper);border-bottom:1px solid var(--clay3);
  padding:0 28px;height:56px;display:flex;align-items:center;
  justify-content:space-between;position:sticky;top:0;z-index:40;
}
.topbar-left{display:flex;align-items:center;gap:14px}
.page-title{font-family:var(--serif);font-size:20px;color:var(--ink);font-style:italic}
.topbar-right{display:flex;align-items:center;gap:10px}
.t-btn{
  padding:6px 14px;border-radius:8px;font-size:13px;font-weight:500;
  cursor:pointer;border:none;font-family:var(--font);transition:all .15s;
  display:flex;align-items:center;gap:6px;
}
.t-btn-ghost{background:transparent;color:var(--ink2);border:1px solid var(--clay3)}
.t-btn-ghost:hover{background:var(--clay2)}
.t-btn-primary{background:var(--ink);color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.t-btn-primary:hover{background:var(--ink2);transform:translateY(-1px);box-shadow:var(--sh)}
.live-badge{
  display:flex;align-items:center;gap:6px;font-size:12px;
  color:var(--green);background:var(--green-bg);
  padding:5px 11px;border-radius:20px;border:1px solid var(--green-b);
  font-weight:500;
}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

.page{padding:24px 28px}

/* ── Stat cards ── */
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px}
.scard{
  background:var(--paper);border:1px solid var(--clay3);border-radius:var(--r2);
  padding:18px;transition:all .2s var(--ease);cursor:default;
}
.scard:hover{box-shadow:var(--sh);transform:translateY(-2px)}
.scard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px}
.scard-icon{
  width:38px;height:38px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:17px;
}
.scard-trend{font-size:12px;font-weight:600;display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px}
.trend-up{color:var(--green);background:var(--green-bg)}
.trend-down{color:var(--red);background:var(--red-bg)}
.scard-val{font-family:var(--serif);font-size:30px;color:var(--ink);line-height:1;margin-bottom:3px}
.scard-label{font-size:12.5px;color:var(--ink3)}

/* ── Card ── */
.card{background:var(--paper);border:1px solid var(--clay3);border-radius:var(--r2);overflow:hidden}
.card-hd{
  padding:14px 18px;border-bottom:1px solid var(--clay2);
  display:flex;align-items:center;justify-content:space-between;
}
.card-title{font-size:14px;font-weight:600;color:var(--ink);display:flex;align-items:center;gap:7px}
.card-action{font-size:12.5px;color:var(--ink3);cursor:pointer;display:flex;align-items:center;gap:5px;transition:color .15s}
.card-action:hover{color:var(--ink)}
.card-body{padding:18px}

/* ── Table ── */
.tbl-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
thead tr{background:var(--clay)}
th{
  padding:9px 14px;text-align:left;font-size:11px;font-weight:600;
  color:var(--ink3);text-transform:uppercase;letter-spacing:.07em;
  border-bottom:1px solid var(--clay3);white-space:nowrap;
}
td{padding:11px 14px;border-bottom:1px solid var(--clay2);font-size:13.5px;color:var(--ink2);vertical-align:middle}
tbody tr:last-child td{border-bottom:none}
tbody tr{transition:background .12s}
tbody tr:hover td{background:var(--clay)}

/* ── Pills ── */
.pill{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11.5px;font-weight:600;white-space:nowrap}
.pill-green{background:var(--green-bg);color:var(--green);border:1px solid var(--green-b)}
.pill-red{background:var(--red-bg);color:var(--red);border:1px solid var(--red-b)}
.pill-amber{background:var(--amber-bg);color:var(--amber);border:1px solid var(--amber-b)}
.pill-blue{background:var(--blue-bg);color:var(--blue);border:1px solid var(--blue-b)}
.pill-purple{background:var(--purple-bg);color:var(--purple);border:1px solid var(--purple-b)}
.pill-gray{background:var(--clay2);color:var(--ink3);border:1px solid var(--clay3)}

/* ── Avatar ── */
.av{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0}

/* ── Grid ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}

/* ── Inputs ── */
.field{margin-bottom:14px}
.lbl{font-size:12.5px;font-weight:500;color:var(--ink2);display:block;margin-bottom:5px}
.inp{
  width:100%;padding:9px 12px;background:var(--clay);border:1px solid var(--clay3);
  border-radius:9px;font-size:13.5px;font-family:var(--font);color:var(--ink);
  outline:none;transition:all .15s;
}
.inp:focus{border-color:var(--ink2);background:var(--paper);box-shadow:0 0 0 3px rgba(13,13,13,.06)}
.inp::placeholder{color:var(--ink4)}
select.inp{cursor:pointer}
textarea.inp{resize:vertical;min-height:72px;line-height:1.5}

/* ── Modal ── */
.overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(4px);
  z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;
  animation:fadeIn .15s ease;
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{
  background:var(--paper);border:1px solid var(--clay3);border-radius:var(--r3);
  width:100%;max-width:520px;box-shadow:var(--sh2);
  animation:slideUp .2s var(--ease);
}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.modal-hd{
  padding:20px 22px 16px;border-bottom:1px solid var(--clay2);
  display:flex;align-items:center;justify-content:space-between;
}
.modal-title{font-family:var(--serif);font-size:19px;font-style:italic}
.modal-close{width:28px;height:28px;border-radius:7px;border:1px solid var(--clay3);background:none;cursor:pointer;font-size:15px;color:var(--ink3);display:flex;align-items:center;justify-content:center;transition:all .12s}
.modal-close:hover{background:var(--clay2);color:var(--ink)}
.modal-body{padding:20px 22px}
.modal-footer{padding:14px 22px 20px;display:flex;gap:10px;justify-content:flex-end;border-top:1px solid var(--clay2)}
.btn{padding:8px 18px;border-radius:9px;font-size:13.5px;font-weight:500;cursor:pointer;border:none;font-family:var(--font);transition:all .15s;display:inline-flex;align-items:center;gap:6px}
.btn-ink{background:var(--ink);color:#fff}
.btn-ink:hover{background:var(--ink2);transform:translateY(-1px);box-shadow:var(--sh)}
.btn-ghost{background:transparent;color:var(--ink2);border:1px solid var(--clay3)}
.btn-ghost:hover{background:var(--clay2)}
.btn-danger{background:var(--red-bg);color:var(--red);border:1px solid var(--red-b)}
.btn-danger:hover{background:rgba(192,57,43,.15)}
.btn-green{background:linear-gradient(135deg,#1a7a4a,#0f5733);color:#fff;box-shadow:0 0 14px rgba(26,122,74,.25)}
.btn-green:hover{opacity:.9;transform:translateY(-1px)}
.btn-sm{padding:5px 11px;font-size:12px;border-radius:7px}

/* ── Search bar ── */
.search-bar{
  display:flex;align-items:center;gap:8px;padding:8px 12px;
  background:var(--clay);border:1px solid var(--clay3);border-radius:9px;
  flex:1;max-width:280px;
}
.search-bar input{background:none;border:none;outline:none;font-size:13.5px;color:var(--ink);font-family:var(--font);width:100%}
.search-bar input::placeholder{color:var(--ink4)}

/* ── Tabs ── */
.tabs-row{display:flex;gap:2px;padding:3px;background:var(--clay2);border-radius:10px;width:fit-content;margin-bottom:18px}
.tab-btn{padding:6px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--ink3);border:none;background:none;font-family:var(--font)}
.tab-btn.on{background:var(--paper);color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.1)}

/* ── Sparkline ── */
.spark{display:flex;align-items:flex-end;gap:3px;height:36px}
.spark-bar{border-radius:3px 3px 0 0;flex:1;transition:height .4s var(--ease)}

/* ── Timeline ── */
.tl-item{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--clay2)}
.tl-item:last-child{border-bottom:none}
.tl-dot{width:8px;height:8px;border-radius:50%;margin-top:5px;flex-shrink:0}
.tl-content{flex:1}
.tl-text{font-size:13px;color:var(--ink2);line-height:1.4}
.tl-time{font-size:11.5px;color:var(--ink4);margin-top:2px}

/* ── Toggle ── */
.tog{width:40px;height:22px;border-radius:11px;background:var(--clay3);position:relative;cursor:pointer;transition:background .15s;border:1px solid var(--clay4);flex-shrink:0}
.tog.on{background:var(--green);border-color:var(--green)}
.tog::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.tog.on::after{left:20px}

/* ── Progress ── */
.prog-wrap{margin-bottom:10px}
.prog-lbl{display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px}
.prog-lbl span:first-child{color:var(--ink2);font-weight:500}
.prog-lbl span:last-child{color:var(--ink3)}
.prog-track{height:5px;background:var(--clay3);border-radius:3px}
.prog-fill{height:100%;border-radius:3px;transition:width .6s var(--ease)}

/* ── Deploy steps ── */
.step-list{display:flex;flex-direction:column;gap:12px}
.step-item{
  display:flex;gap:14px;align-items:flex-start;padding:16px;
  background:var(--clay);border:1px solid var(--clay3);border-radius:var(--r);
  transition:all .15s;
}
.step-item.done{background:var(--green-bg);border-color:var(--green-b)}
.step-num{
  width:28px;height:28px;border-radius:50%;background:var(--clay3);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;color:var(--ink2);flex-shrink:0;
}
.step-item.done .step-num{background:var(--green);color:#fff}
.step-title{font-size:13.5px;font-weight:600;color:var(--ink);margin-bottom:3px}
.step-desc{font-size:12.5px;color:var(--ink3);line-height:1.5}
.cmd-block{
  margin-top:10px;background:var(--ink);color:#a3e4a8;font-family:monospace;
  font-size:12px;padding:10px 14px;border-radius:8px;white-space:pre;overflow-x:auto;
}

/* ── Animations ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeUp .35s var(--ease) both}
.fade-1{animation-delay:.05s}
.fade-2{animation-delay:.1s}
.fade-3{animation-delay:.15s}
.fade-4{animation-delay:.2s}

/* ── Responsive ── */
@media(max-width:900px){
  .stat-row{grid-template-columns:1fr 1fr}
  .g2,.g3{grid-template-columns:1fr}
  .rail{display:none}
}
`;

/* ═══════════════════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════════════════ */
const PLANS = { free: { label: "Free", color: "pill-gray" }, pro: { label: "Pro", color: "pill-blue" }, business: { label: "Business", color: "pill-purple" } };

const mkDate = (daysAgo) => {
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("ar-SA");
};

const USERS = [
  { id: 1, name: "أحمد محمد الغامدي", email: "ahmed@techco.sa", plan: "business", status: "active", msgs: 8420, bots: 3, revenue: 25, joined: mkDate(120), country: "🇸🇦", whatsapp: true, lastActive: "منذ 5 دقائق" },
  { id: 2, name: "Sara Al-Rashidi", email: "sara@boutique.ae", plan: "pro", status: "active", msgs: 3201, bots: 1, revenue: 10, joined: mkDate(85), country: "🇦🇪", whatsapp: true, lastActive: "منذ 2 ساعة" },
  { id: 3, name: "فاطمة العلي", email: "fatima@store.sa", plan: "free", status: "active", msgs: 87, bots: 1, revenue: 0, joined: mkDate(12), country: "🇸🇦", whatsapp: false, lastActive: "منذ يوم" },
  { id: 4, name: "Mohammed Al-Harbi", email: "m.harbi@shop.com", plan: "pro", status: "suspended", msgs: 1540, bots: 1, revenue: 10, joined: mkDate(200), country: "🇸🇦", whatsapp: true, lastActive: "منذ 3 أيام" },
  { id: 5, name: "نورا حسن العتيبي", email: "noura@fashion.sa", plan: "business", status: "active", msgs: 12300, bots: 5, revenue: 25, joined: mkDate(300), country: "🇸🇦", whatsapp: true, lastActive: "الآن" },
  { id: 6, name: "Khalid Al-Dosari", email: "khalid@realestate.qa", plan: "free", status: "trial", msgs: 44, bots: 1, revenue: 0, joined: mkDate(3), country: "🇶🇦", whatsapp: false, lastActive: "منذ 6 ساعات" },
  { id: 7, name: "منى الزهراني", email: "mona@mealprep.sa", plan: "pro", status: "active", msgs: 5670, bots: 2, revenue: 10, joined: mkDate(60), country: "🇸🇦", whatsapp: true, lastActive: "منذ 30 دقيقة" },
  { id: 8, name: "Reem Abdullah", email: "reem@clinic.ae", plan: "business", status: "active", msgs: 9800, bots: 4, revenue: 25, joined: mkDate(180), country: "🇦🇪", whatsapp: true, lastActive: "منذ ساعة" },
];

const ACTIVITY = [
  { text: "مستخدم جديد سجّل: فاطمة العلي", time: "منذ 3 دقائق", dot: "var(--green)", type: "signup" },
  { text: "ترقية خطة: Ahmed → Business", time: "منذ 18 دقيقة", dot: "var(--purple)", type: "upgrade" },
  { text: "دفعة ناجحة $25 — نورا حسن", time: "منذ 45 دقيقة", dot: "var(--blue)", type: "payment" },
  { text: "تجاوز الحد المجاني — Khalid Al-Dosari", time: "منذ ساعة", dot: "var(--amber)", type: "limit" },
  { text: "فشل دفع — Mohammed Al-Harbi", time: "منذ ساعتين", dot: "var(--red)", type: "fail" },
  { text: "بوت جديد متصل بواتساب — Sara", time: "منذ 3 ساعات", dot: "var(--green)", type: "connect" },
];

const CHART_WEEK = [38, 54, 47, 71, 63, 92, 80];
const CHART_REV = [120, 195, 160, 240, 310, 290, 385];

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="spark">
      {data.map((v, i) => (
        <div key={i} className="spark-bar" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.4 + (i / data.length) * 0.6 }} />
      ))}
    </div>
  );
}

function StatusPill({ status }) {
  const map = { active: ["pill-green", "● نشط"], suspended: ["pill-red", "⊘ موقوف"], trial: ["pill-amber", "◌ تجريبي"] };
  const [cls, label] = map[status] || ["pill-gray", status];
  return <span className={`pill ${cls}`}>{label}</span>;
}

function PlanPill({ plan }) {
  const { label, color } = PLANS[plan] || { label: plan, color: "pill-gray" };
  return <span className={`pill ${color}`}>{label}</span>;
}

function Toggle({ on, onChange }) {
  return <div className={`tog ${on ? "on" : ""}`} onClick={() => onChange(!on)} />;
}

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hd">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════════ */

/* ── Overview Dashboard ── */
function Overview() {
  const totalRevenue = USERS.reduce((s, u) => s + u.revenue, 0);
  const activeUsers = USERS.filter(u => u.status === "active").length;

  return (
    <div className="page">
      {/* Stats */}
      <div className="stat-row">
        {[
          { icon: "👥", val: USERS.length, label: "إجمالي المستخدمين", trend: "+12%", up: true, color: "var(--blue-bg)", iconColor: "var(--blue)", spark: CHART_WEEK, sparkColor: "var(--blue)" },
          { icon: "✅", val: activeUsers, label: "مستخدمون نشطون", trend: "+8%", up: true, color: "var(--green-bg)", iconColor: "var(--green)", spark: [5,7,6,8,9,8,10], sparkColor: "var(--green)" },
          { icon: "💰", val: `$${totalRevenue}`, label: "إيرادات الشهر", trend: "+24%", up: true, color: "var(--purple-bg)", iconColor: "var(--purple)", spark: CHART_REV, sparkColor: "var(--purple)" },
          { icon: "💬", val: "42.1k", label: "رسائل هذا الشهر", trend: "-3%", up: false, color: "var(--amber-bg)", iconColor: "var(--amber)", spark: [90,82,76,88,71,68,65], sparkColor: "var(--amber)" },
        ].map((s, i) => (
          <div key={i} className={`scard fade fade-${i + 1}`}>
            <div className="scard-top">
              <div className="scard-icon" style={{ background: s.color, color: s.iconColor }}>{s.icon}</div>
              <span className={`scard-trend ${s.up ? "trend-up" : "trend-down"}`}>{s.up ? "↑" : "↓"} {s.trend}</span>
            </div>
            <div className="scard-val">{s.val}</div>
            <div className="scard-label">{s.label}</div>
            <div style={{ marginTop: 10 }}><Sparkline data={s.spark} color={s.iconColor} /></div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="g2">
        {/* Revenue breakdown */}
        <div className="card fade">
          <div className="card-hd">
            <span className="card-title">💎 توزيع الإيرادات</span>
            <span style={{ fontSize: 12, color: "var(--ink3)" }}>هذا الشهر</span>
          </div>
          <div className="card-body">
            {[
              { plan: "Business ($25)", count: USERS.filter(u => u.plan === "business").length, pct: 68, color: "var(--purple)" },
              { plan: "Pro ($10)", count: USERS.filter(u => u.plan === "pro").length, pct: 27, color: "var(--blue)" },
              { plan: "Free ($0)", count: USERS.filter(u => u.plan === "free").length, pct: 5, color: "var(--ink4)" },
            ].map((r, i) => (
              <div key={i} className="prog-wrap">
                <div className="prog-lbl"><span>{r.plan}</span><span>{r.count} مستخدم · {r.pct}%</span></div>
                <div className="prog-track"><div className="prog-fill" style={{ width: `${r.pct}%`, background: r.color }} /></div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: "14px", background: "var(--clay)", borderRadius: "var(--r)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26, fontStyle: "italic", color: "var(--ink)" }}>${totalRevenue}<span style={{ fontSize: 13, color: "var(--ink3)", fontFamily: "var(--font)", fontStyle: "normal" }}>/شهر</span></div>
              <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>MRR الحالي</div>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="card fade">
          <div className="card-hd">
            <span className="card-title">⚡ آخر الأنشطة</span>
            <span className="card-action">مسح الكل</span>
          </div>
          <div className="card-body" style={{ padding: "8px 18px" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot" style={{ background: a.dot }} />
                <div className="tl-content">
                  <div className="tl-text">{a.text}</div>
                  <div className="tl-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent users table */}
      <div className="card fade" style={{ marginTop: 16 }}>
        <div className="card-hd">
          <span className="card-title">👥 أحدث المستخدمين</span>
          <span className="card-action">عرض الكل →</span>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>المستخدم</th><th>الخطة</th><th>الحالة</th><th>الرسائل</th><th>الإيراد</th><th>تاريخ الانضمام</th></tr></thead>
            <tbody>
              {USERS.slice(0, 5).map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div className="av" style={{ width: 30, height: 30, fontSize: 13, background: `hsl(${u.id * 47},60%,65%)`, color: "#fff" }}>
                        {u.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{u.country} {u.name}</div>
                        <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><PlanPill plan={u.plan} /></td>
                  <td><StatusPill status={u.status} /></td>
                  <td style={{ fontFamily: "var(--serif)", fontSize: 15 }}>{u.msgs.toLocaleString()}</td>
                  <td style={{ color: u.revenue > 0 ? "var(--green)" : "var(--ink4)", fontWeight: 600 }}>{u.revenue > 0 ? `$${u.revenue}` : "—"}</td>
                  <td style={{ color: "var(--ink4)" }}>{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Users Manager ── */
function Users() {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [msgModal, setMsgModal] = useState(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.plan === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
  };

  const upgradePlan = (id, plan) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, plan } : u));
    setEditModal(null);
  };

  return (
    <div className="page">
      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="tabs-row">
          {[["all", "الكل"], ["active", "نشط"], ["free", "Free"], ["pro", "Pro"], ["business", "Business"], ["suspended", "موقوف"]].map(([v, l]) => (
            <button key={v} className={`tab-btn ${filter === v ? "on" : ""}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="search-bar">
            <span style={{ color: "var(--ink4)" }}>🔍</span>
            <input placeholder="بحث..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-ink btn-sm">📤 تصدير CSV</button>
        </div>
      </div>

      <div className="card">
        <div className="card-hd">
          <span className="card-title">👥 المستخدمون <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 16 }}>({filtered.length})</span></span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setMsgModal("all")}>📢 رسالة جماعية</button>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>الخطة</th>
                <th>الحالة</th>
                <th>الرسائل</th>
                <th>واتساب</th>
                <th>آخر نشاط</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} style={{ cursor: "pointer" }}>
                  <td onClick={() => setSelected(u)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="av" style={{ width: 36, height: 36, fontSize: 15, background: `hsl(${u.id * 47},55%,60%)`, color: "#fff" }}>{u.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13.5 }}>{u.country} {u.name}</div>
                        <div style={{ fontSize: 11.5, color: "var(--ink4)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><PlanPill plan={u.plan} /></td>
                  <td><StatusPill status={u.status} /></td>
                  <td><span style={{ fontFamily: "var(--serif)", fontSize: 15 }}>{u.msgs.toLocaleString()}</span></td>
                  <td>{u.whatsapp ? <span className="pill pill-green">✓ متصل</span> : <span className="pill pill-gray">✗ غير متصل</span>}</td>
                  <td style={{ color: "var(--ink4)", fontSize: 12.5 }}>{u.lastActive}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditModal(u)}>✏️ تعديل</button>
                      <button className={`btn btn-sm ${u.status === "active" ? "btn-danger" : "btn-green"}`} onClick={() => toggleStatus(u.id)}>
                        {u.status === "active" ? "⊘ إيقاف" : "▶ تفعيل"}
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setMsgModal(u)}>✉️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selected && (
        <Modal title={`${selected.country} ${selected.name}`} onClose={() => setSelected(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setSelected(null)}>إغلاق</button><button className="btn btn-ink" onClick={() => { setEditModal(selected); setSelected(null); }}>✏️ تعديل</button></>}>
          <div className="g2">
            {[
              ["البريد", selected.email],
              ["الخطة", <PlanPill key="p" plan={selected.plan} />],
              ["الحالة", <StatusPill key="s" status={selected.status} />],
              ["الرسائل", selected.msgs.toLocaleString()],
              ["البوتات", selected.bots],
              ["الإيراد الشهري", selected.revenue > 0 ? `$${selected.revenue}` : "مجاني"],
              ["تاريخ الانضمام", selected.joined],
              ["واتساب", selected.whatsapp ? "✅ متصل" : "❌ غير متصل"],
            ].map(([k, v], i) => (
              <div key={i} style={{ padding: "10px 12px", background: "var(--clay)", borderRadius: "var(--r)" }}>
                <div style={{ fontSize: 11, color: "var(--ink4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{k}</div>
                <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Edit Plan Modal */}
      {editModal && (
        <Modal title="تعديل المستخدم" onClose={() => setEditModal(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setEditModal(null)}>إلغاء</button><button className="btn btn-ink">💾 حفظ</button></>}>
          <div className="field">
            <label className="lbl">الاسم</label>
            <input className="inp" defaultValue={editModal.name} />
          </div>
          <div className="field">
            <label className="lbl">البريد الإلكتروني</label>
            <input className="inp" defaultValue={editModal.email} />
          </div>
          <div className="field">
            <label className="lbl">تغيير الخطة</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {["free", "pro", "business"].map(p => (
                <div key={p} onClick={() => upgradePlan(editModal.id, p)} style={{
                  padding: "10px", borderRadius: "var(--r)", cursor: "pointer", textAlign: "center",
                  border: `1px solid ${editModal.plan === p ? "var(--ink)" : "var(--clay3)"}`,
                  background: editModal.plan === p ? "var(--ink)" : "var(--clay)",
                  color: editModal.plan === p ? "#fff" : "var(--ink2)", fontSize: 13, fontWeight: 600,
                  transition: "all .15s"
                }}>
                  {PLANS[p].label}
                </div>
              ))}
            </div>
          </div>
          <div className="field">
            <label className="lbl">ملاحظة داخلية</label>
            <textarea className="inp" placeholder="ملاحظة للفريق..." rows={2} />
          </div>
        </Modal>
      )}

      {/* Message Modal */}
      {msgModal && (
        <Modal title={msgModal === "all" ? "📢 رسالة لجميع المستخدمين" : `✉️ رسالة إلى ${msgModal.name}`}
          onClose={() => setMsgModal(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setMsgModal(null)}>إلغاء</button><button className="btn btn-green">📨 إرسال الآن</button></>}>
          <div className="field">
            <label className="lbl">الموضوع</label>
            <input className="inp" placeholder="موضوع الرسالة..." />
          </div>
          <div className="field">
            <label className="lbl">نص الرسالة</label>
            <textarea className="inp" rows={4} placeholder="اكتب رسالتك هنا..." />
          </div>
          {msgModal === "all" && (
            <div style={{ padding: "10px 12px", background: "var(--amber-bg)", border: "1px solid var(--amber-b)", borderRadius: "var(--r)", fontSize: 12.5, color: "var(--amber)" }}>
              ⚠️ سيتم إرسال هذه الرسالة لـ {USERS.length} مستخدم
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

/* ── Subscriptions ── */
function Subscriptions() {
  const [tab, setTab] = useState("active");

  const subs = USERS.filter(u => u.plan !== "free").map(u => ({
    ...u,
    nextBilling: mkDate(-30),
    subId: `sub_${Math.random().toString(36).substr(2, 12)}`,
  }));

  return (
    <div className="page">
      <div className="stat-row" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        {[
          { label: "MRR", val: `$${subs.reduce((s, u) => s + u.revenue, 0)}`, icon: "💰", color: "var(--purple)" },
          { label: "اشتراكات نشطة", val: subs.filter(u => u.status === "active").length, icon: "✅", color: "var(--green)" },
          { label: "معدل الاحتفاظ", val: "91%", icon: "🔄", color: "var(--blue)" },
        ].map((s, i) => (
          <div key={i} className="scard fade">
            <div className="scard-icon" style={{ background: s.color + "18", color: s.color }}>{s.icon}</div>
            <div className="scard-val" style={{ marginTop: 10 }}>{s.val}</div>
            <div className="scard-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card fade">
        <div className="card-hd">
          <span className="card-title">💳 إدارة الاشتراكات</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="tabs-row" style={{ marginBottom: 0 }}>
              {[["active", "نشط"], ["cancelled", "ملغي"]].map(([v, l]) => (
                <button key={v} className={`tab-btn ${tab === v ? "on" : ""}`} onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>الخطة</th>
                <th>Stripe ID</th>
                <th>الدفعة القادمة</th>
                <th>المبلغ</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div className="av" style={{ width: 32, height: 32, fontSize: 13, background: `hsl(${s.id * 47},55%,60%)`, color: "#fff" }}>{s.name[0]}</div>
                      <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13 }}>{s.name}</span>
                    </div>
                  </td>
                  <td><PlanPill plan={s.plan} /></td>
                  <td><code style={{ fontSize: 11, color: "var(--ink4)", background: "var(--clay)", padding: "2px 7px", borderRadius: 5 }}>{s.subId}</code></td>
                  <td style={{ color: "var(--ink3)", fontSize: 12.5 }}>{s.nextBilling}</td>
                  <td><span style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--green)" }}>${s.revenue}</span></td>
                  <td><StatusPill status={s.status} /></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm">↕️ تغيير</button>
                      <button className="btn btn-danger btn-sm">⊘ إلغاء</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Deploy Guide ── */
function Deploy() {
  const [done, setDone] = useState({});
  const toggle = (k) => setDone(p => ({ ...p, [k]: !p[k] }));

  const steps = [
    {
      k: "railway", title: "1️⃣ سجّل على Railway (مجاناً)", desc: "أسرع طريقة لرفع السيرفر. لا تحتاج خبرة تقنية.",
      cmd: null,
      action: { label: "🔗 فتح railway.app", url: "https://railway.app" }
    },
    {
      k: "mongo", title: "2️⃣ أنشئ قاعدة بيانات MongoDB", desc: "من لوحة Railway، اضغط New → Add MongoDB. انسخ الـ URL.",
      cmd: null
    },
    {
      k: "repo", title: "3️⃣ ارفع الكود على GitHub", desc: "اضغط Use Template على صفحة المشروع، ثم ارفع على GitHub مجاناً.",
      cmd: `# أو من Terminal:
git clone https://github.com/yourusername/whatsybot
cd whatsybot
git push origin main`
    },
    {
      k: "env", title: "4️⃣ أضف متغيرات البيئة", desc: "في Railway → Variables، أضف هذه القيم (احصل عليها من OpenAI وMeta وStripe):",
      cmd: `OPENAI_API_KEY=sk-proj-...
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_live_...
WEBHOOK_VERIFY_TOKEN=اختر_كلمة_سرية
JWT_SECRET=اختر_نص_عشوائي_طويل`
    },
    {
      k: "deploy", title: "5️⃣ اضغط Deploy!", desc: "Railway سيبني ويرفع التطبيق تلقائياً. في دقيقتين تكون المنصة تعمل! 🎉",
      cmd: null,
      action: { label: "📖 وثائق Railway", url: "https://docs.railway.app" }
    },
    {
      k: "frontend", title: "6️⃣ ارفع الواجهة على Vercel", desc: "اربط مستودع GitHub بـ Vercel وأضف NEXT_PUBLIC_API_URL = رابط Railway.",
      cmd: null,
      action: { label: "🔗 فتح vercel.com", url: "https://vercel.com" }
    },
    {
      k: "whatsapp", title: "7️⃣ اربط واتساب", desc: "من Meta Developers، أنشئ تطبيق Business. أضف Webhook URL = رابط Railway + /api/whatsapp/webhook",
      action: { label: "🔗 Meta Developers", url: "https://developers.facebook.com" }
    },
  ];

  const count = Object.values(done).filter(Boolean).length;

  return (
    <div className="page">
      <div style={{ maxWidth: 680 }}>
        {/* Progress */}
        <div className="card fade" style={{ marginBottom: 20, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontStyle: "italic" }}>🚀 دليل النشر — {count}/{steps.length} خطوات</div>
            {count === steps.length && <span className="pill pill-green">✓ اكتملت الإعداد!</span>}
          </div>
          <div className="prog-track"><div className="prog-fill" style={{ width: `${(count / steps.length) * 100}%`, background: "var(--green)" }} /></div>
          <div style={{ fontSize: 12, color: "var(--ink4)", marginTop: 6 }}>
            {count === 0 ? "ابدأ من الخطوة الأولى ↓" : count === steps.length ? "منصتك جاهزة للإطلاق! 🎉" : "رائع، واصل..."}
          </div>
        </div>

        <div className="step-list">
          {steps.map(s => (
            <div key={s.k} className={`step-item ${done[s.k] ? "done" : ""}`}>
              <div className="step-num" onClick={() => toggle(s.k)} style={{ cursor: "pointer" }}>{done[s.k] ? "✓" : s.k[0].toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
                {s.cmd && <div className="cmd-block">{s.cmd}</div>}
                {s.action && (
                  <a href={s.action.url} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 10, fontSize: 13, color: "var(--blue)", fontWeight: 500 }}>
                    {s.action.label} ↗
                  </a>
                )}
              </div>
              <div style={{ marginLeft: 8, flexShrink: 0 }}>
                <Toggle on={!!done[s.k]} onChange={() => toggle(s.k)} />
              </div>
            </div>
          ))}
        </div>

        {/* Help */}
        <div className="card fade" style={{ marginTop: 20 }}>
          <div className="card-hd"><span className="card-title">🆘 تحتاج مساعدة؟</span></div>
          <div className="card-body">
            <div className="g2">
              {[
                { icon: "📹", title: "فيديو تعليمي", desc: "شرح مرئي خطوة بخطوة (15 دقيقة)", color: "var(--red-bg)", iconColor: "var(--red)" },
                { icon: "💬", title: "مجموعة واتساب", desc: "تواصل مع المطورين مباشرة", color: "var(--green-bg)", iconColor: "var(--green)" },
                { icon: "📖", title: "التوثيق الكامل", desc: "وثائق API والإعدادات المتقدمة", color: "var(--blue-bg)", iconColor: "var(--blue)" },
                { icon: "🤖", title: "دعم AI", desc: "اسأل المساعد الذكي أي سؤال", color: "var(--purple-bg)", iconColor: "var(--purple)" },
              ].map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 11, padding: "12px", background: h.color, borderRadius: "var(--r)", cursor: "pointer", transition: "opacity .15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <div style={{ fontSize: 22 }}>{h.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: h.iconColor, marginBottom: 2 }}>{h.title}</div>
                    <div style={{ fontSize: 12, color: "var(--ink3)" }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Settings / Config ── */
function AdminSettings() {
  const [limits, setLimits] = useState({ free: 100, pro: 10000, business: 999999 });
  const [maintenance, setMaintenance] = useState(false);
  const [signups, setSignups] = useState(true);

  return (
    <div className="page">
      <div className="g2" style={{ maxWidth: 860 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card fade">
            <div className="card-hd"><span className="card-title">⚙️ إعدادات المنصة</span></div>
            <div className="card-body">
              {[
                { label: "تسجيل المستخدمين الجدد", on: signups, set: setSignups, desc: "السماح بإنشاء حسابات جديدة" },
                { label: "وضع الصيانة", on: maintenance, set: setMaintenance, desc: "إخفاء المنصة عن المستخدمين" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i === 0 ? "1px solid var(--clay2)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: "var(--ink4)" }}>{s.desc}</div>
                  </div>
                  <Toggle on={s.on} onChange={s.set} />
                </div>
              ))}
            </div>
          </div>

          <div className="card fade">
            <div className="card-hd"><span className="card-title">📊 حدود الرسائل</span></div>
            <div className="card-body">
              {[["free", "Free", "var(--ink4)"], ["pro", "Pro ($10)", "var(--blue)"], ["business", "Business ($25)", "var(--purple)"]].map(([k, label, color]) => (
                <div key={k} className="field">
                  <label className="lbl" style={{ color }}>{label}</label>
                  <input className="inp" type="number" value={limits[k]} onChange={e => setLimits(p => ({ ...p, [k]: +e.target.value }))} />
                </div>
              ))}
              <button className="btn btn-ink" style={{ width: "100%" }}>💾 حفظ الحدود</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card fade">
            <div className="card-hd"><span className="card-title">🔑 مفاتيح API العامة</span></div>
            <div className="card-body">
              {[
                { label: "OpenAI API Key", val: "sk-proj-••••••••", ph: "sk-proj-..." },
                { label: "Stripe Secret Key", val: "sk_live_••••••••", ph: "sk_live_..." },
                { label: "Webhook Verify Token", val: "my_secret_token", ph: "اختر كلمة سرية" },
              ].map((f, i) => (
                <div key={i} className="field">
                  <label className="lbl">{f.label}</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input className="inp" type="password" defaultValue={f.val} placeholder={f.ph} style={{ flex: 1 }} />
                    <button className="btn btn-ghost btn-sm">👁</button>
                  </div>
                </div>
              ))}
              <button className="btn btn-ink" style={{ width: "100%" }}>💾 تحديث المفاتيح</button>
            </div>
          </div>

          <div className="card fade">
            <div className="card-hd"><span className="card-title">🎨 تخصيص المنصة</span></div>
            <div className="card-body">
              {[
                { label: "اسم المنصة", val: "WhatyBot" },
                { label: "الشعار (URL)", val: "https://yoursite.com/logo.png" },
                { label: "البريد الرسمي", val: "support@whatsybot.com" },
              ].map((f, i) => (
                <div key={i} className="field">
                  <label className="lbl">{f.label}</label>
                  <input className="inp" defaultValue={f.val} />
                </div>
              ))}
              <button className="btn btn-ink" style={{ width: "100%" }}>💾 حفظ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "overview", icon: "◈", label: "لوحة التحكم" },
  { id: "users", icon: "◉", label: "المستخدمون", count: USERS.length },
  { id: "subs", icon: "◈", label: "الاشتراكات", count: USERS.filter(u => u.plan !== "free").length },
  { id: "deploy", icon: "◉", label: "النشر السريع" },
  { id: "settings", icon: "◈", label: "الإعدادات" },
];

const PAGE_TITLES = {
  overview: "لوحة التحكم",
  users: "إدارة المستخدمين",
  subs: "الاشتراكات والمدفوعات",
  deploy: "نشر المنصة",
  settings: "إعدادات النظام",
};

export default function AdminPanel() {
  const [page, setPage] = useState("overview");
  const [authed, setAuthed] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState(false);

  // Simple admin login
  if (!authed) {
    return (
      <>
        <style>{G}</style>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--clay)", padding: 20 }}>
          <div style={{ background: "var(--paper)", border: "1px solid var(--clay3)", borderRadius: "var(--r3)", padding: "40px", width: "100%", maxWidth: 380, boxShadow: "var(--sh2)", textAlign: "center", animation: "fadeUp .4s var(--ease)" }}>
            <div style={{ width: 56, height: 56, background: "var(--ink)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>⚡</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontStyle: "italic", marginBottom: 4 }}>Admin Panel</div>
            <div style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 28 }}>WhatyBot — لوحة إدارة النظام</div>
            <input
              className="inp" type="password"
              placeholder="كلمة مرور المشرف (أدخل أي شيء)"
              value={loginPass} onChange={e => { setLoginPass(e.target.value); setLoginErr(false); }}
              onKeyDown={e => e.key === "Enter" && (loginPass ? setAuthed(true) : setLoginErr(true))}
              style={{ marginBottom: 12, textAlign: "center" }}
            />
            {loginErr && <div style={{ fontSize: 12, color: "var(--red)", marginBottom: 10 }}>⚠️ أدخل كلمة المرور</div>}
            <button className="btn btn-ink" style={{ width: "100%", padding: "10px", fontSize: 15, justifyContent: "center" }}
              onClick={() => loginPass ? setAuthed(true) : setLoginErr(true)}>
              🔐 دخول
            </button>
            <div style={{ fontSize: 12, color: "var(--ink4)", marginTop: 14 }}>للتجربة: أدخل أي نص واضغط دخول</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{G}</style>
      <div className="shell" dir="rtl">
        {/* Rail */}
        <nav className="rail">
          <div className="rail-brand">
            <div className="brand-mark">⚡</div>
            <div>
              <div className="brand-label">WhatyBot</div>
              <div className="brand-sub">Admin Panel</div>
            </div>
          </div>

          <div className="rail-section">
            <div className="rail-section-label">الإدارة</div>
            {NAV_ITEMS.map(n => (
              <div key={n.id} className={`rail-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span className="ri">{n.icon}</span>
                {n.label}
                {n.count != null && <span className="cnt">{n.count}</span>}
              </div>
            ))}
          </div>

          <div className="rail-section" style={{ marginTop: "auto" }}>
            <div className="rail-section-label">النظام</div>
            <div className="rail-item">
              <span className="ri">◈</span>
              <span>تسجيل الخروج</span>
            </div>
          </div>

          <div className="rail-footer">
            <div className="admin-chip">
              <div className="admin-av">A</div>
              <div>
                <div className="admin-name">المشرف</div>
                <div className="admin-role">Super Admin</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Body */}
        <div className="body">
          <div className="topbar">
            <div className="topbar-left">
              <div className="page-title">{PAGE_TITLES[page]}</div>
            </div>
            <div className="topbar-right">
              <div className="live-badge">
                <div className="live-dot" />
                {USERS.filter(u => u.status === "active").length} نشط الآن
              </div>
              <button className="t-btn t-btn-ghost">🔔</button>
              <button className="t-btn t-btn-primary">📤 تصدير التقرير</button>
            </div>
          </div>

          {page === "overview" && <Overview />}
          {page === "users" && <Users />}
          {page === "subs" && <Subscriptions />}
          {page === "deploy" && <Deploy />}
          {page === "settings" && <AdminSettings />}
        </div>
      </div>
    </>
  );
}
