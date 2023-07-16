import './styles/login.css'
import Button from '../components/button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Cookies from 'universal-cookie';
import Watermark from '../components/watermark';
import Global from '../general/globalVar'
import checkAutherization from '../checkAuth';


function Logout() {
    const navigate = useNavigate()
    const cookies= new Cookies()
    console.log("Request Sent")
    // localStorage.removeItem("img_dir")
    // localStorage.removeItem("role")
    // localStorage.removeItem("name")
    // localStorage.removeItem("classroom")
    localStorage.clear()
    cookies.remove("jwt")
    cookies.remove("role")
    cookies.remove("id")
    cookies.remove("CookiesState")

//   navigate('/login')
    window.location.href = "/login"
  return (
    <div>
      <h1>Logging out</h1>
    </div>
  );
}

export default Logout;
