import "./styles/SideNavigation.css"
import logoImage from '../content/logo.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SideNavigation() {
    useEffect(()=>{
        const path = window.location.pathname.split("/")[1]
        console.log(":",path,": "," = ",path == "")
        try{
        document.getElementsByClassName("active")[0].classList.remove("active")
        if (path ==''){
               document.getElementById("homeNavButton").classList.add("active")
              document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById("homeNavButton").getBoundingClientRect().y+"px")

        }else{
            document.getElementById(path+"NavButton").classList.add("active")
            document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById(path+"NavButton").getBoundingClientRect().y+"px")

        }}catch(err){
            console.log("loading")
        }
    },1000)
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
        navigate(event.currentTarget.getElementsByClassName('route')[0].innerHTML)
        

    }
    const firstName = localStorage.getItem("name").split(" ")[0]
    const navigate = useNavigate();
      
    return (
        <div className="sideNav">
            <div className="top">
                <div className="welcome">
                    <img className="logoimage" src={logoImage}/>
                    <p>Welcome Back {firstName}</p>
                </div>
            </div>
            <div className="backgroundActive"></div>
            <div className="center">
                    <div id="homeNavButton" className="navButton active" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        <p>Home</p>
                        <span className="route">/</span>
                    </div>
                    <div id="coursesNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-book" />
                        <p>Courses</p>
                        <span className="route">/courses</span>

                    </div>
                    <div id="messegesNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-message" />
                        <p>Masseges</p>
                        <span className="route">/messeges</span>

                    </div>
                    <div id="busNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-bus" />
                        <p>Bus</p>
                        <span className="route">/bus</span>

                    </div>
                    <div id="accountNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        <p>Account</p>
                        <span className="route">/account</span>
                        
                    </div>
                    
            </div>
            <div className="bottom">
                <div>
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    );
}

export default SideNavigation;
