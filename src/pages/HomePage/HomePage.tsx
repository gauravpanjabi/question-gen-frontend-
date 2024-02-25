import React from 'react'
import './HomePage.css'
import Navbar from '../../components/Navbar/Navbar';
import { AboutUs } from '../../components/AboutUs/AboutUs';
import  Footer  from '../../components/Footer/Footer';
import  YourComponent from '../../components/YourComponent/YourComponent';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Navbar />
      <AboutUs />
      <YourComponent/>
      <Footer companyName="Smartmcq" year={2023} />
      

    </div>
  )
}

export default HomePage