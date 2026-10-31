// Minuteur : premier plugin officiel d'exemple, entièrement autonome (seulement la permission « storage »).
// Il montre comment un plugin dessine dans son bac à sable et garde ses données via NeoBase.
export default function (ctx) {
  const S = ctx.el('style');
  S.textContent = `
    .mn{display:flex;flex-direction:column;align-items:center;gap:18px;padding:28px;min-height:100%;box-sizing:border-box;justify-content:center}
    .mn .big{font:64px var(--title,monospace);color:var(--shell,#fff);text-shadow:0 0 14px rgba(var(--pkr,255,90,217),.5);letter-spacing:2px}
    .mn .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
    .mn button{font:12px var(--title,monospace);color:#fff;border:0;padding:10px 16px;cursor:pointer;background:color-mix(in srgb,var(--violet,#8a5cf0) 80%,#000);box-shadow:inset 0 2px 0 rgba(255,255,255,.25),inset 0 -3px 0 rgba(0,0,0,.35)}
    .mn button.main{background:color-mix(in srgb,var(--magenta,#e01ec8) 80%,#000)}
    .mn button:active{transform:translateY(1px)}
    .mn .presets button{padding:8px 12px;background:color-mix(in srgb,var(--line2,#3a2a6e) 70%,transparent)}
    .mn.done .big{animation:mnBlink .6s steps(2) infinite}
    @keyframes mnBlink{50%{color:var(--pink,#ff5ad9)}}`;
  const box = ctx.el('div', 'mn'), time = ctx.el('div', 'big', '00:00');
  const presets = ctx.el('div', 'row presets');
  const row = ctx.el('div', 'row');
  const bStart = ctx.el('button', 'main', 'Démarrer'), bReset = ctx.el('button', '', 'Remettre');
  row.append(bStart, bReset);
  for (const m of [1, 3, 5, 10, 25]) { const b = ctx.el('button', '', m + ' min'); b.onclick = () => set(m * 60); presets.append(b); }
  box.append(time, presets, row);
  ctx.view.append(S, box);

  let total = 300, left = 300, timer = null;
  const fmt = s => String(s / 60 | 0).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const show = () => { time.textContent = fmt(left); };
  function set(s) { stop(); total = left = s; box.classList.remove('done'); show(); ctx.storage.set({ total }); }
  function stop() { clearInterval(timer); timer = null; bStart.textContent = 'Démarrer'; }
  function tick() {
    if (left <= 0) { stop(); box.classList.add('done'); ctx.ui.toast('Minuteur terminé !'); return; }
    left--; show();
  }
  bStart.onclick = () => {
    if (timer) return stop();
    if (left <= 0) left = total;
    box.classList.remove('done'); bStart.textContent = 'Pause';
    timer = setInterval(tick, 1000);
  };
  bReset.onclick = () => set(total);

  ctx.onOpen(async () => { const d = await ctx.storage.get(); if (d && d.total) { total = left = d.total; } show(); });
  ctx.onClose(() => stop());
}
