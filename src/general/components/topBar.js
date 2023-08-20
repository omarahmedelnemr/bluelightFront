import "./styles/topBar.css"
import ProfileDropMenu from "./profileDropMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TopBar({title}) {
    function showHideMinu(){
        if (localStorage.getItem('lang') ==='en'){
            document.getElementsByClassName('sideNav')[0].style.setProperty('left','0px')
            document.getElementsByClassName('sideNav')[0].style.setProperty('right','auto')
        }else{
            document.getElementsByClassName('sideNav')[0].style.setProperty('right','0px')
            document.getElementsByClassName('sideNav')[0].style.setProperty('left','auto')
        }
        document.getElementsByClassName('sideNav')[0].querySelector('.backgroundBlock').style.setProperty('display','block')
    }
    return (
        <div className="topBar">
            <div className="sideMinu row">
                <FontAwesomeIcon icon="fa-solid fa-list" onClick={showHideMinu} />
                <h1>{title}</h1>    
            </div>
            
            <ProfileDropMenu/>
        </div>
    );
}

export default TopBar;
