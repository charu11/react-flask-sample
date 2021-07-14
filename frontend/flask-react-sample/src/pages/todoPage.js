import React, { useState, useEffect } from "react";
import { Card } from "../Components/Card/Card";

export const TodoPage = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  });

  return (
    <>
      <Card />
    </>
  );
};
