import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "tamagui";

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  if (!user) {
    return <Redirect href={"/signin"} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffcccb",
      }}
    >
      <Text>Hello, {user.email}</Text>
      <Button
        borderRadius="$5"
        onPress={async () => {
          try {
            await auth().signOut();
            console.log("User signed out successfully");
          } catch (error) {
            console.error("Error signing out:", error);
          }
        }}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
