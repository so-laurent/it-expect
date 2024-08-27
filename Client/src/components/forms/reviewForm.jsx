import React, { useContext, useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button.jsx'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Avis from '@/services/api/avis'
import AuthContext from '@/contexts/authContext'

import { Star, StarOff } from 'lucide-react'

const formSchema = z.object({
    rating: z.coerce.number().min(1, 'Please select a rating').max(5, 'Please select a rating between 1 and 5'),
    review: z.string().min(1, 'Please enter a comment').optional()
})

const ReviewForm = ({ restaurantId, update, reviewed, commentId }) => {

    const profile = useContext(AuthContext)

    const reviewForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 1,
        }
    })

    const onSubmit = (data) => {
        data.restaurantId = restaurantId
        if (reviewed) {
            data.id = commentId
            Avis.update(data).then((response) => {
                if (response.avis) {
                    update()
                    reviewForm.reset()
                }
            })
        } else {
            Avis.create(data).then((response) => {
                if (response.avis) {
                    update()
                    reviewForm.reset()
                }
            })
        }
    }

    return (
        <>
            { profile.currentUser ? (
                <Form {...reviewForm}>
                    <form 
                        className='flex flex-col space-y-4 p-3 mt-2 mb-5 border border-gray-300 bg-theme3 shadow-md'
                        onSubmit={reviewForm.handleSubmit(onSubmit)}>
                        <FormField 
                            name='rating'
                            label='Note'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note</FormLabel>
                                    <FormControl>
                                        <select {...field} className='p-2 border border-gray-300 bg-inherit'>
                                            <option value=''>Sélectionner une note</option>
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <option key={rating} value={rating}>
                                                    {rating}
                                                    {rating <= field.value ? <Star className='w-6 h-6 text-yellow-500' /> : <StarOff className='w-6 h-6 text-gray-300' />}
                                                </option>
                                            ))    
                                            }
                                        </select>
                                    </FormControl>
                                    <FormMessage>{reviewForm.formState.errors.rating?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='review'
                            label='Commentaire'
                            render={({ field }) => (
                                <FormItem
                                    className='flex flex-col'
                                >
                                    <FormLabel>Commentaire</FormLabel>
                                    <FormControl>
                                        <textarea {...field} className='p-2 border border-gray-300 rounded' />
                                    </FormControl>
                                    <FormMessage>{reviewForm.formState.errors.review?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type='submit'
                            className='w-fit self-end'
                        >
                            {reviewed ? 'Modifier' : 'Ajouter'}
                        </Button>
                    </form>
                </Form>) : (
                <div className='text-center'>
                    <p>Connectez-vous pour laisser un commentaire</p>
                </div>
            )}
        </>
        
    )
}

export default ReviewForm