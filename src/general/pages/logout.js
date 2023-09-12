import './styles/login.css'
import Cookies from 'universal-cookie';

function Logout() {
    const lang = localStorage.getItem("lang")

    const pageLang = {
        logingout:  lang === 'en' ? "Logging out ...":"جار تسجيل الخروج ..."
    } 
    const cookies= new Cookies()
    console.log("Request Sent")
    const keep = ['lang']
    const keepValues= {}
    for(var i =0;i<keep.length;i++){
        keepValues[keep[i]] = localStorage.getItem(keep[i])
    }

    localStorage.clear()
    for(var i =0;i<keep.length;i++){
        localStorage.setItem(keep[i],keepValues[keep[i]])
    }
    cookies.remove("jwt")
    cookies.remove("role")
    cookies.remove("id")
    cookies.remove("CookiesState")

    window.location.href = "./login"
    return (
        <div className='logout'>
            <h1>{pageLang['logingout']}</h1>
        </div>
    );
}

export default Logout;
