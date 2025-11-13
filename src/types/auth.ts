export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'staff' | 'manager';
  createdAt: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
