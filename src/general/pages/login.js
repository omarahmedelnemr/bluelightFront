import './styles/login.css'
import Button from '../components/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Watermark from '../components/watermark';
import Global from '../../publicFunctions/globalVar'


function Login() {
  // Check Auth Already
  // axios.get(Global.BackendURL+"/checkauth").then((res)=>{
  //   console.log("Authorized")
  //   window.location.href = `/${localStorage.getItem("role")}/`
  // }).catch((err)=>{
  //   console.log("un Authorized Error!\n",err)
  // })
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
        
        //Set Local Storage Variables
        // if (localStorage.getItem("name") ===null){
          const dataList = Object.keys(res.data)
          for(var i = 0;i<dataList.length;i++){
            localStorage.setItem(dataList[i],res.data[dataList[i]])
          }

        // }
        localStorage.setItem('username',username)
        if(localStorage.getItem("lang") ===undefined || localStorage.getItem("lang") ===null){
          localStorage.setItem("lang","en")
        }

        setMessege('')
        setLogingmessege("Logging")
        // // Disable For Devoloping
        // if (password === Global.defaultPassword){
        //   navigate("/welcome/")
        // }else{
          navigate('/'+res.data['role']+"/")
        // }
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
      if (event.key === 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
    document.getElementById("loginPassword").addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
  },[])

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
                <h1>Welcome To Bluelight Schools</h1>
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
