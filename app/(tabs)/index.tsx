import { TodoInput } from "@/components/todo/TodoInput";
import { TodoSingleItem } from "@/components/todo/TodoSingleItem";
import { gettingTodoItemsAtom, TodoItemListAtom } from "@/utils/core";
import { getAllTodos } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoApp = () => {
  const db = useSQLiteContext();

  const [todoItemList, setTodoItemList] = useAtom(TodoItemListAtom);
  const [isTodoAdded, setIsTodoAdded] = useAtom(gettingTodoItemsAtom);

  const [isAddingTodo, setIsAddingTodo] = useState(false);

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <FlatList
          data={todoItemList}
          renderItem={(item) => {
            console.log(item);
            return <TodoSingleItem item={item.item} />;
          }}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
        <Pressable
          style={{
            position: "absolute",
            bottom: 30,
            right: 16,
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "#DEEED6",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setIsAddingTodo(true);
          }}
        >
          <Text>+</Text>
        </Pressable>
        {isAddingTodo && <TodoInput setisAddingTodo={setIsAddingTodo} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodoApp;
