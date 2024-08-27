import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/contexts/authContext'
import { useParams } from 'react-router-dom'

import Responsables from '@/services/api/responsables'
import Restaurants from '@/services/api/restaurants'
import Reservations from '@/services/api/reservations'
import Avis from '@/services/api/avis'

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import TeamTable from '@/components/admin/teamTable'
import RestaurantDashboard from '@/components/admin/restaurantDashboard'
import ReservationDashboard from '@/components/admin/reservationDashboard'
import Modal from '@/components/layout/modal'
import useModal from '@/hooks/useModal'
import RestaurantEdit from '@/components/forms/restaurantEdit'
import { Button } from '@/components/ui/button'


const AdminRestaurant = () => {

    const modal = useModal()
    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()

    if (currentUser.role !== 'admin') {
        window.location.href = '/'
    }

    const [restaurant, setRestaurant] = useState(null)
    const [loadingRestaurant, setLoadingRestaurant] = useState(true)
    const [team, setTeam] = useState()
    const [date, setDate] = useState(null)
    const [loadingTeam, setLoadingTeam] = useState(true)
    const [reservations, setReservations] = useState()
    const [availability, setAvailability] = useState()
    const [loadingReservations, setLoadingReservations] = useState(true)
    const [avis, setAvis] = useState()
    const [loadingAvis, setLoadingAvis] = useState(true)

    const getRestaurant = () => {
        Restaurants.getOne(id).then((response) => {
            setRestaurant(response.restaurant)
            setLoadingRestaurant(false)
        })
    }
    
    const getReservations = () => {
        Reservations.getByRestaurant(id).then((response) => {
            setReservations(response.reservations)
            setLoadingReservations(false)
        })
    }

    useEffect(() => {
        getRestaurant()
        getReservations()
    }, [id])

    useEffect(() => {
        Responsables.getByRestaurant(id).then((response) => {
            setTeam(response.responsables)
            setLoadingTeam(false)
        })
    }, [id])

    useEffect(() => {
        if (date) {
            Reservations.getAvailability(id, date).then((response) => {
                setAvailability(response.availability)
            })
        }

    }, [date, id])

    useEffect(() => {
        Avis.getByRestaurant(id).then((response) => {
            setAvis(response.avis)
            setLoadingAvis(false)
        })
    }, [id])

    const deleteTeamMember = (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce membre de l\'équipe?')) return
        Responsables.delete(id).then(() => {
            setTeam(team.filter((member) => member.id !== id))
        })
    }

    const deleteReservation = (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette réservation?')) return
        Reservations.delete(id).then(() => {
            setReservations(reservations.filter((reservation) => reservation.id !== id))
        })
    }

    const deleteRestaurant = () => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce restaurant?')) return
        Restaurants.delete(id).then(() => {
            window.location.href = '/admin/restaurants'
        })
    }

    return (
        <div className='flex-1 w-full p-3'>
            <Tabs
                className="w-full"  
                defaultValue='Info'
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value='Info'>Informations</TabsTrigger>
                    <TabsTrigger value='Team'>Equipe</TabsTrigger>
                    <TabsTrigger value='Book'>Reservations</TabsTrigger>
                </TabsList>
                <TabsContent className='container' value='Info'>
                    <RestaurantDashboard 
                        deleteRestaurant={deleteRestaurant}
                        restaurant={restaurant}
                        modal={modal}
                        avis={avis}
                    />
                </TabsContent>
                <TabsContent className='container' value='Team'>
                    <TeamTable team={team} />
                </TabsContent>
                <TabsContent className='container' value='Book'>
                    <ReservationDashboard
                        date={date} 
                        setDate={setDate}
                        reservations={reservations}
                        availability={availability}
                        deleteReservation={deleteReservation}
                    />
                </TabsContent>
            </Tabs>
            <Modal
                controls={modal}
            >
                <RestaurantEdit
                    restaurant={restaurant}
                    update={getRestaurant}
                />
            </Modal>
        </div>
    )
}

export default AdminRestaurant