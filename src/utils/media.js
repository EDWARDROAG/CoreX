import { APP_ENV } from '../config/env';

const API_ORIGIN = APP_ENV.API_URL.replace(/\/api\/?$/, '');

export const getMediaUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `${API_ORIGIN}${url}`;
  if (url.includes('uploads')) {
    const uploadsIndex = url.indexOf('uploads');
    return `${API_ORIGIN}/${url.slice(uploadsIndex).replace(/\\/g, '/')}`;
  }
  return url.startsWith('/') ? `${API_ORIGIN}${url}` : `${API_ORIGIN}/${url}`;
};
