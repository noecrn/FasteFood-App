// Faste Food — Pre-app QR entry (light-only)
const { useMemo, useState } = React;

function QrEntryScreen({ onEnter }) {
  const [table, setTable] = useState('12');
  const [code, setCode] = useState('');
  const [err, setErr] = useState(null);

  const suggestedCode = useMemo(() => {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `FF-${n}`;
  }, []);

  const startHost = () => {
    const t = String(table || '').trim();
    if (!/^\d{1,2}$/.test(t)) { setErr("Entre un numéro de table (ex: 12)."); return; }
    setErr(null);
    onEnter({
      table: t,
      sessionCode: suggestedCode,
      role: 'host',
      status: 'ordering', // ordering | sent | ready
      billingMode: 'split', // split | host
    });
  };

  const joinGuest = () => {
    const t = String(table || '').trim();
    const c = String(code || '').trim().toUpperCase();
    if (!/^\d{1,2}$/.test(t)) { setErr("Entre un numéro de table (ex: 12)."); return; }
    if (!/^FF-\d{4}$/.test(c)) { setErr("Code session invalide (ex: FF-4821)."); return; }
    setErr(null);
    onEnter({
      table: t,
      sessionCode: c,
      role: 'guest',
      status: 'ordering',
      billingMode: 'split',
    });
  };

  return (
    <div style={{ paddingBottom: 40, color: FF.text }}>
      <div style={{ padding: '68px 22px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,197,44,0.18)', border: '1px solid rgba(255,197,44,0.35)', fontSize: 11.5, fontWeight: 700 }}>
          <Icons.QrCode size={16} color={FF.orange} sw={2.2}/> Scan table
        </div>

        <h1 style={{ fontFamily: '"Space Grotesk"', fontSize: 34, fontWeight: 800, letterSpacing: -1.1, lineHeight: 1.02, margin: '14px 0 0' }}>
          Tout le fast-food,<br/>
          <span style={{ color: FF.orange }}>au même endroit</span>
        </h1>
        <div style={{ fontSize: 13.5, color: FF.textDim, lineHeight: 1.45, marginTop: 10 }}>
          Vendredi soir, resto plein ? Scanne, installe-toi, commande en groupe.<br/>
          <span style={{ color: FF.text, fontWeight: 650 }}>Chacun paie sa part</span> — zéro calcul, zéro virement.
        </div>
      </div>

      <div style={{ marginTop: 18, padding: '0 22px' }}>
        <div style={{
          borderRadius: 22, background: FF.card,
          border: `1px solid ${FF.line}`,
          boxShadow: '0 10px 30px rgba(17,17,20,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${FF.line}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase', color: FF.textMute }}>Table</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: `linear-gradient(135deg, ${FF.yellow} 0%, ${FF.orange} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#111114', fontFamily: '"Space Grotesk"', fontWeight: 900, fontSize: 18,
              }}>{String(table || '—')}</div>
              <input
                value={table}
                onChange={(e) => setTable(e.target.value)}
                inputMode="numeric"
                placeholder="12"
                style={{
                  flex: 1, height: 44, padding: '0 12px',
                  borderRadius: 14, border: `1px solid ${FF.lineHi}`,
                  outline: 'none', background: FF.bg2, color: FF.text,
                  fontSize: 14, fontWeight: 650,
                }}
              />
            </div>
          </div>

          <div style={{ padding: 16, display: 'grid', gap: 10 }}>
            <button onClick={startHost} style={{
              width: '100%', padding: '14px 14px', borderRadius: 16,
              background: '#111114', color: '#fff', border: 'none',
              fontWeight: 800, fontSize: 14.5, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 10px 26px rgba(17,17,20,0.16)',
            }}>
              <Icons.Users size={18} color="#fff" sw={2}/> Démarrer la commande de groupe
            </button>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
              <div style={{ height: 1, flex: 1, background: FF.line }} />
              <div style={{ fontSize: 11.5, color: FF.textMute, fontWeight: 700 }}>ou</div>
              <div style={{ height: 1, flex: 1, background: FF.line }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code session (FF-4821)"
                style={{
                  flex: 1, height: 44, padding: '0 12px',
                  borderRadius: 14, border: `1px solid ${FF.lineHi}`,
                  outline: 'none', background: FF.bg2, color: FF.text,
                  fontSize: 13.5, fontWeight: 650,
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  textTransform: 'uppercase',
                }}
              />
              <button onClick={joinGuest} style={{
                height: 44, padding: '0 14px', borderRadius: 14,
                background: FF.yellow, color: '#111114', border: 'none',
                fontWeight: 900, fontSize: 13.5, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <Icons.ArrowRight size={18} color="#111114" sw={2.5}/> Rejoindre
              </button>
            </div>

            {err && (
              <div style={{ padding: '10px 12px', borderRadius: 14, background: 'rgba(255,77,45,0.10)', border: '1px solid rgba(255,77,45,0.22)', color: '#B42110', fontSize: 12.5, fontWeight: 650, lineHeight: 1.35 }}>
                {err}
              </div>
            )}

            <div style={{ padding: '10px 12px', borderRadius: 16, background: FF.bg, border: `1px dashed ${FF.lineHi}`, fontSize: 12.5, color: FF.textDim, lineHeight: 1.4 }}>
              <span style={{ color: FF.text, fontWeight: 750 }}>Astuce :</span> en démo, le Host peut partager un code (type Grab). Les Guests rejoignent et ajoutent leurs plats sur leur téléphone.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.QrEntryScreen = QrEntryScreen;

