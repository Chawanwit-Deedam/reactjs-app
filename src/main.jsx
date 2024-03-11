import React from 'react'
import ReactDOM  from 'react-dom/client'
import App from './App.jsx'
import UpdateUser from './pages/User/UpdateUser.jsx'
import Login from './pages/Login/Login.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "update/:id",
    element: <UpdateUser />
  },
  {
    path: "login",
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
