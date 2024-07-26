//-----------------הגדרת הראוטר ומודולים---------------------
const express = require('express');
const validate = require('./validates/carValidation');
const carsDB = require('../dataBase/carsTable');
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
app.delete('/delete/:car_name', async (req, res) => {
    let result;
    try {
        result = await carsDB.deleteCarByName(req.params.car_name);
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


