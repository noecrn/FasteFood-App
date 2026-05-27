// Faste Food — Screens: Menu (Home) + Assistant
const { useState, useMemo, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// SCREEN 1 — Menu / Home
// ─────────────────────────────────────────────────────────────
function MenuScreen({ onOpenAssistant, onAddToGroup, onOpenCart, groupCount, groupTotal }) {
  const [activeCat, setActiveCat] = useState('burger');
  const filtered = PRODUCTS.filter(p => activeCat === 'all' || p.cat === activeCat);
  const popular = PRODUCTS.slice(0, 4);

  return (
    <div style={{ paddingBottom: 140, color: FF.text, fontFamily: '-apple-system, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '60px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: FF.textMute, letterSpacing: 0.2 }}>Salut, Léo 👋</div>
          <div style={{ fontFamily: '"Space Grotesk", system-ui', fontSize: 24, fontWeight: 700, marginTop: 2, letterSpacing: -0.5 }}>
            Qu'est-ce qu'on mange ?
          </div>
        </div>
        <button style={iconBtn}><Icons.Bell size={20} color={FF.text}/>
          <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 7, background: FF.orange }}/>
        </button>
      </div>

      {/* Loyalty status card */}
      <div style={{ margin: '18px 22px 0', padding: '14px 16px', borderRadius: 18,
        background: `linear-gradient(135deg, ${FF.cardHi}, ${FF.card})`,
        border: `1px solid ${FF.line}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${FF.yellow}1A`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icons.Trophy size={20} color={FF.yellow}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 13, color: FF.textDim }}>Statut Étudiant</span>
            <span style={{ fontSize: 11, padding: '1.5px 7px', borderRadius: 999, background: FF.yellow, color: '#0A0A0C', fontWeight: 700 }}>OR</span>
          </div>
          <div style={{ fontFamily:'"Space Grotesk"', fontSize: 18, fontWeight: 700, marginTop: 1 }}>480 <span style={{ fontSize: 11, color: FF.textDim, fontWeight: 500 }}>pts · plus que 120 avant Platine</span></div>
          <div style={{ marginTop: 7, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.07)', overflow:'hidden' }}>
            <div style={{ width: '80%', height: '100%', background: `linear-gradient(90deg, ${FF.yellow}, #B6FF1A)` }}/>
          </div>
        </div>
      </div>

      {/* Assistant banner */}
      <button onClick={onOpenAssistant} style={{
        margin: '14px 22px 0', padding: '16px 18px', borderRadius: 22,
        background: FF.yellow, color: '#0A0A0C',
        display: 'flex', alignItems: 'center', gap: 14,
        width: 'calc(100% - 44px)', border: 'none', cursor: 'pointer',
        boxShadow: `0 12px 30px -10px ${FF.yellow}80`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, background: '#0A0A0C',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icons.Sparkle size={22} color={FF.yellow}/>
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontFamily:'"Space Grotesk"', fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>Pas d'idée ce midi ?</div>
          <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.7, marginTop: 1 }}>L'Assistant te trouve un plat en 15 sec.</div>
        </div>
        <Icons.ArrowRight size={20} color="#0A0A0C"/>
        {/* decorative tag */}
        <div style={{ position:'absolute', top: -8, right: -8, width: 70, height: 70, borderRadius: 70, background: 'rgba(0,0,0,0.06)'}}/>
      </button>

      {/* Categories — horizontal scroll */}
      <div style={{ marginTop: 22 }}>
        <div style={{ padding: '0 22px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3 style={{ ...sectionTitle }}>Catégories</h3>
          <span style={{ fontSize: 12, color: FF.textMute }}>Par pays · Du moment</span>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 10, padding: '12px 22px 4px' }}>
            {CATEGORIES.map(c => {
              const active = c.id === activeCat;
              const Cmp = Icons[c.icon];
              return (
                <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                  flexShrink: 0, padding: '10px 14px 10px 12px', borderRadius: 14,
                  display: 'flex', alignItems: 'center', gap: 9,
                  background: active ? FF.text : FF.card,
                  color: active ? '#0A0A0C' : FF.text,
                  border: `1px solid ${active ? FF.text : FF.line}`,
                  cursor: 'pointer', transition: 'all .15s',
                }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: active ? '#0A0A0C' : `${c.tint}22`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Cmp size={15} color={active ? c.tint : c.tint}/>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Du moment — featured horizontal */}
      <div style={{ marginTop: 18 }}>
        <div style={{ padding: '0 22px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3 style={sectionTitle}>Du moment <span style={{ color: FF.orange, marginLeft: 4 }}>🔥</span></h3>
          <span style={{ fontSize: 12, color: FF.textMute }}>Tout voir</span>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 12, padding: '12px 22px 4px' }}>
            {PRODUCTS.filter(p => p.hot).map(p => (
              <FeaturedCard key={p.id} product={p} onAdd={() => onAddToGroup(p.id)}/>
            ))}
          </div>
        </div>
      </div>

      {/* Populaire — vertical list */}
      <div style={{ marginTop: 22 }}>
        <div style={{ padding: '0 22px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3 style={sectionTitle}>Populaire chez les étudiants</h3>
        </div>
        <div style={{ padding: '12px 22px 0', display: 'grid', gap: 10 }}>
          {popular.map(p => <PopularRow key={p.id} product={p} onAdd={() => onAddToGroup(p.id)} />)}
        </div>
      </div>

      {/* Floating Grab Groupe FAB */}
      {groupCount > 0 && (
        <button onClick={onOpenCart} style={{
          position: 'absolute', bottom: 96, left: 22, right: 22,
          padding: '12px 14px', borderRadius: 16,
          background: '#0A0A0C', border: `1px solid ${FF.lineHi}`,
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
          boxShadow: '0 14px 30px rgba(0,0,0,0.55)',
        }}>
          <div style={{ display: 'flex' }}>
            {GROUP_MEMBERS.slice(0,3).map((m, i) => (
              <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar id={m.id} size={26} ring/></div>
            ))}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: FF.text }}>Grab Groupe · Table 12</div>
            <div style={{ fontSize: 11, color: FF.textDim }}>{groupCount} articles · {groupTotal.toFixed(2)} €</div>
          </div>
          <div style={{ padding: '7px 12px', borderRadius: 10, background: FF.yellow, color: '#0A0A0C', fontSize: 12, fontWeight: 700 }}>
            Voir
          </div>
        </button>
      )}
    </div>
  );
}

// Featured card (horizontal scroll)
function FeaturedCard({ product, onAdd }) {
  return (
    <div style={{ width: 200, flexShrink: 0, padding: 10, borderRadius: 22,
      background: FF.card, border: `1px solid ${FF.line}` }}>
      <ProductImg tint={product.tint} label={`[ ${product.id}.jpg ]`} height={130} radius={14}/>
      <div style={{ padding: '10px 4px 2px' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
          <span style={{ ...ffPill({ background: `${product.tint}1A`, color: product.tint, border: `1px solid ${product.tint}33`, padding:'3px 8px', fontSize:10 }) }}>{product.tag}</span>
        </div>
        <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 15, marginTop: 7 }}>{product.name}</div>
        <div style={{ fontSize: 11.5, color: FF.textDim, marginTop: 2, lineHeight: 1.3, height: 28, overflow:'hidden' }}>{product.desc}</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 10 }}>
          <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 15 }}>{product.price.toFixed(2)}<span style={{ fontSize: 11, color: FF.textDim }}> €</span></div>
          <button onClick={onAdd} aria-label="Ajouter" style={addBtn}>
            <Icons.Plus size={16} color="#0A0A0C" sw={2.5}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// Popular row (compact)
function PopularRow({ product, onAdd }) {
  return (
    <div style={{
      padding: 10, borderRadius: 18, background: FF.card,
      border: `1px solid ${FF.line}`,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ width: 64, height: 64, flexShrink: 0 }}>
        <ProductImg tint={product.tint} label={product.id} height={64} radius={12}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'"Space Grotesk"', fontSize: 14.5, fontWeight: 700 }}>{product.name}</span>
          {product.spicy > 0 && <span style={{ display:'inline-flex', gap: 1 }}>{Array.from({length: product.spicy}).map((_,i)=>(<Icons.Flame key={i} size={11} color={FF.orange} sw={2}/>))}</span>}
        </div>
        <div style={{ fontSize: 11.5, color: FF.textDim, marginTop: 1, lineHeight: 1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{product.desc}</div>
        <div style={{ marginTop: 4, fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 13.5 }}>{product.price.toFixed(2)} €</div>
      </div>
      <button onClick={onAdd} style={{...addBtn, width: 36, height: 36 }}>
        <Icons.Plus size={18} color="#0A0A0C" sw={2.5}/>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 — Assistant de Décision
// ─────────────────────────────────────────────────────────────
const ASSISTANT_STEPS = [
  { key: 'faim', q: 'Quel niveau de faim ?', sub: 'Étape 1 / 3',
    options: [
      { id: 'snack',    label: 'Petit creux',  hint: '< 6 €',       emoji: '🍟', tint: '#9EAEFF' },
      { id: 'classic',  label: 'Classique',    hint: '~ 9 €',       emoji: '🍔', tint: '#FFA73D' },
      { id: 'dalle',    label: 'Dalle énorme', hint: 'Menu complet', emoji: '🦖', tint: '#FF6B1F' },
    ]},
  { key: 'envie', q: "Tu pars sur quoi ?", sub: 'Étape 2 / 3',
    options: [
      { id: 'reconfort', label: 'Réconfortant', hint: 'Gras, fondant, généreux', emoji: '🧀', tint: '#FFA73D' },
      { id: 'epice',     label: 'Épicé',        hint: 'Ça pique, ça réveille',   emoji: '🌶️', tint: '#FF6B1F' },
      { id: 'healthy',   label: 'Healthy',      hint: 'Frais, équilibré',        emoji: '🥗', tint: '#7DF29F' },
      { id: 'icone',     label: 'Iconique',     hint: 'Le best-seller',          emoji: '⭐', tint: '#E8FF3D' },
    ]},
  { key: 'pays', q: "Une envie particulière ?", sub: 'Étape 3 / 3',
    options: [
      { id: 'us',    label: 'USA',     hint: 'Burger, wings, ribs', emoji: '🇺🇸', tint: '#FF6B1F' },
      { id: 'mex',   label: 'Mexique', hint: 'Tacos, birria, salsa', emoji: '🇲🇽', tint: '#E8FF3D' },
      { id: 'asia',  label: 'Asie',    hint: 'Poké, bao, nems',     emoji: '🇯🇵', tint: '#FF7AB8' },
      { id: 'surp',  label: 'Surprends-moi', hint: 'Roulette du chef', emoji: '🎲', tint: '#9EAEFF' },
    ]},
];

function AssistantScreen({ onAddToGroup, goMenu }) {
  const [step, setStep] = useState(0); // 0..2 questions, 3 = result
  const [answers, setAnswers] = useState({});

  const pick = (key, val) => {
    setAnswers(a => ({ ...a, [key]: val }));
    setTimeout(() => setStep(s => s + 1), 280);
  };

  const reset = () => { setAnswers({}); setStep(0); };

  // Decide result based on answers
  const result = useMemo(() => {
    const { envie, faim, pays } = answers;
    if (envie === 'healthy' || pays === 'asia') return PRODUCT_BY_ID.poke;
    if (envie === 'epice' || pays === 'us') return PRODUCT_BY_ID.wings;
    if (pays === 'mex') return PRODUCT_BY_ID.birria;
    if (envie === 'reconfort' || faim === 'dalle') return PRODUCT_BY_ID.smash;
    return PRODUCT_BY_ID.algerois;
  }, [answers]);

  if (step >= ASSISTANT_STEPS.length) {
    return <AssistantResult product={result} onRestart={reset} onAdd={() => { onAddToGroup(result.id); goMenu(); }} answers={answers}/>;
  }

  const current = ASSISTANT_STEPS[step];

  return (
    <div style={{ paddingBottom: 120, color: FF.text }}>
      <div style={{ padding: '60px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => step > 0 ? setStep(s => s - 1) : null} style={{...iconBtn, opacity: step > 0 ? 1 : 0.35 }} disabled={step === 0}>
            <Icons.ArrowLeft size={20} color={FF.text}/>
          </button>
          <div style={{ display:'flex', gap: 6 }}>
            {ASSISTANT_STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 22 : 6, height: 6, borderRadius: 6,
                background: i <= step ? FF.yellow : 'rgba(255,255,255,0.12)',
                transition: 'all .25s',
              }}/>
            ))}
          </div>
          <button onClick={reset} style={{...iconBtn }}>
            <Icons.X size={26} color={FF.text}/>
          </button>
        </div>
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11.5, color: FF.yellow, letterSpacing: 1, textTransform:'uppercase', fontWeight: 700 }}>Assistant · {current.sub}</div>
          <h1 style={{ fontFamily:'"Space Grotesk"', fontSize: 30, fontWeight: 700, lineHeight: 1.1, letterSpacing: -0.8, margin: '8px 0 0' }}>
            {current.q}
          </h1>
          <div style={{ fontSize: 13, color: FF.textDim, marginTop: 8 }}>Tape juste sur ton humeur. On s'occupe du reste.</div>
        </div>
      </div>

      <div style={{ padding: '24px 22px 0', display: 'grid', gap: 12 }}>
        {current.options.map(opt => {
          const selected = answers[current.key] === opt.id;
          return (
            <button key={opt.id} onClick={() => pick(current.key, opt.id)} style={{
              padding: '16px 18px', borderRadius: 20,
              background: selected ? FF.text : FF.card,
              color: selected ? '#0A0A0C' : FF.text,
              border: `1px solid ${selected ? FF.text : FF.line}`,
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', textAlign: 'left',
              transition: 'all .15s',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${opt.tint}1F`, border: `1px solid ${opt.tint}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{opt.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 17, letterSpacing: -0.2 }}>{opt.label}</div>
                <div style={{ fontSize: 12.5, color: selected ? 'rgba(0,0,0,0.55)' : FF.textDim, marginTop: 2 }}>{opt.hint}</div>
              </div>
              <Icons.ChevronRight size={18} color={selected ? '#0A0A0C' : FF.textMute}/>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AssistantResult({ product, onRestart, onAdd, answers }) {
  return (
    <div style={{ paddingBottom: 120, color: FF.text }}>
      <div style={{ padding: '60px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11.5, color: FF.yellow, letterSpacing: 1, textTransform:'uppercase', fontWeight: 700 }}>Verdict</div>
        <button onClick={onRestart} style={iconBtn}><Icons.X size={26} color={FF.text}/></button>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <h1 style={{ fontFamily:'"Space Grotesk"', fontSize: 30, fontWeight: 700, lineHeight: 1.05, letterSpacing: -0.8, margin: 0 }}>
          Ce qu'il te faut<br/>
          <span style={{ color: FF.yellow }}>aujourd'hui ↓</span>
        </h1>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <div style={{ padding: 14, borderRadius: 24, background: FF.card, border: `1px solid ${FF.line}` }}>
          <ProductImg tint={product.tint} label={`[ ${product.id}.jpg ]`} height={170} radius={16}/>
          <div style={{ padding: '14px 6px 4px' }}>
            <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
              <span style={ffPill({ background: `${product.tint}1A`, color: product.tint, border: `1px solid ${product.tint}33` })}>{product.tag || 'Pour toi'}</span>
              {product.spicy > 0 && <span style={ffPill({ color: FF.orange, background:`${FF.orange}1A`, border:`1px solid ${FF.orange}33`})}>
                <Icons.Flame size={11} color={FF.orange} sw={2}/> Épicé
              </span>}
              <span style={ffPill()}><Icons.Clock size={11} sw={2}/> 8 min</span>
            </div>
            <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 22, marginTop: 10, letterSpacing: -0.5 }}>{product.name}</div>
            <div style={{ fontSize: 13, color: FF.textDim, marginTop: 4, lineHeight: 1.4 }}>{product.desc}</div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 14 }}>
              <div style={{ fontFamily:'"Space Grotesk"', fontWeight: 700, fontSize: 22 }}>{product.price.toFixed(2)} €</div>
              <button onClick={onAdd} style={{
                padding: '12px 18px', borderRadius: 14, background: FF.yellow, color: '#0A0A0C',
                fontWeight: 700, fontSize: 13.5, border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <Icons.Plus size={16} sw={2.5} color="#0A0A0C"/> Ajouter au groupe
              </button>
            </div>
          </div>
        </div>

        {/* Why this dish */}
        <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 16, background: FF.bg2, border: `1px dashed ${FF.lineHi}` }}>
          <div style={{ fontSize: 11, color: FF.textMute, textTransform:'uppercase', letterSpacing: 1, fontWeight: 700 }}>Pourquoi ce choix</div>
          <div style={{ fontSize: 13, color: FF.textDim, marginTop: 4, lineHeight: 1.5 }}>
            Tu as choisi <span style={{ color: FF.text, fontWeight: 600 }}>{Object.values(answers).filter(Boolean).join(' · ')}</span>. On t'a sélectionné un plat qui combine tout ça — sans devoir scroller la carte pendant 10 minutes.
          </div>
        </div>

        <button onClick={onRestart} style={{
          marginTop: 14, width: '100%', padding: '14px', borderRadius: 14,
          background: 'transparent', color: FF.textDim, border: `1px solid ${FF.line}`,
          fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>
          Relancer l'assistant
        </button>
      </div>
    </div>
  );
}

// shared styles
const iconBtn = {
  position: 'relative',
  width: 40, height: 40, borderRadius: 12,
  background: FF.card, border: `1px solid ${FF.line}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: FF.text,
};
const addBtn = {
  width: 32, height: 32, borderRadius: 10, background: FF.yellow,
  border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
};
const sectionTitle = {
  fontFamily:'"Space Grotesk", system-ui', fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: -0.2,
};

Object.assign(window, { MenuScreen, AssistantScreen });
