import { useState } from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {BrowserRouter ,Routes, Route, Link} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Predictionform from './pages/Predictionform'
import Profile from './pages/Profile'
function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element= {<SignUp/>}/>
     <Route path="/signin" element= {<SignIn/>}/>
     <Route path="/dashboard" element= {<Dashboard/>}/>
     <Route path="/predictionform" element= {<Predictionform/>}/>
     <Route path="/profile" element = {<Profile/>}/>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
