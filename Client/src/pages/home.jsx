import React from 'react'
import { categories } from '@/services/variables'
import { ChevronRight } from 'lucide-react'


const Home = () => {
    return (
        <div className='flex-1 w-full'>
            <div id='banner' className='w-full h-96 bg-slate-100 relative'>
                <img src='https://source.unsplash.com/1600x900/?restaurant' alt='banner' className='w-full h-full object-cover object-center' />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-black/50 p-16'>
                    <h1 className='text-4xl font-bold text-white'>Trouvez le restaurant de vos rêves</h1>
                    <button variant='ghost' 
                        className='absolute bottom-4 right-4 text-white font-bold py-2 px-4 rounded'
                        onClick={() => window.location.href = '/restaurants'}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <div className='w-full p-4'>
                <h1 className='text-3xl font-bold'>Nos catégories</h1>
            </div>
            <div id='content' className='flex flex-wrap justify-center'>
                {
                    categories.map((category) => (
                        <div key={category} className='w-1/6 min-w-80 h-80 shadow-lg relative  flex flex-col justify-end'>
                            <img src={`https://source.unsplash.com/400x400/?food-${category}`} alt={category} className=' absolute w-full h-full object-cover object-center' />
                            <button className='hover:bg-black/75 hover:shadow-sm hover:text-white p-3 z-10 text-transparent transition-all duration-300 ease-in-out'
                                onClick={() => window.location.href = `/restaurants/${category}`}
                            >
                                <h2 className='font-bold text-xl'>{
                                    category.charAt(0).toUpperCase() + category.slice(1)
                                }</h2>
                                <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet turpis auctor, bibendum nunc nec, ultricies nunc.</p>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home