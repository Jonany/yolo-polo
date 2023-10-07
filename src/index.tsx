import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

import { TodoItem, TodoList } from "./todo";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "./db";
import { BaseHtml } from "./basehtml";
import { VideoList } from "./video";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body>
          <VideoList
            {...{
              paths: [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8].map(
                (_) => "video1"
              ),
            }}
          ></VideoList>
        </body>
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
  .get("/static/example-1080p.mp4", () =>
    Bun.file("./static/coverr-7522-1080p.mp4")
  )
  .get("/video1", () => Bun.file("./static/coverr-7522-1080p.mp4"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
