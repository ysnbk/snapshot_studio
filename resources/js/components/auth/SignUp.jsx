import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Logo from '../brand/logo.png';
import '../../styles/App.css';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../Navbar';
import { getCookie} from '../cookie';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'60%'
    },
};


Modal.setAppElement('#app');
const signUp = () => {
    let subtitle;
    const navigate = useNavigate()
    useEffect(() => {
        if(getCookie("user")){
          navigate(-1)
        }
      }, []);
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

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const save = async (e) => {
        
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirm_password', confirmPassword)
        
        await axios.post('/api/register/', formData)
            .then(({ data }) => {
                navigate('/login')
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
          <hr />
          <h1 className="fs-5 text-center"> Sign up</h1>
                            <div>
                            <input type="text" name='name' className="input-box" placeholder="First Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                            {errors.name && (
                                <span className='text-danger'><p>{errors.name[0]}</p></span>
                            )}
                            <input type="text" name='lastname' className="input-box" placeholder="Last Name" value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                            {errors.lastname && (
                                <span className='text-danger'><p>{errors.lastname[0]}</p></span>
                            )}
                            <input type="email" name='email' className="input-box" placeholder="Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            {errors.email && (
                                <span className='text-danger'><p>{errors.email[0]}</p></span>
                            )}
                            <input type="password" name='password' className="input-box" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            {errors.password && (
                                <span className='text-danger'><p>{errors.password[0]}</p></span>
                            )}
                            <input type='password' name='confirm_password' className="input-box" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            {errors.confirm_password && (
                                <span className='text-danger'><p>{errors.confirm_password[0]}</p></span>
                            )}
                            <button className="submit-btn text-light" onClick={save}>Sign up</button>
                            <p className='fs-5' data-bs-dismiss="modal">Already have an account? <Link to='/login'>Sign in</Link></p>
                            </div>

        </Modal>
        </>
    )
}

export default signUp;