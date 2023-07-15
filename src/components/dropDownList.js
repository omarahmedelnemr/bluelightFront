import "./styles/dropDownList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DropDownList({mainText}) {
    return (
        <div className="dropDownList">
            <div className="header ">
                <div>
                    <p className="mainText">{mainText}</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </div>
            <div>

            </div>
            
        </div>
    );
}

export default DropDownList;
