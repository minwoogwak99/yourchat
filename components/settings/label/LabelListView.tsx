import LabelInput from "@/components/input/LabelInput";
import { getLabels } from "@/utils/Database";
import { labelType } from "@/utils/types";
import { AntDesign } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface AccordionItemProps {
  isExpanded: Animated.SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
}
const AccordionItem = ({
  isExpanded,
  children,
  viewKey,
}: AccordionItemProps) => {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withSpring(height.value * Number(isExpanded.value), {
      damping: 40,
      stiffness: 100,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const LabelListView = () => {
  const open = useSharedValue(false);
  const [labels, setLabels] = useState<labelType[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchLabels = async () => {
      const result = await getLabels(db);
      setLabels(result);
    };
    fetchLabels();
  }, []);

  const onPress = () => {
    open.value = !open.value;
  };

  const iconRotation = useDerivedValue(() => {
    return withSpring(open.value ? 45 : 0);
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${iconRotation.value}deg` }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={{ fontSize: 20 }}>Label</Text>
        <Pressable onPress={onPress}>
          <Animated.View style={iconStyle}>
            <AntDesign name="plus" size={24} color="black" />
          </Animated.View>
        </Pressable>
      </View>

      <AccordionItem isExpanded={open} viewKey="Accordion">
        <View style={{ borderWidth: 1, width: "100%" }}>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>No Labels</Text>
            <Pressable>
              <Text>Create Label</Text>
            </Pressable>
          </View>
          <LabelInput onLabelCreate={() => {}} />
          <FlatList
            data={labels}
            renderItem={(item) => {
              return <Text>{item.item.labelTitle}</Text>;
            }}
          />
        </View>
      </AccordionItem>
    </SafeAreaView>
  );
};

export default LabelListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
});
