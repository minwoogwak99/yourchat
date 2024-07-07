import { ColorSet } from "@/constants/Colors";
import { handleSignOut } from "@/utils/firebaseAPI";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CustomDrawerView = (props: any) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={[
          styles.signoutBtn,
          {
            marginBottom: bottom,
            marginHorizontal: 20,
            padding: 12,
            backgroundColor: ColorSet.secondary,
            borderRadius: 12,
          },
        ]}
      >
        <Pressable onPress={handleSignOut}>
          <Text
            style={{
              color: ColorSet.textColor,
              fontSize: 16,
              fontWeight: 600,
              alignSelf: "center",
            }}
          >
            Sign out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signoutBtn: {},
});
