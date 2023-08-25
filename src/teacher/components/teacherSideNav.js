import './styles/TeacherSideNavigation.css'
import logoImage from '../../content/logo.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function TeacherSideNavigation() {
    const navList = ['Home',"classrooms","classwork","exams","account"] //,"bus","Submission"
    const lang = localStorage.getItem('lang') 
    const compText = {
        welcome:     lang === 'en' ? "welcome Back":"اهلا",
        home:        lang === 'en' ? "Home":"الرئيسية",
        courses:     lang === 'en' ? "Courses":"المقررات",
        assingments: lang === 'en' ? "Assignments" : "الواجبات" ,
        exams:       lang === 'en' ? "Exams" :"الاختبارات",
        Events:      lang === 'en' ? "Events":"المناسبات",
        messages:    lang === 'en' ? "Messages":"الرسائل",
        bus:         lang === 'en' ? "Bus":"الباص",
        account:     lang === 'en' ? "Account":"حسابي",
        classrooms:  lang === 'en' ? "Classrooms":"الفصول",
        classwork:   lang === 'en' ? "Classwork":"الاعمال",
        Submission:  lang === 'en' ? "Submissions":"التسليمات"
         
    }
    useEffect(()=>{
        const endpoints = window.location.pathname.split("/")
        const path = endpoints[endpoints.length-1].toLowerCase()
        try{
            try{
                document.getElementsByClassName("active")[0].classList.remove("active")
            }catch{
                console.log("No Active Found")
            }
            document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","block")

            if (path ==='' || path ==='student' || path ==='parent' || path ==="teacher" || path==="admin"){
                document.getElementById("homeNavButton").classList.add("active")
                document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById("homeNavButton").getBoundingClientRect().y+"px")

            }else if(navList.includes(path)){
            
                document.getElementById(path+"NavButton").classList.add("active")
                document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",document.getElementById(path+"NavButton").getBoundingClientRect().y+"px")

            }else{
                document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","none")
            }
        }catch(err){
            console.log("loading")
            console.log(err)
        }
    },[])
    function navButtonClick(event) {
        document.getElementsByClassName("backgroundActive")[0].style.setProperty("top",event.currentTarget.getBoundingClientRect().y+"px")
        document.getElementsByClassName("backgroundActive")[0].style.setProperty("display","block")
        
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
    const firstArName = localStorage.getItem("arName").split(" ")[0]
    const navigate = useNavigate();
    useEffect(()=>{
        document.getElementById(localStorage.getItem('lang')).classList.add('activeLang')
    })
    return (
        <div className="sideNav">
            <div className="top">
                <div className="welcome">
                    <img className="logoimage" src={logoImage}/>
                    <p>{compText["welcome"]} {lang === 'en' ? firstName: firstArName}</p>
                </div>
            </div>
            <div className="backgroundActive"></div>
            <div className='backgroundBlock'></div>

            <div className="center">
                    <div id="homeNavButton" className="navButton active" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        <p>{compText["home"]}</p>
                        <span className="route">/</span>
                    </div>
                    <div id="classworkNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-book-open" />
                        <p>{compText["classwork"]}</p>
                        <span className="route">/classwork</span>

                    </div>
                    <div id="classroomsNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-book" />
                        <p>{compText["classrooms"]}</p>
                        <span className="route">/classrooms</span>

                    </div>
                    <div id="messagesNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-message" />
                        {/* <FontAwesomeIcon icon="fa-solid fa-users" /> */}
                        <p>{compText["messages"]}</p>
                        <span className="route">/messages</span>

                    </div>
                    <div id="accountNavButton" className="navButton" onClick={navButtonClick}>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        <p>{compText["account"]}</p>
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

export default TeacherSideNavigation;
