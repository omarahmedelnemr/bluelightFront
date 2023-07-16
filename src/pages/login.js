import './styles/login.css'
import Button from '../components/button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Cookies from 'universal-cookie';
import Watermark from '../components/watermark';
import Global from '../globalVar'
import checkAutherization from '../checkAuth';


function Login() {
  if (checkAutherization() === 'Auth'){
    const reader = new Cookies()
    window.location.href ='/'+reader.get('role')
  }
  console.log("A")
  function SubmitLogin(){
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    console.log(password.length)
    if (username.length < 3){
      setMessege("Please Fill the Username and Password Fields")
    }
    else if(password.length < 8){
      setMessege("Password is Short")
    }
    else{
      console.log("Request Sent")
      axios.post(Global.BackendURL+"/login",{username:username,password:password},{ withCredentials: true})
      .then((res)=>{
        
        //Set The Cookies Manual 
        const cookies = new Cookies();
        cookies.set("jwt",res.data['jwt'])
        cookies.set("role",res.data['role'])
        cookies.set("id",res.data['id'])
        cookies.set("CookiesState","By React")


        //Set Local Storage Variables
        localStorage.setItem("name", res.data['name'])
        localStorage.setItem("img_dir", res.data['img_dir'])
        localStorage.setItem("classroom",res.data["classroom"])
        localStorage.setItem("role",res.data['role'])


        setMessege('')
        setLogingmessege("Logging")
        navigate('/'+res.data['role'])
      }).catch((err)=>{
        try{
          setMessege(err.response.data)
        }catch{
          setMessege("Error!")
          console.log(err)
        }
      })
    }

  }
  const [messege,setMessege] = useState([""])
  const [logingmessege,setLogingmessege] = useState([""])
  const navigate = useNavigate();


  return (
    <div id = "loginContainer" className="login">
      <div id='loginPageOpacity'></div>
      <div id='loginFormContainer'>
          <div id='formOpacity'></div>
          <svg viewBox="0 0 200 500" id='formWavyEffect'>
              <path d="M -2,0 50,0 C 100,150 -100,359 100,500 L 00,500 L 0,1" fill='white' stroke="white"></path>
          </svg>
          <div id='mainLoginForm'>
            <div>
                <h1>Welcome To Nile Schools</h1>
                <p className='rightMessage'>{logingmessege}</p>
                <p className='WrongMessage'>{messege}</p>           
            </div>
            <div>
              <Input type={"text"} label={"username"} ID = {"loginUsername"} />
              <Input type={"password"} label={"Password"} ID = {"loginPassword"} />
            </div>
            <Button text={"Login"} onClickFunc={SubmitLogin}/>
        </div>
      </div>
      <Watermark />
    </div>
  );
}

export default Login;
