import api from '../config/index.js'

class authService {
    login (payload) {
       return api.post('/api/customer/login', payload) 
    }
    auth () {
        return api.get('/api/customer/auth')
    }
}

export default authService