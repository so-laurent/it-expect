import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '../ui/table.jsx'
import { Button } from '../ui/button.jsx'
import { Trash } from 'lucide-react'

const ReservationDashboard = ({date, setDate, reservations, availability, deleteReservation}) => {

    const [daysReservations, setDaysReservations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (date) {
            setDaysReservations(reservations.filter((reservation) => 
                new Date(reservation.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }) === new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })     
            ))
            setLoading(false)
        } else {
            setDaysReservations(reservations)
        }
    }, [date, reservations])

    return (
        <div>
            <input type="date" onChange={(e) => setDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className='flex'>
                <div className='flex-1'>
                    {(!date) ? <h2>Toutes les reservations</h2> : <h2>Reservations du: {date}</h2> }
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {!date && <TableHead>Date</TableHead>}
                                <TableHead>Heure</TableHead>
                                <TableHead>Nombre de personnes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {daysReservations && daysReservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    {!date && <TableCell>{
                                        new Date(reservation.date).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                    }</TableCell>}
                                    <TableCell>{reservation.time}</TableCell>
                                    <TableCell>{reservation.people}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => deleteReservation(reservation)}
                                            variant='destructive'
                                            className='bg-transparent text-black hover:text-white'
                                        >
                                            <Trash  size={20} strokeWidth={1} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex-1'>
                    
                </div>
            </div>
        </div>
    )
}

export default ReservationDashboard