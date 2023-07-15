import './styles/Homepage.css'
import './styles/general.css'
import Button from '../components/button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';

import Cookies from 'universal-cookie';
import SideNavigation from '../components/SideNavigationMenu';
import TopBar from '../components/topBar';


function Homepage() {
  // document.getElementsByClassName("active")[0].classList.remove("active")
  // document.getElementById("homeNavButton").classList.add("active")
  // document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById("homeNavButton").getBoundingClientRect().y+"px")

  return (
    <div className="Homepage column">
      <div className='row'>

      </div>        
    </div>
  );
}

export default Homepage;
