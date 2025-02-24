import './App.css';
import React, { useEffect, useContext, useState } from "react";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Users from './pages/auth/Users';

import UserLayout from './layouts/UserLayout';
import Profile from './pages/user/Profile';
import Homepage from './pages/HomePage';
import DContext from './context/DContext';
import Clients from './pages/clients/Clients';
import Faq from './pages/user/Faq';
import Demopage from './pages/Demopage';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import ClientDetail from './pages/clients/ClientDetail';
import Leads from './pages/leads/Leads';
import Settings from './pages/clients/Settings';

const App = () => {

  const {
    authState,
    authDispatch,
    login,
    logout,

  } = useContext(DContext);

  const { user, ustate, isLoggedIn } = authState;

  useEffect(() => {
    //toast('Here is your toast.');
    //toast.success('Here is your toast.');
    //toast.loading('Here is your toast.');
    //toast.error('Here is your toast.');
    //toast.custom('Here is your toast.');

  }, [])

  const demoFun = () => {
    console.log("demo fun runs");
    authDispatch({ type: "AUTH_ERROR", payload: "Message changed" });
    authDispatch({ type: "LOGIN", payload: "Message changed" });

  }

  return (
    <>
      <Toaster />
      {/* {ustate}
    <button onClick={demoFun}>click</button> */}
      {
        !isLoggedIn ? (
          <>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route path="" element={<Homepage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="faq" element={<Faq />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:clientcode" element={<ClientDetail />} />

                <Route path="authservice" element={<Users />} />
                <Route path="authservice/:clientid" element={<ClientDetail />} />

                <Route path="leadservice" element={<Leads />} />
                <Route path="leadservice/:clientid" element={<ClientDetail />} />

                <Route path="demo/:demoid" element={<Demopage />} />

                {/* if no route is defined then replace it to blank means with homepage route */}
                <Route path="*" element={<Navigate to="" replace />} />
              </Route>

            </Routes>

          </>

        )
      }

    </>
  );
}

export default App;
