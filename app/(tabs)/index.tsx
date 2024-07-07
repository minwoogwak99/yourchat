import { TodoInput } from "@/components/todo/TodoInput";
import { TodoSingleItem } from "@/components/todo/TodoSingleItem";
import { isTodoAddedAtom, TodoItemListAtom } from "@/utils/core";
import { getAllTodos } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";

// Schema

const TodoApp = () => {
  const [todoItemList, setTodoItemList] = useAtom(TodoItemListAtom);
  const db = useSQLiteContext();
  const [isTodoAdded, setIsTodoAdded] = useAtom(isTodoAddedAtom);

  const fetchTodoList = async () => {
    const result = await getAllTodos(db);
    setTodoItemList(result);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  useEffect(() => {
    if (isTodoAdded) {
      fetchTodoList();
      setIsTodoAdded(false);
    }
  }, [isTodoAdded]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
    >
      <FlatList
        data={todoItemList}
        renderItem={TodoSingleItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
      <TodoInput />
    </KeyboardAvoidingView>
  );
};

export default TodoApp;
