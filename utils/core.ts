import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { atom } from "jotai";
import { TodoItem } from "./types";

export const userAtom = atom<FirebaseAuthTypes.User | null>(null);
export const fsInitializingAtom = atom<boolean>(true);

export const TodoItemListAtom = atom<TodoItem[]>([]);
export const isTodoAddedAtom = atom<boolean>(false);
