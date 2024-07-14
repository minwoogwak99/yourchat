export interface TodoItem {
  id: string;
  createdAt: Date;
  title: string;
  description?: string;
  dueDate?: Date;
  completedAt?: Date;
  isImportant: boolean;
}

export interface labelType {
  id: string;
  labelTitle: string;
  labelColor?: string;
}

export interface filterType {
  id: string;
  filterTitle: string;
  filterQuery: string;
  filterColor?: string;
}
