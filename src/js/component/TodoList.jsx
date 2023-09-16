import React, { useState, useEffect } from "react";


function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const url = "https://playground.4geeks.com/apis/fake/todos/user/lgmm";


  function handleInput(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      let newTask = {label: inputValue, done: false}
      let newList = [...list, newTask]
      console.log(newList);
      putTodo(newList);
      setList(newList);
      setInputValue("");
    } else {
      alert("El campo no puede estar vacío");
    }
  }


  function handleRemoveItem(tarea) {
    setList(list.filter((item, i) => tarea !== item));
  }


  // 1. define una funcion asincrona que ejecura el request, -- GET
  const getTodo = async () => {
    // 2. defino la variable con el endPoint
    // 3. defino el request option
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // 4. ejecuto el fetch en modo await y el resultado lo asigno a la variable response
    const response = await fetch(url, options);
    // 5. verifico que la respuesta sea buena o de un error
    if (response.ok) {
      // 5.1.1 si la respuesta es ok obtengo el json del response (body)
      const data = await response.json();
      // 5.1.2 realizo todo lo necesario con los datos obtenidos
      console.log("ok", data);
      setList(data);
    } else {
      // 5.2 hago todo lo necesario en caso de un error en la consulta
      console.log("error", response.status, response.statusText);
    }
  };


  const putTodo = async (updateList) => {
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateList),
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("error", response.status, response.statusText);
    }
};


  // useEffect es un hook de React (por lo tanto es una funcion) que tiene dos parametros:
  // el primer parametro es una funcion
  // el segundo parametro es un array
  useEffect(() => {
    getTodo();
    // 1. todo el codigo de js que quiera ejecutar cuando se renderice el componente
    return true;
    // 2. return todo el componente que quieres que se ejecute cuando se levante el componente
  }, []); // 3. el array puede contener expresiones de js. cuando esas expresiones cambien de valor se va a ejecutar el useEffect
  // 1. se ejecuta al inicio (cuando se monta)
  // 2. se ejecuta al final (cuando se desmonta)
  // 3. se ejecuta mientras (durante el ciclo de vida)


  return (
    <div>
      <h1>My ToDo's</h1>
      <ul>
        <li>
          <form onSubmit={handleInput}>
            <input
              type="text"
              value={inputValue}
              placeholder="¿Qué necesitas hacer?"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>
        </li>
        {list.map((item, index) => (
          <li className="d-flex justify-content-between box" key={index}>
            {item.label}
          </li>
        ))}
        <li className="pending">
          {list.length == 0
            ? "No hay tareas, añadir tareas"
            : `Tienes ${list.length} tareas pendientes.`}
        </li>
      </ul>
      <button onClick={() => handleRemoveItem(item)}>Limpiar todas las tareas</button>

    </div>
  );
}

export default TodoList;
