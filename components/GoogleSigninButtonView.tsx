import { ColorSet } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const GoogleSigninButtonView = () => {
  const handleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        router.replace("/");
        console.log("Successfully signed in with Google");
      } else {
        console.error("No ID token present");
        throw new Error("No ID token present");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign-in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.error("Other error:", error.message);
      }
    }
  };

  return (
    <View style={styles.btnsWrapper}>
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Ionicons name="logo-google" size={16} color="#fff" />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnsWrapper: {
    backgroundColor: ColorSet.bgColor,
    padding: 24,
    paddingBottom: 42,
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  button: {
    backgroundColor: ColorSet.buttonColor,
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
