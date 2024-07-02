import { fsInitializingAtom, userAtom } from "@/utils/core";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const WEB_CLIENT_ID =
  "950066094933-7kc3p19r3e113eq2q7c8buivsr20m313.apps.googleusercontent.com";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [, setUser] = useAtom(userAtom);
  const [initializing, setInitializing] = useAtom(fsInitializingAtom);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      webClientId: WEB_CLIENT_ID,
    });
  };
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return <>{children}</>;
};
