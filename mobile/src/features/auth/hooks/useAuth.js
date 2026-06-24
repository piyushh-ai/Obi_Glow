import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { login, getMe, logout } from "../services/api";
import { useDispatch } from "react-redux";
import { setError, setLoading, setToken, setUser } from "../state/authSlice";
import { storage } from "../../../utils/storage";
import { router } from "expo-router";

export const useAuth = () => {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      dispatch(setLoading(true));
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.data.idToken;
      const res = await login(token);
      dispatch(setLoading(false));
      dispatch(setToken(res.token));
      dispatch(setUser(res.user));
      // AsyncStorage mein persist karo
      await storage.saveToken(res.token);

      // Role ke hisaab se redirect karo
      if (res.user?.role === 'admin') {
        router.replace('/(admin)/(tabs)/Dashboard');
      } else {
        // Customer route abhi nahi bani — jab bane tab update karo
        router.replace('/(admin)/(tabs)/Dashboard');
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign-in cancelled by user");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services not available");
      } else {
        console.error("Sign-in error:", error);
        throw error;
      }
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getMe();
      dispatch(setLoading(false));
      dispatch(setUser(res.user));

      // Success — role ke hisaab se navigate karo
      const role = res.user?.role;
      if (role === 'admin') {
        router.replace('/(admin)/(tabs)/Dashboard');
      } else if (role === 'customer') {
        // router.replace('/(customer)/(tabs)/Dashboard'); // jab route bane
        router.replace('/(admin)/(tabs)/Dashboard'); // temp
      } else {
        router.replace('/(auth)/Login');
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      console.log('error in get me', error.message);
      router.replace('/(auth)/Login');
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await logout();
      dispatch(setLoading(false));
      dispatch(setToken(null));
      dispatch(setUser(null));
      await storage.clearAuth();
      router.replace('/(auth)/Login');
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      console.log("error in logout", error.message);
    }
  }

  return {
    signIn,
    handleGetMe,
    handleLogout
  };
};
