import React from 'react';
import { getWhatsAppLink } from '../../utils/whatsappHelper';

const WhatsAppFloat = () => (
  <a
    href={getWhatsAppLink('general')}
    target="_blank"
    rel="noopener noreferrer"
    className="corex-whatsapp-float"
    aria-label="Contactar por WhatsApp"
  >
    💬
  </a>
);

export default WhatsAppFloat;
