import React, { useContext, useEffect, useState } from 'react'
import Responsables from '@/services/api/responsables'
import AuthContext from '@/contexts/authContext'

import { Star, StarHalf, StarOff } from 'lucide-react'

const AdminRestaurants = () => {

    const { currentUser } = useContext(AuthContext)
    const [positions, setPositions] = useState([])

    if (currentUser.role !== 'admin') {
        window.location.href = '/'
    }

    useEffect(() => {
        Responsables.getOne(currentUser.id)
        .then(response => {
            setPositions(response.responsables)
        })
    }, [])

    return (
        <div className='flex-1 w-full p-3 container'>
            <h1 className='text-3xl font-bold my-2'>Mes Restaurants</h1>
            <div className='flex flex-col w-full'>
                {positions.map((position) => (
                    <div className='flex border border-gray-300 shadow-sm my-2' key={position.id}>
                        <img src={`https://source.unsplash.com/400x400/?${position.Restaurant.category}-nourriture`} alt='restaurant' className='w-36 h-36 object-cover' />
                        <div key={position.id}
                            className='flex flex-col w-full p-3 cursor-pointer'
                            onClick={() => window.location.href = `/admin/restaurant/${position.Restaurant.id}`}
                        >
                            
                            <h2 className='font-bold text-xl'>{position.Restaurant.name}</h2>
                            <p><span className='font-semibold'>Rang: </span>{position.role}</p>
                            <p><span className='font-semibold'>Adresse: </span>{position.Restaurant.address}</p>
                            <p><span className='font-semibold'>Description: </span>{position.Restaurant.description}</p>
                            <p className='text-gray-500 flex items-center'>
                                <span className='font-semibold'>Note: &nbsp;</span>
                                <span className='mr-2'>{
                                    position.Restaurant.Avis[0]?.averageRating ? parseFloat(position.Restaurant.Avis[0]?.averageRating).toFixed(1) : ""
                                }</span>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i}>
                                        {i < position.Restaurant.Avis[0]?.averageRating ? 
                                            <>{
                                                i + 1 === Math.ceil(position.Restaurant.Avis[0]?.averageRating) && position.Restaurant.Avis[0]?.averageRating % 1 !== 0 ?
                                                    <StarHalf size={16} className='text-yellow-500' fill='gold' />
                                                    : 
                                                    <Star size={16} className='text-yellow-500' fill='gold' />
                                            }</>
                                            : 
                                            <StarOff size={16} className='text-gray-300' />}
                                    </span>
                                ))
                            }</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminRestaurants