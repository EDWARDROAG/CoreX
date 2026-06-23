import { useState, useCallback } from 'react';
import { SITE_CONTACT } from '../data/siteInfo';
import { APP_ENV } from '../config/env';

const STORAGE_KEY = 'corex_settings';

const defaultSettings = () => ({
  general: {
    site_name: 'CoreX',
    site_description: 'Soluciones Tecnológicas',
    contact_email: SITE_CONTACT.email,
    contact_phone: SITE_CONTACT.phoneHref.replace(/^57/, ''),
    address: SITE_CONTACT.address,
    city: SITE_CONTACT.city,
  },
  whatsapp: {
    whatsapp_number: APP_ENV.WHATSAPP_PHONE,
    whatsapp_message_default: 'Hola, me gustaría obtener más información sobre sus productos y servicios.',
    whatsapp_button_text: 'Consultar por WhatsApp',
  },
  preferences: {
    notifications_enabled: true,
    email_notifications: true,
    low_stock_alert: true,
    daily_summary: false,
    items_per_page: 12,
    default_currency: 'COP',
  },
});

const readSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSettings();
    return { ...defaultSettings(), ...JSON.parse(stored) };
  } catch {
    return defaultSettings();
  }
};

export const useSettings = () => {
  const [loading, setLoading] = useState(false);

  const getSettings = useCallback(async () => {
    setLoading(true);
    try {
      return readSettings();
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (partial) => {
    setLoading(true);
    try {
      const current = readSettings();
      const next = {
        ...current,
        ...partial,
        general: { ...current.general, ...(partial.general || {}) },
        whatsapp: { ...current.whatsapp, ...(partial.whatsapp || {}) },
        preferences: { ...current.preferences, ...(partial.preferences || {}) },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    getSettings,
    updateSettings,
  };
};

export default useSettings;
