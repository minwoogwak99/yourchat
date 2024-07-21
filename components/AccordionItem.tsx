import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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

export default AccordionItem;

const styles = StyleSheet.create({
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
