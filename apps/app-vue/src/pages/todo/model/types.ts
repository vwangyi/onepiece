export interface TaskCategory {
  key: symbol;
  icon: string;
  title: string;
  total: number;
  active: boolean;
}

export interface Task {
  key: symbol;
  hover: boolean;
  title: string;
  active: boolean;
}
