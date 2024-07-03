import SelectorView from "@/components/ui/Selector";
import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          // options={{ headerShown: false }}
        />
      </Stack>
      <SelectorView />
    </>
  );
};

export default _layout;
