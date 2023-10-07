import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { TodoItem, TodoList } from "./todo";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "./db";
import { BaseHtml } from "./basehtml";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/todos"
          hx-swap="innerHTML"
          hx-trigger="load"
        />
      </BaseHtml>
    )
  )
  .get("/todos", () => <TodoList todos={getTodos()} />)
  .post(
    "/todos/toggle/:id",
    ({ params }) => <TodoItem {...toggleTodo(params.id)} />,
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete("/todos/:id", ({ params }) => deleteTodo(params.id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .post("/todos", ({ body }) => <TodoItem {...addTodo(body.content)} />, {
    body: t.Object({
      content: t.String({ minLength: 1 }),
    }),
  })
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
