import { useState, useEffect } from 'react'
import './style/App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import CallList from './components/CallList.jsx'
import CallDetails from './pages/CallDetails.jsx'


function App() {
 

  return (
    <>
    
    
    <div className='screen bg-gray-100 text-gray-900'>
      <Header />
      <div className="container-view mt-3 font-seif"><h2 className='text-3xl font-medium'>Active Calls</h2></div>
      <CallList />
      <Navigation />
      
      </div>

    </>
  )
}

export default App
