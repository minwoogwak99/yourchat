import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoogleSigninButtonView } from "./GoogleSigninButtonView";

export const BottomSigninSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View>
      <GoogleSigninButtonView />
    </View>
  );
};
