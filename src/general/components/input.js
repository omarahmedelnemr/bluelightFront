import { useState } from "react";
import "./styles/inputs.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Input({type,label,ID,showPassword = false}) {
  const lang = localStorage.getItem("lang")
  var [icon,setIcon] = useState(showPassword ?  <FontAwesomeIcon icon="fa-solid fa-eye" onClick={showPass}/>:null);  
  function showPass(event){
    console.log(event.currentTarget.parentElement.querySelector('input').type)
    const element = event.currentTarget.parentElement.querySelector('input')
    if(element.type === "text"){
      element.type = "password"
      setIcon(<FontAwesomeIcon icon="fa-solid fa-eye" onClick={showPass}/>)
    }else{
      element.type = "text"
      setIcon(<FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={showPass}/>)

    }
  }
  return (
    <div className={`col-3 input-effect ${lang}`}>
        <input className="effect-22" type={type} id = {ID} name ={label} placeholder=" "/>
        <label>{label}</label>
        <span className="focus-bg"></span>
        {icon}
        {/* <FontAwesomeIcon icon="fa-solid fa-eye" /> */}
    </div>
  );
}

export default Input;
