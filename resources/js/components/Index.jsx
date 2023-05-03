import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Loading from './Loading'


const Index = () => {
  const [isLoading , setIsLoading]=useState(true)
  useEffect(() => {
  {setIsLoading(false)}
  }, []);
  return (
    isLoading?<Loading/>:
    <div>
      <Navbar
            links={[<li><Link className='link' to='register'>Sign Up</Link></li>
        ,<li className='link'><Link className='link' to='login'>Sign In</Link></li>
        ]}/>
        
        
        
    </div>
  )
}

export default Index