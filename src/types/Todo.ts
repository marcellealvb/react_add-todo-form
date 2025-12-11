import { User } from '../types/User';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}
