import React from 'react'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate('/pokedex')
    }
  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        <article>
            <div className='bg-red-500 p-4'>
                <img src="/images/pokedex.png" alt="" />
            </div>
            <div className='p-4'>
                <h2 className='text-3xl font-bold text-red-600'>Hello trainer!</h2>
            <p className='text-2xl font-bold'>Give me your name to start!:</p>
            <form className='flex gap-3 items-center mt-3' onSubmit={handleSubmit}>
                <input className='border-2 border-red-500 rounded-md px-2 py-1' id='nameTrainer' type="text" placeholder='Your name...'/>
                <button className='bg-red-500 px-2 py-1 rounded-md border-2 border-black text-white font-bold hover:bg-red-400'>Start!</button>
            </form>
            </div>
            
        </article>
        {/*Footer*/}
        <Footer/>
    </section>
  )
}

export default Home