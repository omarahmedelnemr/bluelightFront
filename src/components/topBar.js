import "./styles/topBar.css"
import personImage from '../content/person.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownList from "./dropDownList";
import ProfileDropMenu from "./profileDropMenu";

function TopBar() {
    return (
        <div className="topBar">
            <h1>Nile Egyption International Schools</h1>
            <ProfileDropMenu/>
        </div>
    );
}

export default TopBar;
