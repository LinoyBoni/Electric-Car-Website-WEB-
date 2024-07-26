import React, { useEffect, useState } from "react";
import Car from "./Car";

export default function Cars() {

  const [cars_list, setCarsList] = useState([]);

  const fetch_cars_list = async ()=>{
    const response = await fetch("http://localhost:3000/all");
    const json_response = response.json();
    setCarsList(json_response);
    console.log(json_response);}
  
  useEffect(
    () => {
        async function fetch_cars_list() {
            const fechedData = await fetch("http://localhost:3000/all");
            const newCars = await fechedData.json();
            setCarsList(newCars);
            console.log(newCars);
        }
        fetch_cars_list();
     }, []
    )

const [company_list, setCompanyList] = useState([]);

const fetch_company_list = async ()=>{
  const response = await fetch("http://localhost:3000/all");
  const json_response = response.json();
  setCompanyList(json_response);
  console.log(json_response);}

useEffect(
  () => {
      async function setCompanyList() {
          const fechedData = await fetch("http://localhost:3000/all");
          const newCompany = await fechedData.json();
          setCompanyList(newCompany);
          console.log(newCompany);
      }
      setCompanyList();
     }, []
    )




  return (
    <>
      <div className="addButton">
        <button type="Add">הוספה</button>
      </div>

      {cars_list.map((car) => (
        <Car car={car} />
      ))}
    </>
  );
}
