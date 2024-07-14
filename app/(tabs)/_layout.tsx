import { fsInitializingAtom, userAtom } from "@/utils/core";
import { migrateDbIfNeeded } from "@/utils/Database";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useAtom } from "jotai";
import React from "react";

const _layout = () => {
  const [initializing] = useAtom(fsInitializingAtom);
  const [user] = useAtom(userAtom);

  if (initializing) return null;

  if (!user) {
    return <Redirect href={"/signin"} />;
  }

  return (
    <SQLiteProvider databaseName="test2.db" onInit={migrateDbIfNeeded}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="index" options={{ title: "Home" }} />
          <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
          <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        </Tabs>
      </BottomSheetModalProvider>
    </SQLiteProvider>
  );
};

export default _layout;
