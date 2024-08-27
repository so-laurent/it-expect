import React from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import image from '../assets/images/restau1.jpg'

const ReservationCard = ({ reservation, editReservation, deleteReservation }) => {
    return (
        <div key={reservation.id} className='flex flex-col w-full border my-2 shadow-sm bg-slate-50 relative'>
            <div className='flex'>
                <img src={`https://source.unsplash.com/400x400/?${reservation?.Restaurant.category}-nourriture`} alt={reservation?.Restaurant.name} className='w-32 h-32 object-cover mr-2' />
                <div>
                    <h2 className='text-2xl font-bold'>Restaurant: {/* {reservation?.Restaurant.name} */}
                        <a href={`/restaurant/${reservation?.RestaurantId}`} className=''>{reservation?.Restaurant.name}</a>
                    </h2>
                    <p className='text-gray-500'>Date: {
                        new Date(reservation?.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }&nbsp;à {
                        reservation?.time.split(':').slice(0, 2).join('h')
                    }</p>
                    <p className='text-gray-500'>Nombre de personnes: {reservation?.people}</p>
                </div>
            </div>
            <div className='flex absolute bottom-0 right-0'>
                <Button onClick={() => editReservation(reservation)}
                    variant='ghost'
                >
                    <Pencil size={20} strokeWidth={1} />
                </Button>
                <Button onClick={() => deleteReservation(reservation)}
                    variant='destructive'
                    className='bg-transparent text-black hover:text-white'
                >
                    <Trash size={20} strokeWidth={1} />
                </Button>
            </div>
        </div>
    )
}

export default ReservationCard