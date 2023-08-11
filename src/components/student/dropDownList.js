import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/dropDownList.css"

function DropDownList({obj}) {
    function activate(event){
        if (event.currentTarget.querySelector('svg').style.rotate == '180deg'){
            event.currentTarget.querySelector('svg').style.setProperty("rotate","0deg")

        }else{
            event.currentTarget.querySelector('svg').style.setProperty("rotate","180deg")
        }
        if ( event.currentTarget.parentElement.querySelector(".options").style.opacity === '1'){
            event.currentTarget.parentElement.querySelector(".options").style.setProperty("opacity","0")

        }else{
            event.currentTarget.parentElement.querySelector(".options").style.setProperty("opacity","1")
        }

    }
    function close(event){
        event.currentTarget.style.setProperty("opacity","0")
        event.currentTarget.parentElement.querySelector('svg').style.setProperty("rotate","0deg")

    }
    function makeActive(event){
        event.currentTarget.parentElement.querySelector('.activeSelectOption').classList.remove('activeSelectOption')
        event.currentTarget.querySelector("p").classList.add("activeSelectOption")
        event.currentTarget.parentElement.parentElement.querySelector(".mainText").innerHTML = event.currentTarget.querySelector("p").innerHTML
    }


    const elements = [<div onClick={makeActive}><p onClick={obj[0]['function']} className="activeSelectOption">{obj[0]['text']}</p></div>]
    for(var i=1;i<obj.length;i++){
        elements.push(<div onClick={makeActive}><p onClick={obj[i]['function']}>{obj[i]['text']}</p></div>)
    }
    return (
        <div className="dropDownList" >
            <div className="header" onClick={activate}>
                <div>
                    <p className="mainText">{obj[0]['text']}</p>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </div>
            <div className="options" onClick={close}>
                {elements}
            </div>
            
        </div>
    );
}

export default DropDownList;
