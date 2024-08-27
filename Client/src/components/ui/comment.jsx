import React from 'react'
import { Star, StarHalf, StarOff } from 'lucide-react'

const Comment = ({ comment }) => {

    return (
        <div className='flex flex-col space-y-4 p-3 bg-white'>
            <div className='flex justify-between'>
                <span className='flex'>
                    <span className='font-bold mr-3'>{comment.User.username}</span>
                    <span className='text-gray-500 flex items-center'>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                                {i < comment.rating ? 
                                    <Star size={16} className='text-yellow-500' fill='gold' />
                                    : 
                                    <StarOff size={16} className='text-gray-300' />
                                }
                            </span>
                        ))}
                    </span>
                </span>
                <span className='text-sm'>
                    {new Date(comment.createdAt).toLocaleDateString(
                        'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                    &nbsp;
                    {new Date(comment.createdAt).toLocaleTimeString(
                        'fr-FR', { hour: '2-digit', minute: '2-digit' }
                    )}
                </span>
            </div>
            <p
                className='pl-5'
            >{comment.review}</p>
        </div>
    )
}

export default Comment