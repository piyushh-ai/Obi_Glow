import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { storage } from '../utils/storage'
import { useAuth } from '../features/auth/hooks/useAuth'

const index = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    const bootstrap = async () => {
      const token = await storage.getToken();

      if (token) {
        await handleGetMe(); // success → role-based route, error → login
      } else {
        router.replace('/(auth)/Login');
      }
    };
    bootstrap();
  }, []);

  return null;
}

export default index