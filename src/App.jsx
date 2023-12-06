import { useState, useEffect } from 'react'
import './style/App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import CallList from './components/CallList.jsx'
import CallDetails from './pages/CallDetails.jsx'


function App() {
 

  return (
    <>
    
    
    <div className='screen bg-gray-100 text-gray-900'>
      <Header />
      <div className="container-view mt-3 font-seif "></div>
      <CallList />
      
      </div>

    </>
  )
}

export default App
