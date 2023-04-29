import axios from 'axios';
import React, { useEffect } from 'react'
import { getCookie } from '../cookie';
import Navbar from '../Navbar'

const Main = () => {
  useEffect(() => {
    const getData=async ()=>{
      
    
    await axios.get(`/api/dashboard/${getCookie('user')}`)
      .then(({ data }) => {
        
         console.log(data)
         
         
        })
        .catch(({ response }) => {
        console.log(response)

        

        
      })
    }
    window.addEventListener('load',getData())
  }, []);
  return (
    <div>
        <Navbar links={[<li className='link my-3'>hhhh</li>
]}/>

    </div>
  )
}

export default Main