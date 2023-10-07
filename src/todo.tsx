import * as elements from "typed-html";

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export function TodoItem({ content, completed, id }: Todo) {
  return (
    <div
      data-todo-item
      class="card card-compact w-full shadow-md border-solid border border-black-600 rounded-lg p-2"
    >
      <div class="card-body items-center text-center">
        <h2 class="card-title">todo # {id}</h2>
        <p>{content}</p>
        <div class="card-actions justify-end">
          <button
            hx-post={`/todos/toggle/${id}`}
            hx-swap="outerHTML"
            hx-target="closest [data-todo-item]"
            class="btn btn-square"
          >
            <input type="checkbox" checked={completed} />
          </button>
          <button
            class="text-red-500 btn btn-square"
            hx-delete={`/todos/${id}`}
            hx-swap="outerHTML"
            hx-target="closest [data-todo-item]"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="space-y-3">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}

export function TodoForm() {
  return (
    <form
      class="grid grid-flow-col auto-cols-max gap-2"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input
        type="text"
        name="content"
        class="input input-bordered w-full max-w-xs"
      />
      <button type="submit" class="btn btn-square">
        Add
      </button>
    </form>
  );
}
