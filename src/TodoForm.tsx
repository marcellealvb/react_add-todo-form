import './App.scss';

import usersFromServer from './api/users';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { getUserById } from './App';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>
        <input
          id="todo-title"
          type="text"
          placeholder="Please enter a title"
          value={title}
          onChange={handleTitleChange}
          data-cy="titleInput"
        />
        {hasTitleError && <span className="error">Title is required</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user-id">
          User:
        </label>
        <select
          id="todo-user-id"
          value={userId}
          onChange={handleUserChange}
          data-cy="userSelect"
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">User is required</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
