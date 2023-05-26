import React, { useEffect, useState } from 'react'
import logo from './brand/logo.png'
import '../styles/editor.css'

const Editor = () => {
  const defaultFilters = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Grayscale',
      property: 'grayscale',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Sepia',
      property: 'sepia',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    },
    {
      name: 'Saturation',
      property: 'saturate',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%'
    },
    {
      name: 'Hue Rotate',
      property: 'hue-rotate',
      value: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: 'deg'
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

  const saveImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = details.naturalHeight
    canvas.height = details.naturalHeight
    const ctx = canvas.getContext('2d')
    
    const adjustments = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    ctx.filter = adjustments.join(' ')
console.log("filters",ctx.filter)
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
    link.download = 'image_edit.jpg'
    link.href = canvas.toDataURL()
    link.click()
  }
  return (
    <>
      <div className="container w-75 mt-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <h2 className='text-center'><img src={logo} alt="" width='60px' /> Snapshot Studio</h2>
        <main className="editor">
          {
            image ?
              <div className="tools">
                <ul>
                  {
                    defaultFilters.map((v, i) => <li>
                      <button className={`option-button text-capitalize ${i === selectedOptionIndex ? 'active' : ''}`} onClick={() => setSelectedOptionIndex(i)} key={i}>{v.name}</button>
                    </li>)
                  }
                </ul>
              </div> : null}
          <div className="image">
            <div className="content">
              {
                image ?
                  <img onLoad={(e) => setDetails(e.currentTarget)} src={image} alt="" style={getImageStyle()} />
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
            {options[selectedOptionIndex].name} <br />
            <input onChange={inputHandle} value={options[selectedOptionIndex].value} min={options[selectedOptionIndex].range.min} max={options[selectedOptionIndex].range.max} type="range" />
            <p>{options[selectedOptionIndex].value}</p>
          </div> : null}


          <div className=''>
            <button>change Image</button>
            <button onClick={saveImage}>Save</button>
          </div>

        </main>
      </div>
    </>
  )
}

export default Editor