import * as FileSystem from "expo-file-system";
import { SQLiteDatabase } from "expo-sqlite";
import { filterType, labelType, TodoItem } from "./types";

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
      CREATE TABLE labels (
        id TEXT PRIMARY KEY NOT NULL,
        labelTitle TEXT NOT NULL,
        labelColor TEXT 
      );
      CREATE TABLE filters (
        id TEXT PRIMARY KEY NOT NULL,
        filterTitle TEXT NOT NULL,
        filterQuery TEXT NOT NULL,
        filterColor TEXT
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
    console.log("error ADD TODO ITEM::", error);
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
    console.log("error COMPLETE TODO::", error);
  }
};

export const createLabel = async (db: SQLiteDatabase, label: labelType) => {
  try {
    await db.runAsync(
      `INSERT INTO labels (id, labelTitle, labelColor) 
      VALUES (?, ?, ?);`,
      [label.id, label.labelTitle, label.labelColor ?? null]
    );
  } catch (error) {
    console.log("error CREATE LABEL::", error);
  }
};

export const getLabels = async (db: SQLiteDatabase) => {
  const result = await db.getAllAsync<labelType>(`SELECT * FROM labels;`);
  return result;
};

export const createFilter = async (db: SQLiteDatabase, filter: filterType) => {
  try {
    await db.runAsync(
      `INSERT INTO filters (id, filterTitle, filterQuery, filterColor) 
      VALUES (?, ?, ?, ?);`,
      [
        filter.id,
        filter.filterTitle,
        filter.filterQuery,
        filter.filterColor ?? null,
      ]
    );
  } catch (error) {
    console.log("error CREATE FILTER::", error);
  }
};
