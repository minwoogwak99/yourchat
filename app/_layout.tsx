import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack />
    // <AuthProvider>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <Stack>
    //     <Stack.Screen
    //       name="index"
    //       options={{
    //         headerShown: false,
    //         animation: "fade_from_bottom",
    //         animationDuration: 200,
    //       }}
    //     />
    //   </Stack>
    // </GestureHandlerRootView>
    // </AuthProvider>
  );
}
