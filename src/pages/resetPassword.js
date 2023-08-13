import './styles/reset.css'
import Button from '../components/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';
import Cookies from 'universal-cookie';
import Watermark from '../components/watermark';
import Global from '../general/globalVar'
import checkAutherization from '../general/checkAuth';


function ResetPassword() {
  if (checkAutherization() === 'Auth'){
    const reader = new Cookies()
    window.location.href ='/'+reader.get('role')
  }
  function SubmitResetPassword(){
    const newPassword = document.getElementById("newPassword").value
    const newPassword2 = document.getElementById("newPassword2").value
    const username = localStorage.getItem('username')
    const nationalID = localStorage.getItem('nationalID')
    if (newPassword.length < 5){
      setMessege("Password is Short, must Be More Than 5 Characters")
    }
    else if(newPassword !== newPassword2){
      setMessege("Passwords Doesn't Match")
    }
    else if(username === null || nationalID === null){
        setMessege(<span>Error Happend, Please Go Back to <a href='/forgetPassword'>ForgetPassword Page</a></span>)
    }
    else{

      console.log("Request Sent")
      axios.post(Global.BackendURL+"/resetPassword",{username:username,nationalID:nationalID,newPassword:newPassword},{ withCredentials: true})
      .then((res)=>{
        const data = res.data
        setMessege(null)
        setResetPasswordgmessege("Changed")
        localStorage.removeItem("username")
        localStorage.removeItem("nationalID")

        navigate('/login')
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
  const [resetPasswordgmessege,setResetPasswordgmessege] = useState([""])
  const navigate = useNavigate();

  useEffect(()=>{
    document.getElementById("newPassword").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
    document.getElementById("newPassword2").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
  },[1000])

  return (
    <div id = "resetContainer" className="resetPassword">
      <div id='resetPasswordPageOpacity'></div>
      <div id='resetPasswordFormContainer'>
          <div id='formOpacity'></div>
          <div id='mainResetPasswordForm'>
            <div>
                <h1>Welcome To Nile Schools</h1>
                <p className='rightMessage'>{resetPasswordgmessege}</p>
                <p className='WrongMessage'>{messege}</p>           
            </div>
            <div>
              <Input type={"password"} label={"Password"} ID = {'newPassword'} showPassword={true}/>
              <Input type={"password"} label={"Rewrite Password"} ID = {'newPassword2'} showPassword={true}/>
              <a href='./login'>Login</a>
            </div>
            <Button text={"Reset Password"} onClickFunc={SubmitResetPassword}/>
        </div>
      </div>
      <Watermark />
    </div>
  );
}

export default ResetPassword;
