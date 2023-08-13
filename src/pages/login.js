import './styles/login.css'
import Button from '../components/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Cookies from 'universal-cookie';
import Watermark from '../components/watermark';
import Global from '../general/globalVar'
import checkAutherization from '../general/checkAuth';


function Login() {
  if (checkAutherization() === 'Auth'){
    const reader = new Cookies()
    window.location.href ='/'+reader.get('role')
  }
  function handleKeyPress(event) {
    // Check if the key pressed is the Enter key (keyCode 13)
    if (event.keyCode === 13) {
        // Find the sibling button and programmatically click it
        const button = event.currentTarget.parentElement.nextElementSibling;
        if (button.tagName === 'BUTTON') {
            button.click();
        }
    }
}
  function SubmitLogin(){
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    if (username.length < 3){
      setMessege("Please Fill the Username and Password Fields")
    }
    else if(password.length < 5){
      setMessege("Password is Short, must Be More Than 5 Characters")
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
        if (localStorage.getItem("name") ===null){
          const dataList = Object.keys(res.data)
          for(var i = 0;i<dataList.length;i++){
            localStorage.setItem(dataList[i],res.data[dataList[i]])
          }

        }

        if(localStorage.getItem("lang") ===undefined || localStorage.getItem("lang") ===null){
          localStorage.setItem("lang","en")
        }

        setMessege('')
        setLogingmessege("Logging")
        navigate('/'+res.data['role'])
      }).catch((err)=>{
        try{
          setMessege(err.response.data)
        }catch{
          setMessege("Error, You May Check Your Network!")
          console.log(err)
        }
      })
    }

  }
  const [messege,setMessege] = useState([""])
  const [logingmessege,setLogingmessege] = useState([""])
  const navigate = useNavigate();

  useEffect(()=>{
    document.getElementById("loginUsername").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
    document.getElementById("loginPassword").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
  },[1000])

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
              <Input type={"password"} label={"Password"} ID = {"loginPassword"} showPassword={true} />
              <a href="./forgetPassword" className='forgetLink'>Forget Password</a>
            </div>
            <Button text={"Login"} onClickFunc={SubmitLogin}/>
        </div>
      </div>
      <Watermark />
    </div>
  );
}

export default Login;
