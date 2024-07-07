export interface TodoItem {
  id: string;
  createdAt: Date;
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  isImportant: boolean;
}
