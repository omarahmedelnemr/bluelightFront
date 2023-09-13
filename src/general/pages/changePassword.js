import './styles/general.css'
import './styles/changeUsername.css'
import Global from '../../publicFunctions/globalVar';
import TopBar from '../components/topBar';
import Input from '../components/input';
import Button from '../components/button';
import { useState } from 'react';
import axios from '../../publicFunctions/axiosAuth';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {
    const lang = localStorage.getItem('lang') 
    const [errorMessage,setErrorMessage] = useState(null)
    const [correctMessage,setCurrectMessage] = useState(null)
    const navigate = useNavigate()
    const pageText = {
        changePassword:     lang === 'en' ? "Change Password":"تغيير كلمة السر",
        passwordShort:      lang === 'en' ? "Password you Entered is Short":"كلمة السر التي ادخلتها قصيره",
        passwordDidntMatch: lang === 'en' ? "Passwords Doesn't Match":"كلمتان السر ليسو متطابقين",
        defaultPassword:    lang === 'en' ? "You Can't Change to The Default Password Again":"لا يمكنك التغيير لكلمة السر الأولي مره اخري",
        yourNewPass:        lang === 'en' ? "Your New Password":"كلمة السر الجديدة",
        confirmNew:         lang === 'en' ? "Confirm New Password":"تاكيد كلمة السر",
        YourPass:           lang === 'en' ? "Your Current Password":"كلمة السر الحالية",
        username:           lang === 'en' ? "Your Username":"اسم المستخدم"
    }
    function submitChange(event){
        const username = event.currentTarget.parentElement.parentElement.querySelector("#yourUsername").value
        const password = event.currentTarget.parentElement.parentElement.querySelector("#userCurrentPassword").value
        const newPassword = event.currentTarget.parentElement.parentElement.querySelector("#userNewPassword").value
        const confirmedPassword = event.currentTarget.parentElement.parentElement.querySelector("#confirmNewPassword").value
        console.log("currentUsername: "+username+" current Password: "+password+" NewPassword: "+newPassword+" Defult: "+Global.defaultPassword)
        if (username.length < 3){
            setErrorMessage("Please Fill All the Input Fields")
        }else if (password.length < 5 || newPassword.length < 5){
            setErrorMessage(pageText['passwordShort'])

        }else if (newPassword !== confirmedPassword){
            setErrorMessage(pageText['passwordDidntMatch'])

        // }else if (newPassword === Global.defaultPassword){
        //     setErrorMessage(pageText['defaultPassword'])
        }else{
            axios.post(Global.BackendURL+"/editpassword",{username:username,password:password,newPassword:newPassword})
            .then((res)=>{
                const data = res.data
                console.log(data)
                setErrorMessage(null)
                setCurrectMessage("Password Changed Successfully")
                navigate('/'+localStorage.getItem("role")+"/settings")
            }).catch((err)=>{
                
                setErrorMessage(err.response.data)
                console.log("Error!!\n",err)
            })
        }
    }
    return (
        <div id ={"ChangePassword"} className="changePages column fullWidth">
            <TopBar title={pageText["changePassword"]}/>
            <div className='pageContent'>
                <div className='form'>
                    <p className='red'>{errorMessage}</p>
                    <p className='green'>{correctMessage}</p>
                    <Input type={'text'} ID={'yourUsername'} label={pageText['username']}/>
                    <Input type={'password'} ID={'userCurrentPassword'} label={pageText['YourPass']} showPassword={true}/>
                    <Input type={'password'} ID={'userNewPassword'} label={pageText['yourNewPass']} showPassword={true}/>
                    <Input type={'password'} ID={'confirmNewPassword'} label={pageText['confirmNew']} showPassword={true}/>
                    <br/>
                    <Button text={"Submit"} onClickFunc={submitChange}/>
                </div>

            </div>
        </div>
    );
}

export default ChangePassword;
