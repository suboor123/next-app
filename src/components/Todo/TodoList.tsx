import React from "react";
import TodoCard from "./TodoCard";
import TodoCss from "./TodoCss";
import TodoBottom from "./TodoBottom";
import TodoHeader from "./TodoHeader";

const TodoList = () => {
  return (
    <>
      <TodoHeader />
      <TodoCss />
      <TodoCard />
      <TodoBottom />
    </>
  );
};

export default TodoList;
