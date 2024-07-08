import { gettingTodoItemsAtom } from "@/utils/core";
import { addTodoItem } from "@/utils/Database";
import { TodoItem } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { addDays, format } from "date-fns";
import Checkbox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import { default as React, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import CalendarSelectModal from "./CalendarSelectModal";

interface TodoInputProps {
  setisAddingTodo: (isAddingTodo: boolean) => void;
}
export const TodoInput = ({ setisAddingTodo }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const [, setIsTodoAdded] = useAtom(gettingTodoItemsAtom);
  const [isImportant, setIsImportant] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);

  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const db = useSQLiteContext();

  useEffect(() => {
    if (titleInputRef.current) titleInputRef.current.focus();
  }, []);

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

  return (
    <>
      <View style={[styles.inputContainer]}>
        <View>
          <Pressable
            style={{ alignSelf: "flex-end", paddingRight: 5 }}
            onPress={() => {
              setIsImportant(false);
              setTitle("");
              setDescription("");
              setDueDate(null);
              setisAddingTodo(false);
            }}
          >
            <Text>Cancel</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ paddingVertical: 10, flex: 1, maxHeight: 120 }}>
            <TextInput
              ref={titleInputRef}
              style={[
                styles.mainInput,
                { height: inputHeight, maxHeight: 100 },
              ]}
              multiline={true}
              placeholder="Add a new todo..."
              textAlignVertical="center"
              value={title}
              onChangeText={handleTitleChange}
              blurOnSubmit={false}
              onContentSizeChange={(e) => {
                console.log(e.nativeEvent.contentSize.height);
                setInputHeight(
                  Math.max(40, e.nativeEvent.contentSize.height + 20)
                );
              }}
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
            />
          </View>
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
          <Pressable
            style={styles.dateButton}
            onPress={() => setIsCalendarVisible(true)}
          >
            {dueDate ? (
              <Text>Due Date: {format(dueDate, "MMM d, yyyy")}</Text>
            ) : (
              <Text>Select Due Date</Text>
            )}
          </Pressable>
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
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </Pressable>
      </View>

      <CalendarSelectModal
        dueDate={dueDate}
        setDueDate={setDueDate}
        isCalendarVisible={isCalendarVisible}
        setIsCalendarVisible={setIsCalendarVisible}
      />
    </>
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
    fontSize: 16,
    lineHeight: 20,
  },
  descInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
