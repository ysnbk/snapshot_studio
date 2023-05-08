import React, { useState } from 'react'
import logo from './brand/logo.png'
import '../styles/editor.css'

const Editor = () => {
    const filters = [
        {
            name: 'brightness',
            maxValue: 200
        },
        {
            name: 'grayscale',
            maxValue: 200
        },
        {
            name: 'sepia',
            maxValue: 200
        },
        {
            name: 'saturate',
            maxValue: 200
        },
        {
            name: 'contrast',
            maxValue: 200
        },
        {
            name: 'hueRotate'

        }, {
            name: 'invert',
            maxValue: 200
        }, {
            name: 'opacity',
            maxValue: 200
        }
    ]
    const [property, setProperty] = useState(
        {
            name: 'brightness',
            maxValue: 200
        }
    )
    const [details, setDetails] = useState('')
    const [crop, setCrop] = useState('')
    const [state, setState] = useState({
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        hueRotate: 0,
        invert: 0,
        sepia: 0,
        opacity: 100,
        rotate: 0,
        vartical: 1,
        horizental: 1
    })
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="container w-75 mt-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <h2 className='text-center'><img src={logo} alt="" width='60px' /> Snapshot Studio</h2>
                <main className="main">
                    <div className="Tools">
                        <ul>
                            {
                                filters.map((v, i) => <li className={property.name === v.name ? 'active_option' : ''} >
                                    <i className='bx bxs-brightness-half' key={i}></i>
                                    <button>{v.name}</button>
                                </li>)
                            }
                            {/* {
                                        filterElement.map((v, i) => <button className={property.name === v.name ? 'active' : ''} onClick={() => setProperty(v)} key={i} >{v.name}</button>)
                                    } */}
                        </ul>
                    </div>
                    <div className="content">
                        <div className="choose_image">
                            <div className="upload_img_box">
                                <i className="bx bxs-image-add" /><br />
                                <input type="file" name="selectedImage" id="selectedImage" accept="image/jpeg, image/png" />
                                <p id="hint">choose Image from folder</p>
                            </div>
                        </div>
                        <canvas id="image_canvas" />
                        <div className="image_holder">
                            <button id="remove_img_btn"><i className="bx bxs-message-square-x" /></button>
                            <img src alt="img" id="image" />
                        </div>
                        <div className="options">
                            <div className="option">
                                <input type="range" max={200} min={0} defaultValue={100} id="brightness" className="slider" />
                                <p id="brightVal" className="show_value">100</p>
                            </div>
                            <div className="option">
                                <input type="range" max={40} min={0} defaultValue={0} id="blur" className="slider" />
                                <p id="blurVal" className="show_value">0</p>
                            </div>
                            <div className="option">
                                <input type="range" max={100} min={0} defaultValue={0} id="greyScale" className="slider" />
                                <p id="greyVal" className="show_value">0</p>
                            </div>
                            <div className="option">
                                <input type="range" max={100} min={0} defaultValue={0} id="hue" className="slider" />
                                <p id="hueVal" className="show_value">0</p>
                            </div>
                            <div className="option">
                                <input type="range" max={100} min={1} defaultValue={1} id="saturation" className="slider" />
                                <p id="saturationVal" className="show_value">1</p>
                            </div>
                        </div>
                        <button id="clearAll"><span>Reset</span><i className="bx bx-reset" /></button>
                    </div>

                </main>
            </div>
        </>
    )
}

export default Editor