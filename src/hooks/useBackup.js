import { useState, useCallback } from 'react';
import api from '../services/api';

const unwrap = (payload) => payload?.data ?? payload;

export const useBackup = () => {
  const [loading, setLoading] = useState(false);

  const listBackups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/backup/list');
      return unwrap(response.data) || [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createBackup = useCallback(async (body = {}) => {
    setLoading(true);
    try {
      const response = await api.post('/backup/create', body);
      return unwrap(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadBackup = useCallback(async (filename) => {
    const response = await api.get(`/backup/download/${encodeURIComponent(filename)}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  const restoreBackup = useCallback(async (filename, options = {}) => {
    setLoading(true);
    try {
      const response = await api.post('/backup/restore', { filename, ...options });
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBackup = useCallback(async (filename) => {
    setLoading(true);
    try {
      const response = await api.delete(`/backup/delete/${encodeURIComponent(filename)}`);
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const cleanOldBackups = useCallback(async (days = 30) => {
    setLoading(true);
    try {
      const response = await api.delete('/backup/clean', { params: { days } });
      return unwrap(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBackupConfig = useCallback(async () => {
    const response = await api.get('/backup/config');
    return unwrap(response.data);
  }, []);

  const updateBackupConfig = useCallback(async (config) => {
    const response = await api.post('/backup/schedule', config);
    return unwrap(response.data);
  }, []);

  return {
    loading,
    listBackups,
    createBackup,
    downloadBackup,
    restoreBackup,
    deleteBackup,
    cleanOldBackups,
    getBackupConfig,
    updateBackupConfig,
  };
};

export default useBackup;
