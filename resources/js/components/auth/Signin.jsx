import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Logo from '../brand/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import Navbar from '../Navbar';
import { getCookie, setCookie } from '../cookie';


const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%'
  },
};

Modal.setAppElement('#app');

const Signin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(getCookie("user")){
      navigate(-1)
    }
  }, []);
  let subtitle;
      //modal
      const [modalIsOpen, setIsOpen] = useState(true);

      function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
      }
  
      function closeModal() {
        setIsOpen(false);
        navigate('/')
      }
      //end modal
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [modalState, setModalState] = useState(true)

  const login = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    await axios.post('/api/login/', formData)
      .then(({ data }) => {
        setErrors(data.error)
        console.log(data)

        if (!data.error) {
          if(data.email_crypted != null){
            setCookie('user', data.email_crypted)
          }
          navigate('/editor')
        }
      })
      .catch(({ response }) => {

        setErrors(response.data.errors)


      })

  }


  return (
    <>
            <Navbar
            links={[<li><Link className='link' to='/register'>Sign Up</Link></li>
        ,<li className='link'><Link className='link' to='/login'>Sign In</Link></li>
        ]}/>
      <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
              <button className='float-end btn-close' onClick={closeModal}></button>
              <img src={Logo} alt="" width='60px'/>
          <hr/>
              <div className="rounded">
                <div>
              <h1 className="fs-3 text-center" style={{color:'#e86228'}}> Login</h1>
                  <input type="email" name='email' className="input-box" placeholder="Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                  {errors.email && (
                    <span className='text-danger'><p>{errors.email[0]}</p></span>
                  )}
                  <input type="password" name='password' className="input-box" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }}  />
                  {errors.password && (
                    <span className='text-danger'><p>{errors.password[0]}</p></span>
                  )}
                  <button className="submit-btn text-light" onClick={login}>Log In</button>

                </div>




                <p className='fs-5'>New to Snapshot? <Link to='/register'>Create an account</Link></p>
              </div>

                
            </Modal>
    </>
  )
}

export default Signin;