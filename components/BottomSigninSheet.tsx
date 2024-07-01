import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";
import { GoogleSigninButtonView } from "./GoogleSigninButtonView";

export const BottomSigninSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View>
      <GoogleSigninButtonView />
    </View>
  );
};
