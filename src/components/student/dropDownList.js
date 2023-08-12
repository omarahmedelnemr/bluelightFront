import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/dropDownList.css"

function DropDownList({obj}) {
    function activate(event){
        if (event.currentTarget.querySelector('svg').style.rotate == '180deg'){
            event.currentTarget.querySelector('svg').style.setProperty("rotate","0deg")

        }else{
            event.currentTarget.querySelector('svg').style.setProperty("rotate","180deg")
        }
        if ( event.currentTarget.parentElement.querySelector(".options").style.display === 'flex'){
            // event.currentTarget.parentElement.querySelector(".options").style.setProperty("opacity","0")
            event.currentTarget.parentElement.querySelector(".options").style.setProperty("display","none")

        }else{
            event.currentTarget.parentElement.querySelector(".options").style.setProperty("display","flex")
        }

    }
    function close(event){
            event.currentTarget.parentElement.querySelector(".options").style.setProperty("display","none")
            // event.currentTarget.style.setProperty("opacity","0")
        event.currentTarget.parentElement.querySelector('svg').style.setProperty("rotate","0deg")

    }
    function makeActive(event){
        try{
        event.currentTarget.parentElement.querySelector('.activeSelectOption').classList.remove('activeSelectOption')
        }catch{
            console.log("Not Active Sort")
        }
        event.currentTarget.querySelector("p").classList.add("activeSelectOption")
        event.currentTarget.parentElement.parentElement.querySelector(".mainText").innerHTML = event.currentTarget.querySelector("p").innerHTML
    }


    const elements = []//[<div onClick={makeActive}><p onClick={obj[0]['function']} className="activeSelectOption">{obj[0]['text']}</p></div>]
    for(var i=0;i<obj.length;i++){
        elements.push(<div onClick={makeActive}><p onClick={obj[i]['function']}>{obj[i]['text']}</p></div>)
    }
    return (
        <div className="dropDownList" >
            <div className="header" onClick={activate}>
                <div>
                    <p className="mainText">Select</p>
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
