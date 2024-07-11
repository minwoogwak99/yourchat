import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TodoInput } from "./TodoInput";

const InputBottomSheet = () => {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Pressable onPress={handlePresentModalPress} style={styles.addButton}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          +
        </Text>
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <TodoInput InputViewBottomSheetRef={bottomSheetModalRef} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});

export default InputBottomSheet;
