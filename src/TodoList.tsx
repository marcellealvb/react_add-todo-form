import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={
            todo.completed
              ? 'TodoInfo TodoInfo--completed'
              : 'TodoInfo TodoInfo--pending'
          }
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            {todo.user?.name}
          </a>
        </article>
      ))}
    </section>
  );
};
