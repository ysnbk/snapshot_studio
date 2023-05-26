import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { getCookie , removeCookie} from '../cookie';
import Navbar from '../Navbar'
import Loading from '../Loading';
import Editor from '../Editor';

const Main = () => {
  const navigate = useNavigate()
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
    const profile = document.createElement("input");
    profile.type="file"
    profile.accept="image/*"
    profile.click()
    profile.onchange=(e)=>{
      let file = e.target.files[0]
      let reader = new FileReader()
        const formData = new FormData()
        reader.onloadend = async (file)=>{
          formData.append('profile', reader.result)
          await axios.post('/api/changeProfile/', formData)
      .then(({ data }) => {
        console.log(data)
        window.location.reload()
      })
      .catch(({ response }) => {
        console.log(response)
      })
        }
        
     
      reader.readAsDataURL(file)
    }

  }
  const logout=()=>{
    removeCookie("user")
    navigate('/')
  }
  return (
    isLoading?<Loading/>:
    <div>
        <Navbar links={[<div className="dropdown mx-2">

    <img src={user.profile} alt width={32} height={32} className="rounded-circle me-2" onClick={changeProfile}/>
  <a href="#" className="link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    <strong>{user.name}</strong>
  </a>
  <ul className="dropdown-menu text-small shadow" style={{marginLeft:'-60%'}}>
    <li><a className="dropdown-item" href="#">New project</a></li>
    <li><a className="dropdown-item" href="#">Settings</a></li>
    <li><a className="dropdown-item" href="#">Profile</a></li>
    <li><hr className="dropdown-divider" /></li>
    <li><button className="dropdown-item" onClick={logout}>Sign out</button></li>
  </ul>
</div>

]}/>
  <main>
    <Editor/>
  </main>
    </div>
  )
}

export default Main