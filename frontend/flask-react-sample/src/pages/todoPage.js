import React, { useState, useEffect } from "react";
import { Card } from "../Components/Card/Card";

export const TodoPage = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setTodo(res))
      .catch((error) => console.log(error));
  });

  return (
    <>
      <Card listOfTodos={todo}/>
    </>
  );
};
