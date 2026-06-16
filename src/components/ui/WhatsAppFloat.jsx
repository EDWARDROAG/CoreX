import React from 'react';
import { getWhatsAppLink } from '../../utils/whatsappHelper';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppFloat = () => (
  <a
    href={getWhatsAppLink('general')}
    target="_blank"
    rel="noopener noreferrer"
    className="corex-whatsapp-float"
    aria-label="Contactar por WhatsApp"
  >
    <WhatsAppIcon className="h-8 w-8" />
  </a>
);

export default WhatsAppFloat;
