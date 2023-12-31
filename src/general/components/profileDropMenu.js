import "./styles/profileDropMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import Global from "../../publicFunctions/globalVar";

function ProfileDropMenu() {
    
    function routeTologout(){
        navigate('/logout')
    }
    function DropTheProfileMenue(event){
        if (event.currentTarget.getElementsByTagName('svg')[0].classList.contains("lookUp")){
            event.currentTarget.getElementsByTagName('svg')[0].classList.add("lookDown")
            event.currentTarget.getElementsByTagName('svg')[0].classList.remove("lookUp")
        }else{
            event.currentTarget.getElementsByTagName('svg')[0].classList.add("lookUp")
            event.currentTarget.getElementsByTagName('svg')[0].classList.remove("lookDown")
        } 
        const dropList = event.currentTarget.getElementsByClassName("dropList")[0]
        if (dropList.style.height === '0px' || dropList.style.height === '') {
            dropList.style.height = '38px'; // Set the desired height when expanding
            dropList.style.padding = '10px 0px'; // Set the desired height when expanding
          } else {
            dropList.style.height = '0px'; // Set the height to zero when collapsing
            dropList.style.padding = '0px'; // Set the desired height when expanding
          }
    }
    const navigate = useNavigate()
    const lang = localStorage.getItem('lang')
    const compText ={
        name:   lang === 'en' ? localStorage.getItem("name") :localStorage.getItem("arName"),
        logout: lang === 'en' ? "Logout":"تسجيل الخروج"

    }
    var mainText = compText['name'].split(' ')
    //get the First Two Names
    mainText = mainText[0]+" "+mainText[1]
    const image = localStorage.getItem("img_dir")
    var subText;
    if(localStorage.getItem('role') === 'student'){
        subText = localStorage.getItem("classroom")
    }else{
        subText = localStorage.getItem("role")

    }
    return (
        <div className="profileDropDown" onClick={DropTheProfileMenue}>
            <div className="header ">
                <img src={Global.BackendURL+"/avatar/"+image} alt={"Profile Image"}/>
                <div>
                    <p className="mainText">{mainText}</p>
                    <p className="subText">{subText}</p>  
                </div>
                <FontAwesomeIcon className ="lookDown" icon="fa-solid fa-chevron-down"/>
            </div>
            <div className="dropList">
                <div onClick={routeTologout}>
                    <p>{compText['logout']}</p>
                </div>
            </div>
            
        </div>
    );
}

export default ProfileDropMenu;
