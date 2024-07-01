import { tamaguiConfig } from "@/tamagui.config";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
              animationDuration: 200,
            }}
          />
          <Stack.Screen
            name="signin"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
              animationDuration: 200,
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
