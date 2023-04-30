import React from 'react'
import {Routes , Route} from "react-router-dom"
import NotFound from '../components/NotFound'
import Index from '../components/Index'
import Signin from '../components/auth/Signin'
import SignUp from '../components/auth/SignUp'
import Protected from '../components/Protected'
import Main from '../components/editor/Main'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Index/>}>
              
            </Route>
            <Route path="/login" element={<Signin/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/editor" element={<Protected component={<Main/>}/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default Router