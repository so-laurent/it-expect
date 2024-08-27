import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import Restaurant from '@/services/api/restaurants';
import { categories } from '@/services/variables';

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters long').optional(),
    address: z.string().min(10, 'Address must be at least 10 characters long').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
    capacity: z.coerce.number().int().positive('Capacity must be a positive number').optional(),
    category: z.enum(categories).optional()
})

const RestaurantEdit = ({ restaurant, update }) => {
    const restaurantForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: restaurant.name,
            description: restaurant.description,
            address: restaurant.address,
            email: restaurant.email,
            capacity: restaurant.capacity,
            category: restaurant.category
        }
    });

    const onSubmit = (data) => {
        data.id = restaurant.id;
        Restaurant.update(data)
            .then(response => {
                if (response.restaurant) {
                    update();
                }
            });
    };

    return (
        <Form {...restaurantForm}>
            <form onSubmit={restaurantForm.handleSubmit(onSubmit)}
                className='flex flex-col justify-end'
            >
                <FormField name="name" label="Name" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Name</FormLabel>
                        <FormControl>
                            <input {...field} className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
                <FormField name="description" label="Description" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Description</FormLabel>
                        <FormControl>
                            <textarea {...field} className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
                <FormField name="address" label="Address" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Addresse</FormLabel>
                        <FormControl>
                            <input {...field} className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
                <FormField name="email" label="Email" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Email</FormLabel>
                        <FormControl>
                            <input {...field} className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
                <FormField name="capacity" label="Capacity" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Capacité</FormLabel>
                        <FormControl>
                            <input {...field} type="number" className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
            
                <FormField name="category" label="Category" render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel htmlFor={field.name}>Categorie</FormLabel>
                        <FormControl>
                            <select {...field} className="block w-full px-3 py-2 border border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Choose a category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )} />
                <Button
                    className="mt-4"
                    type="submit">
                    Enregistrer
                </Button>
            </form>
        </Form>
    );
}

export default RestaurantEdit;