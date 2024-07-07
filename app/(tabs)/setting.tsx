import { TodoSingleItem } from "@/components/todo/TodoSingleItem";
import { gettingTodoItemsAtom } from "@/utils/core";
import { getAllCompletedTodos } from "@/utils/Database";
import { TodoItem } from "@/utils/types";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const setting = () => {
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);
  const db = useSQLiteContext();
  const [gettingTodoItems] = useAtom(gettingTodoItemsAtom);

  const getCompletedTodos = async () => {
    const result = await getAllCompletedTodos(db);
    setCompletedTodos(result);
  };
  useEffect(() => {
    getCompletedTodos();
  }, [gettingTodoItems]);

  return (
    <FlatList
      data={completedTodos}
      renderItem={(item) => {
        return <TodoSingleItem item={item.item} />;
      }}
      keyExtractor={(item) => item.id}
      style={{ flex: 1 }}
    />
  );
};

export default setting;
