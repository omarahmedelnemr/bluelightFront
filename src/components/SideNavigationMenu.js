import "./styles/SideNavigation.css"
import logoImage from '../content/logo.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SideNavigation() {
    const lang = localStorage.getItem('lang') 
    const compText = {
        welcome:{
            "en":"welcome Back",
            "ar":"اهلا"
        },
        home:{
            "en":"Home",
            "ar":"الرئيسية"
        },
        courses:{
            "en":"Courses",
            "ar":"المقررات"
        },
        messages:{
            "en":"Masseges",
            "ar":"الرسائل"
        },
        bus:{
            "en":"Bus",
            "ar":"الباص"
        },
        account:{
            "en":"Account",
            "ar":"حسابي"
        }
        
    }
    useEffect(()=>{
        const endpoints = window.location.pathname.split("/")
        const path = endpoints[endpoints.length-1]
        try{
        document.getElementsByClassName("active")[0].classList.remove("active")
        if (path ==='' || path ==='student' || path ==='parent' || path ==="teacher" || path==="admin"){
               document.getElementById("homeNavButton").classList.add("active")
              document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById("homeNavButton").getBoundingClientRect().y+"px")

        }else{
            document.getElementById(path+"NavButton").classList.add("active")
            document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById(path+"NavButton").getBoundingClientRect().y+"px")

        }}catch(err){
            console.log("loading")
        }
    },[1000])
    function navButtonClick(event) {
        document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",event.currentTarget.getBoundingClientRect().y+"px")
        
        var navButtons = document.getElementsByClassName("navButton");
        
        // Remove the "active" class from the currently active button
        for (var i = 0; i < navButtons.length; i++) {
          if (navButtons[i].classList.contains("active")) {
            navButtons[i].classList.remove("active");
            break;
          }
        }
        // Add the "active" class to the clicked button
        event.currentTarget.classList.add("active");
        navigate("."+event.currentTarget.getElementsByClassName('route')[0].innerHTML)
        

    }
    function changeLang(event){
        console.log(event.currentTarget.id)
        if(event.currentTarget.id !== localStorage.getItem("lang")){
            localStorage.removeItem('lang')
            localStorage.setItem('lang',event.currentTarget.id)
            document.getElementById("ar").classList.remove("activeLang")
            document.getElementById("en").classList.remove("activeLang")
            document.getElementById(event.currentTarget.id).classList.add('activeLang')
            window.location.reload(false);
        }

    }
    const firstName = localStorage.getItem("name").split(" ")[0]
    const navigate = useNavigate();
    useEffect(()=>{
        document.getElementById(localStorage.getItem('lang')).classList.add('activeLang')
    })
    return (
        <div className="sideNav">
            <div className="top">
                <div className="welcome">
                    <img className="logoimage" src={logoImage}/>
                    <p>{compText["welcome"][lang]} {firstName}</p>
                </div>
            </div>
            <div className="backgroundActive"></div>
            <div className="center">
                    <div id="homeNavButton" className="navButton active" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        <p>{compText["home"][lang]}</p>
                        <span className="route">/</span>
                    </div>
                    <div id="coursesNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-book" />
                        <p>{compText["courses"][lang]}</p>
                        <span className="route">/courses</span>

                    </div>
                    <div id="messegesNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-message" />
                        <p>{compText["messages"][lang]}</p>
                        <span className="route">/messeges</span>

                    </div>
                    <div id="busNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-bus" />
                        <p>{compText["bus"][lang]}</p>
                        <span className="route">/bus</span>

                    </div>
                    <div id="accountNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        <p>{compText["account"][lang]}</p>
                        <span className="route">/account</span>
                        
                    </div>
                    
            </div>
            <div className="bottom">
                <div className="row chooseLang">
                    <p id="ar" onClick={changeLang}>ar</p>
                    <p id="en" onClick={changeLang}>en</p>
                </div>
            </div>
        </div>
    );
}

export default SideNavigation;
