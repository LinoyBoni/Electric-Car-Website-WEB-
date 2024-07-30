import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Top from './Top'
import Cars from './Cars'
import './Car.css'
import './Top.css'
import AddCar from './AddCar'


function App() {
  const [cars_list, setCarsList] = useState([]);
  const [displayAdd, setDisplayAdd] = useState(false);

  return (
    <>
      <Top setCarsList={setCarsList}/>
      {displayAdd ? <AddCar setDisplayAdd={setDisplayAdd}/> : ""}
      <Cars cars_list={cars_list} setCarsList={setCarsList} setDisplayAdd={setDisplayAdd} />
    </>
  )
}

export default App


