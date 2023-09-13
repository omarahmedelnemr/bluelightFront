
import { useEffect, useState } from 'react';
import  './styles/welcome.css'
import Global from '../../publicFunctions/globalVar';
import Button from '../components/button';
import Input from '../components/input';
import './styles/timetable.css'
import axios from '../../publicFunctions/axiosAuth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Watermark from '../components/watermark';

function WelcomePage() {
  const lang = localStorage.getItem('lang')
  const pageText = {
    welcome:            lang === 'en' ? "Welcome to Bluelight Systems ":"اهلا بك في انظمه بلولايت ",
    message:            lang === 'en' ? "As this is the First Time, It is Recommended that You Change the Defult Password To Keep You Data Privicy Safe":"انها اول مره تسجل فيها الدخول, لذا يفضل ان تغير كلمه السر للحفاظ علي خصوصيه بياناتك",
    changePassword:     lang === 'en' ? "Change Password":"تغيير كلمة السر",
    passwordShort:      lang === 'en' ? "Password you Entered is Short":"كلمة السر التي ادخلتها قصيره",
    passwordDidntMatch: lang === 'en' ? "Passwords Doesn't Match":"كلمتان السر ليسو متطابقين",
    yourNewPass:        lang === 'en' ? "Your New Password":"كلمة السر الجديدة",
    confirmNew:         lang === 'en' ? "Confirm New Password":"تاكيد كلمة السر",
    submit:             lang === 'en' ? "Submit":"تغيير"
}
  const [errorMessage,setErrorMessage] = useState(null)
  const [correctMessage,setCurrectMessage] = useState(null)
  const navigate = useNavigate()

  function submitChange(event){
    const username = localStorage.getItem("username")
    const password = Global.defaultPassword
    const newPassword = event.currentTarget.parentElement.parentElement.querySelector("#userNewPassword").value
    const confirmedPassword = event.currentTarget.parentElement.parentElement.querySelector("#confirmNewPassword").value
    if ( newPassword.length < 5){
        setErrorMessage(pageText['passwordShort'])

    }else if (newPassword !== confirmedPassword){
        setErrorMessage(pageText['passwordDidntMatch'])

    }else{
        axios.post(Global.BackendURL+"/editpassword",{username:username,password:password,newPassword:newPassword})
        .then((res)=>{
            const data = res.data
            console.log(data)
            setErrorMessage(null)
            setCurrectMessage("Changed Successfully, Welcome..")
            navigate('/'+localStorage.getItem("role")+"/")
        }).catch((err)=>{
            
            setErrorMessage(err.response.data)
            console.log("Error!!\n",err)
        })
    }
}

useEffect(()=>{
    document.getElementById("userNewPassword").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").click()
      }
    });
    document.getElementById("confirmNewPassword").addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
          event.currentTarget.parentElement.querySelector("button").click()
      }
    });
  },[1000])
    function changeLang(event){
        const element = event.currentTarget.innerHTML
        if (element === 'English'){
            if(localStorage.getItem("lang") !== 'en'){
                localStorage.setItem("lang","en")
                window.location.reload(false);
            }
        }else{
            if(localStorage.getItem("lang") !== 'ar'){
                localStorage.setItem("lang","ar")
                window.location.reload(false);
            }
        }
    }
    return (
        <div id="WelcomePage" className='column'>
            <div className='welcomeContent column'>
                <h1>{pageText['welcome']}<FontAwesomeIcon icon="fa-solid fa-face-smile-beam" /></h1>
                <p>{pageText['message']}</p>
                <div className='form'>
                    <p className='red'>{errorMessage}</p>
                    <p className='green'>{correctMessage}</p>
                    <Input type={'password'} ID={'userNewPassword'} label={pageText['yourNewPass']} showPassword={true}/>
                    <Input type={'password'} ID={'confirmNewPassword'} label={pageText['confirmNew']} showPassword={true}/>
                    <br/>
                    <Button text={pageText['submit']} onClickFunc={submitChange}/>
                </div>
            </div>
            <div className='ChangeLangButtons'>
                <button className={lang === 'en'?'activeLang':""} onClick={changeLang}>English</button>
                <button className={lang === 'ar'?'activeLang':""} onClick={changeLang}>عربي</button>
            </div>
            <Watermark/>
        </div>
    );
}

export default WelcomePage;
