import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

export const handleSignOut = async () => {
  try {
    await auth().signOut();
    router.replace("/");

    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
