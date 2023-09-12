import './styles/general.css'
import './styles/changeUsername.css'
import Global from '../../publicFunctions/globalVar';
import TopBar from '../components/topBar';
import Input from '../components/input';
import Button from '../components/button';
import { useState } from 'react';
import axios from '../../publicFunctions/axiosAuth';
import { useNavigate } from 'react-router-dom';
function ChangeUsername() {
    const lang = localStorage.getItem('lang') 
    const [errorMessage,setErrorMessage] = useState(null)
    const [correctMessage,setCurrectMessage] = useState(null)
    const navigate = useNavigate()
    const pageText = {
        changeUsername: lang === 'en' ? "Change Username":"تغيير أسم المستخدم",
        passwordShort:  lang === 'en' ? "Password you Entered is Short":"كلمة السر التي ادخلتها قصيره"
    }
    function submitChange(event){
        const currentUsername = event.currentTarget.parentElement.parentElement.querySelector("#currentUsername").value
        const newUsername = event.currentTarget.parentElement.parentElement.querySelector("#newUsername").value
        const userPassword = event.currentTarget.parentElement.parentElement.querySelector("#userPassword").value
        if (currentUsername.length < 3 || newUsername.length < 3){
            setErrorMessage("Please Fill All the Input Fields")
        }else if (userPassword.length < 5){
            setErrorMessage(pageText['passwordShort'])

        }else{
            
            axios.post(Global.BackendURL+"/editusername",{username:currentUsername,newUsername:newUsername,password:userPassword})
            .then((res)=>{
                const data = res.data
                console.log(data)
                localStorage.setItem("username",newUsername)
                localStorage.setItem("jwt",data)
                setErrorMessage(null)
                setCurrectMessage("Username Changed Successfully")

                navigate('/'+localStorage.getItem("role")+"/settings")
            }).catch((err)=>{
                
                setErrorMessage(err.response.data)
                console.log("Error!!\n",err)
            })
        }
        console.log("currentUsername: "+currentUsername+" newUsername: "+newUsername+" userPassword: "+userPassword)
    }
    return (
        <div id ={"ChangeUsername"} className="changePages column fullWidth">
            <TopBar title={pageText["changeUsername"]}/>
            <div className='pageContent'>
                <div className='form'>
                    <p className='red'>{errorMessage}</p>
                    <p className='green'>{correctMessage}</p>
                    <Input type={'text'} ID={'currentUsername'} label={"Current Username"}/>
                    <Input type={'text'} ID={'newUsername'} label={"New Username"}/>
                    <Input type={'password'} ID={'userPassword'} label={"Your Password"} showPassword={true}/>
                    <br/>
                    <Button text={"Submit"} onClickFunc={submitChange}/>
                </div>

            </div>
        </div>
    );
}

export default ChangeUsername;
