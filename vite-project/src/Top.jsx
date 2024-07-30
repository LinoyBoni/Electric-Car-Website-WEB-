import React, { useState, useEffect } from 'react';
//import axios from 'axios';

export default function Top({setCarsList}) {

//---------------------Display the select filter by company names---------------------
const [companiesList, setCompaniesList] = useState([])
  
const fetchCompanies = async ()=>{
  const response = await fetch("http://localhost:3000/allCompanies");
  const json_response = await response.json();
  setCompaniesList(json_response);

}

  useEffect(
    ()=>{

      fetchCompanies();

        async function fetch_cars_list() {
            const fechedData = await fetch("http://localhost:3000/all");
            const newCars = await fechedData.json();
            setCarsList(newCars);
        }
        fetch_cars_list();
      
    },[]
  )
  const companyChangedHandle = async (e)=>{
    let response;
    if(e.target.value == "all") response = await fetch(`http://localhost:3000/all`);
    else  response = await fetch(`http://localhost:3000/companies/${e.target.value}`);
    const json_response = await response.json();
    setCarsList(json_response)
  }
const filterChangeHandler = async (e)=>{
  const response = await fetch(`http://localhost:3000/filters/${e.target.value}`);
    const json_response = await response.json();
    console.log(json_response)
    setCarsList(json_response)
}

const resetDisplay = async() =>{
  const response = await fetch(`http://localhost:3000/all/`);
    const json_response = await response.json();
    console.log(json_response)
    setCarsList(json_response)
}

  //---------------------------------------------------------------------------------------

  return (
    <>
      <h1>אתר לרכבים חשמליים</h1>
      <div className ="selectsRst">
        <div className ="selects">
          <div className ="allselects">
            {/*----------------------סינון כל הרכבים לפי חברה------------------------------*/}
            <select onChange={companyChangedHandle} name="company" id="company">
              <option value="all">הצג רכבים לפי חברה</option>
              {companiesList.map(
                ({company})=>{
                  return <option value={`${company}`}>{`${company}`}</option>
                })
              }
            </select>


            {/*---------------------------מיון כל הרכבים -----------------------------*/}
            <select onChange={filterChangeHandler} name="sort" id="sort">
            <option value="sorting">בחר מיון</option>
              <option value="battery">הצג נפח סוללה מהגבוה לנמוך</option>
              <option value="A-Z">הצג רכבים לפי סדר א,ב</option>
              <option value="efficiency">הצג יעילות מהנמוך לגבוה </option>
              <option value="charge">הצג טעינה מממהירה לאיטית</option>
              <option value="price">הצג מחיר מהיקר לזול</option>
              <option value="range">מיין רכבים לפי טווח</option>
              <option value="speed">מיין רכבים מהכי מהיר להכי איטי</option>
              <option value="acc">הצג רכבים לפי זמן ההאצה הכי קצר להכי ארוך</option>
            </select>

            {/*----------------------מיון הדגם הכי טוב לפי בחירה------------------------------*/}
            <select onChange={filterChangeHandler} name="Max" id="Max">
            <option value="filtering">בחר סינון</option>
              <option value="MaxSpeed">הדגם המהיר ביותר</option>
              <option value="MaxAcc">הדגם בעל האצה הכי טובה</option>
              <option value="MaxEfficiency">הדגם הכי יעיל</option>
              <option value="MaxRange">הדגם בעל הטווח הכי טוב</option>
              <option value="MaxBattery">הדגם בעל נפח הסוללה הכי טוב </option>
            </select>
          </div>
     
 {/*----------------------אפס את הנתונים באמצעות כפתור-----------------------------*/}
          <div className ="rst">
            <button onClick={resetDisplay} type="reset">איפוס</button>
          </div>
        </div>
      </div>

      <div className ="sliders">
 {/*----------------------------מציג טווח יעילות----------------------------------*/}
        {/*<div class="row1">*/}
        <div className ="slider">
          <label>
            Efficiency: <span id="efficiencyValue">100 - 350 Wh/km</span>
          </label>
          <input
            type="range"
            id="efficiency"
            min="100"
            max="350"
            step="10"
          ></input>
        </div>

 {/*--------------------------מציג טווח טעינה מהירה----------------------------------*/}
        <div className ="slider">
          <label>
            Fastcharge: <span id="fastchargeValue">0 - 1500 km/h</span>
          </label>
          <input
            type="range"
            id="fastcharge"
            min="0"
            max="1500"
            step="50"
          ></input>
        </div>

        {/*--------------------------------מציג טווח מחירים---------------------------------*/}
        <div className ="slider">
          <label>
            Price: <span id="priceValue">10,000 - 100,000 €</span>
          </label>
          <input
            type="range"
            id="price"
            min="10000"
            max="100000"
            step="1000"
          ></input>
          {/*</div>*/}
        </div>

        {/*<div class="row2">*/}
        {/*-----------------------------מציג טווח של טווח רכב-------------------------------*/}
        <div className ="slider">
          <label>
            Range: <span id="rangeValue">0 - 1000 km</span>
          </label>
          <input type="range" id="range" min="0" max="1000" step="10"></input>
        </div>

        {/*----------------------מציג טווח מהירות הכי גבוהה של רכב----------------------------*/}
        <div className ="slider">
          <label>
            Top Speed: <span id="topSpeedValue">110 - 350 km/h</span>
          </label>
          <input
            type="range"
            id="topSpeed"
            min="110"
            max="350"
            step="10"
          ></input>
        </div>

        {/*-------------------------------מציג טווח האצה-------------------------------------*/}
        <div className ="slider">
          <label>
            Acceleration: <span id="accelerationValue">2 - 23 s</span>
          </label>
          <input
            type="range"
            id="acceleration"
            min="2"
            max="23"
            step="1"
          ></input>
          {/*</div>*/}
        </div>
      </div>
    </>
  );
}

