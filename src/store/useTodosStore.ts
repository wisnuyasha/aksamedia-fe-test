import { create } from "zustand";
import { Todos } from "../constants/Todos";
import { TTodo } from "../types/TTodos";

interface userState {
  todos: TTodo[];
  createTodo: (newTodos: TTodo) => void;
  mutateTodos: (newTodos: TTodo[]) => void;
  deleteTodo: (id: string) => void;
}

export const useTodosStore = create<userState>()((set) => ({
  todos:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("todos") || "null") || Todos
      : Todos,
  createTodo: (newTodo) => {
    set((state) => {
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    });
  },
  mutateTodos: (newTodos) => {
    set({ todos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  deleteTodo: (id) => {
    set((state) => {
      const deletedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
      return { todos: deletedTodos };
    });
  },
}));
