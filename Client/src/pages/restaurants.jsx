import React, { useEffect, useState } from 'react'
import Restaurants from '@/services/api/restaurants'
import { useParams } from 'react-router-dom'
import RestaurantCard from '@/components/restaurantCard'
import RestaurantsSidemenu from '@/components/restaurantsSidemenu'



const RestaurantsList = () => {

    const { category } = useParams()
    const [restaurants, setRestaurants] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterCategory, setFilterCategory] = useState(category || '')
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (search !== "" || filterCategory !== "") {
            Restaurants.search(search, filterCategory).then((response) => {
                setRestaurants(response.restaurants)
                setLoading(false)
            })
        } else {
            Restaurants.get().then((response) => {
                setRestaurants(response.restaurants)
                setLoading(false)
            })
        }
    }, [search, filterCategory])

    return (
        <div className='flex-1 flex w-full flex-col md:flex-row'>
            <RestaurantsSidemenu 
                search={search} 
                setSearch={setSearch}
                filterCategory={filterCategory} 
                setFilterCategory={setFilterCategory} />
            {loading && (
                <div>Loading...</div>
            )} 
            {!!restaurants && (
                <div className='flex flex-1 flex-row flex-wrap justify-center'>
                    {restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default RestaurantsList