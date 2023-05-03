import React, { useState } from 'react'

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
            
        },{
            name:'invert',
            maxValue:200
        },{
            name:'sepia',
            maxValue:200
        },{
            name:'opacity',
            maxValue:200
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
        invert:0,
        sepia:0,
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
            <div className="container">
                <h2 className='text-center'>Snapshot Studio</h2>
            </div>
        </>
    )
}

export default Editor