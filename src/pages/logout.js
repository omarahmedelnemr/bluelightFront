import './styles/login.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Logout() {
    const navigate = useNavigate()
    const cookies= new Cookies()
    console.log("Request Sent")
    const keep = ['lang']
    const keepValues= {}
    for(var i =0;i<keep.length;i++){
      keepValues[keep[i]] = localStorage.getItem(keep[i])
    }
    // localStorage.removeItem("img_dir")
    // localStorage.removeItem("role")
    // localStorage.removeItem("name")
    // localStorage.removeItem("arname")
    // localStorage.removeItem("classroom")
    localStorage.clear()
    for(var i =0;i<keep.length;i++){
      localStorage.setItem(keep[i],keepValues[keep[i]])
    }
    cookies.remove("jwt")
    cookies.remove("role")
    cookies.remove("id")
    cookies.remove("CookiesState")

//   navigate('/login')
    window.location.href = "./login"
  return (
    <div>
      <h1>Logging out</h1>
    </div>
  );
}

export default Logout;
