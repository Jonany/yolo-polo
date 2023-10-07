import { Todo } from "./todo";

let todoId = 0;
const db: Todo[] = [
  { id: ++todoId, content: "item 1", completed: false },
  { id: ++todoId, content: "item 2", completed: false },
  { id: ++todoId, content: "item 3", completed: false },
  { id: ++todoId, content: "item 4", completed: false },
  { id: ++todoId, content: "item 5", completed: false },
];

export const getTodos = (): Todo[] => db;
export const getTodo = (id: number): Todo => db.find((todo) => todo.id === id)!;
export const toggleTodo = (id: number): Todo => {
  const todoIdx: number = db.findIndex((todo) => todo.id === id)!;
  db[todoIdx] = { ...db[todoIdx], completed: !db[todoIdx].completed };

  return db[todoIdx];
};
export const deleteTodo = (id: number): void => {
  const todoIdx: number = db.findIndex((todo) => todo.id === id)!;
  db.splice(todoIdx, 1);
};
export const addTodo = (content: string) => {
  const newTodo: Todo = {
    id: ++todoId,
    content: content,
    completed: false,
  };
  db.push(newTodo);
  return newTodo;
};
