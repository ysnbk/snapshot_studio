import React, { useEffect, useState } from 'react'
import icon from './brand/Cabbbbpture.ico'
import logo from './brand/logo.png'
import { motion } from 'framer-motion';
import '../styles/editor.css'
import { getCookie } from './cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faAdjust, faCropSimple, faDownload, faImage } from '@fortawesome/free-solid-svg-icons'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Loading from './Loading'
import axios from 'axios'

const Editor = (props) => {
  const toolsVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    { setIsLoading(false) }
  }, []);

  const defaultFilters = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
      icon: faSun
    },
    {
      name: 'Grayscale',
      property: 'grayscale',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%',

    },
    {
      name: 'Saturation',
      property: 'saturate',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
    },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
      icon: faAdjust
    },
    {
      name: 'Hue Rotate',
      property: 'hue-rotate',
      value: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: 'deg',
    }, {
      name: 'Invert',
      property: 'invert',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    }, {
      name: 'opacity',
      property: 'opacity',
      value: 100,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    }
  ]

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(defaultFilters)


  function getImageStyle() {
    const adjustments = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })


    return { filter: adjustments.join(' ') }
  }

  const [details, setDetails] = useState('')
  const [image, setImage] = useState('')
  const [crop, setCrop] = useState('')

  const inputHandle = (e) => {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: e.target.value }
      })
    })
  }
  const imageHandle = (e) => {

    const image = document.createElement("input");
    image.type = "file"
    image.accept = "image/*"
    image.click()

    image.onchange = (e) => {
      let file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = (file) => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const imageCrop = () => {
    const canvas = document.createElement('canvas')
    const scaleX = details.naturalWidth / details.width
    const scaleY = details.naturalHeight / details.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    setImage(canvas.toDataURL())
    setCrop('')
  }

  const saveImage = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = details.naturalWidth
    canvas.height = details.naturalHeight
    const ctx = canvas.getContext('2d')

    const adjustments = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    ctx.filter = adjustments.join(' ')

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(0 * Math.PI / 180)
    ctx.scale(1, 1) // vertical, horizontal

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    )

    const link = document.createElement('a')
    link.download = 'SnapshotSTudio.jpg'
    link.href = canvas.toDataURL()

    if (getCookie("user")) {

      const formData = new FormData()
      formData.append('user', getCookie("user"))
      formData.append('photo', canvas.toDataURL())

      await axios.post('/api/saveImage', formData)
        .then(({ data }) => {
          console.log(data.image_name);
          link.download = data.image_name
        })
        .catch(({ response }) => {
          console.log(response)
        })

        // save the filter
    }
    link.click()
  }
  return (
    isLoading ? <Loading /> : <>
      <motion.div className="container w-75 mt-3 p-3 mb-5 bg-body-tertiary rounded"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
        <h2 className='text-center'><img src={logo} alt="" width='60px' /> Snapshot Studio</h2>
        <main className="editor">
          {
            image ?
              <motion.div className="tools"
              variants={toolsVariants}
          initial="hidden"
          animate="visible">
                Filters:
                <ul>
                  {
                    defaultFilters.map((v, i) => <li>

                      <button className={`option-button text-capitalize ${i === selectedOptionIndex ? 'active' : ''}`} onClick={() => setSelectedOptionIndex(i)} key={i}><FontAwesomeIcon icon={v.icon} />  {v.name}</button>
                    </li>)
                  }
                </ul>

                {crop ?
                  <>Crop:
                    <button className="option-button text-capitalize" onClick={imageCrop}><FontAwesomeIcon icon={faCropSimple} />Crop</button></>
                  : null
                }
                
              </motion.div> : null}

          <div className="image">
            <div className="content">
              {
                image ?
                  <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                    <img onLoad={(e) => setDetails(e.currentTarget)} src={image} alt="" style={getImageStyle()} />
                  </ReactCrop>
                  :
                  <div className="choose_image">
                    <div className="upload_img_box" onClick={imageHandle}>
                      <i className="bx bxs-image-add" /><br />
                      <p id="hint">choose Image from folder</p>
                    </div>
                  </div>
              }
            </div>
          </div>


          {image ? <div className="range">
            Amount <br />
            <input className='mt-2' onChange={inputHandle} value={options[selectedOptionIndex].value} min={options[selectedOptionIndex].range.min} max={options[selectedOptionIndex].range.max} type="range" />
            <p className='px-3'>{options[selectedOptionIndex].value} %</p>
          
        
          </div> : null}


          {image ? <div className='save_button'>
            <button className='btn change_image ' onClick={imageHandle}><FontAwesomeIcon icon={faImage} /> Change Image</button>
            <button className='btn btn-success download' onClick={saveImage}><FontAwesomeIcon icon={faDownload} /> Download</button>
          </div> : null}

        </main>
      </motion.div>
    </>
  )
}

export default Editor