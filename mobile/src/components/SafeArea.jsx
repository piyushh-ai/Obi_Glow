import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
