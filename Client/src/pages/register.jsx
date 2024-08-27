import React, { useContext, useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import  { useForm, useController } from 'react-hook-form'
import z from 'zod'

import Auth from '@/services/api/auth'

const formSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email(
        'Please enter a valid email address'
    ),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

const Register = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const registerForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        Auth.register(data)
        .then(response => {
            if (!response.success) {
                setErrorMessage(response.error)
            } else {
                window.location.href = '/login'
            }
        })
    }

    return (
        <div className='flex-1 w-full flex items-center justify-center'>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)}
                    className='m-auto max-w-md w-full space-y-8 p-4 bg-white shadow-md rounded-md'
                >
                    <FormField
                        name="username"
                        label="Username"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Username</FormLabel>
                                <FormControl>
                                <input
                                    {...field}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Email</FormLabel>
                                <FormControl>
                                <input
                                    {...field}
                                    type="email"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Password</FormLabel>
                                <FormControl>
                                <input
                                    {...field}
                                    type="password"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                </FormControl>
                                <FormMessage>{fieldState.error?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Register</Button>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                </form>
            </Form>
        </div>
    )
}

export default Register