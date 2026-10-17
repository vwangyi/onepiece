// 标准的用户实体接口
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  roles: ('admin' | 'user' | 'editor')[];
}

// 补充定义用户相关的状态类型
export interface UserState {
  currentUser: User | null;
  isAuth: boolean; // 是否已登录
  isLoading: boolean;
}
