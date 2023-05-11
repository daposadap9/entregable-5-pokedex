import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pokedex from './Pages/Pokedex'
import ProtectedAuth from './components/auth/ProtectedAuth'
import PokemonId from './Pages/PokemonId'

function App() {

  useEffect(() => {
    axios
  }, [])
  
  return (
    <section className='bg-gradient-to-r from-white via-gray-300 to-gray-400'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedAuth/>}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonId />} />
        </Route>
        
      </Routes>
    </section>
  )
}

export default App
