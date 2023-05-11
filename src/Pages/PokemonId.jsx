import React, { useState } from 'react'
import Header from '../components/pokedex/Header'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {

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

    const [pokemon, setPokemon] = useState()

    const {id} = useParams()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/` 
        axios.get(URL)
            .then((res)=>setPokemon(res.data))
            .catch((err)=>console.log(err))
    }, [])
    
    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = (stat_base * 100)/150
        return `${percentBarProgres}%`
    }
  return (
    <section>
        <Header/>
        <div className='flex justify-center mt-5 items-center'>
        <Link to="/pokedex" className='bg-red-500 px-2 py-1 rounded-md border-2 flex items-center gap-2 border-black text-white font-bold hover:bg-red-400'><i className='bx bxs-chevron-left-circle text-2xl'></i>Go back</Link>
        </div>
        
        <section className='px-2 py-14'>
            <article className='max-w-[768px] rounded-md mx-auto shadow-lg p-4 bg-gray-400'>
                {/*Seccion superior*/}

                <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
                    <div className='w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14'>
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                    </div>
                </section>

                <section>
                    {/*Infomacion General*/}
                    <div>
                        <h3 className='text-3xl font-bold text-center text-white py-2'>#{pokemon?.id}</h3>
                    </div>

                    <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                         <hr />
                         <h2 className='capitalize font-bold'>{pokemon?.name}</h2>
                         <hr />
                    </div>

                    <div className='flex justify-center gap-6 text-center'>
                        <div>
                        <h5 className='font-bold'>Weight:</h5>
                        <span className='text-white font-bold'>{pokemon?.weight}</span>
                        </div>
                        <div>
                        <h5 className='font-bold'>Height:</h5>
                        <span className='text-white font-bold'>{pokemon?.height}</span>
                    </div>
                    </div>

                        <section className='grid md:grid-cols-2 gap-4 font-bold'>
                            {/*Tipos*/}
                            <section className='text-center'>
                                <h3>Types</h3>
                                <section className='grid grid-cols-2 gap-4 mt-4'>
                                    {
                                        pokemon?.types.map(type => <article 
                                            className='p-2 px-8 border-[1px] border-gray-300 capitalize truncate' key={type.type.name}>{type.type.name}
                                        </article>)
                                    }
                                </section>
                            </section>

                            {/*Habilidades*/}
                            <section className='text-center'>
                            <h3>Abilities</h3>
                                <section className='grid grid-cols-2 gap-4 mt-4'>
                                    {
                                        pokemon?.abilities.map(ability => <article 
                                            className='p-2 px-8 border-[1px] border-gray-300 capitalize truncate' key={ability.ability.name}>{ability.ability.name}
                                        </article>)
                                    }
                                </section>
                            </section>
                        </section>
                </section>

                {/*Seccion de Stats*/}
                <section>
                    <h3 className='text-center font-bold'>Stats</h3>
                    <section>
                    {
                        pokemon?.stats.map(stat =>(
                            <article className='capitalize font-bold' key={stat.stat.name}>
                                <section>
                                    <h5 className='text-white'>{stat.stat.name}</h5>
                                    <span>{stat.base_stat}/150</span>
                                </section>
                                <div className='bg-gray-100 h-6 rounded-sm'>
                                    <div style={{"width": getPercentStatBar(stat.base_stat)}} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                                </div>
                            </article>
                        ))
                    }
                    </section>                    
                </section>
            </article>
        </section>
    </section>
  )
}

export default PokemonId