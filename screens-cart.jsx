// Faste Food — Screens: Grab Groupe (cart) + Fidélité (loyalty)
const { useState: useStateC, useMemo: useMemoC, useEffect: useEffectC } = React;

// ─────────────────────────────────────────────────────────────
// SCREEN 3 — Grab Groupe (split-the-bill cart)
// ─────────────────────────────────────────────────────────────
function CartScreen({ cart, setCart, onPay, payChecked, setPayChecked }) {
  // payChecked is a Set of cart item ids "Léo paie ça"
  const groupTotal = cart.reduce((s, c) => s + PRODUCT_BY_ID[c.product].price * c.qty, 0);
  const myTotal = cart.reduce((s, c) =>
    payChecked.has(c.id) ? s + PRODUCT_BY_ID[c.product].price * c.qty : s
  , 0);
  const myCount = cart.filter(c => payChecked.has(c.id)).length;

  // Status: who's paid (preset some demo state)
  const memberStatus = {
    karim: { paid: true,  amount: 11.40 },
    ines:  { paid: false },
    sarah: { paid: false },
    leo:   { paid: false },
  };

  const toggle = (id) => {
    const next = new Set(payChecked);
    next.has(id) ? next.delete(id) : next.add(id);
    setPayChecked(next);
  };

  // group items by member
  const grouped = useMemoC(() => {
    const m = {};
    GROUP_MEMBERS.forEach(mb => m[mb.id] = []);
    cart.forEach(c => m[c.addedBy]?.push(c));
    return m;
  }, [cart]);

  const paidAmount = Object.values(memberStatus).reduce((s, st) => s + (st.paid ? st.amount : 0), 0);
  const remainingAmount = groupTotal - paidAmount;

  return (
    <div style={{ paddingBottom: 200, color: FF.text }}>
      {/* Header */}
      <div style={{ padding: '60px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11.5, color: FF.yellow, letterSpacing: 1, textTransform:'uppercase', fontWeight: 700 }}>Grab Groupe</div>
            <h1 style={{ fontFamily:'"Space Grotesk"', fontSize: 26, fontWeight: 700, margin: '4px 0 0', letterSpacing: -0.6 }}>Table 12</h1>
          </div>
          <button style={iconBtnC}><Icons.Share size={18} color={FF.text}/></button>
        </div>

        {/* member roster */}
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display:'flex' }}>
            {GROUP_MEMBERS.map((m, i) => (
              <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -10, position: 'relative' }}>
                <Avatar id={m.id} size={36} ring/>
                {memberStatus[m.id]?.paid && (
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    width: 16, height: 16, borderRadius: 16,
                    background: FF.green, border: `2px solid ${FF.bg}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icons.Check size={9} color="#0A0A0C" sw={3}/>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: FF.textDim, lineHeight: 1.3 }}>
            <div style={{ color: FF.text, fontWeight: 600 }}>4 personnes</div>
            <div>1 a payé · 3 en attente</div>
          </div>
        </div>
      </div>

      {/* Progress payment */}
      <div style={{ margin: '18px 22px 0', padding: '14px 16px', borderRadius: 18, background: FF.card, border: `1px solid ${FF.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 12.5, color: FF.textDim }}>Total table</span>
          <span style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 20 }}>{groupTotal.toFixed(2)} €</span>
        </div>
        <div style={{ display:'flex', height: 6, marginTop: 10, borderRadius: 6, overflow:'hidden', background: 'rgba(255,255,255,0.06)' }}>
          <div style={{ width: `${(paidAmount / groupTotal) * 100}%`, background: FF.green }}/>
          <div style={{ width: `${(myTotal / groupTotal) * 100}%`, background: FF.yellow }}/>
        </div>
        <div style={{ display:'flex', gap: 16, marginTop: 10, fontSize: 11.5 }}>
          <span style={{ color: FF.green, display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: FF.green }}/> Payé · {paidAmount.toFixed(2)} €
          </span>
          <span style={{ color: FF.yellow, display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: FF.yellow }}/> Ta sélection · {myTotal.toFixed(2)} €
          </span>
          <span style={{ color: FF.textMute, display:'inline-flex', alignItems:'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.15)' }}/> Reste {(remainingAmount - myTotal > 0 ? remainingAmount - myTotal : 0).toFixed(2)} €
          </span>
        </div>
      </div>

      {/* Helper banner */}
      <div style={{ margin: '14px 22px 0', padding: '12px 14px', borderRadius: 14, background: `${FF.yellow}0F`, border: `1px dashed ${FF.yellow}55`, display:'flex', gap: 10 }}>
        <Icons.Sparkle size={18} color={FF.yellow} style={{ flexShrink: 0, marginTop: 1 }}/>
        <div style={{ fontSize: 12.5, color: FF.text, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 700, color: FF.yellow }}>Coche ce que tu prends en charge.</span><br/>
          <span style={{ color: FF.textDim }}>Pas besoin de calculatrice, on s'occupe du split.</span>
        </div>
      </div>

      {/* Cart by member */}
      <div style={{ padding: '22px 22px 0' }}>
        {GROUP_MEMBERS.map(m => {
          const items = grouped[m.id] || [];
          if (!items.length) return null;
          const memberTotal = items.reduce((s, c) => s + PRODUCT_BY_ID[c.product].price * c.qty, 0);
          const paidStatus = memberStatus[m.id];
          return (
            <div key={m.id} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Avatar id={m.id} size={28}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: FF.text }}>
                    {m.name}{m.you && <span style={{ color: FF.yellow, fontWeight: 700 }}> (toi)</span>}
                  </div>
                  <div style={{ fontSize: 11, color: FF.textDim }}>{items.length} article{items.length > 1 ? 's' : ''} · {memberTotal.toFixed(2)} €</div>
                </div>
                {paidStatus?.paid ? (
                  <span style={ffPill({ color: FF.green, background:`${FF.green}1A`, border:`1px solid ${FF.green}33`, fontSize: 10.5 })}>
                    <Icons.Check size={10} color={FF.green} sw={3}/> Payé
                  </span>
                ) : (
                  <span style={ffPill({ color: FF.textMute, fontSize: 10.5 })}>En attente</span>
                )}
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {items.map(c => {
                  const p = PRODUCT_BY_ID[c.product];
                  const checked = payChecked.has(c.id);
                  const locked = paidStatus?.paid; // member already paid → can't reclaim
                  return (
                    <button key={c.id} onClick={() => !locked && toggle(c.id)} disabled={locked} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                      borderRadius: 14, width: '100%', textAlign: 'left',
                      background: checked ? `${FF.yellow}12` : FF.card,
                      border: `1px solid ${checked ? FF.yellow + '55' : FF.line}`,
                      cursor: locked ? 'default' : 'pointer',
                      opacity: locked ? 0.55 : 1,
                      transition: 'all .15s',
                    }}>
                      {/* Checkbox */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 7,
                        background: checked ? FF.yellow : 'transparent',
                        border: `1.5px solid ${checked ? FF.yellow : FF.lineHi}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {checked && <Icons.Check size={13} color="#0A0A0C" sw={3.5}/>}
                      </div>
                      <div style={{ width: 44, height: 44, flexShrink: 0 }}>
                        <ProductImg tint={p.tint} label={p.id} height={44} radius={10}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 13.5, color: FF.text }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: FF.textDim, marginTop: 1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.desc}</div>
                      </div>
                      <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 13.5, color: checked ? FF.yellow : FF.text, flexShrink: 0 }}>
                        {(p.price * c.qty).toFixed(2)} €
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Quick split actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button onClick={() => {
            // select only your own items
            const next = new Set();
            cart.forEach(c => { if (c.addedBy === 'leo' && !memberStatus[c.addedBy]?.paid) next.add(c.id); });
            setPayChecked(next);
          }} style={quickBtnC}>
            <Icons.Users size={13} color={FF.text}/> Mes articles
          </button>
          <button onClick={() => {
            // divide equally — pretend we tag every 4th item to me
            const next = new Set();
            const eligible = cart.filter(c => !memberStatus[c.addedBy]?.paid);
            eligible.forEach((c, i) => { if (i % 4 === 0) next.add(c.id); });
            setPayChecked(next);
          }} style={quickBtnC}>
            <Icons.Wallet size={13} color={FF.text}/> Diviser à 4
          </button>
          <button onClick={() => setPayChecked(new Set())} style={quickBtnC}>
            <Icons.X size={20} color={FF.text}/> Reset
          </button>
        </div>
      </div>

      {/* Sticky bottom pay bar */}
      <div style={{
        position: 'absolute', bottom: 78, left: 0, right: 0,
        padding: '12px 18px 14px',
        background: 'linear-gradient(to top, rgba(10,10,12,0.98) 30%, rgba(10,10,12,0.85) 80%, rgba(10,10,12,0))',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 18, background: FF.card, border: `1px solid ${FF.line}`, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: FF.textDim, letterSpacing: 0.2 }}>Ton total personnel</div>
            <div style={{ fontFamily:'"Space Grotesk"', fontSize: 22, fontWeight: 700, marginTop: 1 }}>{myTotal.toFixed(2)} <span style={{ fontSize: 13, color: FF.textDim, fontWeight: 500 }}>€</span></div>
          </div>
          <div style={{ fontSize: 11, color: FF.textMute, textAlign: 'right' }}>
            <div>{myCount} article{myCount > 1 ? 's' : ''} coché{myCount > 1 ? 's' : ''}</div>
            <div>Pas de frais</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onPay} disabled={myTotal === 0} style={{
            flex: 1, padding: '15px', borderRadius: 16,
            background: myTotal === 0 ? FF.card : '#000',
            color: myTotal === 0 ? FF.textMute : '#fff',
            border: `1px solid ${myTotal === 0 ? FF.line : FF.text}`,
            fontWeight: 700, fontSize: 14, cursor: myTotal === 0 ? 'default' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Icons.Apple size={18} color={myTotal === 0 ? FF.textMute : '#fff'}/> Pay
          </button>
          <button onClick={onPay} disabled={myTotal === 0} style={{
            flex: 1.4, padding: '15px', borderRadius: 16,
            background: myTotal === 0 ? FF.card : FF.yellow,
            color: myTotal === 0 ? FF.textMute : '#0A0A0C',
            border: 'none',
            fontWeight: 700, fontSize: 14, cursor: myTotal === 0 ? 'default' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Payer ma part · {myTotal.toFixed(2)} €
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 4 — Fidélité Étudiante
// ─────────────────────────────────────────────────────────────
function LoyaltyScreen() {
  const points = 480;
  const next = 600;
  const ratio = points / next;

  const rewards = [
    { id: 'r1', cost: 200, label: 'Frites offertes',  desc: 'Avec ta prochaine commande', icon: 'Flame',    tint: '#FFA73D', unlocked: true },
    { id: 'r2', cost: 350, label: 'Boisson gratuite', desc: 'Soft ou thé glacé maison',   icon: 'Zap',      tint: '#9EAEFF', unlocked: true },
    { id: 'r3', cost: 500, label: 'Burger offert',    desc: 'Smash Royal · pour un repas', icon: 'Burger',   tint: '#FF6B1F', unlocked: false },
    { id: 'r4', cost: 800, label: 'Menu duo offert',  desc: 'À partager avec un ami',     icon: 'Users',    tint: '#FF7AB8', unlocked: false },
  ];

  const history = [
    { id: 'h1', date: 'Aujourd\'hui', label: 'Commande Table 12', pts: 28, sign: '+' },
    { id: 'h2', date: 'Hier',         label: 'Streak 7 jours',     pts: 50, sign: '+' },
    { id: 'h3', date: 'Lun.',         label: 'Frites offertes',    pts: 200, sign: '−' },
    { id: 'h4', date: 'Dim.',         label: 'Commande Crous',     pts: 32, sign: '+' },
  ];

  return (
    <div style={{ paddingBottom: 120, color: FF.text }}>
      <div style={{ padding: '60px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize: 11.5, color: FF.yellow, letterSpacing: 1, textTransform:'uppercase', fontWeight: 700 }}>Fidélité</div>
            <h1 style={{ fontFamily:'"Space Grotesk"', fontSize: 26, fontWeight: 700, margin: '4px 0 0', letterSpacing: -0.6 }}>Statut Étudiant</h1>
          </div>
          <button style={iconBtnC}><Icons.Settings size={18} color={FF.text}/></button>
        </div>
      </div>

      {/* Hero tier card */}
      <div style={{ margin: '20px 22px 0', padding: '18px 18px 16px', borderRadius: 24,
        background: `linear-gradient(135deg, ${FF.yellow}20 0%, ${FF.card} 50%)`,
        border: `1px solid ${FF.yellow}40`, position: 'relative', overflow: 'hidden',
      }}>
        {/* decoration */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 160, background: `${FF.yellow}10`, filter: 'blur(20px)' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: FF.textDim }}>Léo · Étudiant</div>
              <div style={{ fontFamily:'"Space Grotesk"', fontSize: 44, fontWeight: 700, lineHeight: 1, marginTop: 6, letterSpacing: -2 }}>
                {points} <span style={{ fontSize: 14, color: FF.textDim, fontWeight: 500, letterSpacing: 0 }}>pts</span>
              </div>
            </div>
            <div style={{ padding: '6px 12px', borderRadius: 999, background: FF.yellow, color: '#0A0A0C', fontWeight: 800, fontSize: 12, letterSpacing: 0.5 }}>
              TIER OR
            </div>
          </div>

          {/* progress to next */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: FF.textDim, marginBottom: 5 }}>
              <span>Or</span><span>Platine · {next} pts</span>
            </div>
            <div style={{ height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.07)', overflow:'hidden' }}>
              <div style={{ width: `${ratio * 100}%`, height: '100%', background: `linear-gradient(90deg, ${FF.yellow}, #B6FF1A)`, borderRadius: 6 }}/>
            </div>
            <div style={{ fontSize: 11.5, color: FF.text, marginTop: 6, fontWeight: 600 }}>
              Encore <span style={{ color: FF.yellow }}>{next - points} pts</span> avant le tier Platine
            </div>
          </div>
        </div>
      </div>

      {/* QR Code / scan in-store */}
      <div style={{ margin: '14px 22px 0', padding: '14px 16px', borderRadius: 18, background: FF.card, border: `1px solid ${FF.line}`, display:'flex', alignItems:'center', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: '#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icons.QrCode size={36} color="#0A0A0C" sw={2}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily:'"Space Grotesk"', fontSize: 14.5, fontWeight: 700 }}>Scanner en caisse</div>
          <div style={{ fontSize: 12, color: FF.textDim, marginTop: 1 }}>Pour cumuler tes points si tu commandes au comptoir.</div>
        </div>
        <Icons.ChevronRight size={18} color={FF.textMute}/>
      </div>

      {/* Streaks */}
      <div style={{ margin: '18px 22px 0' }}>
        <h3 style={{ ...sectionTitleC, marginBottom: 10 }}>Tes streaks</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { v: '7', label: 'Jours\nd\'affilée', tint: FF.yellow,  icon: 'Flame' },
            { v: '12', label: 'Commandes\nce mois', tint: FF.green,  icon: 'Trophy' },
            { v: '4', label: 'Amis\nparrainés', tint: FF.pink, icon: 'Heart' },
          ].map((s, i) => {
            const Cmp = Icons[s.icon];
            return (
              <div key={i} style={{ padding: '12px 12px', borderRadius: 16, background: FF.card, border: `1px solid ${FF.line}` }}>
                <Cmp size={16} color={s.tint}/>
                <div style={{ fontFamily:'"Space Grotesk"', fontSize: 22, fontWeight: 700, marginTop: 8, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: FF.textDim, marginTop: 6, whiteSpace:'pre-line', lineHeight: 1.3 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards */}
      <div style={{ margin: '22px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'baseline' }}>
          <h3 style={sectionTitleC}>Récompenses</h3>
          <span style={{ fontSize: 11.5, color: FF.textMute }}>{rewards.filter(r=>r.unlocked).length} disponibles</span>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          {rewards.map(r => {
            const Cmp = Icons[r.icon];
            const locked = !r.unlocked;
            return (
              <div key={r.id} style={{
                padding: '12px 14px', borderRadius: 16,
                background: FF.card, border: `1px solid ${FF.line}`,
                display: 'flex', alignItems: 'center', gap: 12,
                opacity: locked ? 0.55 : 1,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${r.tint}1F`, border: `1px solid ${r.tint}33`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink: 0,
                }}>
                  <Cmp size={18} color={r.tint}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily:'"Space Grotesk"', fontSize: 14, fontWeight: 700 }}>{r.label}</div>
                  <div style={{ fontSize: 11.5, color: FF.textDim, marginTop: 1 }}>{r.desc}</div>
                </div>
                <button disabled={locked} style={{
                  padding: '8px 12px', borderRadius: 10,
                  background: locked ? 'transparent' : FF.yellow,
                  color: locked ? FF.textMute : '#0A0A0C',
                  border: locked ? `1px dashed ${FF.lineHi}` : 'none',
                  fontWeight: 700, fontSize: 12,
                  cursor: locked ? 'default' : 'pointer', flexShrink: 0,
                }}>
                  {locked ? `${r.cost} pts` : 'Échanger'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div style={{ margin: '22px 22px 0' }}>
        <h3 style={{ ...sectionTitleC, marginBottom: 10 }}>Activité récente</h3>
        <div style={{ borderRadius: 16, background: FF.card, border: `1px solid ${FF.line}`, overflow:'hidden' }}>
          {history.map((h, i) => (
            <div key={h.id} style={{
              padding: '12px 14px', display:'flex', alignItems:'center', gap: 10,
              borderTop: i === 0 ? 'none' : `1px solid ${FF.line}`,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 10,
                background: h.sign === '+' ? `${FF.green}1A` : `${FF.orange}1A`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {h.sign === '+' ?
                  <Icons.Plus size={14} color={FF.green} sw={2.5}/> :
                  <Icons.Gift size={14} color={FF.orange} sw={2}/>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{h.label}</div>
                <div style={{ fontSize: 11, color: FF.textDim, marginTop: 1 }}>{h.date}</div>
              </div>
              <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 13.5, color: h.sign === '+' ? FF.green : FF.orange }}>
                {h.sign}{h.pts}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconBtnC = {
  position: 'relative',
  width: 40, height: 40, borderRadius: 12,
  background: FF.card, border: `1px solid ${FF.line}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};
const sectionTitleC = {
  fontFamily:'"Space Grotesk", system-ui', fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: -0.2,
};
const quickBtnC = {
  flex: 1, padding: '10px 8px', borderRadius: 12,
  background: FF.card, color: FF.text, border: `1px solid ${FF.line}`,
  fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
};

Object.assign(window, { CartScreen, LoyaltyScreen });
