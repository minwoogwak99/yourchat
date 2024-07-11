import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CalendarSelectModalProps {
  dueDate: Date | null;
  setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
const CalendarSelectModal = ({
  dueDate,
  setDueDate,
}: CalendarSelectModalProps) => {
  const { bottom } = useSafeAreaInsets();

  const handleDateSelect = (day: DateData) => {
    setDueDate(new Date(day.timestamp));
  };
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Pressable style={styles.dateButton} onPress={handlePresentModalPress}>
        {dueDate ? (
          <Text>Due Date: {format(dueDate, "MMM d, yyyy")}</Text>
        ) : (
          <Text>Select Due Date</Text>
        )}
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View style={[styles.calendarContainer]}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [format(dueDate || Date.now(), "yyyy-MM-dd")]: {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#b6c1cd",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "orange",
                monthTextColor: "blue",
                indicatorColor: "blue",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
});

export default CalendarSelectModal;
