const getEnv = (key, fallback = '') => {
  const value = import.meta.env[key];
  return value !== undefined && value !== '' ? value : fallback;
};

export const APP_ENV = {
  APP_NAME: getEnv('VITE_APP_NAME', 'CoreX'),
  API_URL: getEnv('VITE_API_URL', 'http://localhost:3004/api'),
  API_TIMEOUT: Number(getEnv('VITE_API_TIMEOUT', '30000')),
  isVitrina: getEnv('VITE_VITRINA_MODE', 'false') === 'true',
  deployTarget: getEnv('VITE_DEPLOY_TARGET', ''),
  WHATSAPP_PHONE: getEnv('VITE_WHATSAPP_PHONE', '573023705751'),
  WHATSAPP_API_URL: getEnv('VITE_WHATSAPP_API_URL', ''),
  WHATSAPP_API_TOKEN: getEnv('VITE_WHATSAPP_API_TOKEN', ''),
  WHATSAPP_BUSINESS_ACCOUNT: getEnv('VITE_WHATSAPP_BUSINESS_ACCOUNT', 'false') === 'true',
  WHATSAPP_WEBHOOK_URL: getEnv('VITE_WHATSAPP_WEBHOOK_URL', ''),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  baseUrl: import.meta.env.BASE_URL,
};
