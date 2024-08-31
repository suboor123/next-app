import TodoList from "@/components/Todo/TodoList";
import React from "react";

export async function getStaticProps() {
    return {
        props: {}
    }
}

type Props = {};

const Todo = (props: Props) => {
  return <TodoList />;
};

export default Todo;
