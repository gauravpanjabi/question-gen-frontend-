import React from 'react'
import './AboutUs.css'
import illustration from  '../../assets/images/illustration.png'

export const AboutUs = () => {
  return (
    <div className='aboutus-container'>
        <div className='description-container'>
            <h1 className='h1-des1'>
              <span>Generate </span>
              <span>
                <span className='h1-quizz'>quizzes </span>
              </span>
              <span>from any text in one click using AI.</span>
            </h1>
            <h1 className='h1-des2'>
              <span>For Students, Professors & Educational Services</span>
            </h1>
        </div>
        <div className='illustration-container'>
            <img src={illustration} alt='' className='aboutus-img'></img>
        </div>
    </div>
  )
}
