import './styles/login.css'
import './styles/inputs.css'
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
    <div id = "loginContainer" className="login">\
        <div id='loginPageOpacity'></div>

        <div id='loginFormContainer'>
            <div id='formOpacity'></div>
            {/* <div id='formWithWave'> */}

              <svg viewBox="0 0 200 500" id='formWavyEffect'>
                  <path d="M -2,0 50,0 C 100,150 -100,359 100,500 L 00,500 L 0,1" fill='white' stroke="white"></path>
              </svg>
              <div id='mainLoginForm'>
                <div>
                    <h1>Welcome To Ejust School</h1>
                    <p className='rightMessage'>{logingmessege}</p>
                <p className='WrongMessage'>{messege}</p>           
                     </div>
                <div>

                  <div class="col-3 input-effect">
                      <input class="effect-22" type="text" id = "loginUsername" name ="email" placeholder=" "/>
                      <label>username</label>
                      <span class="focus-bg"></span>
                  </div>
                  <div class="col-3 input-effect">
                      <input class="effect-22" type="password" id = "loginPassword" name ="password" placeholder=" "/>
                      <label>Password</label>
                      <span class="focus-bg"></span>
                  </div>
                </div>

                <Button text={"Login"} onClickFunc={SubmitLogin}/>
              </div>
            {/* </div> */}
        </div>
    </div>
  );
}

export default Login;
