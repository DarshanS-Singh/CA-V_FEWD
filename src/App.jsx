import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './Home'
import Form from './Components/Form'


function App() {



  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Form' element={<Form/>}></Route>
      </Routes>
    </>
  )
}

export default App
