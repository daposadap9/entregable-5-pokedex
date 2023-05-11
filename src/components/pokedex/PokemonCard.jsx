import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const bordersByType = {
    grass: "border-green-500",
    fire: "border-red-500",
    normal: "border-purple-400",
    water: "border-blue-400",
    bug:"border-yellow-800",
    poison:"border-purple-700",
    electric:"border-yellow-500",
    fighting:"border-orange-500",
    ground:"border-yellow-800",
    ghost:"border-purple-900",
    ice: "border-blue-200",
    fairy:"border-pink-200",
    psychic:"border-violet-800",
    dragon:"border-red-800",
    dark:"border-black"

}
const backgroundByType = {
    grass: "from-green-500 to-black",
    fire: "from-red-500 to-black",
    normal: "from-purple-500 to-white",
    water: "from-blue-500 to-white",
    bug:"from-yellow-700 to-white",
    poison:"from-purple-700 to-black",
    electric:"from-yellow-300 to-black",
    fighting:"from-orange-500 to-orange-200",
    ground:"from-yellow-700 to-black",
    ghost:"from-black to-white",
    ice:"from-blue-200 to-blue",
    fairy:"from-pink-600 to-blue",
    psychic:"from-violet-800 to-violet-200",
    dragon:"from-red-400 to-orange",
    dark:"from-black to-white"
}

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type?.type.name).join(" / ")

    useEffect(()=>{
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err)=>console.log(err))
    },[])
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md bg-gradient-to-r from-white via-gray-300 to-gray-400 ${bordersByType[pokemon?.types[0].type.name]}`}>
        {/*Seccion superior*/}
        <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
            <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2'>
                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
        </section>
        
        {/*Seccion Inferior*/}
        <section>
            <h3 className='mt-10 font-bold text-xl'>{pokemon?.name}</h3>
            {/*Condicionales*/}
            <h4 className='text-red-700 font-bold text-xl'>{types}</h4>
            {/*Condicionales*/}
            <span className='font-bold'>Type</span>

            <hr className='mt-2'/>
            <section className='grid grid-cols-3 gap-2 p-2 bg-slate-300'>
                {
                    pokemon?.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <h5 className='text-blue-700 font-bold capitalize'>{stat.stat.name}</h5>
                            <span className='font-bold'>{stat.base_stat}</span>
                        </div>
                    ))
                }
            </section>
        </section>
    </Link>
  )
}

export default PokemonCard