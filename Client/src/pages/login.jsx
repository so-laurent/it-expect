import React, { useContext, useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import  { useForm, useController } from 'react-hook-form'
import z from 'zod'

import Auth from '@/services/api/auth'
import AuthContext from '@/contexts/authContext'

const formSchema = z.object({
    email: z.string().email(
        'Please enter a valid email address'
    ),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

const Login = () => {

    const { login } = useContext(AuthContext)
    const [responseMessage, setResponseMessage] = useState('')

    const loginForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        Auth.login(data)
        .then(response => {
            if (!response.success) {
                setResponseMessage(response.message)
            } else {
                localStorage.setItem('silvermicro_token', response.token)
                login(response.user)
                window.location.href = '/'
            }
        })
    }

    return (
        <div className='flex-1 w-full flex items-center justify-center'>
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)}
                    className='m-auto max-w-md w-full space-y-8 p-4 bg-white shadow-md rounded-md'
                >
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
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.name}>Mot de passe</FormLabel>
                                <FormControl>
                                <input
                                    {...field}
                                    type="password"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                </FormControl>
                                <FormMessage fieldState={fieldState} />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        {...loginForm.formState.isSubmitting && { disabled: true }}
                    >Connexion</Button>
                    {responseMessage && <p>{responseMessage}</p>}
                </form>
            </Form>
        </div>
    )
}

export default Login