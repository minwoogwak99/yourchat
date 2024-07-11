import InputBottomSheet from "@/components/todo/InputBottomSheet";
import { TodoSingleItem } from "@/components/todo/TodoSingleItem";
import { gettingTodoItemsAtom, TodoItemListAtom } from "@/utils/core";
import { getAllTodos } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

const TodoApp = () => {
  const db = useSQLiteContext();

  const [todoItemList, setTodoItemList] = useAtom(TodoItemListAtom);
  const [isTodoAdded, setIsTodoAdded] = useAtom(gettingTodoItemsAtom);

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
    <View style={{ flex: 1 }}>
      <FlatList
        data={todoItemList}
        renderItem={(item) => {
          return <TodoSingleItem item={item.item} />;
        }}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, paddingTop: 10 }}
      />
      <InputBottomSheet />
    </View>
  );
};

export default TodoApp;
