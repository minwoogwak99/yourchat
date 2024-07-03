import { AuthProvider } from "@/components/AuthProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
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
              animation: "fade",
              animationDuration: 100,
            }}
          />
          <Stack.Screen name="home" />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
