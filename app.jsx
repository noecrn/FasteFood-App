// Faste Food — Main App + Bottom Nav + Pay sheet + Tweaks
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA, useMemo: useMemoA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#FFC52C","#FF4D2D"],
  "density": "comfy",
  "showStudentBanner": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent dynamically — mutate global token object so all screens read latest
  const [_force, setForce] = useStateA(0);
  useEffectA(() => {
    const [primary, secondary] = tweaks.accent || ['#E8FF3D', '#FF6B1F'];
    FF.yellow = primary;
    FF.orange = secondary;
    setForce(f => f + 1);
  }, [tweaks.accent]);

  // Tab state
  const [tab, setTab] = useStateA('menu'); // 'menu' | 'assistant' | 'cart' | 'loyalty'
  const [cart, setCart] = useStateA([...GROUP_CART]);
  const [payChecked, setPayChecked] = useStateA(new Set());
  const [toast, setToast] = useStateA(null);
  const [paySheet, setPaySheet] = useStateA(null); // null | 'confirming' | 'success'

  // Pre-app session gate (QR entry)
  const [session, setSession] = useStateA(null); // { table, sessionCode, role, status, billingMode }

  // Demo presence + real-time-ish activity feed (Grab-like)
  const [presence, setPresence] = useStateA(() => ({
    thibaut: { joined: true,  ready: false, paid: false },
    lola:    { joined: true,  ready: false, paid: false },
    yass:    { joined: true,  ready: false, paid: false },
  }));
  const [activity, setActivity] = useStateA(() => ([
    { id: 'a1', t: Date.now() - 1000 * 60 * 2, text: 'Lola a rejoint la commande' },
    { id: 'a2', t: Date.now() - 1000 * 60,     text: 'Yass a rejoint la commande' },
  ]));

  const pushActivity = (text) => {
    const id = `a${Date.now()}`;
    setActivity(a => [{ id, t: Date.now(), text }, ...a].slice(0, 8));
  };

  const groupTotal = cart.reduce((s, c) => s + PRODUCT_BY_ID[c.product].price * c.qty, 0);
  const myTotal = cart.reduce((s, c) => payChecked.has(c.id) ? s + PRODUCT_BY_ID[c.product].price * c.qty : s, 0);

  // Add to group from any screen
  const addToGroup = (productId) => {
    const id = `c${Date.now()}`;
    setCart(c => [...c, { id, product: productId, qty: 1, addedBy: 'thibaut' }]);
    const p = PRODUCT_BY_ID[productId];
    setToast(`+ ${p.name} ajouté au groupe`);
    pushActivity(`Thibaut a ajouté “${p.name}”`);
    setTimeout(() => setToast(null), 1800);
  };

  const startPay = () => {
    setPaySheet('confirming');
  };
  const confirmPay = () => {
    setPaySheet('success');
    setTimeout(() => {
      // remove paid items from cart
      setCart(c => c.filter(it => !payChecked.has(it.id)));
      setPayChecked(new Set());
      setPaySheet(null);
    }, 1900);
  };

  // Wiring payment to presence (split-bill default)
  useEffectA(() => {
    if (!session || session.billingMode !== 'split') return;
    // If paySheet is open/success we keep logic inside CartScreen (which will call setPresence),
    // but as a safety: if nothing selected, ensure (toi) isn't flagged paid.
    if (payChecked.size === 0) {
      setPresence(p => ({ ...p, thibaut: { ...p.thibaut, paid: false } }));
    }
  }, [session, payChecked.size]);

  // For Tweaks panel: knobs
  return (
    <div style={{ minHeight: '100vh', background: '#ECECF2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
      <IOSDevice dark={false} width={402} height={874}>
        <div style={{
          position: 'absolute', inset: 0, background: FF.bg,
          color: FF.text, overflow: 'hidden',
        }}>
          {/* Screen container with scroll */}
          <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            {!session ? (
              <QrEntryScreen onEnter={(s) => { setSession(s); setTab('menu'); }} />
            ) : (
              <>
                {tab === 'menu' &&
                  <MenuScreen
                    onOpenAssistant={() => setTab('assistant')}
                    onAddToGroup={addToGroup}
                    onOpenCart={() => setTab('cart')}
                    groupCount={cart.length}
                    groupTotal={groupTotal}
                    session={session}
                    setSession={setSession}
                    presence={presence}
                    setPresence={setPresence}
                    activity={activity}
                    pushActivity={pushActivity}
                  />
                }
                {tab === 'assistant' &&
                  <AssistantScreen
                    onAddToGroup={addToGroup}
                    goMenu={() => setTab('menu')}
                    session={session}
                  />
                }
                {tab === 'cart' &&
                  <CartScreen
                    cart={cart}
                    setCart={setCart}
                    onPay={startPay}
                    payChecked={payChecked}
                    setPayChecked={setPayChecked}
                    session={session}
                    setSession={setSession}
                    presence={presence}
                    setPresence={setPresence}
                    activity={activity}
                    pushActivity={pushActivity}
                  />
                }
                {tab === 'loyalty' && <LoyaltyScreen session={session} />}
              </>
            )}
          </div>

          {/* Bottom nav */}
          {session && (
            <BottomNav
              tab={tab}
              setTab={setTab}
              cartCount={cart.length}
              groupTotal={groupTotal}
              onOpenCart={() => setTab('cart')}
            />
          )}

          {/* Toast */}
          {toast && (
            <div style={{
              position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
              padding: '10px 16px', borderRadius: 999,
              background: FF.text, color: '#0A0A0C',
              fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
              boxShadow: '0 10px 28px rgba(0,0,0,0.5)',
              animation: 'ffToast .25s ease-out',
              zIndex: 100,
            }}>
              {toast}
            </div>
          )}

          {/* Pay sheet */}
          {paySheet && (
            <PaySheet state={paySheet} amount={myTotal} onConfirm={confirmPay} onClose={() => setPaySheet(null)}/>
          )}
        </div>
      </IOSDevice>

      <TweaksPanel title="Faste Food">
        <TweakSection label="Palette accent">
          <TweakColor
            label="Couleur"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={[
              ['#E8FF3D','#FF6B1F'],
              ['#FF6B1F','#E8FF3D'],
              ['#B6FF1A','#7DF29F'],
              ['#FF7AB8','#9EAEFF'],
            ]}
          />
        </TweakSection>
        <TweakSection label="Naviguer">
          <TweakSelect
            label="Écran"
            value={tab}
            onChange={setTab}
            options={[
              { value: 'menu',      label: 'Menu / Accueil' },
              { value: 'assistant', label: 'Assistant' },
              { value: 'cart',      label: 'Grab Groupe' },
              { value: 'loyalty',   label: 'Fidélité' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Session (démo)">
          <TweakButton secondary label={session ? `Quitter la table ${session.table}` : 'Aller au scan QR'} onClick={() => {
            setSession(null);
            setTab('menu');
          }}/>
        </TweakSection>
        <TweakSection label="Démo Grab Groupe">
          <TweakButton label="Cocher mes articles" onClick={() => {
            const next = new Set();
            cart.forEach(c => { if (c.addedBy === 'thibaut') next.add(c.id); });
            setPayChecked(next);
            setTab('cart');
          }}/>
          <TweakButton secondary label="Reset commande" onClick={() => {
            setCart([...GROUP_CART]);
            setPayChecked(new Set());
            setPresence({
              thibaut: { joined: true, ready: false, paid: false },
              lola:    { joined: true, ready: false, paid: false },
              yass:    { joined: true, ready: false, paid: false },
            });
            setActivity([
              { id: 'a1', t: Date.now() - 1000 * 60 * 2, text: 'Lola a rejoint la commande' },
              { id: 'a2', t: Date.now() - 1000 * 60,     text: 'Yass a rejoint la commande' },
            ]);
          }}/>
        </TweakSection>
      </TweaksPanel>

      <style>{`
        @keyframes ffToast {
          0% { opacity: 0; transform: translate(-50%, 8px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes ffSlideUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        @keyframes ffPop {
          0% { transform: scale(.85); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom navigation
// ─────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab, cartCount, groupTotal, onOpenCart }) {
  const items = [
    { id: 'menu',      label: 'Menu',     icon: 'Home' },
    { id: 'assistant', label: 'Assistant',icon: 'Sparkle' },
    { id: 'cart',      label: 'Grab',     icon: 'Users', badge: cartCount },
    { id: 'loyalty',   label: 'Fidélité', icon: 'Trophy' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      paddingBottom: 28, paddingTop: 10,
      background: 'linear-gradient(to top, rgba(247,247,249,1) 55%, rgba(247,247,249,0.9) 85%, rgba(247,247,249,0))',
    }}>
      {/* Floating Grab Groupe FAB — attached to navbar, only on menu */}
      {tab === 'menu' && cartCount > 0 && (
        <button onClick={onOpenCart} style={{
          margin: '0 14px 10px',
          padding: '12px 14px', borderRadius: 16,
          background: '#111114', border: `1px solid rgba(255,255,255,0.10)`,
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
          boxShadow: '0 14px 30px rgba(17,17,20,0.22)',
          width: 'calc(100% - 28px)',
          animation: 'ffPop .3s ease-out',
        }}>
          <div style={{ display: 'flex' }}>
            {GROUP_MEMBERS.slice(0,3).map((m, i) => (
              <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar id={m.id} size={26} ring/></div>
            ))}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#fff' }}>Grab Groupe · Table 12</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)' }}>{cartCount} articles · {groupTotal.toFixed(2)} €</div>
          </div>
          <div style={{ padding: '7px 12px', borderRadius: 10, background: FF.yellow, color: '#111114', fontSize: 12, fontWeight: 900 }}>
            Voir
          </div>
        </button>
      )}

      <div style={{
        margin: '0 14px', padding: '8px',
        borderRadius: 22, background: 'rgba(255,255,255,0.86)',
        border: `1px solid ${FF.lineHi}`,
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}>
        {items.map(it => {
          const active = it.id === tab;
          const Cmp = Icons[it.icon];
          return (
            <button key={it.id} onClick={() => setTab(it.id)} style={{
              flex: 1, padding: '8px 6px', borderRadius: 14,
              background: active ? FF.text : 'transparent',
              color: active ? '#FFFFFF' : FF.textDim,
              border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              position: 'relative', transition: 'all .18s',
            }}>
              <div style={{ position:'relative' }}>
                <Cmp size={20} color={active ? '#FFFFFF' : FF.text} sw={active ? 2 : 1.75}/>
                {it.badge > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -8, minWidth: 16, height: 16,
                    padding: '0 4px', borderRadius: 8, background: FF.yellow,
                    color: '#111114', fontSize: 9.5, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{it.badge}</span>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: 0.1 }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pay sheet (Apple Pay-style confirmation)
// ─────────────────────────────────────────────────────────────
function PaySheet({ state, amount, onConfirm, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(17,17,20,0.28)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', borderRadius: '28px 28px 0 0',
        background: FF.bg2, border: `1px solid ${FF.line}`,
        padding: '14px 22px 34px',
        animation: 'ffSlideUp .25s ease-out',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 4, background: 'rgba(17,17,20,0.14)', margin: '0 auto 14px' }}/>

        {state === 'confirming' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11.5, color: FF.textDim, letterSpacing: 0.4, textTransform:'uppercase', fontWeight: 700 }}>Confirmer le paiement</div>
                <div style={{ fontFamily:'"Space Grotesk"', fontSize: 32, fontWeight: 700, marginTop: 4, letterSpacing: -1 }}>{amount.toFixed(2)} €</div>
              </div>
              <button onClick={onClose} style={{...iconBtnApp }}><Icons.X size={26} color={FF.text}/></button>
            </div>

            <div style={{ padding: '14px 16px', borderRadius: 16, background: FF.card, border: `1px solid ${FF.line}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#000', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icons.Apple size={20} color="#fff"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Apple Pay</div>
                <div style={{ fontSize: 11, color: FF.textDim }}>•••• 4421 · Carte CB</div>
              </div>
              <Icons.Check size={18} color={FF.yellow} sw={3}/>
            </div>

            <div style={{ padding: '14px 16px', borderRadius: 16, background: FF.card, border: `1px solid ${FF.line}`, fontSize: 12.5, color: FF.textDim, lineHeight: 1.4, marginBottom: 18 }}>
              <span style={{ color: FF.text, fontWeight: 600 }}>Tu paies uniquement ta part.</span><br/>
              Les autres reçoivent un rappel pour régler la leur. Aucune avance, aucun calcul.
            </div>

            <button onClick={onConfirm} style={{
              width: '100%', padding: '16px', borderRadius: 16,
              background: '#000', color: '#fff', border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 15,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Icons.Apple size={20} color="#fff"/> Payer avec Apple Pay
            </button>
          </>
        )}

        {state === 'success' && (
          <div style={{ padding: '12px 0 24px', textAlign: 'center', animation: 'ffPop .35s ease-out' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 72, margin: '0 auto',
              background: FF.yellow, display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Icons.Check size={36} color="#111114" sw={3.2}/>
            </div>
            <div style={{ fontFamily:'"Space Grotesk"', fontSize: 22, fontWeight: 700, marginTop: 16, letterSpacing: -0.5 }}>Paiement confirmé</div>
            <div style={{ fontSize: 13, color: FF.textDim, marginTop: 6, padding: '0 24px', lineHeight: 1.4 }}>
              {amount.toFixed(2)} € débités · <span style={{ color: FF.yellow, fontWeight: 600 }}>+ {Math.round(amount * 3)} pts</span> sur ta carte fidélité.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const iconBtnApp = {
  width: 36, height: 36, borderRadius: 10,
  background: FF.card, border: `1px solid ${FF.line}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
