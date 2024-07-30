//-----------------הגדרת הראוטר ומודולים---------------------
const express = require('express');
const validate = require('./validates/carValidation');
const carsDB = require('../database/carsTable');
//const { json } = require('stream/consumers');

app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//-------------------------GETSACTIONS-----------------------------------
app.get('/info/:car_name', async (req, res) => {
    let result;
    try {
        result = await carDB.getCarByName(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("car not found"));
        return;
    }

    res.status(200).send(result);
});

//GetAll
app.get('/all', async (req, res) => {
    let result;
    try {
        result = await carsDB.getAllCars();
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("no cars found"));
        return;
    }
    res.status(200).send(result);
});

//GetAllCompanies
app.get('/allCompanies', async (req, res) => {
    let result;
    try {
        result = await carsDB.getAllCompanyName();
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("no companies found"));
        return;
    }

    res.status(200).send(result);
});

app.get('/companies/:company', async(req, res)=>{
    let result;
    try {
        result = await carsDB.getAllCarbyCompany(req.params);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result[0]) {
        res.status(400).send(JSON.stringify("no companies found"));
        return;
    }

    res.status(200).send(result);
})

app.get('/filters/:filterName', async(req, res)=>{
    let result;
    try {
        if(req.params.filterName == "MaxSpeed") result = await carsDB.getMaxCar_TopSpeed();
        else if(req.params.filterName == "MaxAcc") result = await carsDB.getMaxCar_Acc();
        else if(req.params.filterName == "MaxEfficiency") result = await carsDB.getMaxCar_Efficiency();
        else if(req.params.filterName == "MaxRange") result = await carsDB.getMaxCar_Range();
        else if(req.params.filterName == "MaxBattery") result = await carsDB.getMaxCar_Battery();
        else if(req.params.filterName == "battery") result = await carsDB.SortBattery();
        else if(req.params.filterName == "A-Z") result = await carsDB.SortCarsByCompany();
        else if(req.params.filterName == "efficiency") result = await carsDB.SortCarsByEfficiency();
        else if(req.params.filterName == "charge") result = await carsDB.SortCarsByfastcharge();  
        else if(req.params.filterName == "price") result = await carsDB.SortCarsByPrice();
        else if(req.params.filterName == "range") result = await carsDB.SortCarsByRange();
        else if(req.params.filterName == "speed") result = await carsDB.SortCarsBySpeed();
        else if(req.params.filterName == "sorting") result = await carsDB.getAllCars();
        else if(req.params.filterName == "filtering") result = await carsDB.getAllCars();
        
        //else if(req.params.filterName == "acc") result = await carsDB.getMaxCar_Acc();
        
    } 
    catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("not data found"));
        return;
    }

    res.status(200).send(result);
})


//--------------------POSTACTIONS-------------------------
//ADD
app.post('/add', async (req, res) => {
    const { error, value } = validate.carDetailsValidate(req.body);

    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return;
    }

    let result;
    try {
        result = await carsDB.addCar(req.body);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("failed to add car"));
        return;
    }

    res.status(201).send(JSON.stringify(result));
});

//---------------------PUTACTIONS-------------------------------
//UPDATE
app.put('/update/:car_name', async (req, res) => {
    const { error, value } = validate.carUpdateDetailsValidate(req.body);

    if (error) {
        res.status(400).send(error.details.map(detail => detail.message))
        return;
    }

    const newDetails = { ...req.body, car_name: req.params.car_name };

    let result;
    try {
        result = await carsDB.updateCar(newDetails);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("failed to update car"));
        return;
    }

    res.status(200).send(result);
});

//DELETE
app.delete('/delete/:id_car', async (req, res) => {
    let result;
    try {

        result = await carsDB.DeleteCarByID(req.params.id_car);
    } catch (e) {
        res.status(400).send(JSON.stringify("something went wrong, please try again"));
        return;
    }

    if (!result) {
        res.status(400).send(JSON.stringify("failed to delete car"));
        return;
    }

    res.status(200).send(JSON.stringify("car has been deleted"));
});



app.listen(3000, ()=> console.log(`listening to ${3000}..`));
module.exports = app;


