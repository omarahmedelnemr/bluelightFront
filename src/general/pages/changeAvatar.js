import './styles/account.css'
import './styles/general.css'
import './styles/avatars.css'
import Global from '../../publicFunctions/globalVar';
import TopBar from '../components/topBar';
import { useEffect, useState } from 'react';
import axios from '../../publicFunctions/axiosAuth';
function ChangeAvatar() {
    const lang = localStorage.getItem('lang') 
    const profileImage = Global.BackendURL+"/avatar/"+localStorage.getItem("img_dir") 
    const [mainImg,setMainImg] = useState(profileImage)
    const [disabled,setDisabled] = useState("disabled")
    const [allAvatarsElements,setAllAvatarsElement] = useState(null)
    const gender = localStorage.getItem("gender")
    const pageText = {
        title:         lang === "en" ? "Change Avatar" : "تغيير الصورة",
        save:          lang === 'en' ? "Save":"حفظ",
    }

    function chooseAvatar(event){
        const img = event.currentTarget.querySelector("img").src
        setMainImg(img)

    }

    useEffect(()=>{
        axios.get(Global.BackendURL+"/allavatars?gender="+gender).then((res)=>{
            const data = res.data
            console.log(data)
            const preElement = []
            for(var i=0;i<data.length;i++){
                preElement.push(
                    <div className='avatarPreview' onClick={chooseAvatar}>
                        <img src={Global.BackendURL+"/avatar/"+data[i]['avatar']}/>   
                    </div>
                )
            }
            setAllAvatarsElement(preElement)
        }).catch((err)=>{
            console.log("Error!!\n",err)
        })
    },[1000])
    useEffect(()=>{
        if (mainImg !== profileImage){
            setDisabled("")
        }else{
            setDisabled("disabled")
        }
    },[mainImg])
    function SaveImg(event){
        console.log(mainImg)
        const imageName = mainImg.split("/")[mainImg.split("/").length-1]

        const req = {
            userID:localStorage.getItem("id"),
            role:localStorage.getItem("role"),
            avatar:imageName
        }
        axios.post(Global.BackendURL+"/changeAvatar",req).then((res)=>{
            localStorage.setItem("img_dir",imageName)
            window.location.reload(false);

        }).catch((err)=>{
            console.log("Error!\n",err)
        })
    }
    return (
        <div className="changeAvatar column fullWidth">
            <TopBar title={pageText["title"]}/>
            <div className='content column'>
                <div className='SaveAvatarButton'>
                    <button className={disabled} onClick={SaveImg}>{pageText['save']}</button>
                </div>
                <div className='ProfileImage'>
                    <div className='imgContainer'>
                        <img src={mainImg}/>   
                    </div>
                </div>
                <div className='row allAvatars'>
                    {allAvatarsElements}
                </div>
            </div>
        
        </div>
    );
}

export default ChangeAvatar;
