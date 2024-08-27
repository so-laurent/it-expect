import API from '../config'

const Reservations = {
    async get() {
        const response = await API.get('/reservation')
        return response.data
    },

    async getOne(id) {
        const response = await API.get(`/reservation/${id}`)
        return response.data
    },
    
    async getByUser(user_id) {
        const response = await API.get(`/reservation/user/${user_id}`)
        return response.data
    },

    async getByRestaurant(restaurant_id) {
        const response = await API.get(`/reservation/restaurant/${restaurant_id}`)
        return response.data
    },

    async getAvailability(restaurant_id, date) {
        const response = await API.post(`/reservation/availability/${restaurant_id}`, {
            date: date,
        })
        return response.data
    },

    async create({restaurant_id, date, time, people}) {
        const response = await API.post(`/reservation`, {
            restaurantId: restaurant_id,
            date: date,
            time: time,
            people: people,
        })
        return response.data
    },

    async update({id, restaurant_id, date, time, people}) {
        const response = await API.put(`/reservation/${id}`, {
            restaurant_id: restaurant_id,
            date: date,
            time: time,
            people: people,
        })
        return response.data
    },

    async delete(id) {
        const response = await API.delete(`/reservation/${id}`)
        return response.data
    },
}

export default Reservations