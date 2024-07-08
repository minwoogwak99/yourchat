import { format } from "date-fns";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CalendarSelectModalProps {
  dueDate: Date | null;
  setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
  isCalendarVisible: boolean;
  setIsCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CalendarSelectModal = ({
  dueDate,
  setDueDate,
  isCalendarVisible,
  setIsCalendarVisible,
}: CalendarSelectModalProps) => {
  const { bottom } = useSafeAreaInsets();

  const handleDateSelect = (day: DateData) => {
    setDueDate(new Date(day.timestamp));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isCalendarVisible}>
      <View style={[styles.calendarContainer, { paddingBottom: bottom }]}>
        <View style={{ padding: 4, paddingHorizontal: 12 }}>
          <Pressable
            style={{
              alignSelf: "flex-end",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 12,
            }}
            onPress={() => setIsCalendarVisible(false)}
          >
            <Text>Done</Text>
          </Pressable>
        </View>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
  },
});

export default CalendarSelectModal;
