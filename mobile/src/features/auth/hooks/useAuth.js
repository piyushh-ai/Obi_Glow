import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { login } from "../services/api";
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
      await storage.saveToken(res.token)

      router.replace('/(customer)/Home');
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

  return {
    signIn,
  };
};
