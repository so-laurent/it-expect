import React, { useContext, useState } from 'react'

import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '../ui/table.jsx'
import { Button } from '../ui/button.jsx'

import AuthContext from '@/contexts/authContext.jsx'

const TeamTable = ({ team }) => {

    const profile = useContext(AuthContext)
    const [teamRole, setTeamRole] = useState(
        team && team.find((member) => member.UserId === profile.currentUser.id).role
    )
    
    
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {team && team.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.User.username}</TableCell>
                            <TableCell>{member.User.email}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>
                                {(profile.currentUser.id !== member.UserId
                                    && teamRole === 'patron'
                                ) &&
                                    <Button
                                        className='bg-red-500 hover:bg-red-700'
                                        onClick={() => console.log('delete', member.id)}
                                    >
                                        Supprimer
                                    </Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
}

export default TeamTable