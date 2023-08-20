import './styles/general.css'
import './styles/changeUsername.css'
import checkAutherization from '../../publicFunctions/checkAuth';
import Global from '../../publicFunctions/globalVar';
import TopBar from '../components/topBar';
import Input from '../components/input';
import Button from '../components/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const [errorMessage,setErrorMessage] = useState(null)
    const [correctMessage,setCurrectMessage] = useState(null)
    const navigate = useNavigate()
    const pageText = {
        changePassword:     lang === 'en' ? "Change Password":"تغيير كلمة السر",
        passwordShort:      lang === 'en' ? "Password you Entered is Short":"كلمة السر التي ادخلتها قصيره",
        passwordDidntMatch: lang === 'en' ? "Passwords Doesn't Match":"كلمتان السر ليسو متطابقين"
    }
    function submitChange(event){
        const username = event.currentTarget.parentElement.parentElement.querySelector("#yourUsername").value
        const password = event.currentTarget.parentElement.parentElement.querySelector("#userCurrentPassword").value
        const newPassword = event.currentTarget.parentElement.parentElement.querySelector("#userNewPassword").value
        const confirmedPassword = event.currentTarget.parentElement.parentElement.querySelector("#confirmNewPassword").value
        
        if (username.length < 3){
            setErrorMessage("Please Fill All the Input Fields")
        }else if (password.length < 5 || newPassword.length < 5){
            setErrorMessage(pageText['passwordShort'])

        }else if (newPassword !== confirmedPassword){
            setErrorMessage(pageText['passwordDidntMatch'])

        }else{
            axios.post(Global.BackendURL+"/editpassword",{username:username,password:password,newPassword:newPassword})
            .then((res)=>{
                const data = res.data
                console.log(data)
                setErrorMessage(null)
                setCurrectMessage("Username Changed Successfully")
                navigate('/'+localStorage.getItem("role")+"/settings")
            }).catch((err)=>{
                
                setErrorMessage(err.response.data)
                console.log("Error!!\n",err)
            })
        }
        console.log("currentUsername: "+username+" current Password: "+password+" NewPassword: "+newPassword)
    }
    return (
        <div id ={"ChangePassword"} className="changePages column fullWidth">
            <TopBar title={pageText["changePassword"]}/>
            <div className='pageContent'>
                <div className='form'>
                    <p className='red'>{errorMessage}</p>
                    <p className='green'>{correctMessage}</p>
                    <Input type={'text'} ID={'yourUsername'} label={"Current Username"}/>
                    <Input type={'password'} ID={'userCurrentPassword'} label={"Your Password"} showPassword={true}/>
                    <Input type={'password'} ID={'userNewPassword'} label={"Your New Password"} showPassword={true}/>
                    <Input type={'password'} ID={'confirmNewPassword'} label={"Confirm New Password"} showPassword={true}/>
                    <br/>
                    <Button text={"Submit"} onClickFunc={submitChange}/>
                </div>

            </div>
        </div>
    );
}

export default ChangePassword;
