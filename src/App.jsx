
import './App.css'
import IncomeCalculator from './IncomeCalculator'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Brand from './Pages/Brand'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<IncomeCalculator />} />
          <Route path='/brand' element = {<Brand/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
