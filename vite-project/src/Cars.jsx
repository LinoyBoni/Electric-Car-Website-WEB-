import React, { useEffect, useState } from "react";
import Car from "./Car";

export default function Cars({cars_list, setCarsList,  setDisplayAdd}) {

  
const [ isCarDeleted, setIsCarDeleted] = useState(false)

  const AddButtonHandler = ()=>{
      setDisplayAdd(true)
  }

  useEffect(()=>{
    async function fetch_cars_list() {
      const fechedData = await fetch("http://localhost:3000/all");
      const newCars = await fechedData.json();
      setCarsList(newCars);
  }
  fetch_cars_list();
  setIsCarDeleted(false)
  }, [isCarDeleted])

  return (
    <>
      <div className="addButton">
        <button onClick={AddButtonHandler} type="Add">הוספה</button>
      </div>

      {cars_list.map((car) => (
        <Car car={car} setIsCarDeleted={setIsCarDeleted} />
      ))}
    </>
  );
}
