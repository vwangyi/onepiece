export interface TaskCategory {
  key: symbol;
  icon: string;
  title: string;
  total: number;
  active: boolean;
}

/** 后端统一响应包装（按你实际接口调整） */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 后端 DTO (后端 DTO ≠ 前端 Model)
export interface TaskDTO {
  id: number;
  title: string;
}
// 前端 Model (后端 DTO ≠ 前端 Model)
export interface Task {
  key: symbol;
  hover: boolean;
  title: string;
  active: boolean;
}
