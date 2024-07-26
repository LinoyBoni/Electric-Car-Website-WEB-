const { pool } = require('./connectionsDB');

//----------------------------------FILTERS--------------------------------------------------

//סינון לפי הבטריה
async function getAllCarbyBattery({battery}) {
    const result = await pool.query("SELECT * FROM cars WHERE battery = ? ", 
        [battery]
    );

    return result[0];
}

//סינון לפי שם היצרן/חברה של הרכב
async function getAllCarbyCompany({company}) {
    const result = await pool.query("SELECT * FROM cars WHERE company = ? ", 
        [company]
    );

    return result[0];
}

//סינון לפי טווח מחירים
async function getAllCarRange_Price({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `Price.DE.` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}

//סינון לפי טווח של טעינה מהירה
async function getAllCarRange_FastCharge({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `Fast_charge` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}

//סינון לפי טווח יעילות
async function getAllCarRange_Efficiency({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `Efficiency` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}

//סינון טווח לפי הטווח של הרכב
async function getAllCarRange_Range({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `Range` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}

async function getAllCars(){
    const result = await pool.query("SELECT * FROM ev_cars.cars");

    return result[0];
}

//מציג טווח של מהירות גבוהה של הרכב
async function getAllCarRange_Topspeed({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `Top_speed` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}

//מציג טווח תאוצה
async function getAllCarRange_Acceleration({low,high}) {
    const result = await pool.query("SELECT * FROM ev_cars.cars WHERE `acceleration..0.100.` BETWEEN ? AND ?", 
        [low,high]
    );

    return result[0];
}
//----------------------------------MaxSQL-------------------------------------------------

//מציג את הדגם עם מהירות השיא הגבוהה ביותר
async function getMaxCar_TopSpeed() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Top_speed DESC LIMIT 1");
    return result[0];
}


//מציג את הדגם עם זמן ההאצה הקצר ביותר מ-0 ל-100
async function getMaxCar_Acc() {
    const result = await pool.query("??????");
    return result[0];
}

//מציג את הדגם בעל ערך היעילות הגבוה ביותר
async function getMaxCar_Efficiency() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Efficiency DESC LIMIT 1");
    return result[0];
}

//מציג את הדגם בעל הכי טוב
async function getMaxCar_Range() {
    const result = await pool.query("????????");
    return result[0];
}

//מציג את הדגם בעל נפח הסוללה הכי טוב 
async function getMaxCar_Battery() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Battery DESC LIMIT 1;");
    return result[0];
}
//----------------------------------CRUD-------------------------------------------------

//--------------------CREATE--------------------------

//Add Car to the DB
async function addCar({battery, company, car_name, car_name_link, efficiency, fast_charge, price, range, top_speed,acceleration}) {
    const result = await pool.query("INSERT INTO Cars (Battery, Company, Car_name, Car_name_link, Efficiency, Fast_charge, Price.DE., Range, Top_speed, acceleration..0.100) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [battery, company, car_name, car_name_link, efficiency, fast_charge, price, range, top_speed,acceleration]
    );

    return result[0];
}

//--------------------READ--------------------------

//Get All the cars
async function getAllCars() {
    const result = await pool.query("select * from cars");
    return result[0];
}

//Get Car details by name
async function getDetailsByCarID(id_car) {
    const result = await pool.query("select * from ev_cars.cars WHERE id_car = ? ", 
        [id_car]);
    return result[0];
}


//--------------------UPDATE--------------------------

//Update car in the DB
async function updateCar(newCarDetailes) {

    const oldCarDetailes = await getDetailsByCarID(newCarDetailes.id_car);

    const {battery, company, car_name, car_name_link, efficiency, fast_charge, price, range, top_speed,acceleration} = {...oldCarDetailes, ...newCarDetailes};
    
    const result = await pool.query("UPDATE Cars SET battery = ?, company = ?, car_name = ?, car_name_link = ?, efficiency = ?, fast_charge = ?, price = ?, range = ?, top_speed = ?,acceleration = ? WHERE id_car = ? ",
        [battery, company, car_name, car_name_link, efficiency, fast_charge, price, range, top_speed,acceleration,id_car]
    );

    return result[0].affectedRows > 0
}


//--------------------DELETE--------------------------

//Delete car in the DB
async function DeleteCarByID(id_car) {

    const result = await pool.query("DELETE FROM Cars WHERE id_car = ? ",
        [id_car]
    );

    return result[0].affectedRows > 0
}


//---------------------------SORT--------------------------------

//Sort battery (high to low)
async function SortBattery() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Battery DESC");
    return result[0];
}

//Sort Cars By Company (A...Z)
async function SortCarsByCompany() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY company,car_name ASC");
    return result[0];
}

//Sort efficiency (high to low)
async function SortCarsByEfficiency() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY efficiency ASC");
    return result[0];
}

//Sort fast charge (high to low)
async function SortCarsByfastcharge() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Fast_charge ASC");
    return result[0];
}

//Sort Price (high to low)
async function SortCarsByPrice() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY 'Price.DE.' ASC");
    return result[0];
}

//Sort Range (high to low)
async function SortCarsByRange() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Cars.Range ASC");
    return result[0];
}

//Sort Top Speed (high to low)
async function SortCarsBySpeed() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY Top_speed DESC");
    return result[0];
}

//Sort Acceleration (low to high)
async function SortCarsByAcc() {
    const result = await pool.query("SELECT * FROM ev_cars.cars ORDER BY 'acceleration..0.100.' ASC");
    return result[0];
}

//TODO: COPY ALL FUNCTIONS TO EXPORT!!!!!
module.exports = {getAllCars,
    SortCarsByAcc,
    SortCarsBySpeed
}