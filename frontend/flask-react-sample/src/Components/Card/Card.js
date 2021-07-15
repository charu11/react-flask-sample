import React from "react";

export const Card = ({ listOfTodos }) => {
  return <div>
    <>
    {listOfTodos.map(todo=>{
      return(
        <ul key={todo.id}>
          <li>{todo.content}</li>
        </ul>
      )
    })}
    </>

  </div>

};
