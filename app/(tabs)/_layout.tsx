import { CustomDrawerView } from "@/components/CustomDrawerView";
import { fsInitializingAtom, userAtom } from "@/utils/core";
import { migrateDbIfNeeded } from "@/utils/Database";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
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
        <Drawer
          drawerContent={CustomDrawerView}
          screenOptions={{ drawerHideStatusBarOnOpen: true }}
        >
          <Drawer.Screen name="index" options={{ title: "Home" }} />
          <Drawer.Screen name="setting" options={{ title: "Done" }} />
        </Drawer>
      </BottomSheetModalProvider>
    </SQLiteProvider>
  );
};

export default _layout;
