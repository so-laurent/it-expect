import { ChevronLeft, ChevronRight, Star, StarOff, StarHalf } from 'lucide-react'
import React from 'react'

const RestaurantCard = ({ restaurant }) => {

    return (
        <div key={restaurant.id} className='w-72 p-4'>
            <div className='bg-white shadow-lg relative'>
                <img src={`https://source.unsplash.com/400x400/?${restaurant?.category}-nourriture`} alt={restaurant.category} className='w-full h-48 object-cover object-center' />
                <div className='p-4'>
                    <h2 className='font-bold text-xl'>{restaurant.name}</h2>
                    <p className='text-gray-500 flex items-center'>
                        <span className='mr-2'>{
                            /* parseFloat(restaurant.averageRating).toFixed(1) */
                            restaurant.averageRating ? parseFloat(restaurant.averageRating).toFixed(1) : ""
                        }</span>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                                {i < restaurant.averageRating ? 
                                    <>{
                                        i + 1 === Math.ceil(restaurant.averageRating) && restaurant.averageRating % 1 !== 0 ?
                                            <StarHalf size={16} className='text-yellow-500' fill='gold' />
                                            : 
                                            <Star size={16} className='text-yellow-500' fill='gold' />
                                    }</>
                                    : 
                                    <StarOff size={16} className='text-gray-300' />}
                            </span>
                        ))
                    } &nbsp; ({restaurant.nbAvis} Avis)</p>
                    <p className='text-gray-500'>{restaurant.category}</p>
                    <p className='text-gray-500'>{restaurant.address}</p>
                    <div className='mt-4 text-right absolute bottom-2 right-2'>
                        <button className='font-bold py-2 px-4'
                            onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
                        >
                            <ChevronRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard