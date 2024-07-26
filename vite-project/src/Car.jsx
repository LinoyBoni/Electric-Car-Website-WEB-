import React from 'react'

export default function Car({car}) {
  return (
    <>

    {/*<lable>{car.car_name}</lable>*/}
    
        <div className ="car-list">
            <div className ="car-item">
                <img src="https://via.placeholder.com/150" alt="Tesla Model 3"></img>
                <div className ="car-details">
                    <h3>{car.Car_name}</h3>
                    <label>{car.battery} kwh useable battery </label>
                    <br/>
                    <br/>
                    <label>Acc 0-100: {car['acceleration..0.100.']} sec | </label>
                    <label>Top Speed: {car.Top_speed} km/h | </label>
                    <label>Range: {car.Range} km | </label>
                    <label>Efficiency: {car.Efficiency} Wh/km | </label>
                    <label>Fastcharge: {car.Fast_charge} km/h | </label>
                    <label>Price: {car['Price.DE.']} $ | </label>

                    <div className ="buttons">
                         <button type="Update">עדכן</button>
                         <br/>
                         <button type="Delete">מחק פריט זה</button>
                    </div>
                </div>
                {/*<div class="car-prices">
                    <p>€43,470 (DE)</p>
                    <p>€43,490 (NL)</p>
                    <p>€39,990 (UK)</p>
                </div>*/}
            </div>
        </div>

    </>
  )
}
