import API from '../config'

const Responsables = {
    async get() {
        const response = await API.get('/responsable')
        return response.data
    },

    async getOne(id) {
        const response = await API.get(`/responsable/user/${id}`)
        return response.data
    },

    async getByRestaurant(user_id) {
        const response = await API.get(`/responsable/restaurant/${user_id}`)
        return response.data
    },

    async create({restaurant_id, user_id, role}) {
        const response = await API.post(`/responsable/restaurant/${restaurant_id}/${user_id}`, {
            role: role
        })
        return response.data
    },

    async update({restaurant_id, user_id, role}) {
        const response = await API.put(`/responsable/restaurant/${restaurant_id}/${user_id}`, {
            role: role
        })
        return response.data
    },

    async delete({restaurant_id, user_id}) {
        const response = await API.delete(`/responsable/restaurant/${restaurant_id}/${user_id}`)
        return response.data
    },
}

export default Responsables