import React from "react";
import React, { useState, useEffect } from 'react';/////
import axios from 'axios';////

export default function Top() {
   
  const CarFilter = () => {
      const [company, setCompany] = useState('');
      const [price, setPrice] = useState('');
      const [efficiency, setEfficiency] = useState('');
      const [cars, setCars] = useState([]);
  
      useEffect(() => {
          fetchCars();
      }, [company, price, efficiency]);
  
      const fetchCars = () => {
          const [minPrice, maxPrice] = price ? price.split('-').map(Number) : [0, Infinity];
          const [minEfficiency, maxEfficiency] = efficiency ? efficiency.split('-').map(Number) : [0, Infinity];
  
          axios.get('http://localhost:3000/filterCars', {
              params: {
                  company,
                  minPrice,
                  maxPrice,
                  minEfficiency,
                  maxEfficiency
              }
          }).then(response => {
              setCars(response.data);
          }).catch(error => {
              console.error('There was an error fetching the cars!', error);
          });
      };


  return (
    <>
      <h1>Electric Vehicles</h1>
      <div className ="selectsRst">
        <div className ="selects">
          <div className ="allselects">
            {/*----------------------סינון כל הרכבים לפי חברה------------------------------*/}
            <select name="company" id="company">
              <option value="companyname">הצג רכבים לפי חברה</option>
              <option value="battery">הצג נפח סוללה מהגבוה לנמוך</option>
            </select>

            <div id="car-list">
                  {cars.map(car => (
                      <div key={car.id} className="car-item">
                          <h3>{car.Car_name}</h3>
                          <p>Company: {car.Company}</p>
                          <p>Price: €{car.Price.DE}</p>
                          <p>Efficiency: {car.Efficiency} Wh/km</p>
                          <p>Top Speed: {car.Top_speed} km/h</p>
                          <p>Range: {car.Range} km</p>
                          <p>Fast Charge: {car.Fast_charge} km/h</p>
                          <p>Acceleration: {car.acceleration}</p>
                          <p>Battery: {car.Battery}</p>
                      </div>
                  ))}
              </div>

            {/*---------------------------מיון כל הרכבים -----------------------------*/}
            <select name="sort" id="sort">
              <option value="battery">הצג נפח סוללה מהגבוה לנמוך</option>
              <option value="A-Z">הצג רכבים לפי סדר א,ב</option>
              <option value="efficiency">הצג יעילות מהגבוה לנמוך </option>
              <option value="charge">הצג טעינה מממהירה לאיטית</option>
              <option value="price">הצג מחיר מהיקר לזול</option>
              <option value="range">מיין רכבים לפי טווח</option>
              <option value="speed">מיין רכבים מהכי מהיר להכי איטי</option>
              <option value="acc">
                הצג רכבים לפי זמן ההאצה הכי קצר להכי ארוך
              </option>
            </select>

            {/*----------------------מיון הדגם הכי טוב לפי בחירה------------------------------*/}
            <select name="Max" id="Max">
              <option value="MaxSpeed">הדגם המהיר ביותר</option>
              <option value="MaxAcc">הדגם בעל האצה הכי טובה</option>
              <option value="MaxEfficiency">הדגם הכי יעיל</option>
              <option value="MaxRange">הדגם בעל הטווח הכי טוב</option>
              <option value="MaxBattery">הדגם בעל נפח הסוללה הכי טוב </option>
            </select>
          </div>

          <div className ="rst">
            <button type="reset">
              איפוס
            </button>
          </div>
        </div>
        {/*----------------------אפס את הנתונים באמצעות כפתור-----------------------------*/}
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
}
