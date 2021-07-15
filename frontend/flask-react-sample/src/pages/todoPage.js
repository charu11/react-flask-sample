import React, { useState, useEffect } from "react";
import { Card } from "../Components/Card/Card";
import { Form } from "../Components/Forms/Form";

export const TodoPage = () => {
  const [todo, setTodo] = useState([]);
  const [addTodo, setAddTodo] = useState("");

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
  }, []);

  const handleFormChange = (inputValue) => {
    setAddTodo(inputValue);
    console.log(addTodo);
  };

  const handleFormSubmit = () => {
    fetch("/todo", {
      method: "POST",
      body: JSON.stringify({
        content: addTodo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
        setAddTodo("");
        getLatestTodo();
      });

    const getLatestTodo = () => {
      fetch("/home")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => setTodo(data));
    };
  };

  return (
    <>
      <Form
        userInput={addTodo}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <Card listOfTodos={todo} />
    </>
  );
};
