import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const calendar = () => {
  return (
    <SafeAreaView edges={["top"]}>
      <Text>calendar</Text>
    </SafeAreaView>
  );
};

export default calendar;
