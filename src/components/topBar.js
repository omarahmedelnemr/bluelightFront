import "./styles/topBar.css"
import ProfileDropMenu from "./profileDropMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TopBar({title}) {
    function showHideMinu(){
        document.getElementsByClassName('sideNav')[0].style.setProperty('width','auto')
        console.log(document.getElementsByClassName('sideNav')[0].style.width)
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
