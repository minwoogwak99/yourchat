import * as FileSystem from "expo-file-system";
import { SQLiteDatabase } from "expo-sqlite";
import { TodoItem } from "./types";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  console.log(FileSystem.documentDirectory);
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  let currentDbVersion = result?.user_version ?? 0;

  console.log("currentdbvirsion:", db);

  if (currentDbVersion >= DATABASE_VERSION) return;

  if (currentDbVersion === 0) {
    console.log("currentdbvirsion === 0");
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE todos (
        id TEXT PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL,
        description TEXT,
        dueDate INTEGER,
        createdAt INTEGER NOT NULL,
        completedAt INTEGER,
        isImportant INTEGER DEFAULT 0
      );
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

export const addTodoItem = async (db: SQLiteDatabase, todo: TodoItem) => {
  try {
    await db.runAsync(
      `INSERT INTO todos (id, title, description, dueDate, createdAt, isImportant) 
      VALUES (?, ?, ?, ?, ?, ?);`,
      [
        todo.id,
        todo.title,
        todo.description ?? null,
        todo.dueDate?.getTime() ?? null,
        todo.createdAt.getTime(),
        todo.isImportant ? 1 : 0,
      ]
    );
  } catch (error) {
    console.log("aaaa", error);
  }
};

export const getAllTodos = async (db: SQLiteDatabase) => {
  const result =
    await db.getAllAsync<TodoItem>(`SELECT * FROM todos WHERE completedAt IS NULL
    ORDER BY createdAt DESC;
    ;`);
  return result;
};

export const getAllCompletedTodos = async (db: SQLiteDatabase) => {
  const result =
    await db.getAllAsync<TodoItem>(`SELECT * FROM todos WHERE completedAt IS NOT NULL
    ORDER BY completedAt DESC;
    ;`);
  return result;
};

export const completeTodoItem = async ({
  db,
  id,
  isCompleted,
}: {
  db: SQLiteDatabase;
  id: string;
  isCompleted: boolean;
}) => {
  const statement = await db.prepareAsync(
    `UPDATE todos SET completedAt = ? WHERE id = ?;`
  );
  try {
    if (isCompleted) {
      await statement.executeAsync([new Date().getTime(), id]);
    } else if (!isCompleted) {
      await statement.executeAsync([null, id]);
    }
  } catch (error) {
    console.log("error", error);
  }
};
