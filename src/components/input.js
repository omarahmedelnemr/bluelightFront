import "./styles/inputs.css"
function Input({type,label,ID}) {
  return (
    <div className="col-3 input-effect">
        <input className="effect-22" type={type} id = {ID} name ={label} placeholder=" "/>
        <label>{label}</label>
        <span className="focus-bg"></span>
    </div>
  );
}

export default Input;
