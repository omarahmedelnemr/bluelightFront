import './styles/login2.css'
import './styles/inputs.css'
import image from '../content/download.png'
import Button from '../components/button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  
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
      axios.post("http://api.bluelightlms.com/login",{username:username,password:password},{ withCredentials: true})
      .then((res)=>{
        setMessege('')
        setLogingmessege("Logging")
        navigate('/')
      }).catch((err)=>{
        try{
          setMessege(err.response.data)
        }catch{
          setMessege("Error!")
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
        <div id='mainLoginForm'>
            <div>
              <img src={image}/>
                <h2>Welcome To Ejust School</h2>
                <p className='rightMessage'>{logingmessege}</p>
                <p className='WrongMessage'>{process.env.TEST}</p>
            </div>
            <div>

              <div className="col-3 input-effect">
                  <input className="effect-22" type="text" id = "loginUsername" name ="username" placeholder=" "/>
                  <label>username</label>
                  <span className="focus-bg"></span>
              </div>
              <div className="col-3 input-effect">
                  <input className="effect-22" type="password" id = "loginPassword" name ="password" placeholder=" "/>
                  <label>Password</label>
                  <span className="focus-bg"></span>
              </div>
            </div>

            <Button text={"submit1"} onClickFunc={SubmitLogin}/>
          </div>
    </div>
  );
}

export default Login;
