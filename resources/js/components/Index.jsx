import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'


const Index = () => {
  return (
    <div>
      <Navbar
            links={[<li><Link className='link' to='/register'>Sign Up</Link></li>
        ,<li className='link'><Link className='link' to='/login'>Sign In</Link></li>
        ]}/>
        
        
        
    </div>
  )
}

export default Index