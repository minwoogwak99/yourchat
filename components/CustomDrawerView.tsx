import { handleSignOut } from "@/utils/firebaseAPI";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CustomDrawerView = (props: any) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{ marginTop: "auto", marginBottom: bottom }}
          label={"Sign out"}
          onPress={() => {
            handleSignOut();
          }}
        ></DrawerItem>
      </DrawerContentScrollView>
    </View>
  );
};
