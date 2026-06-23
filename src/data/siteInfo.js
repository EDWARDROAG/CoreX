const ADDRESS_LINE =
  'Cra 78 K #37A-68 Sur, frente al Éxito Kennedy Central, Local 202';
const MAPS_QUERY =
  'Cra 78 K 37A-68 Sur Éxito Kennedy Central Local 202 Bogotá Colombia';

export const SITE_CONTACT = {
  phone: '302 370 5751',
  phoneHref: '573023705751',
  email: 'corexservice@gmail.com',
  address: ADDRESS_LINE,
  city: 'Bogotá, Colombia',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`,
  schedule: {
    weekdays: 'Lun - Vie: 9:00 AM - 7:00 PM',
    saturday: 'Sáb: 10:00 AM - 4:00 PM',
    sunday: 'Dom: Cerrado',
  },
};

export const FOOTER_NAV = [
  { label: 'Inicio', path: '/' },
  { label: 'PC Gamer', path: '/products' },
  { label: 'Servicios', path: '/maintenance' },
  { label: 'Consolas', path: '/products?categoria=consolas' },
  { label: 'Periféricos', path: '/products?categoria=perifericos' },
  { label: 'Contacto', path: '/contact' },
];

export const FOOTER_SOCIAL = [
  { name: 'Facebook', url: 'https://facebook.com/corex' },
  { name: 'Instagram', url: 'https://instagram.com/corex' },
  { name: 'WhatsApp', url: 'https://wa.me/573023705751' },
  { name: 'TikTok', url: 'https://tiktok.com/@corex' },
];
