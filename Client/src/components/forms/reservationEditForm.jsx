import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import ReservationAPI from '@/services/api/reservations'; // Assuming this is the API module


const formSchema = z.object({
    date: z.string().min(1, "Please select a date.").optional(),
    time: z.string().min(1, "Please select a time.").optional(),
    people: z.coerce.number().min(1, "Select at least one person.").optional()
});

const ReservationEditForm = ({restaurantId, controls, reservation, update}) => {
    const [responseMessage, setResponseMessage] = useState('');
    const [availability, setAvailability] = useState();

    const reservationForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: reservation.date,
            time: reservation.time,
            people: reservation.people
        }
    });

    const onSubmit = (data) => {
        data.restaurant_id = restaurantId;
        data.id = reservation.id;
        ReservationAPI.update(data).then(response => {
            if (!response.reservation) {
                setResponseMessage(response.message);
            } else {
                alert('Mise à jour réussie!');
                update();
                controls.close();
            }
        })
    };

    useEffect(() => {
        if (reservationForm.getValues('date')) {
            ReservationAPI.getAvailability(restaurantId, reservationForm.getValues('date'))
                .then(response => {
                    setAvailability(response.availability);
                })
                .catch(error => {
                    console.error('Failed to fetch availability:', error);
                    setResponseMessage('Failed to fetch availability. Please try again.');
                });
        }
    }, [restaurantId, reservationForm.getValues('date')]);
    

    return (
        <div className='flex-1 w-full flex items-center justify-center'>
            <Form {...reservationForm}>
                <form onSubmit={reservationForm.handleSubmit(onSubmit)}
                    className='m-auto flex flex-col max-w-md w-full space-y-4 p-4 '
                >
                    <FormField
                        name="date"
                        label="Date"
                        type="date"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Date</FormLabel>
                                <FormControl>
                                    <input {...field}
                                        type="date"
                                        className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="time"
                        label="Time Slot"
                        type="time"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Heure</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">
                                            Choisissez une heure
                                        </option>
                                        {availability && Object.keys(availability).map(slot => (
                                            <option 
                                                key={slot} 
                                                value={slot}
                                                {...(availability[slot].available === 0 && { disabled: true })}
                                            >{slot}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="people"
                        label="Number of People"
                        type="number"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>
                                    Nombre de personnes
                                </FormLabel>
                                <FormControl>
                                    <input {...field}
                                        min="1"
                                        max="10"
                                        type="number"
                                        className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={reservationForm.formState.isSubmitting}
                    >
                        Mettre à jour
                    </Button>
                    {responseMessage && <p className="text-red-500">{responseMessage}</p>}
                </form>
            </Form>
        </div>
    );
};

export default ReservationEditForm;