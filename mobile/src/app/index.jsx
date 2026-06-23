import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { storage } from '../utils/storage'


const index = () => {


  useEffect(() => {
    const checkToken = async () => {
      const token = await storage.getToken();

      if (token) {
        router.replace('/(admin)/(tabs)/Dashboard');
      } else {
        router.replace('/(auth)/Login');
      }
    };
    checkToken();
  }, []);

  return null;
}

export default index