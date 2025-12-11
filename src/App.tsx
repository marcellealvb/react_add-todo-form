import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { useState } from 'react';
// import { todo } from 'node:test';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
