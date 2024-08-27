import API from '../config'

const Avis = {
    async get () {
        const response = await API.get('/avis')
        return response.data
    },

    async getOne (id) {
        const response = await API.get(`/avis/${id}`)
        return response.data
    },

    async getByUser (user_id) {
        const response = await API.get(`/avis/user/${user_id}`)
        return response.data
    },

    async getByRestaurant (restaurant_id) {
        const response = await API.get(`/avis/restaurant/${restaurant_id}`)
        return response.data
    },

    async create ({restaurantId, rating, review}) {
        const response = await API.post('/avis', {
            restaurantId: restaurantId,
            rating: rating,
            review: review
        })
        return response.data
    },

    async update ({id, restaurant_id, rating, review}) {
        const response = await API.put(`/avis/${id}`, {
            restaurantId: restaurant_id,
            rating: rating,
            review: review
        })
        return response.data
    },

    async delete (id) {
        const response = await API.delete(`/avis/${id}`)
        return response.data
    },
}

export default Avis