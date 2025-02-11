import { useState } from 'react'
import authService from '../../resources/AuthProvider.js'

function Login () {
    const [customer, setCustomer] = useState({
        username: '',
        password: ''
    })

    const authProvider = new authService()

    const handleSubmit = async (e) => {
        e.preventDefault()
        login()
      }

    const login = async () => {
        try {
            const {data} = await authProvider.login(customer)
            console.log('customer => ', customer)
            console.log('token => ', data.token)
            console.log('data => ', data)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.log(error)
        }
    }

    const getCustomer = async () => {
        const authToken = localStorage.getItem('token')
        const response = await authProvider.auth({
            headers: {
                'authorization': `Bearer ${authToken}`
            }
        })
        console.log(response)
    }

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
          })
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">username to register</label>
                <input
                    id="username"
                    type="text"
                    className="form-control"
                    name="username"
                    value={customer.username}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password to register</label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={customer.password}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">test lable</label>
            </div>
            <div className='d-flex justify-content-between'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-warning" onClick={() => getCustomer()}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login