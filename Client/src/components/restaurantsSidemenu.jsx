import React from 'react'
import { categories } from '@/services/variables'
import { Star, StarOff } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const RestaurantsSidemenu = ({
    search, setSearch, filterCategory, setFilterCategory
}) => {
    return (
        <div className='flex md:max-w-80 flex-col p-3 bg-black/90 w-full relative'>
            <div className="sticky top-24">
                <input type='text' placeholder='Rechercher un restaurant'
                    className='p-2 my-2 border border-gray-300 bg-white w-full'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                    className='p-2 border border-gray-300 mb-2 w-full'
                >
                    <option value=''>Toutes les catégories</option>
                    {categories?.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <Accordion type="single" defaultValue='item-1' collapsible className="w-full bg-white">
                    <AccordionItem title='Filtre_add' value="item-1">
                        <AccordionTrigger className='p-3 pr-0'>
                            <h2 className='text-lg font-bold'>Filtres additionnels</h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='bg-white p-2'>
                                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                                    <span>Note minimale</span>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <label key={rating} className='flex items-center px-3'>
                                            <input type='radio' name='rating' value={rating} className='mr-2' />
                                            <span className='flex'>{
                                                Array.from({ length: 5 }, (_, i) => (
                                                    <span key={i}>
                                                        {i < rating ?
                                                            <Star size={20} className='text-yellow-500' fill='gold' />
                                                            :
                                                            <StarOff size={20} className='text-gray-300' />}
                                                    </span>
                                                ))
                                            }</span>
                                        </label>
                                    ))}
                                </div>
                                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                                    <span>Capacité</span>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='capacity' value='1' className='mr-2' />
                                        <span>1-20 personnes</span>
                                    </label>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='capacity' value='2' className='mr-2' />
                                        <span>21-50 personnes</span>
                                    </label>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='capacity' value='3' className='mr-2' />
                                        <span>51-100+ personnes</span>
                                    </label>
                                </div>
                                <div className='flex flex-col space-y-2 mt-2 px-3 pb-3'>
                                    <span>Distance</span>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='distance' value='1' className='mr-2' />
                                        <span>1-5km</span>
                                    </label>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='distance' value='2' className='mr-2' />
                                        <span>6-10km</span>
                                    </label>
                                    <label className='flex items-center px-3'>
                                        <input type='radio' name='distance' value='3' className='mr-2' />
                                        <span>11-20km</span>
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default RestaurantsSidemenu