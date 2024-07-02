import { fsInitializingAtom, userAtom } from "@/utils/core";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [, setUser] = useAtom(userAtom);
  const [initializing, setInitializing] = useAtom(fsInitializingAtom);

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
