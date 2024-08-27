import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import useModal from '@/hooks/useModal'
import Modal from '@/components/layout/modal.jsx'
import Reservations from '@/services/api/reservations.js'
import ReservationForm from '../components/forms/reservationForm.jsx'
import Restaurants from '@/services/api/restaurants'
import Avis from '@/services/api/avis'
import ReviewForm from '@/components/forms/reviewForm.jsx'
import AuthContext from '@/contexts/authContext.jsx'

import Comment from '@/components/ui/comment.jsx'
import { Star, StarHalf, StarOff } from 'lucide-react'


const Restaurant = () => {

    const { id } = useParams()
    const profile = useContext(AuthContext)
    const [restaurant, setRestaurant] = useState(null)
    const [avis, setAvis] = useState([])
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [loadingAvis, setLoadingAvis] = useState(true)
    const [availability, setAvailability] = useState()
    const [reviewed, setReviewed] = useState(false)
    const [userCommentId, setUserCommentId] = useState(null)
    const modal = useModal()

    const fetchAvis = () => {
        setLoadingAvis(true)
        Avis.getByRestaurant(id).then((response) => {
            setAvis(response.avis)
            setLoadingAvis(false)
        })
    }

    const isReviewed = () => {
        if (profile.currentUser) {
            const userComment = avis.find((avi) => avi.UserId === profile.currentUser.id)
            if (userComment) {
                setReviewed(true)
                setUserCommentId(userComment.id)
            }
        }
    }

    const fetchRestaurant = () => {
        setLoadingRestaurant(true)
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    }

    const fetchAvailability = () => {
        Reservations.getAvailability(id, new Date().toISOString().split('T')[0]).then((response) => {
            setAvailability(response.availability)
        })
    }

    useEffect(() => {
        fetchAvis()
        fetchRestaurant()
        fetchAvailability()
    }, [id])

    useEffect(() => {
        isReviewed()
    }, [avis])
    

    return (
        <div className="flex-1 flex flex-col w-full p-4 container mb-5">
            <div className='flex-1 w-full my-3'>
                {loadingRestaurant && (
                    <div>Loading...</div>
                )}
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
                            className='absolute bottom-4 right-4 bg-black/75 z-40 text-white'
                            onClick={modal.open}
                            variant='ghost'
                        >
                            Réserver
                        </Button>
                    </div>
                )}
            </div>
            <div className='flex-1 w-full'>
                <h2 className='text-2xl font-bold'>
                    Laissez votre avis
                </h2>
                {loadingAvis && (
                    <div>Loading...</div>
                )}
                <ReviewForm restaurantId={id} update={fetchAvis} reviewed={reviewed} commentId={userCommentId} />
                <h2 className='text-2xl font-bold'>
                    Commentaires
                </h2>
                {!!avis && (
                    <div className='border shadow-sm'>
                        {avis.map((avi) => (
                            <span key={avi.id}>
                                <Comment comment={avi}/>
                                <hr />
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                controls={modal}
            >
                <ReservationForm restaurantId={id} controls={modal} />
            </Modal>
        </div>
    )
}

export default Restaurant