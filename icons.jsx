// Lucide-style stroke icons — inline SVG to avoid CDN issues
const Icon = ({ children, size = 22, color = 'currentColor', sw = 1.75, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={{ display: 'block', ...style }}>{children}</svg>
);

const Icons = {
  Home: (p) => <Icon {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/></Icon>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Icon>,
  Users: (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  Trophy: (p) => <Icon {...p}><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3"/></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  Bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Minus: (p) => <Icon {...p}><path d="M5 12h14"/></Icon>,
  ChevronRight: (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  ChevronLeft: (p) => <Icon {...p}><path d="m15 6-6 6 6 6"/></Icon>,
  ChevronDown: (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  Check: (p) => <Icon {...p}><path d="m5 12 5 5L20 7"/></Icon>,
  X: (p) => <Icon {...p}><path d="M18 6 6 18M6 6l18 18" transform="scale(0.667)"/></Icon>,
  Flame: (p) => <Icon {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a7 7 0 0 0 7-7c0-1.5-.5-3-1-4-1.5 2-3 3-5 3-3.5 0-4 2.5-4 4.5 0 1 .5 2 1 3a2.5 2.5 0 0 1-1.5-2Z"/></Icon>,
  Clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  Star: (p) => <Icon {...p}><path d="m12 3 2.7 5.7 6.3.9-4.5 4.4 1 6.3L12 17.5 6.5 20.3l1-6.3L3 9.6l6.3-.9L12 3Z"/></Icon>,
  Heart: (p) => <Icon {...p}><path d="M20.8 5.6a5.5 5.5 0 0 0-9-1.8L12 4l-.2-.2a5.5 5.5 0 1 0-7.8 7.8l7 7c.5.5 1.5.5 2 0l7-7a5.5 5.5 0 0 0 .8-6Z"/></Icon>,
  Wallet: (p) => <Icon {...p}><path d="M3 7v12a2 2 0 0 0 2 2h16V9a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h11"/><path d="M18 14h.01"/></Icon>,
  Apple: (p) => <Icon {...p}><path d="M12 20.94c1.5 0 2.75-.67 4-2 1.25-1.33 2-3.07 2-5 0-3.5-1.78-5.94-5-5.94-1.55 0-2.5.5-3.5.5s-1.95-.5-3.5-.5C2.78 8 1 10.44 1 13.94c0 1.93.75 3.67 2 5 1.25 1.33 2.5 2 4 2"/><path d="M10 2a4 4 0 0 0 4 4"/></Icon>,
  CreditCard: (p) => <Icon {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></Icon>,
  Share: (p) => <Icon {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></Icon>,
  Trash: (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></Icon>,
  ShoppingBag: (p) => <Icon {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></Icon>,
  Globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Icon>,
  Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></Icon>,
  Burger: (p) => <Icon {...p}><path d="M3 11a9 9 0 0 1 18 0Z"/><path d="M3 16h18M5 19h14a1 1 0 0 0 1-1v-2H4v2a1 1 0 0 0 1 1Z"/></Icon>,
  Drumstick: (p) => <Icon {...p}><path d="M15.5 3.5a5 5 0 0 0-7 7l-3 3a3 3 0 0 0 4.5 4l.5-.5a3 3 0 0 0 4-.5l3-3a5 5 0 0 0-2-10Z"/></Icon>,
  Leaf: (p) => <Icon {...p}><path d="M11 20A8 8 0 0 0 19 12V4a8 8 0 0 0-8 8 8 8 0 0 1-8 8h8Z"/><path d="M3 21c1-3 4-6 8-7"/></Icon>,
  Taco: (p) => <Icon {...p}><path d="M3 17a9 9 0 0 1 18 0"/><path d="M3 17h18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/><path d="M8 17v-3M12 17v-3M16 17v-3"/></Icon>,
  ArrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>,
  ArrowLeft: (p) => <Icon {...p}><path d="M19 12H5M11 5l-7 7 7 7"/></Icon>,
  Zap: (p) => <Icon {...p}><path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"/></Icon>,
  QrCode: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 19v2h3M19 19h2"/></Icon>,
  Gift: (p) => <Icon {...p}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8a3 3 0 0 0-3-3 2 2 0 0 0 0 4h3M12 8a3 3 0 0 1 3-3 2 2 0 0 1 0 4h-3"/></Icon>,
};

window.Icons = Icons;
