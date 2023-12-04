import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='screen'>
      <Header />
      <div className="container-view">Some activities should be here</div>
      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button>
      
      
    
      </div>
    </>
  )
}

export default App
