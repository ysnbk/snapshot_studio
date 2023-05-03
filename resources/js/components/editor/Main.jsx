import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getCookie } from '../cookie';
import Navbar from '../Navbar'
import Loading from '../Loading';

const Main = () => {
  const [isLoading , setIsLoading]=useState(false)
  const [user , setUser]=useState('')
  useEffect(() => {
    setIsLoading(true)
    const getData=async ()=>{
      
    
      await axios.get('/api/dashboard/',{
        params:{
        cookie:getCookie('user')
      }
      })
      .then(({ data }) => {
        setIsLoading(false)
        setUser(data.user)
        //  console.log(data)
         
         
        })
        .catch(({ response }) => {
        console.log(response)

        

        
      })
    }
    window.addEventListener('load',getData())
  }, []);
  const changeProfile =()=>{
    const file = document.createElement("input");
    file.type="file"
    file.accept="image/*"
    file.click()
  }
  return (
    isLoading?<Loading/>:
    <div>
        <Navbar links={[<div className="dropdown mx-2">

    <img src={user.profile} alt width={32} height={32} className="me-2" onClick={changeProfile}/>
  <a href="#" className="link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    <strong>{user.name}</strong>
  </a>
  <ul className="dropdown-menu text-small shadow" style={{marginLeft:'-60%'}}>
    <li><a className="dropdown-item" href="#">New project</a></li>
    <li><a className="dropdown-item" href="#">Settings</a></li>
    <li><a className="dropdown-item" href="#">Profile</a></li>
    <li><hr className="dropdown-divider" /></li>
    <li><a className="dropdown-item" href="#">Sign out</a></li>
  </ul>
</div>

]}/>

    </div>
  )
}

export default Main