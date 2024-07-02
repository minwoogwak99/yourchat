import AnimatedIntro from "@/components/AnimatedIntro";
import { GoogleSigninButtonView } from "@/components/GoogleSigninButtonView";
import { View } from "react-native";

const Signin = () => {
  return (
    <View className="flex-1">
      <AnimatedIntro />
      <GoogleSigninButtonView />
    </View>
  );
};
export default Signin;
