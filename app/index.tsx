import { fsInitializingAtom, userAtom } from "@/utils/core";
import auth from "@react-native-firebase/auth";
import { Redirect } from "expo-router";
import { useAtom } from "jotai";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [initializing] = useAtom(fsInitializingAtom);
  const [user] = useAtom(userAtom);

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
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}
