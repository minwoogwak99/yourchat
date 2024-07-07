import { gettingTodoItemsAtom } from "@/utils/core";
import { completeTodoItem } from "@/utils/Database";
import { TodoItem } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { format } from "date-fns";
import Checkbox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
interface Props {
  item: TodoItem;
}
export const TodoSingleItem = ({ item }: Props) => {
  const db = useSQLiteContext();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  useEffect(() => {
    setIsCompleted(!!item.completedAt);
  }, []);
  const [, setGettingTodoItems] = useAtom(gettingTodoItemsAtom);

  const handleChekcboxChange = async (isCompleted: boolean) => {
    setGettingTodoItems(true);
    completeTodoItem({ db, id: item.id, isCompleted });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleAndDesc}>
        <View style={{ flexDirection: "row" }}>
          {item.isImportant ? (
            <FontAwesome6 name="exclamation" size={20} color="red" />
          ) : (
            <></>
          )}
          <Text
            style={[
              styles.todoTitle,
              {
                textDecorationLine: item.completedAt ? "line-through" : "none",
                color: item.completedAt ? "gray" : "black",
                paddingLeft: item.isImportant ? 10 : 15,
              },
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
        </View>
        <Text style={styles.todoDescription}>{item.description}</Text>
      </View>

      <View style={styles.dateAndComplete}>
        <Checkbox
          style={{ alignSelf: "flex-end" }}
          value={isCompleted}
          onValueChange={(value) => {
            console.log("kkkkkkkk");
            setIsCompleted(value);
            handleChekcboxChange(value);
          }}
        />
        {item.dueDate && (
          <Text style={styles.todoDueDate}>
            Due: {format(item.dueDate, "MMM d, yyyy")}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  titleAndDesc: { flex: 1, paddingRight: 20, gap: 6 },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateAndComplete: {
    flexDirection: "column",
    gap: 6,
  },
  todoDescription: {
    fontSize: 14,
    color: "gray",
  },
  todoDueDate: {
    fontSize: 12,
    color: "blue",
    flex: 1,
  },
});
