import { AuthProvider } from "@/components/AuthProvider";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
