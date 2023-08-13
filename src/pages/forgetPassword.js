import './styles/forget.css'
import Button from '../components/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Cookies from 'universal-cookie';
import Watermark from '../components/watermark';
import Global from '../general/globalVar'
import checkAutherization from '../general/checkAuth';


function ForgetPassword() {
  if (checkAutherization() === 'Auth'){
    const reader = new Cookies()
    window.location.href ='/'+reader.get('role')
  }
  function SubmitForgetPassword(){
    const username = document.getElementById("forgetPasswordUsername").value
    const nationalID = document.getElementById("nationalID").value
    if (username.length < 3){
      setMessege("Please Fill the Username and NationID Fields")
    }
    else if(nationalID.length !== 14){
      setMessege("national ID must Be 14 numbers")
    }
    else{
      console.log("Request Sent")
      axios.post(Global.BackendURL+"/forgetPassword",{username:username,nationalID:nationalID},{ withCredentials: true})
      .then((res)=>{
        const data = res.data
        localStorage.setItem("username",username)
        localStorage.setItem("nationalID",nationalID)
        setMessege(null)
        setForgetPasswordgmessege("Redirecting")

        navigate('/resetpassword')
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
  const [forgetPasswordgmessege,setForgetPasswordgmessege] = useState([""])
  const navigate = useNavigate();

  useEffect(()=>{
    document.getElementById("forgetPasswordUsername").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
    document.getElementById("nationalID").addEventListener('keypress', function(event) {
        if (event.key == 'Enter') {
            event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
        }
      });
  },[1000])

  return (
    <div id = "forgetContainer" className="forgetPassword">
      <div id='forgetPasswordPageOpacity'></div>
      <div id='forgetPasswordFormContainer'>
          <div id='formOpacity'></div>
          <div id='mainForgetPasswordForm'>
            <div>
                <h1>Welcome To Nile Schools</h1>
                <p className='rightMessage'>{forgetPasswordgmessege}</p>
                <p className='WrongMessage'>{messege}</p>           
            </div>
            <div>
              <Input type={"text"} label={"username"} ID = {"forgetPasswordUsername"} />
              <Input type={"number"} label={"nationalID"} ID = {"nationalID"} />
              <a href='./login'>Login</a>
            </div>
            <Button text={"Reset Password"} onClickFunc={SubmitForgetPassword}/>
        </div>
      </div>
      <Watermark />
    </div>
  );
}

export default ForgetPassword;
