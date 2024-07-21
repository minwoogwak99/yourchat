import AccordionItem from "@/components/AccordionItem";
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

const LabelListView = () => {
  const open = useSharedValue(false);
  const [labels, setLabels] = useState<labelType[]>([]);
  const [isLabelAdding, setIsLabelAdding] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchLabels = async () => {
      const result = await getLabels(db);
      setLabels(result);
    };

    !isLabelAdding && fetchLabels();
  }, [isLabelAdding]);

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

  const RenderItem = ({ item }: { item: labelType }) => {
    return (
      <View style={styles.labelItemStyle}>
        <View
          style={{
            backgroundColor: item.labelColor,
            width: 20,
            height: 20,
            borderRadius: 10,
          }}
        />
        <Text>{item.labelTitle}</Text>
      </View>
    );
  };

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
          <View>
            {labels.length > 0 && (
              <FlatList
                data={labels}
                renderItem={(item) => {
                  return <RenderItem item={item.item} />;
                }}
              />
            )}
          </View>
          <LabelInput SetIsLabelAdding={setIsLabelAdding} />
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
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  labelItemStyle: {
    padding: 5,
    paddingLeft: 15,
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
