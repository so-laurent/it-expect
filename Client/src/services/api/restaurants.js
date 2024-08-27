import API from '../config'

const Restaurants = {
    async get () {
        const response = await API.get('/restaurant')
        return response.data
    },

    async getOne (id) {
        const response = await API.get(`/restaurant/${id}`)
        return response.data
    },

    async search (name, category) {
        
        const nameQuery = name ? `name=${name}` : ''
        const categoryQuery = category ? `category=${category}` : ''
        const response = await API.get(`/restaurant/search?${nameQuery}${(nameQuery !== '') ? '&' : ''}${categoryQuery}`)
        return response.data
    },

    async create ({name, description, address, email, capacity, category}) {
        const response = await API.post('/restaurant', {
            name: name,
            description: description,
            address: address,
            email: email,
            capacity: capacity,
            category: category
        })
        return response.data
    },

    async update ({id, name, description, address, email, capacity, category}) {
        const response = await API.put(`/restaurant/${id}`, {
            name: name,
            description: description,
            address: address,
            email: email,
            capacity: capacity,
            category: category
        })
        return response.data
    },

    async delete (id) {
        const response = await API.delete(`/restaurant/${id}`)
        return response.data
    },
}

export default Restaurants