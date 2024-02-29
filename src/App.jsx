import { useEffect, useState } from 'react'
import './App.css'
// import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from './resources/UserProvider.js'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


function App() {
  const [users, setUser] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const userProvider = new UserService()

  useEffect(() => {
    getUserAll()
  }, [])

  const getUserAll = async () => {
    try {
      const allDate = await userProvider.getAll();
      if (allDate?.data?.data) {
        setUser(allDate?.data?.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const addUser = async () => {
    const newUser = {
      firstName,
      lastName,
      email
    }
    try {
      await userProvider.create(newUser);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });
    } catch (error) {
      console.log(error)
    }
  }
  const deleteUser = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await userProvider.delete(id);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          getUserAll()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "delete fail",
        text: "delete fail",
        icon: "error"
      })
    }
  }

  return (
    <>
    <form onSubmit={addUser}>
      
    <h3>Create User</h3>
    <div className="mb-3">
      <label htmlFor="firstName" className="form-label">First Name</label>
      <input
        id="firstName"
        type="text"
        className="form-control"
        name="firstName"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName" className="form-label">Last Name</label>
      <input
        id="lastName"
        type="text"
        className="form-control"
        name="lastName"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <label htmlFor="email" className="form-label">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
    <div className="d-grid gap-2 mb-3">
      <button className="btn btn-primary" type="submit" value="Add" >Add</button>
    </div>
    </form>
      <h3>User Manage</h3>
      <table className="table table-hover ">
        <thead className='table-light'>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>lastName</th>
            <th>email</th>
            <th className='' style={{ width: '100%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
        {users.map((val) => (
          <tr key={val._id}>
            <td>{val._id}</td>
            <td>{val.firstName}</td>
            <td>{val.lastName}</td>
            <td>{val.email}</td>
            <td className=''  style={{ width: '100%' }}>
              <div className='d-flex justify-content-between' style={{ width: '150px' }}>
                <Link to={`/update/${val._id}`}><button className="btn btn-warning">Edit</button></Link>   
                <button className="btn btn-danger" onClick={event => deleteUser(val._id)}>delete</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default App
