import React, { useContext } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx'
import { Button } from '@/components/ui/button.jsx'
import Modal from '@/components/layout/modal'
import useModal from '@/hooks/useModal'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Users from '@/services/api/users'
import AuthContext from '@/contexts/authContext'
import { Pencil } from 'lucide-react'

const formSchema = z.object({
    username: z.string().min(1, 'Please enter a username').optional(),
    email: z.string().email('Please enter a valid email address').optional(),
    password: z.string().min(8, 'Password must be at least 8 characters').optional()
})

const Profile = () => { 

    const controls = useModal()
    const profile = useContext(AuthContext)
    const profileForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: profile.currentUser?.username,
            email: profile.currentUser?.email,
        }
    })

    const onSubmit = (data) => {
        data.id = profile.currentUser.id
        Users.update(data).then((response) => {
            profile.login(response.user)
        })
    }

    return (
        <div className='flex-1 flex-col flex w-full justify-center items-center'>
            <h1 className='text-4xl font-semibold text-left mb-10'>
                Details du compte
            </h1>
            <div className='w-96 h-96 leading-loose relative border shadow-md p-5 bg-theme3' id='profile'>
                <div className='w-full'>
                    <p className='text-lg'><span className='font-semibold'>Nom:</span> {profile.currentUser?.username}</p>
                    <p className='text-lg'><span className='font-semibold'>Email:</span> {profile.currentUser?.email}</p>
                    <p className='text-lg'><span className='font-semibold'>Role:</span> {profile.currentUser?.role}</p>
                    <p className='text-lg'><span className='font-semibold'>Inscrit le:</span> {new Date(profile.currentUser?.createdAt).toLocaleDateString()}</p>
                    <p className='text-lg'><span className='font-semibold'>Dernière connexion:</span> {new Date().toLocaleDateString()}</p>
                </div>
                <div id='folded-corner'
                    className='absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-theme3 bg-theme3
                    '
                ></div>
                <Button variant='ghost'
                    className='absolute bottom-0 right-0'
                    onClick={controls.open}>
                        <Pencil size={24} strokeWidth={1} />
                </Button>
            </div>

            <Modal
                controls={controls}
            >
                <Form {...profileForm}>
                    <form 
                        className='flex flex-col space-y-4 p-3 my-2 rounded-md'
                        onSubmit={profileForm.handleSubmit(onSubmit)}>
                        <FormField
                            name='username'
                            label='Username'
                            render={({ field }) => (
                                <FormItem
                                    className='flex flex-col'
                                >
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <input {...field} className='p-2 border border-gray-300 rounded' />
                                    </FormControl>
                                    <FormMessage>{profileForm.formState.errors.username?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            label='Email'
                            render={({ field }) => (
                                <FormItem
                                    className='flex flex-col'
                                >
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <input {...field} className='p-2 border border-gray-300 rounded' />
                                    </FormControl>
                                    <FormMessage>{profileForm.formState.errors.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            label='Password'
                            render={({ field }) => (
                                <FormItem
                                    className='flex flex-col'
                                >
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <input {...field} type='password' className='p-2 border border-gray-300 rounded' />
                                    </FormControl>
                                    <FormMessage>{profileForm.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>
                            Mettre à jour
                        </Button>
                    </form>
                </Form>
            </Modal>
        </div>
    )
}

export default Profile