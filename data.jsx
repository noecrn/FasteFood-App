// Faste Food — Shared design tokens + product/data fixtures
const FF = {
  bg: '#0A0A0C',
  bg2: '#0F0F12',
  card: '#16161A',
  cardHi: '#1C1C22',
  line: 'rgba(255,255,255,0.06)',
  lineHi: 'rgba(255,255,255,0.12)',
  text: '#FFFFFF',
  textDim: 'rgba(255,255,255,0.62)',
  textMute: 'rgba(255,255,255,0.42)',
  yellow: '#E8FF3D',
  orange: '#FF6B1F',
  green: '#7DF29F',
  pink: '#FF7AB8',
};

window.FF = FF;

// Category palette — each cat gets a tint so the placeholders feel varied
const CATEGORIES = [
  { id: 'burger',   label: 'Burgers',     icon: 'Burger',    tint: '#FF6B1F' },
  { id: 'tacos',    label: 'Tacos',       icon: 'Taco',      tint: '#E8FF3D' },
  { id: 'poulet',   label: 'Poulet frit', icon: 'Drumstick', tint: '#FF7AB8' },
  { id: 'healthy',  label: 'Healthy',     icon: 'Leaf',      tint: '#7DF29F' },
  { id: 'sides',    label: 'Sides',       icon: 'Flame',     tint: '#FFA73D' },
  { id: 'boisson',  label: 'Boissons',    icon: 'Zap',       tint: '#9EAEFF' },
];

const PRODUCTS = [
  { id: 'smash',  name: 'Smash Royal',       desc: 'Double smash · cheddar fondu · oignons caramel', price: 9.90,  cat: 'burger',  tag: 'Top 1', hot: true,  tint: '#FF6B1F', spicy: 1 },
  { id: 'algerois', name: 'Tacos Algérois',  desc: 'Kebab · frites · sauce blanche maison',          price: 8.50,  cat: 'tacos',   tag: 'Populaire',           tint: '#E8FF3D', spicy: 1 },
  { id: 'wings', name: 'Bucket 6 Wings',     desc: 'Sauce buffalo épicée · ranch maison',            price: 7.90,  cat: 'poulet',  tag: 'Épicé', hot: true,   tint: '#FF7AB8', spicy: 3 },
  { id: 'poke',  name: 'Bowl Poké Saumon',   desc: 'Riz vinaigré · saumon · mangue · edamame',       price: 11.50, cat: 'healthy', tag: 'Healthy',             tint: '#7DF29F', spicy: 0 },
  { id: 'crispy', name: 'Crispy Box',        desc: 'Tenders panés · sauce miel-curry · frites',      price: 8.90,  cat: 'poulet',  tag: 'Nouveau',             tint: '#FFA73D', spicy: 1 },
  { id: 'birria',  name: 'Tacos Birria',     desc: 'Bœuf longuement mijoté · consommé épicé',        price: 9.50,  cat: 'tacos',   tag: 'Du moment', hot: true, tint: '#E8FF3D', spicy: 2 },
  { id: 'veggie',  name: 'Smash Veggie',     desc: 'Steak végétal · roquette · sauce yuzu',          price: 9.20,  cat: 'burger',  tag: 'Veggie',              tint: '#7DF29F', spicy: 0 },
  { id: 'frites',  name: 'Frites maison',    desc: 'Pommes fraîches · sel de Guérande',              price: 3.50,  cat: 'sides',   tag: '',                    tint: '#FFA73D', spicy: 0 },
];

// Group order — 4 members, ~12 items
const GROUP_MEMBERS = [
  { id: 'leo',   name: 'Léo',    color: '#E8FF3D', initials: 'L', you: true },
  { id: 'sarah', name: 'Sarah',  color: '#FF7AB8', initials: 'S' },
  { id: 'karim', name: 'Karim',  color: '#7DF29F', initials: 'K' },
  { id: 'ines',  name: 'Inès',   color: '#9EAEFF', initials: 'I' },
];

const GROUP_CART = [
  { id: 'c1', product: 'smash',    qty: 1, addedBy: 'leo'   },
  { id: 'c2', product: 'frites',   qty: 1, addedBy: 'leo'   },
  { id: 'c3', product: 'algerois', qty: 1, addedBy: 'sarah' },
  { id: 'c4', product: 'wings',    qty: 1, addedBy: 'karim' },
  { id: 'c5', product: 'frites',   qty: 1, addedBy: 'karim' },
  { id: 'c6', product: 'poke',     qty: 1, addedBy: 'ines'  },
  { id: 'c7', product: 'birria',   qty: 1, addedBy: 'sarah' },
  { id: 'c8', product: 'crispy',   qty: 1, addedBy: 'leo'   },
];

const PRODUCT_BY_ID = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
const MEMBER_BY_ID  = Object.fromEntries(GROUP_MEMBERS.map(m => [m.id, m]));

Object.assign(window, { CATEGORIES, PRODUCTS, PRODUCT_BY_ID, GROUP_MEMBERS, GROUP_CART, MEMBER_BY_ID });

// Product image — striped SVG placeholder with mono explainer
function ProductImg({ tint = '#FF6B1F', label, height = 110, radius = 18 }) {
  const id = React.useId().replace(/[:]/g, '');
  return (
    <div style={{
      position: 'relative', width: '100%', height,
      borderRadius: radius, overflow: 'hidden',
      background: `linear-gradient(135deg, ${tint}22, ${tint}08)`,
      border: `1px solid ${tint}33`,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id={`p${id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={tint} strokeWidth="6" opacity="0.18"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p${id})`}/>
      </svg>
      <div style={{
        position: 'absolute', bottom: 8, left: 10,
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: 9.5, letterSpacing: 0.4, color: tint, opacity: 0.85,
      }}>{label}</div>
    </div>
  );
}

// Member avatar — colored circle w/ initials
function Avatar({ id, size = 28, ring = false }) {
  const m = MEMBER_BY_ID[id];
  if (!m) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: m.color, color: '#0A0A0C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.42, letterSpacing: -0.2,
      boxShadow: ring ? `0 0 0 2px ${FF.bg}, 0 0 0 ${2 + 1.5}px ${m.color}` : 'none',
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
    }}>{m.initials}</div>
  );
}

window.ProductImg = ProductImg;
window.Avatar = Avatar;

// Tiny pill / chip / button styles re-used
const ffPill = (extra = {}) => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '6px 10px', borderRadius: 999,
  fontSize: 11.5, fontWeight: 600, letterSpacing: 0.1,
  background: 'rgba(255,255,255,0.06)', color: FF.text,
  border: `1px solid ${FF.line}`,
  ...extra,
});
window.ffPill = ffPill;
