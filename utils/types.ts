export interface TodoItem {
  id: string;
  createdAt: string;
  title: string;
  description?: string;
  dueDate?: Date;
}
