import { TodoItem } from "@/utils/types";
import { format } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  item: TodoItem;
}
export const TodoSingleItem = ({ item }: Props) => {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      {item.dueDate && (
        <Text style={styles.todoDueDate}>
          Due: {format(item.dueDate, "MMM d, yyyy")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoDescription: {
    fontSize: 14,
    color: "gray",
  },
  todoDueDate: {
    fontSize: 12,
    color: "blue",
    marginTop: 5,
  },
});
