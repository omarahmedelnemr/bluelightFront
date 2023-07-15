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


function CoursesPage() {

  return (
    <div className="Homepage column">
      <TopBar title={"Courses"}/>

      <div className='row'>

      </div>        
    </div>
  );
}

export default CoursesPage;
