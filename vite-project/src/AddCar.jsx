import React, { useState } from 'react'

export default function AddCar({ setDisplayAdd }) {

    const cencelButtonHandler = () => {
        setDisplayAdd(false)
    }

    const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const battery = e.target["battery"].value;
    const acceleration = e.target["acceleration"].value;
    const car_name = e.target["Car_name"].value;
    const company = e.target["company"].value;
    const efficiency = e.target["Efficiency"].value;
    const fast_charge = e.target["Fast_charge"].value;
    const range = e.target["Ranging"].value;
    const top_speed = e.target["top_speed"].value;
    const price = e.target["Price"].value;

    let formData = new FormData();

    formData.append("aaa", "aaaaa");
    formData.append('battery', battery);
    formData.append("acceleration", acceleration)
    formData.append("Car_name", car_name)
    formData.append("company", company)
    formData.append("Efficiency", efficiency)
    formData.append("Fast_charge", fast_charge)
    formData.append("Price", price)
    formData.append("Ranging", range)
    formData.append("Top_speed", top_speed)
    
    console.log("formData", formData)

        const response = await fetch("http://localhost:3000/add", {
            method: "post",
            body: formData
        });
        const response_json = await response.json();
        console.log(response_json)
    }

    return (<>
        <div>AddCar</div>
        <form onSubmit={submitHandler}>
            <div>
                <br />
                <label> <input type='text' name="battery" /> kwh useable battery </label>
                <br />
                <label>Acc 0-100: <input type='text' name='acceleration'/> sec | </label>
                <br />
                <label>Top Speed: <input type='text' name='topSpeed'/> km/h | </label>
                <br />
                <label>Range: <input type='text' name='range' /> km | </label>
                <br />
                <label>Efficiency: <input type='text' name='efficiency'/> Wh/km | </label>
                <br />
                <label>Fastcharge: <input type='text' name='fastCharge' /> km/h | </label>
                <br />
                <label>car name: <input type='text' name='carName'/> km/h | </label>
                <br />
                <label>company: <input type='text' name='company'/> km/h | </label>
                <br />
                <label>Price: <input type='text' name='price' /> $ | </label>
            </div>
            <div>
                <button onClick={cencelButtonHandler}>סגור</button>
                <button type='submit'>הוסף רכב</button>
            </div>
        </form>
    </>
    )
}
