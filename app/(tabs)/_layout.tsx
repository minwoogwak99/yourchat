import { CustomDrawerView } from "@/components/CustomDrawerView";
import { fsInitializingAtom, userAtom } from "@/utils/core";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
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
    <Drawer drawerContent={CustomDrawerView}>
      <Drawer.Screen
        name="index"
        options={{ headerTitle: "", title: "Home" }}
      />
      <Drawer.Screen name="setting" />
    </Drawer>
  );
};

export default _layout;
