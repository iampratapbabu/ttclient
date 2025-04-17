import React from 'react';
import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import SideBar from '../components/layout/SideBar';



const UserLayout = () => {
  return (
   <>
   <Header/>
   <SideBar/>
   <main id="main" className="main">
   <Outlet/>
   </main>
   <Footer/>
   </>
  )
}

export default UserLayout