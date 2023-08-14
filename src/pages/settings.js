import './styles/account.css'
import './styles/general.css'
import './styles/settings.css'
import checkAutherization from '../general/checkAuth';
import Global from '../general/globalVar';
import TopBar from '../components/topBar';
import Button from '../components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Setting() {
    if (checkAutherization() !== 'Auth'){
        window.location.href ='/login'
    }
    const lang = localStorage.getItem('lang') 
    const profileImage = Global.BackendURL+"/profilePic/"+localStorage.getItem("img_dir") 
    const pageText = {
        changeMessage: lang === 'en' ? "If any other Data Needs To Be Changed, Please Contact Us":"لو احتجت لتغيير اي بيانات, بالرجاء التواصل معنا ",
        setting:       lang === "en" ? "Settings" : "الاعدادات",
        password:      lang === 'en' ? "Password":"كلمة السر",
        username:      lang === 'en' ? "Username":"اسم المستخدم",
        lang:          lang === 'en' ? "Website Language":"لغة الموقع"
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
    return (
        <div className="Account column fullWidth">
            <TopBar title={pageText["setting"]}/>
            <div className='content column'>


                <div className='personalInfo column'>
                    <div className='row'>
                        <p>{pageText['username']}</p>
                        <div className='row contentChange'>
                            <p>{localStorage.getItem("username")}</p>
                            <a href={"./changeUsername"}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></a>
                        </div>

                    </div>
                    <div className='row'>
                        <p>{pageText['password']}</p>
                        <div className='row contentChange'>
                            <a href={"./changePassword"}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></a>
                        </div>
                    </div>
                    <div className='row'>
                        <p>{pageText['lang']}</p>
                        <div className="row chooseLang">
                            <p id="ar" onClick={changeLang} className={lang === 'ar'?"activeLang":""}>عربي</p>
                            <p id="en" onClick={changeLang} className={lang === 'en'?"activeLang":""}>English</p>
                        </div>
                    </div>
                </div> 
                <div className='changeDataMessage'>
                    <p>{pageText['changeMessage']}</p>
                </div>
            </div>
        
        </div>
    );
}

export default Setting;
