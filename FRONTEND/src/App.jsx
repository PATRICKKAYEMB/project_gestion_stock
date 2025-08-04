import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Main from './components/Main'
import RoutingPage from './navigation/RoutingPage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
       <RoutingPage/>
       <ToastContainer />

    </div>
  
  )
}

export default App