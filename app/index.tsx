import SelectorView from "@/components/ui/Selector";
import { ColorSet } from "@/constants/Colors";
import { fsInitializingAtom, userAtom } from "@/utils/core";
import { Redirect } from "expo-router";
import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [initializing] = useAtom(fsInitializingAtom);
  const [user] = useAtom(userAtom);

  if (initializing) return null;

  if (!user) {
    return <Redirect href={"/signin"} />;
  }

  return (
    <View style={styles.container}>
      <SelectorView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorSet.bgColor,
  },
});
