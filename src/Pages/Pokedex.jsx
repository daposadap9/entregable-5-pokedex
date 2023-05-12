import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {

    //Array de pokemons antes de fintrar
    const [pokemons, setPokemons] = useState([])
    
    //String para filtrar pokemons por nombre
    const [pokemonName, setPokemonName] = useState("")

    //Array de tipos de pokemons posibles
    const [types, setTypes] = useState([])

    //filtro de tipo, almacena el tipo actual del select
    const [currentType, setCurrentType] = useState("")

    //Pagina Actual
    const [currentPage, setCurrentPage] = useState(1)

    //Estado global donde se almacena el nombre del usuario
    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))


    const paginationLogic = () => {
        //Cantidad de pokemons por pagina
        const POKEMONS_PER_PAGE = 12

        //Cantidad de pokemons que se van a mostrar en la pagina actual
        const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)


        //Ultima Pagina
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

        //Bloque actual
        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //Pages que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for(let i = minPage; i <= maxPage; i++){
            if(i <= lastPage){
                pagesInBlock.push(i)
            }
        }
        
        return {pokemonInPage, lastPage, pagesInBlock}
    }

    const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage >= 1){
            setCurrentPage(newCurrentPage)
        }
    }
    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage){
            setCurrentPage(newCurrentPage)
        }
    }
    

useEffect(() => {
    if(!currentType){
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
    axios.get(URL)
    .then((res)=>setPokemons(res.data.results))
    .catch((err)=>console.log(err)) 
    }
}, [currentType])

useEffect(()=>{
    const URL = `https://pokeapi.co/api/v2/type`
    axios.get(URL)
    .then((res)=>{
        const newTypes = res.data.results.map(type => type.name)
        setTypes(newTypes)
    })
    .catch((err)=>console.log(err))
},[])

useEffect(()=>{
    if(currentType){
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
        axios.get(URL)
        .then((res)=>{
            const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
            setPokemons(pokemonsByType)
        })
        .catch((err)=>console.log(err))
    }
    
},[currentType])


useEffect(()=>{
    setCurrentPage(1)
},[pokemonName , currentType])
  return (
    <section className='min-h-screen'>
        <Header/>

        {/*Seccion de filtros y saludo*/}
        <section className='py-6 px-2 relative text-center grid gap-4 overflow-hidden'>
            <h3 className='text-black'><span className='text-red-600 font-bold'>Welcome {nameTrainer}, </span> 
            here you can find your favorite pokemon</h3>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center gap-3 items-center'>
                    <input id='pokemonName' className='border-2 border-red-500 rounded-md px-2 py-1' type="text" placeholder='Search your pokemon'/>
                    <button className='bg-red-500 px-2 py-1 rounded-md border-2 border-black text-white font-bold hover:bg-red-400'>Search</button>
                </div>
                <select className='text-white bg-black rounded-md p-2 mt-3' onChange={(e)=>setCurrentType(e.target.value)}>
                    <option value="">All</option>
                    {
                        types.map(type => <option className='capitalize'  value={type} key={type}>{type}</option>)
                    }
                </select>
            </form>
        </section>
        
        {/*Paginacion*/}
        <ul className='flex gap-3 justify-center py-4 cursor-pointer px-2 flex-wrap '>
             {/*Primera Pagina*/}
             <li onClick={()=> setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
            {/*Pagina anterior*/}
            <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>
            {/*Lista de paginas*/}
            {
                pagesInBlock.map(numberPage => <li onClick={()=>setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage == currentPage && "bg-red-300"} hover:bg-red-400`} 
                key={numberPage}>{numberPage}</li>)
            }
            {/*Pagina siguiente*/}
            <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
            {/*Ultima Pagina*/}
            <li onClick={()=> setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
        </ul>
        
        {/*Seccion lista de pokemons*/}
        <section className='grid gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_250px)] justify-center max-w-7xl mx-auto'>
            {
                pokemonInPage.map((pokemon)=><PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
            }
        </section>

        {/*Paginacion*/}
        <ul className='flex gap-3 justify-center py-4 cursor-pointer px-2 flex-wrap'>
             {/*Primera Pagina*/}
             <li onClick={()=> setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
            {/*Pagina anterior*/}
            <li onClick={handleClickPreviusPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>
            {/*Lista de paginas*/}
            {
                pagesInBlock.map(numberPage => <li onClick={()=>setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage == currentPage && "bg-red-300"} hover:bg-red-400`} 
                key={numberPage}>{numberPage}</li>)
            }
            {/*Pagina siguiente*/}
            <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
            {/*Ultima Pagina*/}
            <li onClick={()=> setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
        </ul>
    </section>
  )
}

export default Pokedex