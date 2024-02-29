import api from '../config/index.js'

class userService {
    getAll() {
        return api.get('/user')
    }
    getOne(id) {
        return api.get(`/user/${id}`)
    }
    
    create(payload) {
        return api.post('/user', payload)
    }
    update(id, payload) {
        return api.patch(`/user/${id}`, payload)
    }

    delete(id) {
        return api.delete(`/user/${id}`)
    }
}

export default userService