import { ColorSet } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type PageType = "home" | "me";

const SelectorView = () => {
  const pages: PageType[] = ["home", "me"];
  const [currentTab, setCurrentTab] = useState<PageType>("home");

  return (
    <View style={styles.container}>
      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.btn,
            { backgroundColor: currentTab === page ? "#fff" : "transparent" },
          ]}
          onPress={() => setCurrentTab(page)}
        >
          <Text
            style={[
              currentTab === page
                ? { color: ColorSet.primary }
                : { color: "#fff" },

              { fontWeight: "800" },
            ]}
          >
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorSet.secondary,
    borderWidth: 1,
    borderColor: ColorSet.borderColor,
    padding: 4,
    minHeight: 40,
    borderRadius: 100,
    flexDirection: "row",
    gap: 4,
  },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectorView;
