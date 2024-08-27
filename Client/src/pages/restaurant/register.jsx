import React, { useContext, useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import  { useForm, useController } from 'react-hook-form'
import z from 'zod'

import Restaurants from '@/services/api/restaurants'
import { categories } from '@/services/variables'

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
    address: z.string().min(10, 'Address must be at least 10 characters long'),
    email: z.string().email('Please enter a valid email address'),
    capacity: z.coerce.number().int().positive('Capacity must be a positive number'),
    category: z.enum(categories)
})

const RegisterRestaurant = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const registerForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            address: '',
            email: '',
            capacity: 0,
            category: ''
        }
    })

    const onSubmit = (data) => {
        Restaurants.create(data)
        .then(response => {
            if (!response.restaurant) {
                setErrorMessage(response.error)
            } else {
                window.location.href = '/admin'
            }
        })
    }

    return (
        <div className='flex-1 w-full flex items-center justify-center'>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)}
                    className='m-auto max-w-4xl w-full space-y-4 p-4 bg-theme3 shadow-md'
                >
                    <FormField name="name" label="Name" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Nom</FormLabel>
                            <FormControl>
                                <input {...field} className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField name="description" label="Description" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Description</FormLabel>
                            <FormControl>
                                <input {...field} className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField name="address" label="Address" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Addresse</FormLabel>
                            <FormControl>
                                <input {...field} className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField name="email" label="Email" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Email</FormLabel>
                            <FormControl>
                                <input {...field} className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField name="capacity" label="Capacity" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Capacité</FormLabel>
                            <FormControl>
                                <input {...field} type="number" className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField name="category" label="Category" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Catégorie</FormLabel>
                            <FormControl>
                                <select {...field} className="block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Choisissez une catégorie</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    { errorMessage && <p className="text-red-500">{errorMessage}</p> }
                    <Button type="submit">Enregistrer</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegisterRestaurant