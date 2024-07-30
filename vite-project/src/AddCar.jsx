import React, { useState } from 'react'

export default function AddCar({ setDisplayAdd }) {

const [ battery, setBattery] = useState();
const [ acceleration, setAcceleration] = useState();
const [ car_name, setCarName] = useState();
const [ company, setCompany] = useState();
const [ efficiency , setEfficiency] = useState();
const [ fast_charge, setfastCharge] = useState();
const [ price, setPrice] = useState();
const [ range, setRange] = useState();
const [ top_speed, setTopSpeed] = useState();


    const cencelButtonHandler = () => {
        setDisplayAdd(false)
    }

    const saveButtonHandler = async () => {
    let formData = new FormData()
    formData.append("battery", battery);
    formData.append("acceleration..0.100.", acceleration)
    formData.append("Car_name", car_name)
    formData.append("company", company)
    formData.append("Efficiency", efficiency)
    formData.append("Fast_charge", fast_charge)
    formData.append("Price.DE.", price)
    formData.append("Range", range)
    formData.append("Top_speed", top_speed)

        const response = await fetch("http://localhost:3000/add", {
            type: "post",
            body: formData
        });
        const response_json = await response.json();
        console.log(response_json)
    }

    const batteryChangeHandler = (e)=>{
        setBattery(e.target.value)
    }

    const accelerationChangeHandler = (e)=>{
        setAcceleration(e.target.value)
    }

    const efficiencyChangeHandler = (e)=>{
        setEfficiency(e.target.value)
    }

    const companyChangeHandler = (e)=>{
        setCompany(e.target.value)
    }

    const carNameChangeHandler = (e)=>{
        setCarName(e.target.value)
    }

    const fastChargeChangeHandler = (e)=>{
        setfastCharge(e.target.value)
    }

    const priceChangeHandler = (e)=>{
        setPrice(e.target.value)
    }

    const rangeChangeHandler = (e)=>{
        setRange(e.target.value)
    }

    const topSpeedChangeHandler = (e)=>{
        setTopSpeed(e.target.value)
    }




    return (<>
        <div>AddCar</div>
        <form>
            <div>
                <br />
                <label> <input type='text' onChange={batteryChangeHandler} /> kwh useable battery </label>
                <br />
                <label>Acc 0-100: <input type='text' onChange={accelerationChangeHandler} /> sec | </label>
                <br />
                <label>Top Speed: <input type='text' onChange={topSpeedChangeHandler}/> km/h | </label>
                <br />
                <label>Range: <input type='text' onChange={rangeChangeHandler} /> km | </label>
                <br />
                <label>Efficiency: <input type='text' onChange={efficiencyChangeHandler} /> Wh/km | </label>
                <br />
                <label>Fastcharge: <input type='text' onChange= {fastChargeChangeHandler} /> km/h | </label>
                <br />
                <label>car name: <input type='text' onChange={carNameChangeHandler}/> km/h | </label>
                <br />
                <label>company: <input type='text' onChange = {companyChangeHandler}/> km/h | </label>
                <br />
                <label>Price: <input type='text' onChange = {priceChangeHandler} /> $ | </label>
            </div>
            <div>
                <button onClick={cencelButtonHandler}>סגור</button>
                <button onClick={saveButtonHandler}>הוסף רכב</button>
            </div>
        </form>
    </>
    )
}
