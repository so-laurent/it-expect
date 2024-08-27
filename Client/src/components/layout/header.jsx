import React, { useContext } from 'react'
import { Button } from '../ui/button.jsx'
import { Menubar, MenubarTrigger, MenubarMenu } from '../ui/menubar.jsx'
import AuthContext from '@/contexts/authContext.jsx'
import { Utensils } from 'lucide-react'

const Header = () => {

    const { currentUser, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    return (
        <div className='w-full flex flex-col pl-2 sticky top-0 bg-white shadow-md z-50'>
            <div className='flex w-full justify-center items-center'>
                <div className="flex items-center h-full py-1.5">
                    <a href='/' className='flex items-center'>
                        <Utensils size={32} className='w-8 h-8 text-black' /> &nbsp;
                        <span className='text-xl font-bold'>SilverMicro</span>
                    </a>
                </div>
            </div>
            <div className='flex justify-between w-full items-center'>
                <div className="flex items-center h-full py-1.5">
                        { currentUser && <>
                            <span className="text-md font-semibold">Bienvenue, {currentUser.username}</span>
                        </>}
                </div>
                <div className="flex items-center h-full overflow-x-auto">
                        
                    <Button variant="ghost" onClick={() => window.location.href = '/'}>Accueil</Button>
                    <Button variant="ghost" onClick={() => window.location.href = '/restaurants'}>Restaurants</Button>
                    { currentUser ? (
                        <>

                            <Button variant="ghost" onClick={() => window.location.href = '/reservations'}>Reservations</Button>
                            <Button variant="ghost" onClick={() => window.location.href = '/profile'}>Profil</Button>
                            { currentUser.role === 'admin' && (
                                <Button variant="ghost" onClick={() => window.location.href = '/admin'}>Admin</Button>
                            )}
                            <Button variant="ghost" onClick={() => window.location.href = '/new-restaurant'}>Enregistrer un restaurant</Button>
                            <Button variant="ghost" onClick={handleLogout}>Deconnexion</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="link" onClick={() => window.location.href = '/login'  }>Connexion</Button>
                            <Button variant="link" onClick={() => window.location.href = '/register'  }>Inscription</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header