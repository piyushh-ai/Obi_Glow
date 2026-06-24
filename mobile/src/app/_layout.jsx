import 'expo-dev-client';
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeArea from "../components/SafeArea";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { store } from "../store.js";
import { useFonts } from "expo-font";
import {
  CormorantGaramond_300Light,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_600SemiBold_Italic,
} from "@expo-google-fonts/cormorant-garamond";
import {
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
} from "@expo-google-fonts/raleway";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

GoogleSignin.configure({
  webClientId:
    "519945484368-p1tm0da9ea78h8g7i6ih6bfer1j0mrpn.apps.googleusercontent.com",
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    CormorantGaramond_300Light_Italic,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_600SemiBold_Italic,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeArea>
          <Stack screenOptions={{ headerShown: false }}  />
          
        </SafeArea>
      </SafeAreaProvider>
    </Provider>
  );
}
