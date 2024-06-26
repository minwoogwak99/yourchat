import AnimatedIntro from "@/components/AnimatedIntro";
import { BottomSigninSheet } from "@/components/BottomSigninSheet";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <AnimatedIntro />
      <BottomSigninSheet />
    </View>
  );
}
