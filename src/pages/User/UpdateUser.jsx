import { useParams  } from "react-router-dom"
import UserService from "../../resources/UserProvider.js"
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function UpdateUser() {
  const [user, setUser] = useState({
    _id: null,
    firstName: '',
    lastName: '',
    email: ''
  })

  const userProvider = new UserService()
  const { id } = useParams()

  useEffect(() => {
    getUserById(id)
  }, [])

  const getUserById = async (id) => {
    const getUser = await userProvider.getOne(id)
    setUser(getUser?.data?.data)
  }

  const handleChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
      })
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault()
    updateUser(id ,user)
  }

  const updateUser = async (id, payload) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: `Do you want to update ID: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await userProvider.update(id, payload)
        swalWithBootstrapButtons.fire({
          title: "Updated!",
          text: `Your ID: ${id} has been Updated.`,
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your ID is safe :)",
          icon: "error"
        });
      }
    });
  }


  return (
    <div>
      <div className="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Edit User</h3>
            <h5>
              id: { user._id }
            </h5>
            <label className="form-label">firstname hello</label>
            <input
              type='text'
              name='firstName'
              className="form-control"
              onChange={e => handleChange(e)}
              placeholder='First Name'
              value={user.firstName}
            />
            <label className="form-label">Last Name</label>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              className="form-control"
              value={user.lastName}
              onChange={e => handleChange(e)}
            />

            <label className="form-label">Email</label>
            <input
              type='text'
              name='email'
              placeholder='Email'
              className="form-control"
              value={user.email}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="d-flex justify-content-between">
          <Link to={'/'}><button className="btn btn-primary">Back</button></Link> 
            <button className="btn btn-warning" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default UpdateUser