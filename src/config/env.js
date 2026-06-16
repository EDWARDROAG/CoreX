const getEnv = (key, fallback = '') => {
  const value = import.meta.env[key];
  return value !== undefined && value !== '' ? value : fallback;
};

export const APP_ENV = {
  API_URL: getEnv('VITE_API_URL', 'http://localhost:5000/api'),
  API_TIMEOUT: Number(getEnv('VITE_API_TIMEOUT', '30000')),
  WHATSAPP_PHONE: getEnv('VITE_WHATSAPP_PHONE', '34123456789'),
  WHATSAPP_API_URL: getEnv('VITE_WHATSAPP_API_URL', ''),
  WHATSAPP_API_TOKEN: getEnv('VITE_WHATSAPP_API_TOKEN', ''),
  WHATSAPP_BUSINESS_ACCOUNT: getEnv('VITE_WHATSAPP_BUSINESS_ACCOUNT', 'false') === 'true',
  WHATSAPP_WEBHOOK_URL: getEnv('VITE_WHATSAPP_WEBHOOK_URL', ''),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  baseUrl: import.meta.env.BASE_URL,
};
