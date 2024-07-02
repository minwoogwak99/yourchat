import auth from "@react-native-firebase/auth";

export const handleSignOut = async () => {
  try {
    await auth().signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
