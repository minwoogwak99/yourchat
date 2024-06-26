import React from "react";
import { TextInput, View } from "react-native";

export const SignupView = () => {
  return (
    <View className="flex-1 bg-red-300 items-center justify-center">
      <TextInput className="bg-blue-300 p-2 px-5 w-[80vw] h-14 rounded-xl border-2 border-gray-200" />
    </View>
  );
};
