import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  TOKEN: "auth_token",
};

export const storage = {
  // Token
  saveToken: async (token) => {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },
  getToken: async () => {
    return await AsyncStorage.getItem(KEYS.TOKEN);
  },
  removeToken: async () => {
    await AsyncStorage.removeItem(KEYS.TOKEN);
  },

  // Clear all auth data (logout)
  clearAuth: async () => {
    await AsyncStorage.multiRemove([KEYS.TOKEN]);
  },
};
