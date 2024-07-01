import AnimatedIntro from "@/components/AnimatedIntro";
import { BottomSigninSheet } from "@/components/BottomSigninSheet";
import { View } from "tamagui";

const Signin = () => {
  return (
    <View className="flex-1">
      <AnimatedIntro />
      <BottomSigninSheet />
    </View>
  );
};
export default Signin;
