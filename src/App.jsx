import { useState } from 'react'
import './style/App.css'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import CallList from './components/CallList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='screen' style={{backgroundColor:'black'}}>
      <Header />
      <div className="container-view ">Some activities should be here</div>
      <CallList />
      <Navigation />
      
    
      </div>
    </>
  )
}

export default App
