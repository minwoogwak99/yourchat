import { gettingTodoItemsAtom } from "@/utils/core";
import { addTodoItem } from "@/utils/Database";
import { TodoItem } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { addDays, format } from "date-fns";
import Checkbox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import { default as React, useRef, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

export const TodoInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const [, setIsTodoAdded] = useAtom(gettingTodoItemsAtom);
  const [isImportant, setIsImportant] = useState(false);

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const db = useSQLiteContext();

  const addTodo = () => {
    if (title.trim() === "") return;

    const id = uuid.v4().toString();
    const newTodo: TodoItem = {
      id,
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      createdAt: new Date(),
      isImportant,
    };

    addTodoItem(db, newTodo);
    setIsTodoAdded(true);

    setIsImportant(false);
    setTitle("");
    setDescription("");
    setDueDate(null);
    Keyboard.dismiss();
  };

  const parseNaturalLanguageDate = (input: string): Date | null => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput === "today") return new Date();
    if (lowercaseInput === "tomorrow") return addDays(new Date(), 1);
    if (lowercaseInput.match(/^in \d+ days?$/)) {
      const days = parseInt(lowercaseInput.split(" ")[1]);
      return addDays(new Date(), days);
    }
    return null;
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    const parsedDate = parseNaturalLanguageDate(text);
    if (parsedDate) {
      setDueDate(parsedDate);
    }
  };

  const handleDateSelect = (day: DateData) => {
    setDueDate(new Date(day.timestamp));
  };

  return (
    <View>
      <View style={[styles.inputContainer, { paddingBottom: bottom }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            numberOfLines={3}
            ref={titleInputRef}
            style={styles.mainInput}
            multiline={true}
            placeholder="Add a new todo..."
            value={title}
            onChangeText={handleTitleChange}
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
          />
          <FontAwesome6 name="exclamation" size={20} color="red" />
          <Checkbox
            value={isImportant}
            onValueChange={(value) => {
              setIsImportant(value);
            }}
          />
        </View>
        <TextInput
          ref={descriptionInputRef}
          style={styles.descInput}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={addTodo}
        />
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 10 }}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setIsCalendarVisible(true)}
          >
            {dueDate ? (
              <Text>Due Date: {format(dueDate, "MMM d, yyyy")}</Text>
            ) : (
              <Text>Select Due Date</Text>
            )}
          </TouchableOpacity>
          <Pressable
            style={{
              justifyContent: "center",
              backgroundColor: "#f0f0f0",
              padding: 8,
              borderRadius: 8,
            }}
            onPress={() => {
              setDueDate(null);
            }}
          >
            <Text>Delete</Text>
          </Pressable>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalendarVisible}
      >
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  mainInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginRight: "auto",
    flex: 1,
  },
  descInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
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
