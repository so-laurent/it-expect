import React from 'react'
import { Button } from '@/components/ui/button'
import { Star, StarHalf, StarOff } from 'lucide-react'
import Comment from '@/components/ui/comment'

const RestaurantDashboard = ({ deleteRestaurant, restaurant, avis, modal }) => {
    return (
        <>
            <div className='flex-1 w-full my-3'>
                {!!restaurant && (
                    <div className='relative h-96 mb-8 overflow-hidden flex'>
                        <img src={`https://source.unsplash.com/1600x800/?food-${restaurant.category}`} alt='restaurant' className='h-full w-full object-cover absolute' />
                        <div className='z-30 bg-black/75 text-white p-5 leading-10'>
                            <h1 className='text-3xl font-bold mb-2'>Nom: {restaurant.name}</h1>
                            <p>Catégorie: {restaurant.category}</p>
                            <p>Description: {restaurant.description}</p>
                            <p>Adresse: {restaurant.address}</p>
                            <p>Email : {restaurant.email}</p>
                            <p>Capacité: {restaurant.capacity}</p>
                            <p className='flex items-center'>
                                <span>Note: {parseFloat(restaurant.averageRating).toFixed(1)}&nbsp;</span>
                                <span className='flex'>{
                                    Array.from({ length: 5 }, (_, i) => (
                                        <span key={i}>
                                            {i < Math.floor(restaurant.averageRating) ? 
                                                <Star size={16} className='text-yellow-500' fill='gold' />
                                                : 
                                                i < Math.ceil(restaurant.averageRating) ?
                                                    <StarHalf size={16} className='text-yellow-500' fill='gold' />
                                                    :
                                                    <StarOff size={16} className='text-gray-300' />}
                                        </span>
                                    ))    
                                }</span>
                                <span>&nbsp;({restaurant.nbAvis} avis)</span>
                            </p>
                        </div>
                        <Button
                            className='absolute top-4 right-4 bg-black/75 z-40 text-white'
                            onClick={deleteRestaurant}
                            variant='destructive'
                        >
                            Supprimer
                        </Button>
                        <Button
                            className='absolute bottom-4 right-4 bg-black/75 z-40 text-white'
                            onClick={modal.open}
                            variant='ghost'
                        >
                            Modifier
                        </Button>
                    </div>
                )}
            </div>
            <div className='flex flex-col'>
                <h2 className='text-xl font-bold'>Avis</h2>
                {avis && avis.map((review) => (
                    <Comment key={review.id} comment={review} />
                ))}
            </div>
        </>
    )
}

export default RestaurantDashboard